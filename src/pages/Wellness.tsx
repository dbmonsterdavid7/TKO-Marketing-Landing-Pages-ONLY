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
  Calendar,
  Search,
  Sparkles,
  Heart,
  Star,
  ShieldCheck
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

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

export default function Wellness() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isAnnual, setIsAnnual] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Sticky Top Bar (Acquisition Style) */}
      <div className="bg-zinc-900 sticky top-0 z-[60] shadow-lg cursor-pointer overflow-hidden py-2 md:py-3" onClick={scrollToBooking}>
        {/* Mobile & Tablet Scrolling Banner */}
        <div className="lg:hidden">
          <div className="animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-x-4 px-4">
              <p className="text-white text-[12px] font-bold tracking-wide flex items-center gap-x-2">
                Limited spots available — we only onboard 10 new clients per month to ensure quality <span className="text-[#a60724]">→ Claim your spot</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.8</span>
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
                Limited spots available — we only onboard 10 new clients per month to ensure quality <span className="text-[#a60724]">→ Claim your spot</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.8</span>
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

        {/* Desktop Static Banner */}
        <div className="hidden lg:flex justify-center items-center px-6">
          <p className="text-white text-sm font-bold tracking-wide flex items-center gap-x-2">
            Limited spots available — we only onboard 10 new clients per month to ensure quality <span className="text-[#a60724]">→ Claim your spot</span> <span className="text-white/40">|</span> <span className="text-[#a60724] uppercase">Rated 4.8</span>
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

      {/* Hero Section (Acquisition Structure) */}
      <section className="relative z-10 pt-8 md:pt-32 pb-8 md:pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-8 bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
              You're Losing <br className="hidden md:block" /> Customers Every Day.
            </h1>
            <h2 className="text-base md:text-xl font-normal text-zinc-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Nearly <strong>half of all customer calls happen when you're unavailable.</strong> We text them back in 60 seconds — automatically — so you never lose another booking to a competitor who answered first.
            </h2>
          </motion.div>

          {/* Takeover Marketing Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-lg mx-auto py-12"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1sho8dWDi-MCebAi3XaxFl6Lrh0VK8ZPj" 
              alt="Takeover Marketing Logo" 
              className="w-full h-auto drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Action Section (Acquisition Structure) */}
      <section className="bg-white pt-8 md:pt-24 pb-16 md:pb-24 px-6 relative z-10 border-y border-zinc-100">
        <div className="max-w-3xl mx-auto text-center">
          <button 
            onClick={scrollToBooking}
            className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all shadow-[0_10px_40px_-10px_rgba(166,7,36,0.5)] active:scale-95 mb-8 md:mb-12"
          >
            STOP LOSING CUSTOMERS - $269/mo
          </button>
          <p className="text-xl md:text-2xl text-zinc-900 leading-relaxed">
            It's a <span className="font-bold border-b-2 border-[#a60724]">fully automated acquisition system</span> designed specifically to capture every missed call and turn them into loyal, repeat customers for your wellness business.
          </p>
        </div>
      </section>

      {/* Market Data Section (Replacing Social Proof) */}
      <section className="py-24 px-6 bg-[#fff1f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-zinc-900">Why speed to lead matters:</h2>
            <div className="w-24 h-1 bg-[#a60724] mx-auto opacity-50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">62%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of customers will not call back if you don't answer the first time
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: Invoca Call Intelligence Report
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">48%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of all inbound calls come after hours or during peak service hours
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: Zenoti Beauty & Wellness Benchmark Report
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">78%</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  of customers book with whoever responds first — not the best option
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Source: LeadResponseManagement.org study
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col justify-between items-center text-center group hover:border-[#a60724] transition-all">
              <div>
                <p className="text-5xl font-black text-[#a60724] mb-4">$1,200</p>
                <p className="text-zinc-700 font-medium leading-relaxed mb-6">
                  average annual value of a single repeat client in beauty & wellness
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Based on avg ticket × typical visit frequency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Problem Section (Modified from Image Reference) */}
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
              Your phone goes to voicemail. <br />
              They go to your competitor.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
              You're good at what you do. The problem isn't your service — it's what happens when someone tries to reach you and you're with a client, closed for the night, or just slammed.
            </p>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 md:p-10 border-l-4 border-l-[#a60724] mb-12 shadow-2xl">
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                If your average service is <span className="text-white font-bold">$70</span> and a client comes back every <span className="text-white font-bold">3 weeks</span>, that's one customer worth <span className="text-[#a60724] font-bold">~$1,200 per year.</span> If you miss <span className="text-white font-bold">just 5 calls a month</span>, you're leaving <span className="text-[#a60724] font-bold">$6,000+ in annual revenue</span> on the table — going straight to whoever texted them back first.
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                The hard truth: most small businesses lose 10–20 potential customers a month to missed calls alone. Not because they're bad at business. Because they have <span className="text-[#a60724] font-bold">no system</span> to capture them.
              </p>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                That's exactly what we fix. Instantly. For less than you'd spend on a single no-show appointment.
              </p>
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={scrollToBooking}
                className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all shadow-[0_10px_40px_-10px_rgba(166,7,36,0.5)] active:scale-95"
              >
                STOP LOSING CUSTOMERS - $269/mo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget Placeholder (Acquisition Structure) */}
      <section ref={bookingRef} className="py-20 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">Book Your Spot</h2>
          </div>
          <div className="w-full">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/J26pPUC4BfGNHYoc5HG9"
              className="w-full min-h-[1050px] md:min-h-[900px]"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              id="J26pPUC4BfGNHYoc5HG9_1776726426900"
              title="Wellness Booking Widget"
            />
          </div>
        </div>
      </section>

      {/* Pricing & Features Section (Reduced Size) */}
      <section className="py-16 px-6 bg-[#09090b] relative border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Everything included.<br />No hidden fees.
            </h2>
            <p className="text-base md:text-lg text-zinc-500">
              One flat monthly price. We set it all up. Your business profits.
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
                  className={`w-12 h-6 bg-zinc-800 rounded-full relative flex items-center p-1 transition-all duration-500 border hover:border-zinc-500 ${isAnnual ? "shadow-[0_0_20px_rgba(166,7,36,0.6)] border-[#a60724]/50" : "border-zinc-700"}`}
                >
                  <div className={`w-4 h-4 bg-[#a60724] rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(166,7,36,0.3)] ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isAnnual ? "text-[#a60724]" : "text-zinc-500"}`}>Annual</span>
                  <span className="bg-[#a60724] text-zinc-900 text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(166,7,36,0.4)] animate-pulse">SAVE 25%</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                <div className="flex flex-col items-center md:items-start">
                  <div className="inline-flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-500">$</span>
                    <span className="text-6xl font-black text-white">{isAnnual ? "2,570" : "269"}</span>
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

                {!isAnnual && (
                  <>
                    <div className="hidden md:block w-px h-10 bg-zinc-800" />

                    <div className="flex flex-col items-center md:items-start pt-2 md:pt-0">
                      <p className="text-2xl md:text-3xl font-black text-white">+$199</p>
                      <p className="text-[#a60724] font-bold uppercase tracking-widest text-[10px]">
                        one-time setup fee
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="max-w-2xl mx-auto mb-10">
                {[
                  "Missed Call Text-Back System — connected to your business number",
                  "Automated Google Review Funnel — sent after every appointment",
                  "Custom Professional Website — built and hosted for you",
                  "Online Booking Calendar or Appointment Request Form",
                  "Google Business Profile Optimization (one-time, on signup)",
                  "Full setup and onboarding — done for you within 7-10 days",
                  "Ongoing system monitoring and support"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 py-3 border-b border-zinc-800/50 group">
                    <span className="text-[#a60724] font-black mt-0.5 shrink-0">—</span>
                    <span className="text-zinc-300 text-sm md:text-base font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={scrollToBooking}
                  className="w-full bg-[#a60724] hover:bg-[#8b061e] text-white py-5 rounded-xl text-base md:text-lg font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  Claim Your Spot — Get Started Today
                </button>
              </div>

              <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                <div className="w-10 h-10 bg-[#a60724]/10 flex items-center justify-center rounded-xl shrink-0" >
                  <ShieldCheck className="w-6 h-6 text-[#a60724]" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-tight mb-1">
                    30-Day "It Works or It's Free" Guarantee
                  </h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    If your missed call text-back system doesn't recover at least one customer in your first 30 days, we'll refund your first month. No questions asked. You have zero risk trying this.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Acquisition Structure) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">Questions?</h2>
          </div>
          
          <div className="space-y-4">
            <AccordionItem 
              title="Do I need to change my business phone number?" 
              isOpen={openAccordion === 0}
              onToggle={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
            >
              <div className="space-y-4 text-left">
                <p>No. We connect the system to your existing business number. Your clients call the same number they always have. The automation works in the background without you changing anything.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="What does the automated text actually say?" 
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <div className="space-y-4 text-left">
                <p>We write it in your voice and customize it for your business. A typical message looks like: <span className="italic">"Hey! Sorry we missed your call — we'd love to help. What can we do for you?"</span> When they reply, the conversation comes directly to your phone like a normal text thread. Our system can continue following up with the conversation to book an appointment with your customer or you can take over the conversation manually whenever.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="What if I already have a website?" 
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <div className="space-y-4 text-left">
                <p>We can either replace it with a better one, or add the booking form and connect the automation to your existing site. Either way, you're covered. Your old site doesn't go anywhere until you say so.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Can I cancel if it's not working?" 
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <div className="space-y-4 text-left">
                <p>Yes, anytime — no contracts, no cancellation fees. We also offer a 30-day money-back guarantee if the system doesn't recover at least one customer in your first month. We're confident it will.</p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="What kind of businesses does this work best for?" 
              isOpen={openAccordion === 4}
              onToggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
            >
              <div className="space-y-4 text-left">
                <p>Any local service business where calls = customers. Our best results come from med spas, lash studios, massage therapists, nail salons, hair salons, estheticians, yoga and Pilates studios, and appointment-based wellness practices. If people call you to book — this works.</p>
              </div>
            </AccordionItem>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={scrollToBooking}
              className="w-full md:w-auto px-10 py-5 rounded-xl bg-[#a60724] hover:bg-[#8b061e] text-white text-lg md:text-xl font-black uppercase tracking-wider transition-all"
            >
              STOP LOSING CUSTOMERS - $269/mo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
