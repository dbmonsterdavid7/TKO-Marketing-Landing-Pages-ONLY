import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
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
  const [isAnnual, setIsAnnual] = useState(false);
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
                Limited to 10 new contractors per month to ensure dedicated growth support <span className="text-[#a60724]">→ Claim your area</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.9</span>
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
                Limited to 10 new contractors per month to ensure dedicated growth support <span className="text-[#a60724]">→ Claim your area</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.9</span>
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
            Limited to 10 new contractors per month to ensure dedicated growth support <span className="text-[#a60724]">→ Claim your area</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.9</span>
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
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent leading-[1.1]">
              We Get Contractors More Jobs Using AI, Smart Websites, and 5-Star Review Systems — Just <span className="italic">$269/mo</span>
            </h1>
            <h2 className="text-base md:text-xl font-normal text-zinc-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Missed a call on the job? Our system texts them back in 60 seconds so you book it before they call your competitor.
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
            I Want More Jobs
          </button>
          <p className="text-xl md:text-2xl text-zinc-900 leading-relaxed">
            It's a <span className="font-bold border-b-2 border-[#a60724]">hands-free lead capture system</span> designed specifically to move the needle for home service businesses such as HVAC, plumbing, and landscapers.
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
                <p className="text-5xl font-black text-[#a60724] mb-4">67%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of homeowners will not leave a voicemail and simply call the next contractor
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: ServiceTitan Industry Insights
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">45%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of service inquiries happen while you're on a job site or after hours
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: HomeAdvisor Contractor Report
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">82%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of customers hire the first professional who replies to their message
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: Angi Business Growth Study
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">$3,500</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  average job value across HVAC, roofing, and specialty trade services
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
              Your phone rings mid-job. <br />
              If you miss it, they've already called the next guy.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
              You're the best in your area. But homeowners aren't patient. When you're "busy" on a job site, you're literally handing thousands of dollars in revenue to your biggest competitors.
            </p>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 md:p-10 border-l-4 border-l-[#a60724] mb-12 shadow-2xl">
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                If your average job is <span className="text-white font-bold">$1,500</span> and you miss <span className="text-white font-bold">just 3 calls a week</span>, that's <span className="text-[#a60724] font-bold">$18,000+ in potential monthly revenue</span> going to the guy who was faster on his phone.
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                Modern customers don't leave voicemails. They want an instant response. Without a 24/7 automated text-back system, you're trying to win a race with one hand tied behind your back.
              </p>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                We install a system that handles the "first touch" for you. It keeps the lead warm while you're actually doing the work.
              </p>
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={scrollToBooking}
                className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all shadow-[0_10px_40px_-10px_rgba(166,7,36,0.5)] active:scale-95 animate-glow"
              >
                I Want More Jobs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget Placeholder */}
      <section ref={bookingRef} className="py-20 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">Claim Your Territory</h2>
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

      {/* Pricing & Features Section */}
      <section className="py-16 px-6 bg-[#09090b] relative border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              One Price.<br />No Contracts.
            </h2>
            <p className="text-base md:text-lg text-zinc-500">
              Stop paying marketing agencies thousands every month for low quality leads. Own your platform.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#a60724]" />
            
            <div className="p-6 md:p-10">
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${!isAnnual ? "text-[#a60724]" : "text-zinc-500"}`}>Monthly</span>
                <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`w-12 h-6 bg-zinc-800 rounded-full relative flex items-center p-1 transition-all duration-500 border hover:border-zinc-500 ${isAnnual ? "shadow-[0_0_20px_rgba(34,197,94,0.6)] border-green-500/50" : "border-zinc-700"}`}
                >
                  <div className={`w-4 h-4 ${isAnnual ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "bg-[#a60724] shadow-[0_0_10px_rgba(166,7,36,0.3)]"} rounded-full transition-all duration-300 ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isAnnual ? "text-green-500" : "text-zinc-500"}`}>Annual</span>
                  <span className="bg-green-500 text-zinc-900 text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse">SAVE 33%</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                <div className="flex flex-col items-center md:items-start">
                  <div className="inline-flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-500">$</span>
                    <span className="text-6xl font-black text-white">{isAnnual ? "2,700" : "269"}</span>
                  </div>
                  <p className="text-zinc-500 font-medium uppercase tracking-widest text-[10px] mt-1">
                    {isAnnual ? "per year — billed annually" : "per month — cancel anytime"}
                  </p>
                </div>

                {isAnnual && (
                  <>
                    <div className="hidden md:block w-px h-10 bg-zinc-800" />

                    <div className="flex flex-col items-center md:items-start pt-2 md:pt-0">
                      <p className="text-2xl md:text-3xl font-black text-white">+3 EXTRA</p>
                      <p className="text-[#a60724] font-bold uppercase tracking-widest text-[10px]">
                        months free
                      </p>
                    </div>
                  </>
                )}

                {/* Removed setup fee from monthly pricing */}
              </div>

              <div className="max-w-2xl mx-auto mb-10">
                {[
                  "Free High Converting Website — optimized for mobile/tablet",
                  "Trades-Specific Missed Call Text-Back System",
                  "Automatic Customer Review Collector — rank on the front page of Google",
                  "Online Job Request & Quote Forms",
                  "Google Business Profile Overhaul for more local visibility",
                  "Super Quick onboarding — we handle everything in 7 days",
                  "Ongoing local SEO and speed-to-lead monitoring"
                ].map((feature, i) => {
                  const isFreeWebsite = feature.startsWith("Free High Converting Website");
                  return (
                    <div key={i} className="flex items-start gap-4 py-3 border-b border-zinc-800/50 group">
                      <Check className={`${isFreeWebsite ? "text-green-500" : "text-[#a60724]"} w-5 h-5 mt-0.5 shrink-0`} />
                      <span className={`${isFreeWebsite ? "text-green-500" : "text-zinc-300"} text-sm md:text-base font-medium`}>{feature}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button 
                  onClick={scrollToBooking}
                  className="w-full bg-[#a60724] hover:bg-[#8b061e] text-white py-5 rounded-xl text-base md:text-lg font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 animate-glow"
                >
                  I Want More Jobs
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
              title="Will this mess with my current phone number?" 
              isOpen={openAccordion === 0}
              onToggle={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
            >
              <div className="space-y-4 text-left">
                <p>Absolutely not. We connect your existing business number. When you miss a call, our system detects it and sends a text from your business. You don't change a thing about how you answer the phone.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="What if the person just wants a quote?" 
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <div className="space-y-4 text-left">
                <p>The text-back system starts the conversation immediately. It can say: <span className="italic">"Hey, sorry I'm on a job! Is this for a repair or a new installation?"</span> Once they reply, you can see the thread on your phone and jump in when you're off the ladder, or have our AI assistant gather their address and job details for you.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Is this like HomeAdvisor or Thumbtack?" 
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <div className="space-y-4 text-left">
                <p>No. Those sites sell your leads to 5 other guys. We help you OWN the leads that are already trying to call you. This is your system, your brand, and your customers. No shared leads, no "pay per lead" gambling.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="How long does it take to get running?" 
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <div className="space-y-4 text-left">
                <p>We're efficient. Once you sign up and we have a quick chat about your business, we can have your new site and text-back system live in about 7-10 business days.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Which trades does this work for?" 
              isOpen={openAccordion === 4}
              onToggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
            >
              <div className="space-y-4 text-left">
                <p>Plumbing, HVAC, Landscaping, Roofing, Electrical, Painting, Pressure Washing, Junk Removal, and General Contractors. If your phone rings while you're working, you need this.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="What if I already have a website?" 
              isOpen={openAccordion === 5}
              onToggle={() => setOpenAccordion(openAccordion === 5 ? null : 5)}
            >
              <div className="space-y-4 text-left">
                <p>We can either replace it with a better one, or add the booking form and connect the automation to your existing site. Either way, you're covered. Your old site doesn't go anywhere until you say so.</p>
              </div>
            </AccordionItem>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={scrollToBooking}
              className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all animate-glow"
            >
              I Want More Jobs
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
