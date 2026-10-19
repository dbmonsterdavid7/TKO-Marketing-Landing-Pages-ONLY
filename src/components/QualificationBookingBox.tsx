import React, { useState, useEffect } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

interface QualificationBookingBoxProps {
  formId?: string;
  variant?: "hero" | "booking";
  onQualified?: () => void;
}

type QuestionStep = 1 | 2 | 3 | "disqualified" | "qualified";

export default function QualificationBookingBox({
  formId = "IqILvNxBfXxI0NVdJu5q",
  variant = "hero",
}: QualificationBookingBoxProps) {
  const [step, setStep] = useState<QuestionStep>(1);
  const [answers, setAnswers] = useState({
    serviceType: "",
    monthlyRevenue: "",
    territory: "",
  });
  const [disqualifyReason, setDisqualifyReason] = useState<string>("");
  const [isCheckingTerritory, setIsCheckingTerritory] = useState(false);

  useEffect(() => {
    // Dynamically load GoHighLevel / LeadConnector form embed script
    const existing = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === "string" && e.data.includes("setHeight")) {
        try {
          const parsed = JSON.parse(e.data);
          if (parsed && typeof parsed.height === "number" && parsed.height > 200) {
            const iframe = document.getElementById(`ghl-embed-${variant}-${formId}`);
            if (iframe && window.innerWidth > 640) {
              iframe.style.height = `${parsed.height}px`;
              iframe.style.minHeight = `${parsed.height}px`;
            }
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [variant, formId]);

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
          <div className="qb-calendar-wrapper animate-fadeIn">
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
              style={{ width: "100%", border: "none", overflow: "hidden" }}
              className="qb-calendar-iframe w-full min-h-[580px] md:min-h-[580px]"
              scrolling="no"
              id={`ghl-embed-${variant}-${formId}`}
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Hardscape Qualification & Booking"
              data-height="580"
              data-layout-iframe-id={`ghl-embed-${variant}-${formId}`}
              data-form-id={formId}
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
          transition: width 0.55s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
          overflow: visible;
        }
        .qb-progress-bar::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%);
          animation: qb-shimmer 2.2s infinite ease-in-out;
        }
        .qb-progress-glow-head {
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px #ffffff, 0 0 10px #4ade80, 0 0 16px #22c55e;
          z-index: 2;
        }
        .qb-progress-bar-checking {
          animation: qb-pulse-scan 1s infinite alternate ease-in-out;
        }
        @keyframes qb-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
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
          font-size: 15px;
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
          min-height: 580px;
        }
        .qb-content-calendar {
          padding: 0 !important;
          min-height: auto;
        }
        .qb-calendar-iframe {
          width: 100%;
          min-height: 580px;
          border: none;
          display: block;
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
          /* Give calendar embed 100% full width and room matching homepage */
          .qb-content-calendar {
            padding: 0 !important;
          }
          .qb-calendar-wrapper {
            min-height: 1050px;
            padding: 0;
            margin: 0;
            width: 100%;
          }
          .qb-calendar-iframe {
            min-height: 1050px !important;
            height: 1050px;
            width: 100%;
            border-radius: 0 0 12px 12px;
          }
        }
      `}</style>
    </div>
  );
}
