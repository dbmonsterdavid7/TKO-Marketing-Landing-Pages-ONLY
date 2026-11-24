import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

interface QualificationBookingBoxProps {
  formId?: string;
  variant?: "hero" | "booking";
  onQualified?: () => void;
}

type QuestionStep = 1 | 2 | 3 | 4 | "disqualified" | "qualified";

export default function QualificationBookingBox({
  formId = "sSJG2lLmJamOBUgLWT3w",
  variant = "hero",
}: QualificationBookingBoxProps) {
  const embedId =
    formId === "sSJG2lLmJamOBUgLWT3w"
      ? "sSJG2lLmJamOBUgLWT3w_1795208399374"
      : `ghl-embed-${variant}-${formId}`;
  const [step, setStep] = useState<QuestionStep>(1);
  const [answers, setAnswers] = useState({
    serviceType: "",
    monthlyRevenue: "",
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
  });
  const [disqualifyReason, setDisqualifyReason] = useState<string>("");
  const [isCheckingTerritory, setIsCheckingTerritory] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const iframeMountedAtRef = useRef<number>(0);
  const lastHeightRef = useRef<number>(0);
  const lastAutoScrollAtRef = useRef<number>(0);

  useEffect(() => {
    const isMobileDevice = () =>
      window.innerWidth <= 640 ||
      (window.innerWidth <= 768 && window.matchMedia("(pointer: coarse)").matches);

    const centerCalendarOnMobile = () => {
      if (!isMobileDevice() || !calendarWrapperRef.current) return;
      const now = Date.now();
      if (now - lastAutoScrollAtRef.current < 1500) return;
      lastAutoScrollAtRef.current = now;

      setTimeout(() => {
        if (!isMobileDevice()) return;
        const el = calendarWrapperRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const absoluteTop = rect.top + scrollTop;
        const targetY =
          rect.height <= viewportHeight - 32
            ? absoluteTop - (viewportHeight - rect.height) / 2
            : absoluteTop - 16;

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: "smooth",
        });
      }, 150);
    };

    const applyHeight = (rawHeight: unknown) => {
      const height = Number(rawHeight);
      if (Number.isFinite(height) && height > 300 && iframeRef.current) {
        iframeRef.current.style.height = `${height}px`;
        iframeRef.current.style.minHeight = `${height}px`;

        const prevHeight = lastHeightRef.current;
        lastHeightRef.current = height;
        const elapsedSinceMount = Date.now() - iframeMountedAtRef.current;
        if (isMobileDevice() && elapsedSinceMount > 1500 && prevHeight > 0 && Math.abs(height - prevHeight) > 25) {
          centerCalendarOnMobile();
        }
      }
    };

    const handleMessage = (e: MessageEvent) => {
      const isGhlOrigin =
        typeof e.origin === "string" &&
        (e.origin.includes("leadconnectorhq.com") || e.origin.includes("msgsndr.com"));

      try {
        let data = e.data;
        if (typeof data === "string") {
          if (isGhlOrigin && /scroll/i.test(data) && !data.startsWith("{") && !data.startsWith("[")) {
            if (isMobileDevice()) {
              centerCalendarOnMobile();
            } else {
              e.stopImmediatePropagation();
            }
            return;
          }
          if (isGhlOrigin && /submit/i.test(data) && !data.startsWith("{") && !data.startsWith("[")) {
            if (isMobileDevice()) {
              centerCalendarOnMobile();
            }
            return;
          }
          if (data.startsWith("{") || data.startsWith("[")) {
            data = JSON.parse(data);
          } else {
            return;
          }
        }

        if (Array.isArray(data)) {
          const eventName = typeof data[0] === "string" ? data[0] : "";
          if (/scroll/i.test(eventName)) {
            if (isMobileDevice()) {
              if (Date.now() - iframeMountedAtRef.current > 1000) {
                centerCalendarOnMobile();
              }
            } else if (isGhlOrigin) {
              e.stopImmediatePropagation();
            }
            return;
          }

          if (eventName === "set-sticky-contacts" || eventName === "msgsndr-form-submit") {
            if (isMobileDevice() && Date.now() - iframeMountedAtRef.current > 1000) {
              centerCalendarOnMobile();
            }
            return;
          }

          if (
            (eventName === "msgsndr-resize" || eventName === "setHeight" || eventName === "msgsndr-iframe-resize") &&
            data.length >= 2
          ) {
            const possibleHeight = typeof data[2] === "number" || typeof data[2] === "string" ? data[2] : data[1];
            applyHeight(possibleHeight);
          }
          return;
        }

        if (data && typeof data === "object") {
          const obj = data as Record<string, unknown>;
          const actionText = String(obj.type || obj.action || obj.event || obj.message || "");
          if (isGhlOrigin && /scroll/i.test(actionText)) {
            if (isMobileDevice()) {
              if (Date.now() - iframeMountedAtRef.current > 1000) {
                centerCalendarOnMobile();
              }
            } else {
              e.stopImmediatePropagation();
            }
          } else if (isGhlOrigin && /submit|step/i.test(actionText)) {
            if (isMobileDevice() && Date.now() - iframeMountedAtRef.current > 1000) {
              centerCalendarOnMobile();
            }
          }

          if ("height" in obj) {
            applyHeight(obj.height);
          } else if ("frameHeight" in obj) {
            applyHeight(obj.frameHeight);
          }
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (step !== "qualified") return;

    iframeMountedAtRef.current = Date.now();
    lastHeightRef.current = 0;
    lastAutoScrollAtRef.current = 0;

    const isMobile =
      window.innerWidth <= 640 ||
      (window.innerWidth <= 768 && window.matchMedia("(pointer: coarse)").matches);

    if (!isMobile && iframeRef.current) {
      iframeRef.current.scrollIntoView = () => {};
    }

    // Re-run LeadConnector form_embed.js once the booking iframe is in the DOM
    const existingScripts = document.querySelectorAll('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    existingScripts.forEach((el) => el.remove());

    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, [step, embedId]);

  // Step 1 handler - All options valid
  const handleServiceSelect = (service: string) => {
    setAnswers((prev) => ({ ...prev, serviceType: service }));
    setStep(2);
  };

  // Step 2 handler - Revenue qualification (Under $40k/mo disqualifies)
  const handleRevenueSelect = (revenue: string, isDisqualified = false, reason = "") => {
    setAnswers((prev) => ({ ...prev, monthlyRevenue: revenue }));
    if (isDisqualified) {
      setDisqualifyReason(reason);
      setStep("disqualified");
    } else {
      setStep(3);
    }
  };

  // Step 3 handler (Company name)
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.companyName.trim()) return;
    setStep(4);
  };

  // Step 4 handler (Personal & contact info -> sync to GHL -> booking calendar)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCheckingTerritory) return;

    const fullName = answers.fullName.trim();
    const email = answers.email.trim();
    const phone = answers.phone.trim();
    const companyName = answers.companyName.trim();
    if (!fullName || !email || !phone || !companyName) return;

    setIsCheckingTerritory(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 3000);

    const syncLead = fetch("/api/ghl/quiz-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        fullName,
        email,
        phone,
        companyName,
        serviceType: answers.serviceType,
        monthlyRevenue: answers.monthlyRevenue,
      }),
    })
      .catch(() => undefined)
      .finally(() => window.clearTimeout(timeoutId));

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 900);
    });

    await Promise.allSettled([syncLead, minDelay]);
    setIsCheckingTerritory(false);
    setStep("qualified");
  };

  const handleReset = () => {
    setAnswers({
      serviceType: "",
      monthlyRevenue: "",
      companyName: "",
      fullName: "",
      email: "",
      phone: "",
    });
    setDisqualifyReason("");
    setStep(1);
  };

  const buildGhlBookingUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const trimmedName = answers.fullName.trim();
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

    params.set("hardscape_focus", answers.serviceType);
    params.set("monthly_revenue", answers.monthlyRevenue);
    params.set("company_namellc", answers.companyName.trim());
    params.set("full_name", trimmedName);
    params.set("name", trimmedName);
    if (firstName) params.set("first_name", firstName);
    if (lastName) params.set("last_name", lastName);
    params.set("email", answers.email.trim());
    params.set("phone", answers.phone.trim());
    const queryString = params.toString().replace(/\+/g, "%20");
    return `https://api.leadconnectorhq.com/widget/booking/${formId}?${queryString}`;
  };

  return (
    <div className="qualification-box-inner">
      {/* HEADER / STATUS BAR */}
      <div className="qb-header">
        {step !== "qualified" && step !== "disqualified" && (
          <>
            <h3 className="qb-title">
              See If You <span className="qb-title-highlight">Qualify</span>
            </h3>
            <p className="qb-sub">
              Answer a few quick questions to see if we can help your business.
            </p>
            {/* PROGRESS BAR */}
            {(() => {
              const currentStep = typeof step === "number" ? step : 4;
              const totalSteps = 4;
              const completionPercent = Math.round((currentStep / totalSteps) * 100);
              return (
                <div className="qb-progress-wrapper">
                  <div className="qb-progress-header">
                    <span className="qb-progress-percent">
                      {completionPercent}% Complete
                    </span>
                    <span className="qb-progress-step-label">
                      Step {currentStep} of {totalSteps}
                    </span>
                  </div>
                  <div className="qb-progress-track">
                    <div
                      className={`qb-progress-bar ${isCheckingTerritory ? "qb-progress-bar-checking" : ""}`}
                      style={{ width: `${completionPercent}%` }}
                    >
                      <span className="qb-progress-shimmer-mask" aria-hidden="true">
                        <span className="qb-progress-shimmer" />
                      </span>
                      <span className="qb-progress-glow-head" />
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {step === "qualified" && (
          <div className="qb-qualified-header">
            <div className="qb-qualified-badge">
              You Qualify
            </div>
            <h3 className="qb-title text-white">Application Approved for {answers.companyName || "Your Company"}</h3>
            <p className="qb-sub">
              You meet our client criteria! Select a convenient 15-minute time below to review your custom growth plan.
            </p>
            <div className="qb-summary-strip">
              <span><strong>Focus:</strong> {answers.serviceType}</span>
              <span className="dot">•</span>
              <span><strong>Revenue:</strong> {answers.monthlyRevenue}</span>
              <span className="dot">•</span>
              <span><strong>Company:</strong> {answers.companyName}</span>
              <button onClick={handleReset} className="qb-edit-btn" title="Change Answers">
                <RotateCcw className="w-3 h-3 inline mr-1" /> Edit
              </button>
            </div>
          </div>
        )}

        {step === "disqualified" && (
          <div className="qb-disqualified-header">
            <div className="qb-disqualified-badge">
              Not A Fit At This Time
            </div>
            <h3 className="qb-title text-white">Contractor Criteria Notice</h3>
            <p className="qb-sub">
              Because we offer a 100% pay-on-performance guarantee ("Land more hardscaping jobs or you don't pay"), we can only accept businesses that match our operational revenue criteria.
            </p>
          </div>
        )}
      </div>

      {/* QUESTION BODIES / CALENDAR EMBED */}
      <div className={`qb-content ${step === "qualified" ? "qb-content-calendar" : ""}`}>
        {/* STEP 1: SERVICE SPECIALTY */}
        {step === 1 && (
          <div className="qb-step-view animate-fadeIn">
            <label className="qb-question-label">
              What type of outdoor projects does your company install?
            </label>
            <div className="qb-options-grid">
              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleServiceSelect("Paver Patios, Walkways & Driveways")}
              >
                <div className="qb-option-title">Paver Patios, Walkways & Driveways</div>
                <div className="qb-option-desc">Interlocking pavers, natural stone, modern hardscaping installations</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleServiceSelect("Retaining Walls & Masonry")}
              >
                <div className="qb-option-title">Retaining Walls & Masonry</div>
                <div className="qb-option-desc">Block walls, stone retaining walls, engineered slope stabilization</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleServiceSelect("Complete Outdoor Living Spaces")}
              >
                <div className="qb-option-title">Complete Outdoor Living Spaces</div>
                <div className="qb-option-desc">Outdoor kitchens, pergolas, fire pits, multi-tier patio environments</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleServiceSelect("Other - Home Service Business")}
              >
                <div className="qb-option-title">Other</div>
                <div className="qb-option-desc">Home service Business</div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MONTHLY REVENUE */}
        {step === 2 && (
          <div className="qb-step-view animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
              <label className="qb-question-label mb-0">
                What is your current monthly revenue?
              </label>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-neutral-400 hover:text-white transition">
                ← Back
              </button>
            </div>
            <div className="qb-options-grid">
              <button
                type="button"
                className="qb-option-card"
                onClick={() =>
                  handleRevenueSelect(
                    "Under $40k/mo",
                    true,
                    "Our performance-based growth system requires an existing operational foundation of at least $40k/month to ensure we can consistently scale your crew with high-ticket projects under our guarantee."
                  )
                }
              >
                <div className="qb-option-title">Under $40k/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$40k - $100k/mo")}
              >
                <div className="qb-option-title">$40k - $100k/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$100k - $250k/mo")}
              >
                <div className="qb-option-title">$100k - $250k/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$250k - $1m/mo")}
              >
                <div className="qb-option-title">$250k - $1m/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$1m/mo+")}
              >
                <div className="qb-option-title">$1m/mo+</div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPANY NAME */}
        {step === 3 && (
          <form onSubmit={handleCompanySubmit} className="qb-step-view animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
              <label className="qb-question-label mb-0">
                What is your company name?
              </label>
              <button type="button" onClick={() => setStep(2)} className="text-xs text-neutral-400 hover:text-white transition">
                ← Back
              </button>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              We use this to confirm market exclusivity and prepare your custom territory audit before our call.
            </p>
            <div className="qb-input-group">
              <input
                type="text"
                placeholder="e.g. Summit Hardscapes LLC"
                value={answers.companyName}
                onChange={(e) => setAnswers({ ...answers, companyName: e.target.value })}
                required
                className="qb-text-input"
                autoFocus
              />
              <button
                type="submit"
                disabled={!answers.companyName.trim()}
                className="qb-submit-btn"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: PERSONAL INFO & CONTACT */}
        {step === 4 && (
          <form onSubmit={handleContactSubmit} className="qb-step-view animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
              <label className="qb-question-label mb-0">
                Where should we send your custom growth plan?
              </label>
              <button type="button" onClick={() => setStep(3)} className="text-xs text-neutral-400 hover:text-white transition">
                ← Back
              </button>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Enter your contact details below to unlock our calendar and lock in your consultation.
            </p>
            <div className="qb-input-group">
              <div>
                <label htmlFor="qb-full-name" className="qb-field-label">Full Name</label>
                <input
                  id="qb-full-name"
                  type="text"
                  placeholder="John Smith"
                  autoComplete="name"
                  value={answers.fullName}
                  onChange={(e) => setAnswers({ ...answers, fullName: e.target.value })}
                  required
                  className="qb-text-input"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="qb-email" className="qb-field-label">Email</label>
                <input
                  id="qb-email"
                  type="email"
                  placeholder="john@company.com"
                  autoComplete="email"
                  value={answers.email}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                  required
                  className="qb-text-input"
                />
              </div>
              <div>
                <label htmlFor="qb-phone" className="qb-field-label">Phone Number</label>
                <input
                  id="qb-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  value={answers.phone}
                  onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
                  required
                  className="qb-text-input"
                />
              </div>
              <button
                type="submit"
                disabled={isCheckingTerritory || !answers.fullName.trim() || !answers.email.trim() || !answers.phone.trim()}
                className="qb-submit-btn qb-submit-btn-green"
              >
                {isCheckingTerritory ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading Calendar...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
              <p className="qb-submit-helper">
                Take a few seconds and pick a time that suits you.
              </p>
            </div>
          </form>
        )}

        {/* DISQUALIFIED SCREEN */}
        {step === "disqualified" && (
          <div className="qb-disqualified-view animate-fadeIn">
            <div className="qb-disqualified-card">
              <h4 className="qb-dq-title">Why this qualification is required</h4>
              <p className="qb-dq-reason">{disqualifyReason}</p>
              <div className="qb-dq-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="qb-btn-secondary"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Revise My Answers
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QUALIFIED SCREEN: GHL CALENDAR EMBED */}
        {step === "qualified" && (
          <div ref={calendarWrapperRef} className="qb-calendar-wrapper animate-fadeIn">
            <iframe
              ref={iframeRef}
              src={buildGhlBookingUrl()}
              allow="payment"
              style={{ width: "100%", border: "none", overflow: "hidden", background: "transparent" }}
              className="qb-calendar-iframe"
              scrolling="no"
              id={embedId}
              title="Hardscape Growth Qualification & Booking"
            />
          </div>
        )}
      </div>

      <style>{`
        .qualification-box-inner {
          width: 100%;
          text-align: left;
        }
        .qb-header {
          padding: 24px 28px 20px;
          background: #191919;
          border-bottom: 1px solid #282828;
          text-align: center;
        }
        .qb-header:has(.qb-qualified-header) {
          padding: 18px 24px 16px;
        }
        .qb-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f5c518;
          background: rgba(245, 197, 24, 0.12);
          border: 1px solid rgba(245, 197, 24, 0.3);
          padding: 4px 12px;
          border-radius: 3px;
          margin-bottom: 10px;
        }
        .qb-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4.5vw, 38px);
          letter-spacing: 0.02em;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1.15;
          margin-bottom: 6px;
        }
        .qb-title-highlight {
          color: #22c55e;
        }
        .qb-sub {
          font-size: 14px;
          color: #a3a3a3;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.5;
        }
        .qb-progress-wrapper {
          width: 100%;
          max-width: 380px;
          margin: 16px auto 0;
        }
        .qb-progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.7);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .qb-progress-bar {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #15803d 0%, #22c55e 60%, #4ade80 100%);
          box-shadow: 0 0 14px rgba(34, 197, 94, 0.55), 0 0 4px rgba(74, 222, 128, 0.8);
          transition: width 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: visible;
        }
        .qb-progress-shimmer-mask {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
          pointer-events: none;
        }
        .qb-progress-shimmer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 720px;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 14%,
            rgba(255, 255, 255, 0.05) 24%,
            rgba(255, 255, 255, 0.2) 36%,
            rgba(255, 255, 255, 0.44) 45%,
            rgba(255, 255, 255, 0.62) 50%,
            rgba(255, 255, 255, 0.44) 55%,
            rgba(255, 255, 255, 0.2) 64%,
            rgba(255, 255, 255, 0.05) 76%,
            rgba(255, 255, 255, 0) 86%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 50% 100%;
          background-repeat: repeat-x;
          will-change: transform;
          animation: qb-shimmer 2.6s linear infinite;
        }
        .qb-progress-glow-head {
          position: absolute;
          right: -3px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0.92) 42%, rgba(74, 222, 128, 0) 76%);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9), 0 0 14px rgba(74, 222, 128, 0.85);
          z-index: 2;
          pointer-events: none;
        }
        .qb-progress-bar-checking {
          animation: qb-pulse-scan 1s infinite alternate ease-in-out;
        }
        @keyframes qb-shimmer {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        @keyframes qb-pulse-scan {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.3); }
        }
        .qb-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
          padding: 0 2px;
        }
        .qb-progress-step-label {
          font-size: 12px;
          font-weight: 500;
          color: #a3a3a3;
          letter-spacing: 0.02em;
        }
        .qb-progress-percent {
          font-size: 12px;
          font-weight: 700;
          color: #4ade80;
          letter-spacing: 0.03em;
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }
        .qb-qualified-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #34d399;
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          padding: 4px 12px;
          border-radius: 3px;
          margin-bottom: 8px;
        }
        .qb-summary-strip {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
          font-size: 12px;
          color: #d4d4d4;
          background: #111111;
          border: 1px solid #2e2e2e;
          padding: 6px 14px;
          border-radius: 4px;
        }
        .qb-summary-strip .dot {
          color: #666;
        }
        .qb-edit-btn {
          background: transparent;
          border: none;
          color: #f5c518;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          margin-left: 6px;
          text-decoration: underline;
        }
        .qb-disqualified-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f87171;
          background: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.3);
          padding: 4px 12px;
          border-radius: 3px;
          margin-bottom: 8px;
        }
        .qb-content {
          padding: 24px;
          background: #141414;
          min-height: 480px;
        }
        .qb-step-view {
          max-width: 620px;
          margin: 0 auto;
        }
        .qb-question-label {
          display: block;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }
        .qb-options-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .qb-option-card {
          background: #1a1a1a;
          border: 1px solid #2e2e2e;
          border-radius: 6px;
          padding: 16px 20px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
          width: 100%;
        }
        .qb-option-card:hover {
          border-color: #f5c518;
          background: #222222;
          transform: translateY(-1px);
        }
        .qb-option-title {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .qb-option-desc {
          font-size: 13px;
          color: #888888;
          line-height: 1.4;
        }
        .qb-input-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .qb-text-input {
          background: #111111;
          border: 1px solid #333333;
          border-radius: 4px;
          padding: 14px 16px;
          color: #ffffff;
          font-size: 16px;
          font-family: inherit;
          width: 100%;
          outline: none;
        }
        .qb-text-input:focus {
          border-color: #f5c518;
          box-shadow: 0 0 0 2px rgba(245, 197, 24, 0.2);
        }
        .qb-field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #d4d4d4;
          margin-bottom: 6px;
        }
        .qb-submit-btn {
          background: #f5c518;
          color: #0a0a0a;
          font-weight: 700;
          font-size: 16px;
          padding: 14px 24px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease-in-out;
        }
        .qb-submit-btn:hover:not(:disabled) {
          background: #e6b810;
        }
        .qb-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .qb-submit-btn-green {
          background: #22c55e;
          color: #ffffff;
          margin-top: 4px;
        }
        .qb-submit-btn-green:hover:not(:disabled) {
          background: #16a34a;
        }
        .qb-submit-helper {
          font-size: 12px;
          color: #888888;
          text-align: center;
          margin-top: 2px;
        }
        .qb-disqualified-view {
          max-width: 540px;
          margin: 20px auto;
          text-align: center;
        }
        .qb-disqualified-card {
          background: #181818;
          border: 1px solid #2e2e2e;
          border-radius: 8px;
          padding: 32px 24px;
        }
        .qb-dq-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .qb-dq-reason {
          font-size: 14px;
          color: #b5b5b5;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .qb-btn-secondary {
          background: #262626;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 4px;
          border: 1px solid #3a3a3a;
          cursor: pointer;
          transition: background 0.15s;
        }
        .qb-btn-secondary:hover {
          background: #333333;
        }
        .qb-calendar-wrapper {
          width: 100%;
          min-height: 0;
          background: #141414;
          overflow: hidden;
          overflow-anchor: none;
        }
        .qb-content-calendar {
          padding: 0 !important;
          min-height: auto;
          background: #141414;
        }
        .qb-calendar-iframe {
          width: 100%;
          min-height: 460px;
          border: none;
          display: block;
          background: transparent;
          overflow: hidden;
          overflow-anchor: none;
        }
        .animate-fadeIn {
          animation: qbFadeIn 0.25s ease-in-out;
        }
        @keyframes qbFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* MOBILE RESPONSIVE TWEAKS */
        @media (max-width: 640px) {
          .qb-header {
            padding: 20px 20px 16px;
          }
          .qb-title {
            font-size: 26px;
            margin-bottom: 4px;
          }
          .qb-qualified-header .qb-title {
            font-size: 20px;
            margin-bottom: 2px;
          }
          /* Hide all text below headline in qualified state on mobile */
          .qb-qualified-header .qb-sub {
            display: none !important;
          }
          /* Hide focus, revenue, territory box on mobile */
          .qb-summary-strip {
            display: none !important;
          }
          .qb-content {
            padding: 20px 16px;
            min-height: auto;
          }
          /* Give calendar embed 100% full width without extra blank space */
          .qb-content-calendar {
            padding: 0 !important;
          }
          .qb-calendar-wrapper {
            min-height: 680px;
            padding: 0;
            margin: 0;
            width: 100%;
          }
          .qb-calendar-iframe {
            min-height: 680px;
            width: 100%;
            border-radius: 0 0 12px 12px;
          }
        }
      `}</style>
    </div>
  );
}
