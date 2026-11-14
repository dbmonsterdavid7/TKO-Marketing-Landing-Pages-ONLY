import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  Play, 
  Plus, 
  Mail, 
  Phone, 
  Target, 
  Activity, 
  Smartphone,
  Users,
  CheckCircle2,
  Check,
  Calendar,
  Search,
  Sparkles,
  Wrench,
  Star,
  ShieldCheck,
  Hammer,
  Truck
} from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className={`border border-zinc-200 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white shadow-md" : "bg-white/50"}`}>
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? "text-[#a60724]" : "text-zinc-900 group-hover:text-[#a60724]"}`}>
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border shrink-0 ${isOpen ? "bg-[#a60724] border-[#a60724] rotate-45" : "bg-zinc-100 border-zinc-200"}`}>
          <Plus className={`w-5 h-5 transition-colors ${isOpen ? "text-white" : "text-zinc-600"}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-zinc-600 leading-relaxed border-t border-zinc-50 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contractors() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Form embed script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Wistia scripts
    const wistiaPlayerScript = document.createElement("script");
    wistiaPlayerScript.src = "https://fast.wistia.com/player.js";
    wistiaPlayerScript.async = true;
    document.body.appendChild(wistiaPlayerScript);

    const wistiaEmbedScript = document.createElement("script");
    wistiaEmbedScript.src = "https://fast.wistia.com/embed/cwj1df20sv.js";
    wistiaEmbedScript.async = true;
    wistiaEmbedScript.type = "module";
    document.body.appendChild(wistiaEmbedScript);

    return () => {
      document.body.removeChild(script);
      try {
        document.body.removeChild(wistiaPlayerScript);
      } catch (e) {}
      try {
        document.body.removeChild(wistiaEmbedScript);
      } catch (e) {}
    };
  }, []);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Sticky Top Bar */}
      <div className="bg-zinc-900 sticky top-0 z-[60] shadow-lg cursor-pointer overflow-hidden py-2 md:py-3" onClick={scrollToBooking}>
        <div className="lg:hidden">
          <div className="animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-x-4 px-4">
              <p className="text-white text-[12px] font-bold tracking-wide flex items-center gap-x-2">
                Limited to 5 new contractors per market to ensure dedicated ad performance <span className="text-[#a60724]">→ Claim your area</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.9</span>
                <span className="flex items-center gap-0.5 mx-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" 
                      style={{ animationDelay: `${i * 150}ms` }} 
                    />
                  ))}
                </span>
                <span className="text-[#a60724] font-bold">(126)</span>
              </p>
              {/* Duplicate for seamless scroll */}
              <p className="text-white text-[12px] font-bold tracking-wide flex items-center gap-x-2">
                Limited to 5 new contractors per market to ensure dedicated ad performance <span className="text-[#a60724]">→ Claim your area</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.9</span>
                <span className="flex items-center gap-0.5 mx-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i + 5} 
                      className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" 
                      style={{ animationDelay: `${i * 150}ms` }} 
                    />
                  ))}
                </span>
                <span className="text-[#a60724] font-bold">(126)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center px-6">
          <p className="text-white text-sm font-bold tracking-wide flex items-center gap-x-2">
            Limited to 5 new contractors per market to ensure dedicated ad performance <span className="text-[#a60724]">→ Claim your area</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.9</span>
            <span className="flex items-center gap-0.5 mx-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" 
                  style={{ animationDelay: `${i * 150}ms` }} 
                />
              ))}
            </span>
            <span className="text-[#a60724] font-bold">(126)</span>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-4 md:pt-12 pb-4 md:pb-8 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-transparent leading-[1.08]">
              Targeted Meta &amp; Google Ads For Contractors
            </h1>
            <h2 className="text-base md:text-xl font-normal text-zinc-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              We run local ad campaigns that deliver exclusive, high-ticket leads — keeping your calendar booked with homeowners ready to buy.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-2xl mx-auto py-4 md:py-6"
          >
            <div className="aspect-video w-full rounded-2xl shadow-2xl overflow-hidden border border-zinc-100/10 bg-zinc-950">
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{ 
                  __html: `
                    <style>
                      wistia-player[media-id='cwj1df20sv']:not(:defined) { 
                        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/cwj1df20sv/swatch'); 
                        display: block; 
                        filter: blur(5px); 
                        padding-top:56.25%; 
                      }
                    </style>
                    <wistia-player media-id="cwj1df20sv" aspect="1.7777777777777777" style="display:block; width:100%; height:100%;"></wistia-player>
                  ` 
                }} 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Action Section */}
      <section className="bg-white pt-6 md:pt-12 pb-16 md:pb-24 px-6 relative z-10 border-y border-zinc-100">
        <div className="max-w-3xl mx-auto text-center">
          <button 
            onClick={scrollToBooking}
            className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all shadow-[0_10px_40px_-10px_rgba(166,7,36,0.5)] active:scale-95 mb-8 md:mb-12 animate-glow"
          >
            I Want Consistent Leads
          </button>
          <p className="text-xl md:text-2xl text-zinc-900 leading-relaxed">
            A dedicated, <span className="font-bold border-b-2 border-[#a60724]">done-for-you advertising engine</span> designed specifically to get consistent leads for trade contractors such as hardscapers, roofers, landscapers, and HVAC.
          </p>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-24 px-6 bg-[#fff1f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-zinc-900">The contractor's advantage:</h2>
            <div className="w-24 h-1 bg-[#a60724] mx-auto opacity-50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">78%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of homeowners research and choose contractors directly from Google Search, Facebook &amp; Instagram ads
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: Google Home Services Insights
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">100%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  exclusive leads generated directly for your business — never resold or shared with local competitors
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: Takeover Performance Standard
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">4.2x</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  average return on ad spend across targeted contractor Meta and Google advertising campaigns
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: Contractor Ad Performance Benchmarks
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">$3,500+</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  average job value across roofing, hardscaping, HVAC, and specialty trade services
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Based on trade industry averages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Problem Section */}
      <section className="py-24 px-6 bg-[#09090b] relative border-y border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#a60724] mb-6">
              The Real Problem
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
              Tired of unpredictable referrals <br />
              and fighting over shared leads on Angi?
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
              You do top-tier work and run a great crew. But relying on word-of-mouth creates feast-or-famine cycles, and lead broker platforms sell the exact same homeowner to 4 other contractors who enter a race to the bottom on price.
            </p>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 md:p-10 border-l-4 border-l-[#a60724] mb-12 shadow-2xl">
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                When you run dedicated local Meta and Google ad campaigns, you control your own pipeline. Just <span className="text-white font-bold">2 to 4 additional high-ticket projects</span> each month can add <span className="text-[#a60724] font-bold">$20,000 to $60,000+ in profitable revenue</span> directly to your bottom line.
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                Modern homeowners don't wait weeks for a recommendation. When they decide on a patio, roof replacement, HVAC installation, or remodel, they look online. If you aren't dominating local search and social feeds, your competitors are capturing those jobs.
              </p>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                We build, launch, and manage targeted local ad campaigns on Facebook, Instagram, and Google. We drive local high-intent homeowners straight to your calendar so you can focus on building and scaling your crews.
              </p>
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={scrollToBooking}
                className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all shadow-[0_10px_40px_-10px_rgba(166,7,36,0.5)] active:scale-95 animate-glow"
              >
                Claim Your Territory
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section ref={bookingRef} className="py-20 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-3">Claim Your Territory</h2>
            <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto">
              Schedule a 15-minute Discovery Call to see available zip codes in your market and review our proven contractor ad campaigns.
            </p>
          </div>
          <div className="w-full">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/J26pPUC4BfGNHYoc5HG9"
              className="w-full min-h-[1050px] md:min-h-[900px]"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              id="J26pPUC4BfGNHYoc5HG9_contractors"
              title="Contractor Booking Widget"
            />
          </div>
        </div>
      </section>

      {/* Deliverables & Features Section */}
      <section className="py-20 px-6 bg-[#09090b] relative border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#a60724] mb-3">
              Done-For-You Advertising
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Everything Included In Your Partnership
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto">
              We build, launch, and manage targeted local Meta &amp; Google ad campaigns to scale your contracting business with exclusive, pre-qualified leads.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#a60724]" />
            
            <div className="p-6 md:p-10">
              <div className="max-w-2xl mx-auto mb-10">
                {[
                  "Targeted Meta Ad Campaigns (Facebook & Instagram)",
                  "High-Intent Google Ads targeting local homeowners searching for your services",
                  "Custom, High-Converting Lead Capture Landing Pages",
                  "100% Exclusive Leads & Territory — never resold or shared",
                  "Precise Local Geo-Targeting by zip code, city, and service radius",
                  "Homeowner Pre-Qualification filtering for project scope & budget",
                  "Continuous Ad Creative, Copy & Audience A/B Testing",
                  "Quick 7-Day Onboarding — we handle campaign launch and setup",
                  "Transparent Monthly Lead Volume & Ad Spend Performance Reporting"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 py-3.5 border-b border-zinc-800/50 group">
                    <Check className="text-[#a60724] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-zinc-300 text-sm md:text-base font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={scrollToBooking}
                  className="w-full bg-[#a60724] hover:bg-[#8b061e] text-white py-5 rounded-xl text-base md:text-lg font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 animate-glow"
                >
                  Claim Your Territory
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            <AccordionItem 
              title="How do targeted Meta & Google ads get us consistent leads?" 
              isOpen={openAccordion === 0}
              onToggle={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
            >
              <div className="space-y-4 text-left">
                <p>We build and run hyper-targeted Meta (Facebook &amp; Instagram) and Google ad campaigns dialed in specifically for your trade and service radius. We drive local homeowners to high-converting landing pages designed to capture project details and booking requests directly for your business.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Are these leads exclusive to my business?" 
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <div className="space-y-4 text-left">
                <p>Yes, 100%. Unlike Angi, HomeAdvisor, or Thumbtack, we never sell your leads to multiple contractors. Every inquiry generated through our campaigns belongs solely to you and goes straight to your calendar and notifications.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Why run ads instead of using shared lead directories?" 
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <div className="space-y-4 text-left">
                <p>Shared lead platforms force you into a race-to-the-bottom price war with 4 other contractors calling the homeowner at the same time. With targeted Meta and Google ads, you establish brand authority and capture homeowners with real budgets who specifically want to work with you.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="How quickly do our ad campaigns go live?" 
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <div className="space-y-4 text-left">
                <p>We move fast. After our initial Discovery Call and brief onboarding, our team writes the copy, designs the ad creatives, builds your dedicated landing pages, and configures local targeting within 5 to 7 business days.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Which contractor trades do you work with?" 
              isOpen={openAccordion === 4}
              onToggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
            >
              <div className="space-y-4 text-left">
                <p>We specialize in trade businesses that do high-ticket installations and renovations: Hardscapers, Paver &amp; Patio Builders, Roofers, Landscaping Contractors, HVAC, Concrete &amp; Masonry, Remodelers, and specialty trades. If you deliver high-ticket jobs and want consistent monthly project volume, our ad system works for you.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Do I have to sign a long-term contract?" 
              isOpen={openAccordion === 5}
              onToggle={() => setOpenAccordion(openAccordion === 5 ? null : 5)}
            >
              <div className="space-y-4 text-left">
                <p>No contracts, ever. We believe in earning your business every single month with real results. There are zero long-term commitments or lock-ins — you stay with us because your calendar is full of profitable projects.</p>
              </div>
            </AccordionItem>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={scrollToBooking}
              className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all animate-glow"
            >
              Claim Your Territory
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
