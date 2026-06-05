import { Link, useLocation } from "react-router-dom";
import { X, Linkedin, Facebook, Mail, Phone } from "lucide-react";

export function Footer() {
  const location = useLocation();
  const hostname = window.location.hostname;
  const isWellness = location.pathname === '/wellness' || hostname.startsWith('wellness.');
  const isContractors = location.pathname === '/contractors' || location.pathname === '/';
  const isLightPage = isWellness || isContractors;

  const themeClasses = isLightPage 
    ? "bg-zinc-100 border-t border-zinc-200" 
    : "bg-zinc-950 border-t border-white/10";
  const textSecondary = isLightPage ? "text-zinc-500" : "text-zinc-400";
  const textMuted = isLightPage ? "text-zinc-400" : "text-zinc-600";
  const accentColor = '#a60724';

  return (
    <footer className={`relative z-10 py-8 px-6 ${themeClasses}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: accentColor }}>Contact Us</h4>
            <div className={`flex flex-col gap-3 text-sm ${textSecondary}`}>
              <a href="mailto:contact@tkovermarketing.com" className={`flex items-center gap-2 hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>
                <Mail className="w-4 h-4" style={{ color: accentColor }} />
                contact@tkovermarketing.com
              </a>
              <a href="tel:7348658775" className={`flex items-center gap-2 hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>
                <Phone className="w-4 h-4" style={{ color: accentColor }} />
                734-865-8775
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6 pt-2 md:pt-0">
            <a href="#" className={`text-zinc-500 hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}><X className="w-4 h-4" /></a>
            <a href="#" className={`text-zinc-500 hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}><Linkedin className="w-4 h-4" /></a>
            <a href="#" className={`text-zinc-500 hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pt-8 border-t ${isLightPage ? "border-zinc-200" : "border-white/5"}`}>
          <div className={`flex flex-wrap items-center gap-6 text-xs ${textSecondary}`}>
            <span>© 2026 Takeover Marketing Inc.</span>
            <Link to="/privacy-policy" className={`hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>Privacy Policy</Link>
            <Link to="/terms-of-use" className={`hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>Terms of Use</Link>
            <Link to="/wellness" className={`hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>Wellness</Link>
            <Link to="/contractors" className={`hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>Contractors</Link>
            <Link to="/grow" className={`hover:text-${isLightPage ? "zinc-900" : "white"} transition-colors`}>Grow</Link>
          </div>
        </div>
        <div className={`text-[10px] leading-relaxed ${textMuted} max-w-4xl`}>
          Takeover Marketing is a trademark or registered trademark of Takeover Marketing Technologies Inc. Any other trademarks are the property of their respective owners. Unless otherwise noted, use of third party logos does not imply endorsement of, sponsorship of, or affiliation with Takeover Marketing.
          <br /><br />
          Takeover Marketing is a marketing technology company, not an agency. Marketing services are provided by our automated platform and verified partners.
        </div>
      </div>
    </footer>
  );
}
