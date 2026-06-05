import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function Grow() {
  useEffect(() => {
    // Load Wistia scripts
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/mmo9tw3cxk.js";
    script2.async = true;
    script2.type = "module";
    document.head.appendChild(script2);

    // Load LeadConnector form embed script
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
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
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

        /* VIDEO BLOCK */
        .grow-page-root .video-section { background: var(--black); padding: 0 20px 48px; text-align: center; }
        .grow-page-root .video-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gray-500);
          margin-bottom: 12px;
        }
        .grow-page-root .video-label span { color: var(--yellow); font-weight: 700; }
        .grow-page-root .video-wrapper {
          max-width: 720px;
          margin: 0 auto;
          border: 2px solid #2a2a2a;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          background: #111;
          aspect-ratio: 16/9;
          cursor: pointer;
        }
        .grow-page-root wistia-player[media-id='mmo9tw3cxk']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/mmo9tw3cxk/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
        .grow-page-root wistia-player {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
        .grow-page-root .video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
          background: #111;
          font-size: 14px;
          color: #888;
        }
        .grow-page-root .play-btn {
          width: 72px;
          height: 72px;
          background: var(--yellow);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .grow-page-root .play-btn svg { width: 28px; height: 28px; fill: var(--black); margin-left: 4px; }
        .grow-page-root .sound-note {
          font-size: 13px;
          color: var(--gray-500);
          margin-top: 10px;
          letter-spacing: 0.02em;
        }
        .grow-page-root .sound-note span { color: var(--yellow); font-weight: 600; }

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
        @media (max-width: 600px) {
          .grow-page-root .hero { padding: 48px 20px 36px; }
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
            <span className="rating-count">(126)</span>
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container-narrow">
          <div className="hero-eyebrow">Built for Contractors</div>
          <h1>Are You Losing Jobs<br />Because You're <span>Too Busy</span><br />To Follow Up?</h1>
          <p className="hero-sub">
            We build you a <strong>free professional website</strong> and a done-for-you automated system that responds to every new lead in under 2 minutes — even when you're on the job.
          </p>
        </div>
      </section>

      {/* VIDEO */}
      <section className="video-section">
        <div className="container">
          <p className="video-label">
            <span>↓ Step 1:</span> Watch This 3-Minute Video First ↓
          </p>
          <div className="video-wrapper" id="main-video">
            <div 
              style={{ width: '100%', height: '100%' }}
              dangerouslySetInnerHTML={{ 
                __html: `<wistia-player media-id="mmo9tw3cxk" aspect="1.7777777777777777"></wistia-player>` 
              }} 
            />
          </div>
          <p className="sound-note">🔊 <span>Turn your sound on</span> — this video has audio</p>
        </div>
      </section>

      {/* FIRST CTA (after video) */}
      <section className="first-cta">
        <div className="container-narrow">
          <p className="cta-desc">
            We build your free website, set up automated follow-up, and have your system running in <strong>under 10 days</strong>. All for $269/month.
          </p>
          <a href="#booking" className="btn-primary">Yes — Build My Free Website Now</a>
          <p className="btn-subtext">No contracts. Cancel anytime. Setup included.</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-proof">
        <div className="container">
          <p className="section-label">What contractors are saying</p>

          {/* Video Testimonial placeholder - Hidden for now */}
          {/*
          <div className="video-testimonial-wrap">
            <div className="video-testimonial">
              <div className="play-btn" style={{ width: "56px", height: "56px" }}>
                <svg viewBox="0 0 24 24" style={{ width: "22px", height: "22px", fill: "#0a0a0a", marginLeft: "3px" }}><path d="M8 5v14l11-7z" /></svg>
              </div>
              <p>Video testimonial</p>
            </div>
          </div>
          */}

          {/* Google Review Cards */}
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">WH</div>
                <div>
                  <div className="reviewer-name">Walter Hernandez</div>
                  <div className="reviewer-biz">Roofing Contractor</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I'm very impressed with how quickly everything was handled.</span> The level of professionalism throughout — especially how fast they respond to the phone — has been incredible. Thank you so much.
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">AP</div>
                <div>
                  <div className="reviewer-name">Adam Potras</div>
                  <div className="reviewer-biz">Landscaping</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">Takeover Marketing built my website fast and the system actually works.</span> I was very skeptical at first but I'm very happy with how it turned out. They never stopped updating and improving things.
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">LB</div>
                <div>
                  <div className="reviewer-name">Louis Barbella</div>
                  <div className="reviewer-biz">HVAC</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I found Takeover Marketing by chance and I'm very glad I did.</span> David got right to work and I had a great website and auto set-up quickly. These guys don't fool around — highly recommend.
              </p>
            </div>
          </div>

          <p className="disclaimer">Individual results may vary based on business size, market, and how leads are handled. Results shown above are from real clients and are not a guarantee of any specific outcome.</p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="what-you-get">
        <div className="container">
          <div className="section-header">
            <h2>What You Get at <span>$269/Month</span></h2>
            <p>Everything your business needs to capture and close more jobs — done for you.</p>
          </div>

          <div className="deliverables">

            <div className="deliverable">
              <div className="deliverable-num">1</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Free — $0 setup</div>
                <h3>A Professional Contractor Website Built for You</h3>
                <p>We design and build your website from scratch — <strong>at no extra cost.</strong> Mobile-optimized, fast-loading, and built to convert visitors into calls and form submissions. You own it completely.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">2</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Automated Lead Follow-Up That Responds in Under 2 Minutes</h3>
                <p>Every new lead gets an <strong>instant text and email response</strong> the moment they fill out a form or call — even at midnight. No more losing jobs because a competitor called back first.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">3</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Online Booking System So Jobs Get Scheduled on Autopilot</h3>
                <p>Your calendar connects directly to the system. Leads can <strong>book their own estimate appointment</strong> without you ever having to call them back manually. Confirmations and reminders go out automatically.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">4</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Missed Call Text-Back So You Never Lose a Lead to Voicemail</h3>
                <p>When a prospect calls and you can't answer, they <strong>automatically get a text back within 60 seconds</strong> keeping them engaged until you can call them back. Stop losing jobs to voicemail.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">5</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Review Request Automation to Build Your Google Reputation</h3>
                <p>After every completed job, your system automatically texts the customer asking for a Google review. <strong>More 5-star reviews = more jobs from organic search.</strong> No manual follow-up needed.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="second-cta">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <a href="#booking" className="btn-primary">Get My Free Website + System Now</a>
          <p className="btn-subtext">We'll answer all of your questions on this quick call.</p>
        </div>
      </section>

      {/* MORE REVIEWS */}
      <section className="more-reviews">
        <div className="container">
          <p className="section-label" style={{ textAlign: "center", marginBottom: "28px" }}>More from real contractors</p>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ marginBottom: "14px" }}>
                "<span className="review-highlight">Before this system I was responding to leads the next morning.</span> Now they get a text immediately. I've already booked 3 extra jobs this month I would have missed."
              </p>
              <div className="reviewer-name" style={{ fontSize: "13px" }}>Mike T. — Roofing, Michigan</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ marginBottom: "14px" }}>
                "<span className="review-highlight">I had a website built before and paid way more than this for nothing.</span> With Takeover it actually brings in leads and follows up automatically. Night and day difference."
              </p>
              <div className="reviewer-name" style={{ fontSize: "13px" }}>James R. — HVAC, Ohio</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ marginBottom: "14px" }}>
                "<span className="review-highlight">The missed call text-back alone is worth the price.</span> I'm on job sites all day and can't always answer. Now I don't lose those people anymore."
              </p>
              <div className="reviewer-name" style={{ fontSize: "13px" }}>Tony G. — Landscaping, Indiana</div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="booking-section" id="booking">
        <div className="container">
          <div className="booking-header">
            <h2>Book Your Free Strategy Call</h2>
            <p>On this 15-minute call we'll answer every question, show you a live demo, and tell you exactly how we'll build your free website.</p>
          </div>

          <div className="call-promises">
            <div className="call-promise">
              <div className="call-promise-icon">🖥️</div>
              <h4>Live Demo</h4>
              <p>We'll walk you through the exact system we'll build for your business</p>
            </div>
            <div className="call-promise">
              <div className="call-promise-icon">⚡</div>
              <h4>No Pressure</h4>
              <p>No sales tactics. If it's not a fit, we'll tell you — no hard feelings</p>
            </div>
            <div className="call-promise">
              <div className="call-promise-icon">📅</div>
              <h4>Ready in 10 Days</h4>
              <p>If we move forward, your website and system are live within 10 days</p>
            </div>
          </div>

          <div className="calendar-embed" id="booking-calendar">
            <div className="calendar-label">
              <div className="calendar-label-title">Free Contractor Growth Call — 15 Minutes</div>
              <div className="calendar-label-sub">Takeover Marketing · Fill out the form details below</div>
            </div>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/IqILvNxBfXxI0NVdJu5q"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px", minHeight: "570px" }}
              id="inline-IqILvNxBfXxI0NVdJu5q" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Wellness Landing Page"
              data-height="570"
              data-layout-iframe-id="inline-IqILvNxBfXxI0NVdJu5q"
              data-form-id="IqILvNxBfXxI0NVdJu5q"
              title="Wellness Landing Page"
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
