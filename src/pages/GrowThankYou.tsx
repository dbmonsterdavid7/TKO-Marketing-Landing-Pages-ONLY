import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, MessageSquare, ArrowLeft } from "lucide-react";

export default function GrowThankYou() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
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
          --gray-700: #404040;
          --gray-900: #171717;
          --section-dark: #111111;
          --section-mid: #1a1a1a;
          
          font-family: 'DM Sans', sans-serif;
          background-color: var(--black);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='68' height='68' viewBox='0 0 60 60' fill='none' stroke='rgba(255,255,255,0.075)' stroke-width='0.85'%3E%3Cpath d='M0 0L45 45M30 0L60 30M45 15L60 0M15 15L30 0M0 30L15 45M0 60L30 30M30 60L60 30'/%3E%3C/svg%3E");
          background-repeat: repeat;
          color: var(--white);
          font-size: 16px;
          line-height: 1.6;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .grow-page-root * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }

        .grow-page-root .container-narrow { 
          max-width: 680px; 
          margin: 0 auto; 
          padding: 0 20px; 
          width: 100%;
        }

        /* HEADER / NAVIGATION */
        .grow-page-root .header-minimal {
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(8px);
        }

        .grow-page-root .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 0.05em;
          color: var(--white);
          text-decoration: none;
          text-transform: uppercase;
        }

        .grow-page-root .logo span {
          color: var(--yellow);
        }

        .grow-page-root .back-home-link {
          font-size: 13.5px;
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
        .grow-page-root .thank-you-section {
          padding: 56px 0 80px;
          text-align: center;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .grow-page-root .thank-you-section h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(38px, 6.5vw, 64px);
          line-height: 1.05;
          color: var(--white);
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 14px;
          text-align: center;
        }

        .grow-page-root .thank-you-section h1 span {
          color: var(--yellow);
        }

        .grow-page-root .sub-heading {
          font-size: clamp(15px, 2.2vw, 18px);
          color: #cccccc;
          max-width: 540px;
          margin: 0 auto 32px;
          line-height: 1.5;
          text-align: center;
        }

        /* CONFIRMATION CARD (CENTERED) */
        .grow-page-root .confirmation-card {
          text-align: center;
          background: #151515;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 34px 28px;
          margin: 0 auto 28px;
          max-width: 620px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .grow-page-root .confirmation-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.35);
          color: #4ade80;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 4px;
          margin: 0 auto 18px;
        }

        .grow-page-root .confirmation-message {
          font-size: 15.5px;
          color: #e5e5e5;
          line-height: 1.6;
          margin: 0 auto 20px;
          max-width: 520px;
          text-align: center;
        }

        .grow-page-root .confirmation-message strong {
          color: var(--white);
          font-weight: 600;
        }

        .grow-page-root .channels-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin: 20px auto;
          max-width: 520px;
          padding: 16px 18px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          text-align: left;
        }

        .grow-page-root .channel-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .grow-page-root .channel-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(245, 197, 24, 0.12);
          color: var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .grow-page-root .channel-text h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 2px;
        }

        .grow-page-root .channel-text p {
          font-size: 12.5px;
          color: var(--gray-400);
          line-height: 1.4;
        }

        /* SUPPORT / QUESTIONS BOX */
        .grow-page-root .support-box {
          background: rgba(245, 197, 24, 0.04);
          border: 1.5px dashed rgba(245, 197, 24, 0.3);
          border-radius: 6px;
          padding: 20px 22px;
          margin: 22px auto 0;
          max-width: 520px;
          text-align: center;
        }

        .grow-page-root .support-box p {
          font-size: 13.5px;
          color: #cccccc;
          line-height: 1.5;
        }

        .grow-page-root .support-box strong {
          color: var(--yellow);
          font-weight: 600;
        }

        .grow-page-root .return-link-wrap {
          margin-top: 24px;
          text-align: center;
        }

        .grow-page-root .return-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--gray-400);
          text-decoration: none;
          font-size: 13.5px;
          transition: color 0.2s ease;
        }

        .grow-page-root .return-link:hover {
          color: var(--white);
        }

        /* FOOTER */
        .grow-page-root footer {
          background: transparent;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 24px 20px;
          text-align: center;
        }

        .grow-page-root footer p { 
          font-size: 13px; 
          color: var(--gray-500); 
          line-height: 1.7; 
        }

        .grow-page-root footer a { 
          color: #888; 
          text-decoration: underline; 
        }

        /* MOBILE ADJUSTMENTS */
        @media (max-width: 640px) {
          .grow-page-root .header-minimal {
            padding: 12px 16px;
          }
          .grow-page-root .logo {
            font-size: 19px;
          }
          .grow-page-root .back-home-link {
            font-size: 12px;
            gap: 4px;
          }
          .grow-page-root .thank-you-section {
            padding: 28px 0 44px;
            display: block;
          }
          .grow-page-root .sub-heading {
            font-size: 14px;
            line-height: 1.45;
            margin: 0 auto 22px;
            padding: 0 4px;
          }
          .grow-page-root .confirmation-card {
            padding: 22px 16px;
            margin: 0 auto 20px;
            text-align: center;
          }
          .grow-page-root .confirmation-badge {
            font-size: 11px;
            padding: 5px 12px;
            margin: 0 auto 14px;
          }
          .grow-page-root .confirmation-message {
            display: none !important;
          }
          .grow-page-root .channels-strip {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 12px 14px;
            margin: 16px auto;
            text-align: left;
          }
          .grow-page-root .channel-item {
            gap: 10px;
          }
          .grow-page-root .channel-icon {
            width: 28px;
            height: 28px;
          }
          .grow-page-root .channel-text h4 {
            font-size: 13px;
          }
          .grow-page-root .channel-text p {
            font-size: 12px;
            line-height: 1.35;
          }
          .grow-page-root .support-box {
            padding: 15px 12px;
            margin: 18px auto 0;
          }
          .grow-page-root .support-box p {
            font-size: 12px;
            line-height: 1.45;
          }
          .grow-page-root .return-link-wrap {
            margin-top: 20px;
          }
          .grow-page-root .return-link {
            font-size: 12.5px;
          }
          .grow-page-root footer {
            padding: 18px 16px;
          }
          .grow-page-root footer p {
            font-size: 12px;
          }
        }
      ` }} />

      {/* Minimal Header */}
      <header className="header-minimal">
        <Link to="/grow" className="logo">
          Takeover <span>Marketing</span>
        </Link>
        <Link to="/grow" className="back-home-link">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Grow Page</span>
        </Link>
      </header>

      {/* Thank you content */}
      <section className="thank-you-section">
        <div className="container-narrow">
          
          <h1>Thank You For <span>Booking Your Call!</span></h1>
          <p className="sub-heading">
            Your Discovery Call is locked in on our calendar. We look forward to speaking with you.
          </p>

          <div className="confirmation-card">
            <div className="confirmation-badge">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Calendar Invitation Sent</span>
            </div>

            <p className="confirmation-message hidden md:block">
              <strong>You will be receiving a text and email confirming that your appointment has been booked.</strong>
            </p>

            <div className="channels-strip">
              <div className="channel-item">
                <div className="channel-icon">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="channel-text">
                  <h4>SMS Confirmation</h4>
                  <p>Check your mobile phone for immediate booking details & reminders.</p>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="channel-text">
                  <h4>Email Calendar Invite</h4>
                  <p>Includes meeting link and one-click calendar sync (Google / Outlook).</p>
                </div>
              </div>
            </div>

            {/* Reschedule or Immediate Questions Box */}
            <div className="support-box">
              <p>
                Need to reschedule or have immediate questions? Reach out to us at <strong>contact@tkovermarketing.com</strong> and we'll get you sorted out!
              </p>
            </div>
          </div>

          <div className="return-link-wrap">
            <Link to="/grow" className="return-link">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Takeover Marketing</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 Takeover Marketing LLC. All rights reserved.<br />
          <Link to="/privacy-policy">Privacy Policy</Link> · <Link to="/terms-of-use">Terms of Use</Link>
        </p>
      </footer>
    </div>
  );
}
