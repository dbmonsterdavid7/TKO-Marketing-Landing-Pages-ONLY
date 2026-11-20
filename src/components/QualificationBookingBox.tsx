import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

interface QualificationBookingBoxProps {
  formId?: string;
  variant?: "hero" | "booking";
  onQualified?: () => void;
}

type QuestionStep = 1 | 2 | 3 | "disqualified" | "qualified";

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
    territory: "",
  });
  const [disqualifyReason, setDisqualifyReason] = useState<string>("");
  const [isCheckingTerritory, setIsCheckingTerritory] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const iframeMountedAtRef = useRef<number>(0);
  const lastHeightRef = useRef<number>(0);
  const lastAutoScrollAtRef = useRef<number>(0);

  useEffect(() => {
    const centerCalendarOnMobile = () => {
      if (window.innerWidth > 768 || !calendarWrapperRef.current) return;
      const now = Date.now();
      if (now - lastAutoScrollAtRef.current < 1500) return;
      lastAutoScrollAtRef.current = now;

      setTimeout(() => {
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
        if (elapsedSinceMount > 1500 && prevHeight > 0 && Math.abs(height - prevHeight) > 25) {
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
          if (isGhlOrigin && /scroll|submit/i.test(data) && !data.startsWith("{") && !data.startsWith("[")) {
            centerCalendarOnMobile();
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
          if (
            eventName === "set-sticky-contacts" ||
            eventName === "msgsndr-form-submit" ||
            eventName === "msgsndr-scroll" ||
            eventName === "scrollToTop"
          ) {
            if (Date.now() - iframeMountedAtRef.current > 1000) {
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
          if (isGhlOrigin && /scroll|submit|step/i.test(actionText)) {
            if (Date.now() - iframeMountedAtRef.current > 1000) {
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

  // Step 2 handler - Revenue qualification ($0 - $25k/mo disqualifies)
  const handleRevenueSelect = (revenue: string, isDisqualified = false, reason = "") => {
    setAnswers((prev) => ({ ...prev, monthlyRevenue: revenue }));
    if (isDisqualified) {
      setDisqualifyReason(reason);
      setStep("disqualified");
    } else {
      setStep(3);
    }
  };

  // Step 3 handler (Territory check)
  const handleTerritorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.territory.trim()) return;

    setIsCheckingTerritory(true);
    setTimeout(() => {
      setIsCheckingTerritory(false);
      setStep("qualified");
    }, 900);
  };

  const handleReset = () => {
    setAnswers({
      serviceType: "",
      monthlyRevenue: "",
      territory: "",
    });
    setDisqualifyReason("");
    setStep(1);
  };

  const buildGhlBookingUrl = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("hardscape_focus", answers.serviceType);
    params.set("monthly_revenue", answers.monthlyRevenue);
    params.set("service_territory", answers.territory.trim());
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
              See If Your Market is <span className="qb-title-highlight">Available</span>
            </h3>
            <p className="qb-sub">
              We only work with 1 hardscape company per market - answer a few quick questions below.
            </p>
            {/* PROGRESS BAR */}
            <div className="qb-progress-wrapper">
              <div className="qb-progress-track">
                <div 
                  className={`qb-progress-bar ${isCheckingTerritory ? "qb-progress-bar-checking" : ""}`}
                  style={{ width: `${((typeof step === "number" ? step : 3) / 3) * 100}%` }}
                >
                  <span className="qb-progress-shimmer-mask" aria-hidden="true">
                    <span className="qb-progress-shimmer" />
                  </span>
                  <span className="qb-progress-glow-head" />
                </div>
              </div>
              <div className="qb-progress-steps-meta">
                <span className={typeof step === "number" && step >= 1 ? "step-active" : "step-idle"}>
                  <span className="step-num">1</span> Focus
                </span>
                <span className={typeof step === "number" && step >= 2 ? "step-active" : "step-idle"}>
                  <span className="step-num">2</span> Revenue
                </span>
                <span className={typeof step === "number" && step >= 3 ? "step-active" : "step-idle"}>
                  <span className="step-num">3</span> Territory
                </span>
              </div>
            </div>
          </>
        )}

        {step === "qualified" && (
          <div className="qb-qualified-header">
            <div className="qb-qualified-badge">
              Territory Available
            </div>
            <h3 className="qb-title text-white">Service Area Approved for {answers.territory || "Your Market"}</h3>
            <p className="qb-sub">
              You meet our client criteria! Select a convenient 15-minute time below to claim your territory and review your custom growth plan.
            </p>
            <div className="qb-summary-strip">
              <span><strong>Focus:</strong> {answers.serviceType}</span>
              <span className="dot">•</span>
              <span><strong>Revenue:</strong> {answers.monthlyRevenue}</span>
              <span className="dot">•</span>
              <span><strong>Territory:</strong> {answers.territory}</span>
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
                    "$0 - $25k/mo",
                    true,
                    "Our performance-based growth system requires an existing operational foundation of at least $25k/month to ensure we can consistently scale your crew with high-ticket projects under our guarantee."
                  )
                }
              >
                <div className="qb-option-title">$0 - $25k/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$25k - $50k/mo")}
              >
                <div className="qb-option-title">$25k - $50k/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$50k - $100k/mo")}
              >
                <div className="qb-option-title">$50k - $100k/mo</div>
              </button>

              <button
                type="button"
                className="qb-option-card"
                onClick={() => handleRevenueSelect("$100k+/mo")}
              >
                <div className="qb-option-title">$100k+/mo</div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 (formerly step 4): TERRITORY AVAILABILITY CHECK */}
        {step === 3 && (
          <form onSubmit={handleTerritorySubmit} className="qb-step-view animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
              <label className="qb-question-label mb-0">
                What city, metro area, or ZIP codes do you service?
              </label>
              <button type="button" onClick={() => setStep(2)} className="text-xs text-neutral-400 hover:text-white transition">
                ← Back
              </button>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              We check your service territory against our current roster to make sure there are no competing contractors in your market.
            </p>
            <div className="qb-input-group">
              <input
                type="text"
                placeholder="e.g. Tampa & St. Petersburg, FL (or ZIP 33602)"
                value={answers.territory}
                onChange={(e) => setAnswers({ ...answers, territory: e.target.value })}
                required
                className="qb-text-input"
                autoFocus
              />
              <button
                type="submit"
                disabled={isCheckingTerritory || !answers.territory.trim()}
                className="qb-submit-btn"
              >
                {isCheckingTerritory ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Checking Territory...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Verify Territory
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
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
          font-size: clamp(24px, 4vw, 32px);
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
          max-width: 340px;
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
        .qb-progress-steps-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding: 0 2px;
          font-size: 11px;
          letter-spacing: 0.02em;
        }
        .qb-progress-steps-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
        }
        .qb-progress-steps-meta .step-idle {
          color: #737373;
        }
        .qb-progress-steps-meta .step-active {
          color: #4ade80;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }
        .qb-progress-steps-meta .step-num {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          font-size: 9.5px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          flex-shrink: 0;
          box-sizing: border-box;
        }
        .qb-progress-steps-meta .step-idle .step-num {
          background: rgba(255, 255, 255, 0.06);
          color: #888888;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .qb-progress-steps-meta .step-active .step-num {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.5);
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
            font-size: 22px;
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
