import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const QUIZ_TAG = "quiz-submitted";

interface GhlCustomFieldRecord {
  id: string;
  name?: string;
  fieldKey?: string;
}

interface CustomFieldCacheEntry {
  fetchedAt: number;
  byNormalizedKey: Map<string, string>;
}

const customFieldCache = new Map<string, CustomFieldCacheEntry>();
const CUSTOM_FIELD_CACHE_TTL_MS = 5 * 60 * 1000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateLimitStore.size > 2000) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function normalizeFieldIdentifier(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^contact\./, "")
    .replace(/[{}]/g, "")
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getLocationCustomFieldIds(
  locationId: string,
  token: string
): Promise<Map<string, string>> {
  const cached = customFieldCache.get(locationId);
  if (cached && Date.now() - cached.fetchedAt < CUSTOM_FIELD_CACHE_TTL_MS) {
    return cached.byNormalizedKey;
  }

  const byNormalizedKey = new Map<string, string>();
  try {
    const response = await fetch(
      `${GHL_API_BASE}/locations/${encodeURIComponent(locationId)}/customFields`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_API_VERSION,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return byNormalizedKey;
    }

    const data = (await response.json()) as { customFields?: GhlCustomFieldRecord[] };
    const fields = Array.isArray(data?.customFields) ? data.customFields : [];

    for (const field of fields) {
      if (!field || typeof field.id !== "string" || !field.id) continue;
      if (typeof field.fieldKey === "string" && field.fieldKey.trim()) {
        byNormalizedKey.set(normalizeFieldIdentifier(field.fieldKey), field.id);
      }
      if (typeof field.name === "string" && field.name.trim()) {
        const normalizedName = normalizeFieldIdentifier(field.name);
        if (!byNormalizedKey.has(normalizedName)) {
          byNormalizedKey.set(normalizedName, field.id);
        }
      }
    }

    customFieldCache.set(locationId, {
      fetchedAt: Date.now(),
      byNormalizedKey,
    });
  } catch {
    // Graceful fallback: built-in contact fields and tag will still be saved.
  }

  return byNormalizedKey;
}

async function createServer() {
  const app = express();
  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "16kb" }));

  app.post("/api/ghl/quiz-lead", async (req: Request, res: Response) => {
    const clientIp = req.ip || "unknown";
    if (isRateLimited(clientIp)) {
      res.status(429).json({ ok: false, error: "Too many submissions. Please try again later." });
      return;
    }

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ ok: false, error: "Invalid request payload." });
      return;
    }

    const body = req.body as Record<string, unknown>;
    const fullName = cleanString(body.fullName, 120);
    const email = cleanString(body.email, 254).toLowerCase();
    const phone = cleanString(body.phone, 40);
    const companyName = cleanString(body.companyName, 150);
    const serviceType = cleanString(body.serviceType, 150);
    const monthlyRevenue = cleanString(body.monthlyRevenue, 100);

    if (!fullName || !email || !isValidEmail(email) || !phone || !/\d/.test(phone) || !companyName) {
      res.status(400).json({ ok: false, error: "Please complete all required contact fields." });
      return;
    }

    const token = process.env.GHL_PRIVATE_TOKEN?.trim() || "";
    const locationId = process.env.GHL_LOCATION_ID?.trim() || "";

    if (!token || !locationId) {
      res.status(202).json({ ok: true, synced: false });
      return;
    }

    const nameParts = fullName.split(/\s+/);
    const firstName = nameParts[0] || fullName;
    const lastName = nameParts.slice(1).join(" ");

    const customFieldIds = await getLocationCustomFieldIds(locationId, token);
    const customFieldsPayload: Array<{ id: string; field_value: string }> = [];

    const desiredCustomValues: Array<[string, string]> = [
      ["hardscape_focus", serviceType],
      ["monthly_revenue", monthlyRevenue],
      ["company_namellc", companyName],
    ];

    for (const [key, value] of desiredCustomValues) {
      if (!value) continue;
      const resolvedId = customFieldIds.get(normalizeFieldIdentifier(key));
      if (resolvedId) {
        customFieldsPayload.push({ id: resolvedId, field_value: value });
      }
    }

    const upsertPayload: Record<string, unknown> = {
      locationId,
      firstName,
      lastName,
      name: fullName,
      email,
      phone,
      companyName,
      source: "Qualification Quiz",
    };

    if (customFieldsPayload.length > 0) {
      upsertPayload.customFields = customFieldsPayload;
    }

    try {
      const upsertRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_API_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(upsertPayload),
        signal: AbortSignal.timeout(6000),
      });

      if (!upsertRes.ok) {
        res.status(502).json({ ok: false, error: "Unable to sync contact right now." });
        return;
      }

      const upsertData = (await upsertRes.json()) as {
        contact?: { id?: string };
        id?: string;
      };
      const contactId = upsertData?.contact?.id || upsertData?.id || "";

      if (contactId) {
        await fetch(`${GHL_API_BASE}/contacts/${encodeURIComponent(contactId)}/tags`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Version: GHL_API_VERSION,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ tags: [QUIZ_TAG] }),
          signal: AbortSignal.timeout(5000),
        }).catch(() => undefined);
      }

      res.status(200).json({ ok: true, synced: true });
    } catch {
      res.status(502).json({ ok: false, error: "Unable to sync contact right now." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    const indexPath = path.join(distDir, "index.html");
    app.use(express.static(distDir));
    app.get("*", (_req: Request, res: Response) => {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application build not found.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("Failed to start server:", err instanceof Error ? err.message : err);
  process.exit(1);
});
