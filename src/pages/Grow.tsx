import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import QualificationBookingBox from "../components/QualificationBookingBox";

export default function Grow() {
  useEffect(() => {
    // Load LeadConnector form embed script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);

    // Scroll to section smoothly if a hash link is clicked
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      const href = anchor ? anchor.getAttribute("href") : null;
      if (href && href.startsWith("#")) {
        e.preventDefault();
        let id = href.slice(1);
        
        // On mobile, if targeting the booking section, scroll directly to the calendar embed
        if (id === "booking" && window.innerWidth <= 768) {
          id = "booking-calendar";
        }

        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetTop = rect.top + scrollTop;
          
          // Deduct sticky bar height on mobile if targeting the calendar
          const offset = id === "booking-calendar" ? 50 : 0;
          
          window.scrollTo({
            top: targetTop - offset,
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener("click", handleHashClick);
    return () => {
      document.removeEventListener("click", handleHashClick);
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
          --green-dark: #16a34a;
          --red: #ef4444;
          --gray-100: #f5f5f5;
          --gray-200: #e5e5e5;
          --gray-500: #737373;
          --gray-700: #404040;
          --gray-900: #171717;
          --section-dark: #111111;
          --section-mid: #1a1a1a;
          
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

        /* UTILITY */
        .grow-page-root .container { max-width: 860px; margin: 0 auto; padding: 0 20px; }
        .grow-page-root .container-narrow { max-width: 680px; margin: 0 auto; padding: 0 20px; }

        /* URGENCY BAR */
        .grow-page-root .urgency-bar {
          background: var(--yellow);
          color: var(--black);
          text-align: center;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          z-index: 9999;
          overflow: hidden;
        }
        .grow-page-root .urgency-content {
          display: inline-block;
        }
        .grow-page-root .urgency-bar a {
          color: var(--black);
          text-decoration: underline;
          font-weight: 700;
        }
        .grow-page-root .urgency-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: var(--red);
          border-radius: 50%;
          margin-right: 6px;
          animation: grow-pulse 1.5s infinite;
          vertical-align: middle;
        }
        @keyframes grow-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        .grow-page-root .urgency-separator {
          margin: 0 10px;
          opacity: 0.3;
          font-weight: normal;
          display: inline-block;
          vertical-align: middle;
        }
        .grow-page-root .urgency-rating {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          vertical-align: middle;
        }
        .grow-page-root .rating-label {
          color: #a60724;
          font-weight: 700;
          text-transform: uppercase;
        }
        .grow-page-root .rating-stars {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        .grow-page-root .rating-stars .star-icon {
          width: 14px;
          height: 14px;
          color: #a60724;
          fill: #a60724;
          display: inline-block;
          vertical-align: middle;
          animation: grow-star-pulse 2s infinite ease-in-out;
        }
        .grow-page-root .rating-count {
          color: #a60724;
          font-weight: 700;
        }
        @keyframes grow-star-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        @media (max-width: 1024px) {
          .grow-page-root .urgency-bar {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 9999 !important;
            padding: 10px 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .grow-page-root .urgency-content {
            white-space: nowrap;
            display: inline-block;
            will-change: transform;
            animation: grow-urgency-marquee 18s linear infinite;
          }
        }

        @keyframes grow-urgency-marquee {
          0% { transform: translate3d(100vw, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }

        /* HERO */
        .grow-page-root .hero {
          background: var(--black);
          padding: 64px 20px 48px;
          text-align: center;
        }
        .grow-page-root .hero-eyebrow {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--yellow);
          margin-bottom: 20px;
          border: 1px solid var(--yellow);
          padding: 4px 14px;
          border-radius: 2px;
        }
        .grow-page-root .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px, 8vw, 76px);
          line-height: 1.0;
          color: var(--white);
          letter-spacing: 0.01em;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .grow-page-root .hero h1 span { color: var(--yellow); }
        .grow-page-root .hero-sub {
          font-size: clamp(17px, 2.5vw, 20px);
          color: #cccccc;
          max-width: 580px;
          margin: 0 auto 36px;
          line-height: 1.5;
        }
        .grow-page-root .hero-sub strong { color: var(--white); }

        /* GHL EMBED SECTION (REPLACED VSL) */
        .grow-page-root .ghl-hero-section {
          background: var(--black);
          padding: 0 20px 48px;
          text-align: center;
        }
        .grow-page-root .ghl-hero-card {
          max-width: 760px;
          margin: 0 auto;
          background: #141414;
          border: 1px solid #2e2e2e;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7);
        }
        .grow-page-root .ghl-hero-header {
          padding: 20px 24px;
          background: #191919;
          border-bottom: 1px solid #282828;
          text-align: center;
        }
        .grow-page-root .ghl-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--yellow);
          background: rgba(245, 197, 24, 0.12);
          border: 1px solid rgba(245, 197, 24, 0.3);
          padding: 4px 12px;
          border-radius: 3px;
          margin-bottom: 8px;
        }
        .grow-page-root .ghl-hero-header h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 3.5vw, 32px);
          letter-spacing: 0.02em;
          color: var(--white);
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .grow-page-root .ghl-hero-header p {
          font-size: 14px;
          color: #aaa;
          max-width: 540px;
          margin: 0 auto;
        }
        .grow-page-root .ghl-hero-embed {
          background: #111;
          padding: 12px 10px 0;
          min-height: 580px;
        }
        .grow-page-root .ghl-hero-embed iframe {
          width: 100%;
          min-height: 580px;
          border: none;
          display: block;
        }

        /* FIRST CTA */
        .grow-page-root .first-cta { background: var(--black); padding: 8px 20px 56px; text-align: center; }
        .grow-page-root .cta-desc {
          font-size: 16px;
          color: #aaa;
          margin-bottom: 20px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .grow-page-root .cta-desc strong { color: var(--white); }
        .grow-page-root .btn-primary {
          display: inline-block;
          background: var(--green);
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          padding: 18px 42px;
          border-radius: 3px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.1s;
          border: none;
          cursor: pointer;
        }
        .grow-page-root .btn-primary:hover { background: var(--green-dark); transform: translateY(-1px); }
        .grow-page-root .btn-primary:active { transform: translateY(0); }
        .grow-page-root .btn-subtext {
          font-size: 13px;
          color: var(--gray-500);
          margin-top: 10px;
        }

        /* SOCIAL PROOF SECTION */
        .grow-page-root .social-proof { background: var(--section-dark); padding: 56px 20px; text-align: center; }
        .grow-page-root .section-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gray-500);
          margin-bottom: 28px;
        }

        /* VIDEO TESTIMONIAL */
        .grow-page-root .video-testimonial-wrap {
          max-width: 540px;
          margin: 0 auto 36px;
        }
        .grow-page-root .video-testimonial {
          aspect-ratio: 9/16;
          max-height: 460px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          color: #666;
          font-size: 13px;
          margin: 0 auto;
          cursor: pointer;
          max-width: 260px;
        }

        /* REVIEW CARDS */
        .grow-page-root .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          max-width: 860px;
          margin: 0 auto 24px;
        }
        .grow-page-root .review-card {
          background: #1c1c1c;
          border: 1px solid #2e2e2e;
          border-radius: 4px;
          padding: 20px;
          text-align: left;
        }
        .grow-page-root .review-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .grow-page-root .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2e2e2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 600;
          color: var(--yellow);
          flex-shrink: 0;
        }
        .grow-page-root .reviewer-name { font-size: 14px; font-weight: 600; color: var(--white); }
        .grow-page-root .reviewer-biz { font-size: 12px; color: var(--gray-500); margin-top: 1px; }
        .grow-page-root .stars { color: var(--yellow); font-size: 14px; letter-spacing: 1px; margin-bottom: 8px; }
        .grow-page-root .review-text { font-size: 14px; color: #bbb; line-height: 1.55; }
        .grow-page-root .review-highlight { color: var(--white); font-weight: 500; }

        .grow-page-root .disclaimer {
          font-size: 11px;
          color: var(--gray-500);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* WHAT YOU GET */
        .grow-page-root .what-you-get {
          background: var(--section-mid);
          padding: 64px 20px;
        }
        .grow-page-root .section-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .grow-page-root .section-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(34px, 6vw, 56px);
          letter-spacing: 0.02em;
          color: var(--white);
          text-transform: uppercase;
          line-height: 1.1;
        }
        .grow-page-root .section-header h2 span { color: var(--yellow); }
        .grow-page-root .section-header p {
          font-size: 17px;
          color: #aaa;
          margin-top: 12px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .grow-page-root .deliverables { display: flex; flex-direction: column; gap: 32px; max-width: 820px; margin: 0 auto; }
        .grow-page-root .deliverable {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 20px;
          align-items: start;
        }
        .grow-page-root .deliverable-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: var(--yellow);
          line-height: 1;
          text-align: center;
          padding-top: 2px;
        }
        .grow-page-root .deliverable-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .grow-page-root .deliverable-content p {
          font-size: 15px;
          color: #aaa;
          line-height: 1.6;
        }
        .grow-page-root .deliverable-content p strong { color: var(--white); }
        .grow-page-root .deliverable-tag {
          display: inline-block;
          background: rgba(245, 197, 24, 0.12);
          color: var(--yellow);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 2px;
          margin-bottom: 8px;
          border: 1px solid rgba(245, 197, 24, 0.25);
        }
        .grow-page-root .divider {
          border: none;
          border-top: 1px solid #2a2a2a;
          max-width: 820px;
          margin: 0 auto;
        }

        /* SECOND CTA */
        .grow-page-root .second-cta {
          background: var(--section-mid);
          padding: 16px 20px 64px;
          text-align: center;
        }

        /* MORE REVIEWS */
        .grow-page-root .more-reviews { background: var(--black); padding: 64px 20px; }

        /* RISK REVERSAL */
        .grow-page-root .risk-reversal {
          background: #0f1a12;
          border: 1px solid #1e3a22;
          border-radius: 4px;
          max-width: 680px;
          margin: 0 auto 56px;
          padding: 32px 40px;
          text-align: center;
        }
        .grow-page-root .risk-icon { font-size: 40px; margin-bottom: 12px; }
        .grow-page-root .risk-reversal h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: var(--green);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .grow-page-root .risk-reversal p { font-size: 15px; color: #aaa; line-height: 1.6; }
        .grow-page-root .risk-reversal p strong { color: var(--white); }

        /* BOOKING SECTION */
        .grow-page-root .booking-section { background: var(--section-dark); padding: 64px 20px; }
        .grow-page-root .booking-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .grow-page-root .booking-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 5vw, 50px);
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
        }
        .grow-page-root .booking-header p { font-size: 16px; color: #aaa; max-width: 500px; margin: 0 auto; }

        .grow-page-root .call-promises {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          max-width: 720px;
          margin: 0 auto 36px;
        }
        .grow-page-root .call-promise {
          background: #1c1c1c;
          border: 1px solid #2e2e2e;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
        }
        .grow-page-root .call-promise-icon { font-size: 26px; margin-bottom: 8px; }
        .grow-page-root .call-promise h4 { font-size: 14px; font-weight: 700; color: var(--white); margin-bottom: 4px; }
        .grow-page-root .call-promise p { font-size: 13px; color: #888; line-height: 1.4; }

        .grow-page-root .calendar-embed {
          background: #1a1a1a;
          border: 1px solid #2e2e2e;
          border-radius: 4px;
          max-width: 720px;
          margin: 0 auto;
          overflow: hidden;
          min-height: 600px;
        }
        .grow-page-root .calendar-embed iframe {
          width: 100%;
          min-height: 620px;
          border: none;
          display: block;
        }
        .grow-page-root .calendar-label {
          padding: 20px 24px 16px;
          border-bottom: 1px solid #2a2a2a;
        }
        .grow-page-root .calendar-label-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 4px;
        }
        .grow-page-root .calendar-label-sub { font-size: 13px; color: #888; }

        /* FOOTER */
        .grow-page-root footer {
          background: var(--black);
          border-top: 1px solid #1e1e1e;
          padding: 32px 20px;
          text-align: center;
        }
        .grow-page-root footer p { font-size: 13px; color: var(--gray-500); line-height: 1.7; }
        .grow-page-root footer a { color: #888; text-decoration: underline; }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .grow-page-root .hero { padding: 40px 16px 28px; }
          .grow-page-root .ghl-hero-section {
            padding: 0 6px 36px;
          }
          .grow-page-root .ghl-hero-section .container {
            padding: 0;
            max-width: 100%;
          }
          .grow-page-root .ghl-hero-card {
            border-radius: 6px;
            margin: 0;
            width: 100%;
          }
          .grow-page-root .deliverable { grid-template-columns: 44px 1fr; gap: 14px; }
          .grow-page-root .deliverable-num { font-size: 38px; }
          .grow-page-root .risk-reversal { padding: 24px 20px; }
          .grow-page-root .call-promises { grid-template-columns: 1fr; }
        }
      ` }} />

      {/* URGENCY BAR */}
      <div className="urgency-bar">
        <div className="urgency-content">
          <span className="urgency-dot"></span>
          <strong>LIMITED SPOTS:</strong> We only take on 5 new contractors per month to ensure quality. <a href="#booking">Check availability →</a>
          <span className="urgency-separator">|</span>
          <span className="urgency-rating">
            <span className="rating-label">RATED 4.9</span>
            <span className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="star-icon" 
                  style={{ animationDelay: `${i * 150}ms` }} 
                />
              ))}
            </span>
            <span className="rating-count">(34)</span>
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container-narrow">
          <div className="hero-eyebrow">For established hardscape & outdoor living space contractors</div>
          <h1>Land more hardscaping jobs - <br /><span>or you don't pay</span></h1>
          <p className="hero-sub">
            Exclusive leads in your service area, never resold. Stop chasing referrals and start running a predictable business with our growth system.
          </p>
        </div>
      </section>

      {/* GOHIGHLEVEL FORM / CALENDAR INTEGRATION WITH CONDITIONAL QUALIFICATION */}
      <section className="ghl-hero-section" id="booking">
        <div className="container">
          <div className="ghl-hero-card">
            <QualificationBookingBox variant="hero" formId="IqILvNxBfXxI0NVdJu5q" />
          </div>
        </div>
      </section>

      {/* FIRST CTA */}
      <section className="first-cta">
        <div className="container-narrow">
          <p className="cta-desc">
            We drive high-ticket paver, patio, retaining wall, and outdoor living space leads directly through <strong>high-converting Meta and Google ads</strong>.
          </p>
          <a href="#booking" className="btn-primary">Claim Your Exclusive Service Area</a>
          <p className="btn-subtext">100% Exclusive Leads · Territory Protected · Zero Risk Guarantee</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-proof">
        <div className="container">
          <p className="section-label">What hardscape contractors are saying</p>

          {/* Google Review Cards */}
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">WH</div>
                <div>
                  <div className="reviewer-name">Walter Hernandez</div>
                  <div className="reviewer-biz">Hardscaping & Masonry</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I'm very impressed with how quickly the leads started coming in.</span> The quality of homeowners looking for patio and retaining wall estimates has been incredible. Fast communication and zero shared lead headaches.
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">AP</div>
                <div>
                  <div className="reviewer-name">Adam Potras</div>
                  <div className="reviewer-biz">Paver Patios & Outdoor Living</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">Takeover Marketing dialed in our Meta ads and the system actually works.</span> I was skeptical about social media ads for hardscaping, but we landed two $20k+ outdoor living jobs in our first month.
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">LB</div>
                <div>
                  <div className="reviewer-name">Louis Barbella</div>
                  <div className="reviewer-biz">Outdoor Living Contractor</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I found Takeover Marketing while sick of burning cash on Angi.</span> David got right to work launching our Meta and Google ads. We're booked out 6 weeks with great clients. Highly recommend.
              </p>
            </div>
          </div>

          <p className="disclaimer">Individual results may vary based on business size, market, and how leads are handled. Results shown above are from real clients and are not a guarantee of any specific outcome.</p>
        </div>
      </section>

      {/* HOW WE GET YOU MORE JOBS */}
      <section className="what-you-get">
        <div className="container">
          <div className="section-header">
            <h2>How We Get You <span>More Jobs</span></h2>
            <p>Everything your hardscape & outdoor living business needs to scale with high-ticket projects — done for you.</p>
          </div>

          <div className="deliverables">

            <div className="deliverable">
              <div className="deliverable-num">1</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Meta & Google Ads</div>
                <h3>Targeted Ad Campaigns for High-Ticket Hardscape Jobs</h3>
                <p>We deploy proven Facebook, Instagram, and Google ad campaigns dialed in specifically for <strong>paver patios, retaining walls, walkways, fire pits, and luxury outdoor living spaces</strong>. We place your brand directly in front of homeowners actively planning exterior renovations.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">2</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">100% Exclusive</div>
                <h3>Protected Service Area — Zero Shared Leads</h3>
                <p>Every inquiry generated is <strong>100% exclusive to your business</strong>. We never resell your leads to 4 other local competitors like Angi or HomeAdvisor. When a homeowner submits a request, they deal solely with you.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">3</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Pre-Qualified</div>
                <h3>Homeowner Pre-Qualification</h3>
                <p>We capture <strong>project type, scope, timeframe, and budget</strong> upfront so you only talk to high-intent homeowners who are pre-qualified and ready to purchase instead of just price shopping.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">4</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Performance Guarantee</div>
                <h3>Land More Hardscaping Jobs — Or You Don't Pay</h3>
                <p>We believe in performance-driven partnerships. <strong>If we don't deliver the qualified hardscape opportunities we promise, you don't pay.</strong> We assume the risk so you can focus on building.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="second-cta">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <a href="#booking" className="btn-primary">Claim Your Exclusive Service Area Now</a>
          <p className="btn-subtext">Check available zip codes and see how many qualified homeowners are searching in your area.</p>
        </div>
      </section>

      {/* MORE REVIEWS */}
      <section className="more-reviews">
        <div className="container">
          <p className="section-label" style={{ textAlign: "center", marginBottom: "28px" }}>More from hardscape & outdoor living pros</p>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ marginBottom: "14px" }}>
                "<span className="review-highlight">Before working with Takeover, I was burning time chasing shared leads.</span> Their Meta ads bring in homeowners with real budgets who want high-end pavers. Already booked 3 large patio projects this month."
              </p>
              <div className="reviewer-name" style={{ fontSize: "13px" }}>Mike T. — Hardscape & Pavers, Florida</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ marginBottom: "14px" }}>
                "<span className="review-highlight">I tried running Facebook and Google ads on my own and got junk.</span> David’s campaigns generate real homeowner appointments directly on my calendar. Completely game-changing for our crew."
              </p>
              <div className="reviewer-name" style={{ fontSize: "13px" }}>James R. — Outdoor Living & Masonry, Ohio</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ marginBottom: "14px" }}>
                "<span className="review-highlight">The automated text response alone saved multiple five-figure jobs.</span> I'm operating an excavator all day and can't answer calls. The system books them while I work."
              </p>
              <div className="reviewer-name" style={{ fontSize: "13px" }}>Tony G. — Retaining Walls & Hardscaping, Georgia</div>
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer>
        <p>
          © 2026 Takeover Marketing LLC. All rights reserved.<br />
          <Link to="/privacy-policy">Privacy Policy</Link> · <Link to="/terms-of-use">Terms of Use</Link>
        </p>
      </footer>
    </div>
  );
}
