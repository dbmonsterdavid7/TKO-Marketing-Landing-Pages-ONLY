import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function GrowCalendar() {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Load form embed script dynamically
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
          max-width: 760px; 
          margin: 0 auto; 
          padding: 0 20px; 
        }

        /* HEADER / NAVIGATION MOCK FOR FLOW */
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

        /* CONTENT SECTION */
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
          max-width: 600px;
          margin: 0 auto 36px;
          line-height: 1.5;
        }

        /* CALENDAR CONTAINER */
        .grow-page-root .calendar-wrapper {
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px;
          margin-bottom: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .grow-page-root .calendar-header-info {
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          text-align: left;
        }

        .grow-page-root .calendar-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 0.03em;
          color: var(--white);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .grow-page-root .calendar-desc {
          font-size: 14px;
          color: var(--gray-400);
        }

        .grow-page-root .calendar-frame {
          width: 100%;
          min-height: 600px;
          border: none;
          display: block;
          border-radius: 4px;
          background: #ffffff; /* Calender widget fits well with light inner context or standard transparency */
          color-scheme: light;
        }

        /* PROMISES BANNER */
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
        }
      ` }} />

      {/* Minimal Header */}
      <header className="header-minimal">
        <Link to="/grow" className="logo">
          Takeover <span>Marketing</span>
        </Link>
        <Link to="/grow" className="back-home-link">
          ← Back to Grow Page
        </Link>
      </header>

      {/* Main Form Section */}
      <section className="calendar-section">
        <div className="container-narrow">
          <h1>Book Your <span>Growth Call</span></h1>
          <p className="sub-heading">
            Select a date and time slot below to schedule your free 15-minute consultation. We'll map out your custom setup live.
          </p>

          <div className="calendar-wrapper">
            <div className="calendar-header-info">
              <div className="calendar-title">Free Contractor Growth Call — 15 Mins</div>
              <div className="calendar-desc">Takeover Marketing · Select your timezone and visual slot below</div>
            </div>
            
            {/* Embedded Calendar booking iframe */}
            <iframe 
              src="https://api.leadconnectorhq.com/widget/booking/sSJG2lLmJamOBUgLWT3w" 
              className="calendar-frame"
              scrolling="no" 
              id="sSJG2lLmJamOBUgLWT3w_1780640111067"
              title="Takeover Growth Strategy Booking Calendar"
            />
          </div>

          <div className="benefits-row">
            <div className="benefit-card">
              <div className="benefit-icon">⏱️</div>
              <h3>15 Mins Flat</h3>
              <p>We respect your time. Concise, direct, and focused completely on high impact action items.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Zero Pressure</h3>
              <p>No sales pitching or trickery. If it's a great fit, we move forward. If not, no worries!</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✨</div>
              <h3>Free Mocks Live</h3>
              <p>We research your business before we meet so we can present custom designs right away.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
