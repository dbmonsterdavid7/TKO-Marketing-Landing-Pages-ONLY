import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Phone } from "lucide-react";

export default function Roofing() {
  const [currentMonth, setCurrentMonth] = useState("this month");

  useEffect(() => {
    // Dynamically set current month name for high urgency relevance
    try {
      const monthName = new Date().toLocaleString("default", { month: "long" });
      setCurrentMonth(monthName);
    } catch (e) {
      // fallback
    }

    // Load LeadConnector booking script
    const script3 = document.createElement("script");
    script3.src = "https://link.msgsndr.com/js/form_embed.js";
    script3.async = true;
    script3.type = "text/javascript";
    document.head.appendChild(script3);

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
      if (document.head.contains(script3)) {
        document.head.removeChild(script3);
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
          --gray-500: #a3a3a3;
          --gray-700: #666666;
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
          position: relative;
        }
        .grow-page-root .hero-phone-pulse {
          position: absolute;
          top: 24px;
          right: 24px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(34, 197, 94, 0.12);
          border: 1.5px solid var(--green);
          border-radius: 9999px;
          padding: 10px 18px;
          color: var(--green);
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }
        .grow-page-root .hero-phone-pulse:hover {
          background: var(--green);
          color: var(--black);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
        }
        .grow-page-root .hero-phone-pulse:hover .phone-icon-pulse-glow {
          animation: none;
          opacity: 0;
        }
        .grow-page-root .phone-icon-pulse-circle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }
        .grow-page-root .phone-icon-pulse-glow {
          position: absolute;
          width: 32px;
          height: 32px;
          background: rgba(34, 197, 94, 0.45);
          border-radius: 50%;
          animation: green-pulse-glow-anim 2s infinite;
        }
        @keyframes green-pulse-glow-anim {
          0% {
            transform: scale(0.6);
            opacity: 1;
          }
          100% {
            transform: scale(1.9);
            opacity: 0;
          }
        }
        @media (max-width: 600px) {
          .grow-page-root .hero {
            padding-top: 96px !important;
          }
          .grow-page-root .hero-phone-pulse {
            top: 20px;
            right: 50%;
            transform: translateX(50%);
          }
          .grow-page-root .hero-phone-pulse:hover {
            transform: translateX(50%) translateY(-2px) scale(1.05);
          }
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
          font-size: clamp(40px, 8vw, 76px);
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

        /* ADS HEADER SECTION */
        .grow-page-root .gallery-section {
          background: var(--black);
          padding: 48px 20px 32px;
          text-align: center;
        }
        .grow-page-root .gallery-header {
          margin-bottom: 0px;
        }
        .grow-page-root .gallery-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 6vw, 48px);
          color: var(--white);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .grow-page-root .gallery-header h2 span {
          color: var(--yellow);
        }
        .grow-page-root .gallery-header p {
          color: var(--gray-500);
          font-size: 15px;
          margin-top: 8px;
        }

        /* FIRST CTA */
        .grow-page-root .first-cta {
          background: var(--section-dark);
          padding: 56px 20px;
          text-align: center;
          border-top: 1px solid #1c1c1c;
          border-bottom: 1px solid #1c1c1c;
        }
        .grow-page-root .cta-desc {
          font-size: 18px;
          color: #aaa;
          max-width: 600px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }
        .grow-page-root .cta-desc strong { color: var(--white); }
        .grow-page-root .btn-primary {
          display: inline-block;
          background: var(--yellow);
          color: var(--black);
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          padding: 16px 36px;
          border-radius: 3px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.1s, box-shadow 0.3s ease;
          border: none;
          cursor: pointer;
          animation: yellow-glow-pulse 2.5s infinite ease-in-out;
        }
        .grow-page-root .btn-primary:hover { 
          background: var(--yellow-dark); 
          transform: translateY(-1px); 
          box-shadow: 0 0 24px rgba(245, 197, 24, 0.7); 
        }
        .grow-page-root .btn-primary:active { transform: translateY(0); }

        @keyframes yellow-glow-pulse {
          0% {
            box-shadow: 0 0 4px rgba(245, 197, 24, 0.2);
          }
          50% {
            box-shadow: 0 0 18px rgba(245, 197, 24, 0.6);
          }
          100% {
            box-shadow: 0 0 4px rgba(245, 197, 24, 0.2);
          }
        }
        .grow-page-root .btn-subtext {
          font-size: 13px;
          color: var(--gray-500);
          margin-top: 10px;
          font-weight: 500;
        }

        /* SOCIAL PROOF / REVIEWS */
        .grow-page-root .social-proof {
          background: var(--black);
          padding: 64px 20px;
        }
        .grow-page-root .section-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--yellow);
          text-align: center;
          margin-bottom: 32px;
        }
        .grow-page-root .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 860px;
          margin: 0 auto 24px;
        }
        @media (max-width: 768px) {
          .grow-page-root .reviews-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 14px !important;
            padding: 8px 16px 20px !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
            width: calc(100% + 32px) !important;
            scroll-behavior: smooth !important;
            scrollbar-width: none !important;
          }
          .grow-page-root .reviews-grid::-webkit-scrollbar {
            display: none !important;
          }
          .grow-page-root .review-card {
            flex: 0 0 280px !important;
            scroll-snap-align: center !important;
            margin-bottom: 0 !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4) !important;
          }
          .grow-page-root .reviews-mobile-hint {
            display: block !important;
            font-size: 11px;
            color: var(--yellow);
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-align: center;
            margin-top: -8px;
            margin-bottom: 24px;
            opacity: 0.82;
            font-weight: 700;
          }

          /* CALL PROMISES CAROUSEL FOR MOBILE */
          .grow-page-root .call-promises {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 14px !important;
            padding: 8px 16px 20px !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
            width: calc(100% + 32px) !important;
            scroll-behavior: smooth !important;
            scrollbar-width: none !important;
          }
          .grow-page-root .call-promises::-webkit-scrollbar {
            display: none !important;
          }
          .grow-page-root .call-promise {
            flex: 0 0 250px !important;
            scroll-snap-align: center !important;
            margin-bottom: 0 !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4) !important;
          }
          .grow-page-root .call-promises-mobile-hint {
            display: block !important;
            font-size: 11px;
            color: var(--yellow);
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-align: center;
            margin-top: -20px;
            margin-bottom: 30px;
            opacity: 0.82;
            font-weight: 700;
          }
        }
        @media (min-width: 769px) {
          .grow-page-root .reviews-mobile-hint {
            display: none !important;
          }
          .grow-page-root .call-promises-mobile-hint {
            display: none !important;
          }
        }
        .grow-page-root .review-card {
          background: #1c1c1c;
          border: 1px solid #2e2e2e;
          border-radius: 4px;
          padding: 24px;
          position: relative;
        }
        .grow-page-root .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .grow-page-root .reviewer-avatar {
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--yellow);
          color: var(--black);
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .grow-page-root .reviewer-name { font-size: 14px; font-weight: 700; color: var(--white); }
        .grow-page-root .reviewer-biz { font-size: 11px; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.05em; }
        .grow-page-root .stars { color: var(--yellow); font-size: 13px; margin-bottom: 10px; letter-spacing: 2px; }
        .grow-page-root .review-text { font-size: 13px; color: #ccc; line-height: 1.5; }
        .grow-page-root .review-highlight { color: var(--white); font-weight: 600; }
        .grow-page-root .disclaimer {
          text-align: center;
          font-size: 11px;
          color: #444;
          max-width: 600px;
          margin: 32px auto 0;
          line-height: 1.5;
        }

        /* WHAT YOU GET */
        .grow-page-root .what-you-get {
          background: var(--section-mid);
          padding: 64px 20px;
          border-top: 1px solid #1c1c1c;
        }
        .grow-page-root .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .grow-page-root .section-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 6vw, 48px);
          color: var(--white);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .grow-page-root .section-header h2 span { color: var(--yellow); }
        .grow-page-root .section-header p { font-size: 15px; color: var(--gray-500); margin-top: 6px; }

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
          min-height: 800px;
        }
        .grow-page-root .calendar-embed iframe {
          width: 100%;
          min-height: 820px;
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
        @media (max-width: 600px) {
          .grow-page-root .hero { padding: 48px 20px 36px; }
          .grow-page-root .deliverable { grid-template-columns: 44px 1fr; gap: 14px; }
          .grow-page-root .deliverable-num { font-size: 38px; }
        }
        @keyframes grow-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes grow-scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      ` }} />

      {/* URGENCY BAR */}
      <div className="urgency-bar">
        <div className="urgency-content">
          <span className="urgency-dot"></span>
          <strong>LIMITED SPOTS:</strong> 3 spots left in {currentMonth}. <a href="#booking">Check availability →</a>
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
            <span className="rating-count">(58) reviews</span>
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <a href="tel:+17348658775" className="hero-phone-pulse" id="hero-phone-call-btn">
          <div className="phone-icon-pulse-circle">
            <div className="phone-icon-pulse-glow"></div>
            <Phone size={14} fill="var(--green)" style={{ position: "relative", zIndex: 1 }} />
          </div>
          <span>Call Us Directly</span>
        </a>
        <div className="container-narrow">
          <div className="hero-eyebrow">Roofers</div>
          <h1>Get More High-Paying Roofing Jobs with<br />Facebook & Google Ads +<br /><span>Storm Tracking Automation</span></h1>
          <p className="hero-sub" style={{ color: "#f5f5f5" }}>
            We'll set yours up in 7 days.
          </p>
          <div style={{ marginTop: "16px" }}>
            <a href="#booking" className="btn-primary">Claim My Territory</a>
            <p className="btn-subtext">No Shared Leads.</p>
          </div>
        </div>
      </section>

      {/* FIRST CTA */}
      <section className="first-cta">
        <div className="container-narrow">
          <p className="cta-desc">
            We build and launch your custom Facebook & Google Ads campaigns + severe weather storm tracking in 7 days.
          </p>
          <a href="#booking" className="btn-primary">Claim My Territory</a>
          <p className="btn-subtext">Storm ads live before your competitors.</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-proof">
        <div className="container">
          <p className="section-label">What roofing contractors are saying</p>

          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">WH</div>
                <div>
                  <div className="reviewer-name">Walter Hernandez</div>
                  <div className="reviewer-biz">Roofing Contractor · Texas</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">Their storm tracking system launched ads the same day hail hit our county.</span> We booked 4 full roof replacements within 48 hours of the storm moving through. Incredible tech!
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">MT</div>
                <div>
                  <div className="reviewer-name">Mike T.</div>
                  <div className="reviewer-biz">Roofing Contractor · Michigan</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">We finally stopped wasting thousands on shared homeadvisor leads.</span> Takeover set up our Google and Facebook Ads directly on our account, and we've kept our crews fully busy year-round.
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">JR</div>
                <div>
                  <div className="reviewer-name">James R.</div>
                  <div className="reviewer-biz">Roofing & Exteriors · Florida</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I was highly skeptical about the storm damage automation system.</span> But when the hail hit, our phone rang off the hook instantly. These guys don't fool around — highly recommend.
              </p>
            </div>
          </div>
          <div className="reviews-mobile-hint">← Swipe to read roofer reviews →</div>

          <p className="disclaimer">Individual results may vary based on business size, market, ad budgets, and lead responsiveness. Results shown above are from real roofing clients and are not a guarantee of any specific outcome.</p>
        </div>
      </section>

      {/* WHAT YOU GET - SPECIFIC TO ROOFING DIGITAL MARKETING & STORM TRACKING */}
      <section className="what-you-get">
        <div className="container">
          <div className="section-header">
            <h2>What You <span>Get</span></h2>
            <p>A complete, premium roofing lead generation engine. 100% hands-off & custom-built.</p>
          </div>

          <div className="deliverables">

            <div className="deliverable">
              <div className="deliverable-num">1</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Free — $0 setup</div>
                <h3>100% Free Initial Ads & Funnel Build</h3>
                <p>We write, design, and build your entire custom Google & Facebook Ad campaigns and high-converting landing pages completely free. Absolutely zero upfront setup fees.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">2</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Severe Weather Storm Damage Automation</h3>
                <p>Our custom storm tracking tool actively monitors NOAA weather radar. When wind or hail severe weather events strike your target service area, the system <strong>instantly triggers ad campaigns in those specific zip codes</strong> to capture high-payout storm restoration jobs before competitors arrive.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">3</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Onboarding & Strategy Call</h3>
                <p>We'll walk through your onboarding document together to set clear expectations and review the exact types of ads you want to run. We'll plan how we will optimize your campaigns and outline a precise strategy to reach the business goals you want to achieve.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">4</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Hands-Off Ad Management & 24/7 Optimization</h3>
                <p>We handle the heavy lifting. We actively monitor your ad spend, optimize bidding strategies, perform A/B split testing on ad copy, update storm trigger thresholds, and keep your cost-per-lead as low as possible.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">5</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Free Bonus</div>
                <h3>Exclusive Mobile App & CRM Integration</h3>
                <p>You get access to our dedicated mobile app where all your lead details are collected in one place. You will receive an instant push notification on your phone the second a new lead comes in. Plus, we can fully integrate the system with your current CRM so your pipeline is always perfectly in sync.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="second-cta">
         <div className="container-narrow" style={{ textAlign: "center" }}>
           <a href="#booking" className="btn-primary">Claim My Territory</a>
           <p className="btn-subtext">We'll answer all of your questions on this quick call.</p>
         </div>
       </section>

      {/* BOOKING SECTION */}
      <section className="booking-section" id="booking">
        <div className="container">
          <div className="booking-header">
            <h2>Book Your Free Roofing Strategy Call</h2>
            <p>On this quick 15-minute call we'll outline your storm automation strategy, design custom ad concepts, and set up your free build.</p>
          </div>

          <div className="call-promises">
            <div className="call-promise">
              <div className="call-promise-icon">⚡</div>
              <h4>Radar Setup</h4>
              <p>We'll map out your local storm damage zip codes and hail threshold limits</p>
            </div>
            <div className="call-promise">
              <div className="call-promise-icon">🎯</div>
              <h4>No Shared Leads</h4>
              <p>Every lead is 100% exclusive to your company. Never shared with competitors</p>
            </div>
            <div className="call-promise">
              <div className="call-promise-icon">📅</div>
              <h4>Launch in 7 Days</h4>
              <p>Your complete Google & Facebook ad setup is custom prepared and ready inside 7 days</p>
            </div>
          </div>
          <div className="call-promises-mobile-hint">← Swipe to see info →</div>

          <div className="calendar-embed" id="booking-calendar">
            <div className="calendar-label">
              <div className="calendar-label-title">Free Roofing Marketing Strategy Call — 15 Minutes</div>
              <div className="calendar-label-sub">Takeover Marketing · Select a date and time slot below</div>
            </div>
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/4pTjzWX2CBQuAHAa8jYS"
              style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "820px" }}
              scrolling="no"
              id="4pTjzWX2CBQuAHAa8jYS_1781392504641"
              title="Calendar Booking"
            />
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
