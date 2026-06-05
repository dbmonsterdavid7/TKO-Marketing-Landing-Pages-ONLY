import { useEffect } from "react";
import { Link } from "react-router-dom";

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
          max-width: 680px; 
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
        .grow-page-root .thank-you-section {
          padding: 60px 0 100px;
          text-align: center;
        }

        .grow-page-root .success-icon-wrap {
          margin-bottom: 24px;
          display: inline-block;
          position: relative;
        }

        .grow-page-root .success-icon {
          width: 80px;
          height: 80px;
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid var(--green);
          color: var(--green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
          border-radius: 50%;
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .grow-page-root .thank-you-section h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 8vw, 76px);
          line-height: 1.0;
          color: var(--white);
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .grow-page-root .thank-you-section h1 span {
          color: var(--yellow);
        }

        .grow-page-root .sub-heading {
          font-size: clamp(16px, 2.5vw, 19px);
          color: #cccccc;
          max-width: 580px;
          margin: 0 auto 48px;
          line-height: 1.5;
        }

        /* STEP CARDS */
        .grow-page-root .steps-container {
          text-align: left;
          background: var(--section-dark);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .grow-page-root .steps-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 0.05em;
          color: var(--white);
          margin-bottom: 24px;
          text-transform: uppercase;
          border-bottom: 1.5px solid var(--yellow);
          display: inline-block;
          padding-bottom: 4px;
        }

        .grow-page-root .step-item {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }

        .grow-page-root .step-item:last-child {
          margin-bottom: 0;
        }

        .grow-page-root .step-num {
          background: var(--yellow);
          color: var(--black);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: bold;
        }

        .grow-page-root .step-content h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--white);
        }

        .grow-page-root .step-content p {
          font-size: 15px;
          color: #b3b3b3;
          line-height: 1.5;
        }

        .grow-page-root .step-content p strong {
          color: var(--white);
        }

        /* CONTACT / EXTRA INFO */
        .grow-page-root .support-box {
          background: rgba(245, 197, 24, 0.03);
          border: 1.5px dashed rgba(245, 197, 24, 0.2);
          border-radius: 6px;
          padding: 24px;
          margin-top: 30px;
          text-align: center;
        }

        .grow-page-root .support-box p {
          font-size: 14px;
          color: #cccccc;
        }

        .grow-page-root .support-box strong {
          color: var(--yellow);
        }

        /* BUTTONS */
        .grow-page-root .btn-accent {
          display: inline-block;
          background: var(--yellow);
          color: var(--black);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 14px 36px;
          border-radius: 3px;
          text-decoration: none;
          transition: transform 0.2s ease, background-color 0.2s ease;
          border: none;
          cursor: pointer;
          margin-top: 20px;
        }

        .grow-page-root .btn-accent:hover {
          background: var(--yellow-dark);
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .grow-page-root .steps-container {
            padding: 24px 16px;
          }
          .grow-page-root .step-item {
            gap: 12px;
          }
        }
      ` }} />

      {/* Minimal Header */}
      <header className="header-minimal">
        <Link to="/" className="logo">
          Takeover <span>Marketing</span>
        </Link>
        <Link to="/grow" className="back-home-link">
          ← Back to Grow Page
        </Link>
      </header>

      {/* Thank you content */}
      <section className="thank-you-section">
        <div className="container-narrow">
          
          <div className="success-icon-wrap">
            <div className="success-icon">✓</div>
          </div>

          <h1>Call Is <span>Confirmed!</span></h1>
          <p className="sub-heading">
            Thank you for booking your free 15-minute Contractor Growth call. We're excited to show you exactly how we can set up your free website and automated system.
          </p>

          <div className="steps-container">
            <h2 className="steps-title">What Happens Next?</h2>
            
            <div className="step-item">
              <div className="step-num">1</div>
              <div className="step-content">
                <h3>Check Your Inbox & SMS</h3>
                <p>
                  You will receive an automatic confirmation email and text message with the booking details and the direct **Zoom** video calendar link.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-content">
                <h3>We Go to Work (Before the Call)</h3>
                <p>
                  Before our call, our team looks up your business name and reviews your current online presence. **We mock up a custom website structure** with your branding completely free so we can show you exactly what we'll build for you on our screen.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-content">
                <h3>Be Live and Ready on Time</h3>
                <p>
                  Because our slots are open to only **5 new contractors each month** to maintain quality, please respect this time slot. Have a computer or mobile phone ready so you can view our call clearly.
                </p>
              </div>
            </div>

            <div className="support-box">
              <p>
                Need to reschedule or have immediate questions? Reach out to us at <strong>contact@tkovermarketing.com</strong> and we'll get you sorted out!
              </p>
            </div>
          </div>

          <Link to="/grow" className="btn-accent">
            Return to Grow Page
          </Link>
        </div>
      </section>
    </div>
  );
}
