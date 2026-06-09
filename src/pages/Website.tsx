import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowLeft, ArrowRight, X, ExternalLink } from "lucide-react";

interface DesignItem {
  id: number;
  title: string;
  niche: string;
  image: string;
  images?: string[];
  mockupColor: string;
  features: string[];
  tagline: string;
}

const PAST_DESIGNS: DesignItem[] = [
  {
    id: 1,
    title: "Steer Concepts",
    niche: "Roofing & Siding",
    image: "https://lh3.googleusercontent.com/d/1JG5F8EfrV5DevfQBWt5yKawfKoB9Ib07",
    images: [
      "https://lh3.googleusercontent.com/d/1JG5F8EfrV5DevfQBWt5yKawfKoB9Ib07",
      "https://lh3.googleusercontent.com/d/1_SljuBlAlnzqAgGP-X6VP7z51boRXfYm",
      "https://lh3.googleusercontent.com/d/1vLORRb6g-B5pKChuhhn23vgFYW-c8KAA"
    ],
    mockupColor: "#f5c518",
    features: ["Shingle Style Chooser", "Instant Estimate Tool", "Customer Job Map"],
    tagline: "Bold contrast, prominent trust indicators, and high-visibility phone buttons."
  },
  {
    id: 2,
    title: "Jade Air HVAC",
    niche: "Heating & Cooling",
    image: "https://lh3.googleusercontent.com/d/19s2qDC2XZGac4T_ClyN_bmGksdz-C1mo",
    images: [
      "https://lh3.googleusercontent.com/d/19s2qDC2XZGac4T_ClyN_bmGksdz-C1mo",
      "https://lh3.googleusercontent.com/d/1hQX43_lxIqnnrya05qWKQkuKCy5xl-rc",
      "https://lh3.googleusercontent.com/d/1Dc5H6ssmg0qppVqRdfflzH20M6n0UNxb"
    ],
    mockupColor: "#3b82f6",
    features: ["Emergency Dispatch Banner", "Maintenance Club Form", "Dynamic Filter Wizard"],
    tagline: "Conversion-optimized layouts built specifically to capture emergency service calls."
  },
  {
    id: 3,
    title: "Keegan Bros. Landscaping",
    niche: "Landscaping & Lawn Care",
    image: "https://lh3.googleusercontent.com/d/1BnbygaA4GB8qn7_0Uv3eVDrx1UNp7ZvD",
    images: [
      "https://lh3.googleusercontent.com/d/1BnbygaA4GB8qn7_0Uv3eVDrx1UNp7ZvD",
      "https://lh3.googleusercontent.com/d/16qN93a1lO-59yAZNjX-SVso050_l0eW3"
    ],
    mockupColor: "#22c55e",
    features: ["Interactive Project Gallery", "Seasonal Care Guide", "Design Estimator"],
    tagline: "Clean, media-focused styles centering stunning physical workspace results."
  },
  {
    id: 4,
    title: "Cap's Drain Cleaning & Plumbing",
    niche: "Plumbing Services",
    image: "https://lh3.googleusercontent.com/d/1HeU-Ieh-QCMJ1-u5Ho-DfvuTpVAuMhve",
    images: [
      "https://lh3.googleusercontent.com/d/1HeU-Ieh-QCMJ1-u5Ho-DfvuTpVAuMhve",
      "https://lh3.googleusercontent.com/d/1m2uiQuZN7QCx4Yp5uGLCn9-rclabahLM",
      "https://lh3.googleusercontent.com/d/1QpDbia6qYFHrQf0wjdT4CA01kaTn3qU-"
    ],
    mockupColor: "#0ea5e9",
    features: ["Drain Clearing Special Badge", "Direct Schedule Integration", "Verified Live Reviews"],
    tagline: "Ultra-clean designs highlighting Google star ratings and prompt dispatch availability."
  },
  {
    id: 5,
    title: "Blue Eagle Concrete",
    niche: "Concrete Services",
    image: "https://lh3.googleusercontent.com/d/1XWMaPFAReuU3hGQ0DlzYnG1YI2iV2-0g",
    images: [
      "https://lh3.googleusercontent.com/d/1XWMaPFAReuU3hGQ0DlzYnG1YI2iV2-0g",
      "https://lh3.googleusercontent.com/d/1SJfcAFi3dsDLTH2C0U0xsCIA39JA1DzA"
    ],
    mockupColor: "#8e9196",
    features: ["Instant Yardage Estimator", "Struktural Finish Gallery", "Direct Quote Booking"],
    tagline: "Solid slate-contrast layout emphasizing structural durability and beautiful custom masonry."
  }
];

