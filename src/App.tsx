import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Wellness from "./pages/Wellness";
import Contractors from "./pages/Contractors";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Grow from "./pages/Grow";
import GrowThankYou from "./pages/GrowThankYou";
import GrowCalendar from "./pages/GrowCalendar";
import { ParticleBackground } from "./components/ParticleBackground";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  // Track Meta Pixel page views on all routes on navigation
  useEffect(() => {
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname]);
  
  // Detect if we are on the wellness subdomain (e.g., wellness.tkovermarketing.com)
  const isWellnessSubdomain = hostname.startsWith('wellness.');
  const isWellness = pathname === '/wellness' || isWellnessSubdomain;
  const isContractors = pathname === '/contractors' || pathname === '/';
  const isGrowFlow = pathname === '/grow' || pathname === '/grow-thank-you' || pathname === '/grow-calendar';
  
  if (isGrowFlow) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/grow" element={<Grow />} />
          <Route path="/grow-thank-you" element={<GrowThankYou />} />
          <Route path="/grow-calendar" element={<GrowCalendar />} />
        </Routes>
      </>
    );
  }
  
  const isLightPage = isWellness || isContractors;
  
  const selectionColor = 'selection:bg-[#a60724]/30';
  const themeClasses = isLightPage 
    ? "bg-[#fff1f2] text-zinc-900" 
    : "bg-zinc-950 text-white";
  const gridStroke = isLightPage ? "stroke-[#a60724]/20" : "stroke-white/5";

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${themeClasses} ${selectionColor}`}>
      <ScrollToTop />
      <ParticleBackground />

      <Navigation />

      {/* Global Grid Lines */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <svg
          className={`absolute inset-0 h-full w-full ${gridStroke} [mask-image:radial-gradient(100%_70%_at_top_center,white,transparent)]`}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="80"
              height="80"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-grid)" />
        </svg>
      </div>

      <main>
        <Routes>
          <Route path="/" element={isWellnessSubdomain ? <Wellness /> : <Contractors />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
