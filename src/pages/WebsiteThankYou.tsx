import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Calendar, Monitor, Sparkles, Smartphone, Mail } from "lucide-react";

export default function WebsiteThankYou() {
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
          background: rgba(245, 197, 24, 0.1);
          border: 2px solid var(--yellow);
          color: var(--yellow);
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
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .grow-page-root .step-content h3 svg {
          color: var(--yellow);
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
          line-height: 1.5;
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
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          border: none;
          cursor: pointer;
          margin-top: 20px;
        }

        .grow-page-root .btn-accent:hover {
          background: var(--yellow-dark);
          transform: translateY(-2px);
        }

        .grow-page-root .btn-pulse {
          animation: pulse-yellow 2s infinite;
        }

        @keyframes pulse-yellow {
          0% {
            box-shadow: 0 0 0 0 rgba(245, 197, 24, 0.7);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(245, 197, 24, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(245, 197, 24, 0);
          }
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
        <Link to="/website" className="logo">
          Takeover <span>Marketing</span>
        </Link>
        <Link to="/website" className="back-home-link">
          <ArrowLeft size={16} /> Back to Website Page
        </Link>
      </header>

      {/* Thank you content */}
      <section className="thank-you-section">
        <div className="container-narrow">
          
          <div className="success-icon-wrap">
            <div className="success-icon">
              <CheckCircle size={40} strokeWidth={2} />
            </div>
          </div>

          <h1>Request <span>Received!</span></h1>
          <p className="sub-heading">
            Awesome! We have received your contractor business details and our design team is officially preparing your custom website layout draft.
          </p>

          <div className="steps-container">
            <h2 className="steps-title">Your Next Steps</h2>
            
            <div className="step-item">
              <div className="step-num">1</div>
              <div className="step-content">
                <h3>
                  <Monitor size={18} />
                  We Build Your Free Website Draft & Text You a Link
                </h3>
                <p>
                  Our team gets straight to work mapping out your specific contractor service categories, local visual showcase, and responsive layouts. First, we will build your new website design draft and <strong>send you a text message with a direct link to your website preview</strong> as well as a calendar link to book your live demo call. All within 3 days.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-content">
                <h3>
                  <Calendar size={18} />
                  Book / Confirm Your Web Demo Call
                </h3>
                <p>
                  Use the calendar link texted to your phone or the scheduler below to lock in a live 15-minute Demo Call. We will meet on screen to walk through your brand new custom-built design together and get your direct feedback.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-content">
                <h3>
                  <Sparkles size={18} />
                  Review, Revise & Approve
                </h3>
                <p>
                  During our quick meeting, we'll review the draft together on our screen. You can point out any text tweaks, project image swaps, or custom revisions you want made.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">4</div>
              <div className="step-content">
                <h3>
                  <Smartphone size={18} />
                  Seamless Live Launch & App Setup
                </h3>
                <p>
                  Once you approve the design and decide to move forward, we launch the finished site on your custom domain <strong>within 24 hours</strong>. We also map your service forms to our companion **Mobile App**, delivering all customer booking messages straight to your cell phone.
                </p>
              </div>
            </div>

            <div className="support-box">
              <p>
                Have questions or need to send brand files/photos early? Reach out to us at <strong>contact@tkovermarketing.com</strong> and our tech team will assist you!
              </p>
            </div>
          </div>

          <Link to="/website-calendar" className="btn-accent btn-pulse text-center inline-block">
            Schedule / Confirm Your Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