export default function Website() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

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

        /* GALLERY WHEEL */
        .grow-page-root .gallery-section {
          background: var(--black);
          padding: 32px 20px 64px;
          text-align: center;
          overflow: hidden;
        }
        .grow-page-root .gallery-header {
          margin-bottom: 24px;
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
        .grow-page-root .wheel-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 380px;
        }
        .grow-page-root .wheel-track {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }
        .grow-page-root .wheel-card {
          position: absolute;
          width: 320px;
          height: 310px;
          background: #111111;
          border-radius: 8px;
          border: 1px solid #222222;
          box-shadow: 0 8px 24px rgba(0,0,0,0.6);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-align: left;
          user-select: none;
        }
        .grow-page-root .wheel-card.active {
          z-index: 10;
          transform: translate3d(0, 0, 100px) rotateY(0deg);
          opacity: 1;
          border-color: var(--yellow);
          box-shadow: 0 12px 36px rgba(245, 197, 24, 0.2);
        }
        .grow-page-root .wheel-card.left-1 {
          z-index: 5;
          transform: translate3d(-240px, 0, -50px) rotateY(25deg) scale(0.85);
          opacity: 0.5;
        }
        .grow-page-root .wheel-card.right-1 {
          z-index: 5;
          transform: translate3d(240px, 0, -50px) rotateY(-25deg) scale(0.85);
          opacity: 0.5;
        }
        .grow-page-root .wheel-card.hidden-left {
          z-index: 1;
          transform: translate3d(-400px, 0, -150px) rotateY(45deg) scale(0.7);
          opacity: 0;
          pointer-events: none;
        }
        .grow-page-root .wheel-card.hidden-right {
          z-index: 1;
          transform: translate3d(400px, 0, -150px) rotateY(-45deg) scale(0.7);
          opacity: 0;
          pointer-events: none;
        }
        .grow-page-root .wheel-card-image {
          height: 140px;
          position: relative;
          overflow: hidden;
          background: #222;
        }
        .grow-page-root .wheel-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .grow-page-root .wheel-card:hover .wheel-card-image img {
          transform: scale(1.05);
        }
        .grow-page-root .wheel-card-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(10, 10, 10, 0.85);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--yellow);
          border: 1px solid rgba(245, 197, 24, 0.3);
          letter-spacing: 0.05em;
          z-index: 2;
        }
        .grow-page-root .wheel-card-info {
          padding: 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .grow-page-root .wheel-card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 2px;
        }
        .grow-page-root .wheel-card-desc {
          font-size: 12px;
          color: #a3a3a3;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .grow-page-root .wheel-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--yellow);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: auto;
        }
        .grow-page-root .wheel-arrow {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.9);
          border: 1px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          cursor: pointer;
          z-index: 15;
          transition: all 0.2s;
          user-select: none;
        }
        .grow-page-root .wheel-arrow:hover {
          background: var(--yellow);
          color: var(--black);
          border-color: var(--yellow);
        }
        .grow-page-root .wheel-arrow-left {
          left: 10px;
        }
        .grow-page-root .wheel-arrow-right {
          right: 10px;
        }
        
        .grow-page-root .wheel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .grow-page-root .wheel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #262626;
          cursor: pointer;
          transition: all 0.3s;
        }
        .grow-page-root .wheel-dot.active {
          background: var(--yellow);
          transform: scale(1.2);
        }

        /* LIGHTBOX DIALOG */
        .grow-page-root .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: grow-fade-in 0.2s ease-out;
        }
        .grow-page-root .lightbox-window {
          background: #111111;
          border: 1px solid #222222;
          border-radius: 8px;
          max-width: 680px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 48px rgba(0,0,0,0.8);
          display: flex;
          flex-direction: column;
          animation: grow-scale-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .grow-page-root .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #222222;
        }
        .grow-page-root .lightbox-title-group {
          text-align: left;
        }
        .grow-page-root .lightbox-title-group h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: var(--white);
          line-height: 1.1;
        }
        .grow-page-root .lightbox-title-group p {
          font-size: 11px;
          color: var(--yellow);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }
        .grow-page-root .lightbox-close {
          background: none;
          border: none;
          color: #666666;
          cursor: pointer;
          transition: color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .grow-page-root .lightbox-close:hover {
          color: var(--white);
        }
        
        .grow-page-root .lightbox-browser-sim {
          border: 1px solid #2a2a2a;
          background: #151515;
          border-radius: 6px;
          margin: 20px 20px 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .grow-page-root .browser-topbar {
          background: #0a0a0a;
          height: 38px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          position: relative;
          border-bottom: 1px solid #222;
        }
        .grow-page-root .browser-dots {
          display: flex;
          gap: 6px;
          position: absolute;
          left: 14px;
        }
        .grow-page-root .browser-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .grow-page-root .browser-dot.red { background: #ff5f56; }
        .grow-page-root .browser-dot.yellow { background: #ffbd2e; }
        .grow-page-root .browser-dot.green { background: #27c93f; }
        .grow-page-root .browser-address {
          font-family: 'JetBrains Mono', monospace;
          background: #151515;
          color: #737373;
          font-size: 10px;
          padding: 4px 16px;
          border-radius: 4px;
          max-width: 280px;
          width: 100%;
          text-align: center;
          margin: 0 auto;
          border: 1px solid #262626;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .grow-page-root .browser-content {
          padding: 20px;
          background: #080808;
          min-height: 240px;
          text-align: left;
        }
        
        .grow-page-root .sim-website-demo {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .grow-page-root .sim-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 10px;
        }
        .grow-page-root .sim-logo {
          font-weight: 800;
          font-size: 13px;
          color: var(--white);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .grow-page-root .sim-links {
          display: flex;
          gap: 12px;
          font-size: 10px;
          color: var(--gray-500);
        }
        .grow-page-root .sim-hero {
          text-align: center;
          padding: 12px 0;
        }
        .grow-page-root .sim-hero h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(24px, 4vw, 32px);
          font-weight: normal;
          color: var(--white);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }
        .grow-page-root .sim-hero p {
          font-size: 12px;
          color: #a3a3a3;
          max-width: 360px;
          margin: 0 auto;
          line-height: 1.4;
        }
        .grow-page-root .sim-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 8px;
        }
        .grow-page-root .sim-feature {
          background: #0f0f0f;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #1e1e1e;
        }
        .grow-page-root .sim-feature-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--yellow);
          margin-bottom: 2px;
        }
        .grow-page-root .sim-feature-desc {
          font-size: 9px;
          color: #737373;
          line-height: 1.35;
        }
        
        .grow-page-root .lightbox-details {
          padding: 0 20px 24px;
          text-align: left;
        }
        .grow-page-root .lightbox-details h4 {
          font-size: 13px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .grow-page-root .lightbox-bullets {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .grow-page-root .lightbox-bullet {
          font-size: 11px;
          background: #171717;
          border: 1px solid #262626;
          color: #a3a3a3;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 500;
        }
        
        @keyframes grow-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes grow-scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Adjust media queries */
        @media(max-width: 768px) {
          .grow-page-root .gallery-section {
            padding: 24px 10px 48px;
          }
          .grow-page-root .wheel-container {
            height: 330px;
          }
          .grow-page-root .wheel-card {
            width: 250px;
            height: 275px;
          }
          .grow-page-root .wheel-card-image {
            height: 110px;
          }
          .grow-page-root .wheel-card.left-1 {
            transform: translate3d(-170px, 0, -50px) rotateY(25deg) scale(0.8);
          }
          .grow-page-root .wheel-card.right-1 {
            transform: translate3d(170px, 0, -50px) rotateY(-25deg) scale(0.8);
          }
          .grow-page-root .sim-features {
            grid-template-columns: 1fr;
          }
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
          <h1>We'll Build Your<br />Contractor Website<br /><span>Free.</span></h1>
          <p className="hero-sub">
            We build it, you approve it, and we host it live for 7 days — completely free. Keep it for just <strong>$99/month</strong>. No contracts. No risk.
          </p>
        </div>
      </section>

      {/* PAST DESIGNS GALLERY WHEEL */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h2>Our Past Website <span>Designs</span></h2>
            <p>Click on any design below to explore the conversion features in our interactive simulator live</p>
          </div>
          
          <div className="wheel-container">
            <button 
              className="wheel-arrow wheel-arrow-left" 
              onClick={() => setActiveIdx((prev) => (prev - 1 + 5) % 5)}
              aria-label="Previous Design"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="wheel-track">
              {PAST_DESIGNS.map((design, i) => {
                let cardClass = "";
                if (i === activeIdx) cardClass = "active";
                else if (i === (activeIdx - 1 + 5) % 5) cardClass = "left-1";
                else if (i === (activeIdx + 1) % 5) cardClass = "right-1";
                else if (i === (activeIdx - 2 + 5) % 5) cardClass = "hidden-left";
                else cardClass = "hidden-right";

                return (
                  <div 
                    key={design.id}
                    className={`wheel-card ${cardClass}`}
                    onClick={() => {
                      if (i === activeIdx) {
                        setSelectedDesign(design);
                        setActiveImageIdx(0);
                        setIsZoomed(false);
                      } else {
                        setActiveIdx(i);
                      }
                    }}
                  >
                    <div className="wheel-card-badge">{design.niche}</div>
                    <div className="wheel-card-image">
                      <img 
                        src={design.image} 
                        alt={design.title} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div className="wheel-card-info">
                      <div>
                        <h4 className="wheel-card-title">{design.title}</h4>
                        <p className="wheel-card-desc">{design.tagline}</p>
                      </div>
                      <div className="wheel-card-footer">
                        <span>{i === activeIdx ? "Click to interact" : "Bring to front"}</span>
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button 
              className="wheel-arrow wheel-arrow-right" 
              onClick={() => {
                setActiveIdx((prev) => (prev + 1) % 5);
                setActiveImageIdx(0);
                setIsZoomed(false);
              }}
              aria-label="Next Design"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="wheel-dots">
            {PAST_DESIGNS.map((_, i) => (
              <span 
                key={i} 
                className={`wheel-dot ${i === activeIdx ? "active" : ""}`}
                onClick={() => {
                  setActiveIdx(i);
                  setActiveImageIdx(0);
                  setIsZoomed(false);
                }}
              />
            ))}
          </div>
        </div>
      </section>
 
      {/* FULL SCREEN INTERACTIVE SIMULATOR LIGHTBOX */}
      {selectedDesign && (
        <div className="lightbox-overlay" onClick={() => { setSelectedDesign(null); setIsZoomed(false); setActiveImageIdx(0); }}>
          <div className="lightbox-window" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div className="lightbox-title-group">
                <h3>{selectedDesign.title}</h3>
                <p>{selectedDesign.niche} Conversion Mockup Template</p>
              </div>
              <button className="lightbox-close" onClick={() => { setSelectedDesign(null); setIsZoomed(false); setActiveImageIdx(0); }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: "20px", overflow: "auto", maxHeight: "550px", textAlign: "center" }}>
              <div 
                style={{ 
                  marginBottom: "12px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                {selectedDesign.images && selectedDesign.images.length > 1 ? (
                  <div style={{ display: "flex", gap: "6px" }}>
                    {selectedDesign.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setActiveImageIdx(idx); setIsZoomed(false); }}
                        style={{
                          background: activeImageIdx === idx ? "var(--yellow)" : "rgba(255,255,255,0.05)",
                          color: activeImageIdx === idx ? "var(--black)" : "var(--white)",
                          border: activeImageIdx === idx ? "1px solid var(--yellow)" : "1px solid rgba(255,255,255,0.15)",
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        Option {idx + 1}
                      </button>
                    ))}
                  </div>
                ) : <div style={{ flexGrow: 1 }}></div>}

                <div 
                  style={{ 
                    fontSize: "12px", 
                    color: "var(--yellow)", 
                    cursor: "pointer", 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "6px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em"
                  }} 
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <span>{isZoomed ? "🔍 Click to Zoom Out" : "🔍 Click Image to Zoom In"}</span>
                </div>
              </div>

              <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
                {selectedDesign.images && selectedDesign.images.length > 1 && !isZoomed && (
                  <>
                    <button
                      onClick={() => setActiveImageIdx((prev) => (prev - 1 + selectedDesign.images!.length) % selectedDesign.images!.length)}
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(10,10,10,0.75)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "var(--white)",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "all 0.2s"
                      }}
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImageIdx((prev) => (prev + 1) % selectedDesign.images!.length)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(10,10,10,0.75)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "var(--white)",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "all 0.2s"
                      }}
                    >
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}

                <img 
                  src={(selectedDesign.images && selectedDesign.images[activeImageIdx]) || selectedDesign.image} 
                  alt={selectedDesign.title} 
                  onClick={() => setIsZoomed(!isZoomed)}
                  style={{ 
                    width: isZoomed ? "160%" : "100%", 
                    maxWidth: isZoomed ? "160%" : "100%",
                    height: "auto", 
                    objectFit: "contain", 
                    borderRadius: "6px", 
                    border: "1px solid #222222", 
                    display: "inline-block",
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                    transition: "width 0.25s ease, max-width 0.25s ease"
                  }} 
                  referrerPolicy="no-referrer"
                />
              </div>

              {selectedDesign.images && selectedDesign.images.length > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "16px" }}>
                  {selectedDesign.images.map((imgUrl, idx) => (
                    <div 
                      key={idx}
                      onClick={() => { setActiveImageIdx(idx); setIsZoomed(false); }}
                      style={{
                        width: "80px",
                        height: "50px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        border: activeImageIdx === idx ? "2px solid var(--yellow)" : "2px solid rgba(255, 255, 255, 0.1)",
                        cursor: "pointer",
                        opacity: activeImageIdx === idx ? 1 : 0.6,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <img 
                        src={imgUrl} 
                        alt="thumbnail" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {selectedDesign.id === 1 && (
              <div className="lightbox-details" style={{ display: "flex", justifyContent: "center", paddingBottom: "24px" }}>
                <a 
                  href="https://www.steerconcepts.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    backgroundColor: "var(--yellow)", 
                    color: "var(--black)", 
                    fontWeight: "bold", 
                    fontSize: "14px",
                    padding: "12px 24px", 
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s ease",
                    textDecoration: "none"
                  }}
                  className="hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink size={16} />
                  View Live Website (Steer Concepts)
                </a>
              </div>
            )}

            {selectedDesign.id === 3 && (
              <div className="lightbox-details" style={{ display: "flex", justifyContent: "center", paddingBottom: "24px" }}>
                <a 
                  href="https://keeganbros.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    backgroundColor: "var(--yellow)", 
                    color: "var(--black)", 
                    fontWeight: "bold", 
                    fontSize: "14px",
                    padding: "12px 24px", 
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s ease",
                    textDecoration: "none"
                  }}
                  className="hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink size={16} />
                  View Live Website (Keegan Bros. Landscaping)
                </a>
              </div>
            )}

            {selectedDesign.id === 5 && (
              <div className="lightbox-details" style={{ display: "flex", justifyContent: "center", paddingBottom: "24px" }}>
                <a 
                  href="https://blueeagleconcrete.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    backgroundColor: "var(--yellow)", 
                    color: "var(--black)", 
                    fontWeight: "bold", 
                    fontSize: "14px",
                    padding: "12px 24px", 
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s ease",
                    textDecoration: "none"
                  }}
                  className="hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink size={16} />
                  View Live Website (Blue Eagle Concrete)
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FIRST CTA (after video) */}
      <section className="first-cta">
        <div className="container-narrow">
          <p className="cta-desc">
            We build your free contractor website and have it live in <strong>under 3 days</strong>. All for just <strong>$99/month</strong> after your 7-day free trial.
          </p>
          <a href="#booking" className="btn-primary">Yes — Build My Free Website Now</a>
          <p className="btn-subtext">No contracts. Cancel anytime. Unlimited support.</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-proof">
        <div className="container">
          <p className="section-label">What contractors are saying</p>

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
            <h2>What You Get at <span>$99/Month</span></h2>
            <p>A professional contractor website custom-built for your business. Completely risk free.</p>
          </div>

          <div className="deliverables">

            <div className="deliverable">
              <div className="deliverable-num">1</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Free — $0 setup</div>
                <h3>100% Free Initial Website Build</h3>
                <p>We design and build your custom website completely free before you ever pay anything. Experience your brand-new finished site with <strong>absolutely zero upfront risk.</strong></p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">2</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>15-Minute Design Revision Call</h3>
                <p>After we build your website, we will hop on a quick 15-minute conference call to discuss the website design, refine layouts, and make <strong>any changes or revisions you would like.</strong></p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">3</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Super-Fast 24-Hour Launch</h3>
                <p>As soon as you decide you'd like to purchase your new website, we take it live on your custom domain <strong>within 24 hours.</strong> Quick, seamless, and fully optimized.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">4</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Included</div>
                <h3>Hands-Off Maintenance, Hosting & 24/7 Support</h3>
                <p>We handle everything. Includes ultra-fast secure hosting, regular backups, and <strong>around-the-clock technical support</strong>. Whenever you need to update photos, add new client reviews, tweak pricing, or edit text, we do it for you completely hands-free.</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="deliverable">
              <div className="deliverable-num">5</div>
              <div className="deliverable-content">
                <div className="deliverable-tag">Free Bonus</div>
                <h3>Fully Functioning Mobile App & Real-time Lead Delivery</h3>
                <p>Get a **fully functioning mobile app** included with your website. Any time a prospective customer fills out a quote request or booking form, all of their lead information is instantly sent directly to your phone so you can respond on the go.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="second-cta">
         <div className="container-narrow" style={{ textAlign: "center" }}>
           <a href="#booking" className="btn-primary">Get My Free Custom Website Now</a>
           <p className="btn-subtext">We'll answer all of your questions on this quick call.</p>
         </div>
       </section>

      {/* MORE REVIEWS */}
      <section className="more-reviews">
        <div className="container">
          <p className="section-label" style={{ textAlign: "center", marginBottom: "28px" }}>More from real contractors</p>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">MT</div>
                <div>
                  <div className="reviewer-name">Mike T.</div>
                  <div className="reviewer-biz">Roofing · Michigan</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I had it built completely free, and approved everything first.</span> When I approved the layout, they had it live the next morning on my domain.
              </p>
            </div>
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">JR</div>
                <div>
                  <div className="reviewer-name">James R.</div>
                  <div className="reviewer-biz">HVAC · Ohio</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">I had a website built before and paid way more than this for nothing.</span> With Takeover, they built my site free of charge, set up everything beautifully, and keep it updated.
              </p>
            </div>
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">TG</div>
                <div>
                  <div className="reviewer-name">Tony G.</div>
                  <div className="reviewer-biz">Landscaping · Indiana</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p className="review-text">
                <span className="review-highlight">The hands-free content support is absolutely fantastic.</span> I'm on job sites all day and have no time to code. I just send them photos and they upload them instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="booking-section" id="booking">
        <div className="container">
          <div className="booking-header">
            <h2>Book Your Free Website Demo Call</h2>
            <p>On this 15-minute call we'll discuss your custom website design, answer all of your questions, and detail how we will build it for you.</p>
          </div>

          <div className="call-promises">
            <div className="call-promise">
              <div className="call-promise-icon">🖥️</div>
              <h4>Design Strategy</h4>
              <p>We'll map out your ideal website layout, pages, and custom services</p>
            </div>
            <div className="call-promise">
              <div className="call-promise-icon">⚡</div>
              <h4>No Pressure</h4>
              <p>No sales tactics. It's completely free to start with absolutely zero risk</p>
            </div>
            <div className="call-promise">
              <div className="call-promise-icon">📅</div>
              <h4>Ready in 3 Days</h4>
              <p>If we move forward, your initial website build is custom crafted within 3 days</p>
            </div>
          </div>

          <div className="calendar-embed" id="booking-calendar">
            <div className="calendar-label">
              <div className="calendar-label-title">Free Contractor Website Demo Call — 15 Minutes</div>
              <div className="calendar-label-sub">Takeover Marketing · Fill out the form details below</div>
            </div>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/wed9s4lFXacj9QDUrcMn"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px", minHeight: "570px" }}
              id="inline-wed9s4lFXacj9QDUrcMn" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Website Landing Page"
              data-height="570"
              data-layout-iframe-id="inline-wed9s4lFXacj9QDUrcMn"
              data-form-id="wed9s4lFXacj9QDUrcMn"
              title="Website Landing Page"
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
