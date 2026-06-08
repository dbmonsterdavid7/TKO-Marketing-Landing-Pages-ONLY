import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, CheckSquare, ShieldCheck, Mail } from "lucide-react";

export default function WebsiteCalendar() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Dynamic loading of msgsndr calendar embed scripts if needed, similar to Grow calendar
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="grow-page-root min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .grow-page-root {
          --black: #0a0a0a;
          --white: #ffffff;
          --yellow: #f5c518;
          --yellow-dark: #d4a800;
          --green: #22c55e;
          --gray-100: #f5f5f5;
          --gray-200: #e5e5e5;
          --gray-400: #a3a3a3;
          --gray-500: #737373;
          --gray-900: #171717;
          --section-dark: #111111;
          --section-mid: #141414;
          
          font-family: 'DM Sans', sans-serif;
          background: var(--black);
          color: var(--white);
          font-size: 16px;
          line-height: 1.6;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: visible;
        }

        .grow-page-root * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }

        .grow-page-root .container-narrow { 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 0 20px; 
        }

        /* HEADER / NAVIGATION */
        .grow-page-root .header-minimal {
          padding: 24px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: var(--black);
        }

        .grow-page-root .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 0.05em;
          color: var(--white);
          text-decoration: none;
          text-transform: uppercase;
        }

        .grow-page-root .logo span {
          color: var(--yellow);
        }

        .grow-page-root .back-home-link {
          font-size: 14px;
          color: var(--gray-400);
          text-decoration: none;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .grow-page-root .back-home-link:hover {
          color: var(--yellow);
        }

        /* CALENDAR SECTION */
        .grow-page-root .calendar-section {
          padding: 48px 0 100px;
          text-align: center;
        }

        .grow-page-root .calendar-section h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(38px, 6vw, 56px);
          line-height: 1.1;
          color: var(--white);
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .grow-page-root .calendar-section h1 span {
          color: var(--yellow);
        }

        .grow-page-root .sub-heading {
          font-size: clamp(15px, 2vw, 17px);
          color: #cccccc;
          max-width: 620px;
          margin: 0 auto 36px;
          line-height: 1.5;
        }

        /* CALENDAR HOLDER */
        .grow-page-root .calendar-wrapper {
          background: transparent;
          border: none;
          border-radius: 8px;
          padding: 0;
          margin-bottom: 30px;
        }

        .grow-page-root .calendar-frame {
          width: 100%;
          min-height: 680px;
          border: none;
          display: block;
          border-radius: 8px;
          background: transparent;
          color-scheme: light;
        }

        /* CARD ROW BENEFITS */
        .grow-page-root .benefits-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 30px;
          text-align: left;
        }

        .grow-page-root .benefit-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          padding: 16px;
        }

        .grow-page-root .benefit-icon {
          font-size: 24px;
          margin-bottom: 8px;
          color: var(--yellow);
        }

        .grow-page-root .benefit-card h3 {
          font-size: 14px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .grow-page-root .benefit-card p {
          font-size: 13px;
          color: var(--gray-400);
          line-height: 1.4;
        }

        @media (max-width: 650px) {
          .grow-page-root .benefits-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .grow-page-root .calendar-frame {
            min-height: 720px;
          }
        }
      ` }} />

      {/* Header */}
      <header className="header-minimal">
        <Link to="/website" className="logo">
          Takeover <span>Marketing</span>
        </Link>
        <Link to="/website-thank-you" className="back-home-link">
          <ArrowLeft size={16} /> Back to Steps
        </Link>
      </header>

      {/* Calendar Section */}
      <section className="calendar-section">
        <div className="container-narrow">
          <h1>Book Your <span>Website Demo Call</span></h1>
          <p className="sub-heading">
            Select an open date and time slot below to secure your 15-minute screen-share review session. We'll present your custom website draft live.
          </p>

          <div className="calendar-wrapper">
            {/* Embedded Calendar booking iframe (GoHighLevel LeadConnector widget) */}
            <iframe 
              src="https://api.leadconnectorhq.com/widget/booking/4pTjzWX2CBQuAHAa8jYS" 
              className="calendar-frame"
              style={{ width: "100%", border: "none", overflow: "hidden" }}
              scrolling="no" 
              id="4pTjzWX2CBQuAHAa8jYS_1780961439839"
              title="Takeover Website Demo Strategy Calendar"
            />
          </div>

          <div className="benefits-row">
            <div className="benefit-card">
              <div className="benefit-icon">⏱️</div>
              <h3>15 Mins Flat</h3>
              <p>We respect your busy schedule. Quick, clear, and focused entirely on your layout & services.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>No Pitch Tactics</h3>
              <p>No high-pressure sales strategies. This is a visual design review. If you love it, we'll launch it.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎨</div>
              <h3>100% Free Draft</h3>
              <p>We complete your high-fidelity contractor layout from scratch without you paying a single cent upfront.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
