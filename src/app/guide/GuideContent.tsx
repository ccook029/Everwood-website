"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import FadeInUp from "../../components/ui/FadeInUp";
import SaunaQuiz from "./SaunaQuiz";

const sections = [
  { id: "types", label: "Types of Saunas" },
  { id: "infrared-types", label: "Full Spectrum vs Carbon Panel" },
  { id: "sizing", label: "Choosing the Right Size" },
  { id: "location", label: "Indoor vs Outdoor" },
  { id: "electrical", label: "Electrical Requirements" },
  { id: "health", label: "Health Benefits" },
  { id: "maintenance", label: "Maintenance & Care" },
  { id: "quiz", label: "Find Your Sauna" },
];

export default function GuideContent() {
  const [activeSection, setActiveSection] = useState("types");
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  const tocList = (
    <ul className="space-y-1">
      {sections.map(({ id, label }) => (
        <li key={id}>
          <button
            onClick={() => scrollTo(id)}
            className={`block w-full text-left text-sm py-1.5 pl-4 border-l-2 transition-colors ${
              activeSection === id
                ? "border-cedar text-cedar font-semibold"
                : "border-transparent text-charcoal/50 hover:text-charcoal/80"
            }`}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Mobile TOC */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center justify-between w-full rounded-lg bg-warmWhite px-4 py-3 text-sm font-semibold text-charcoal"
          >
            Table of Contents
            <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
          </button>
          {tocOpen && <div className="mt-2 rounded-lg bg-warmWhite px-4 py-3">{tocList}</div>}
        </div>

        <div className="flex gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/40 mb-4">On this page</p>
              {tocList}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 max-w-prose">

            {/* Section 1: Types of Saunas */}
            <section id="types" className="scroll-mt-24 pb-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Types of Saunas Explained</h2>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Before choosing a sauna, it helps to understand the three main heating technologies available today. Each delivers genuine health benefits, but the experience, installation requirements, and price points differ significantly.
                </p>

                <div className="aspect-video bg-stone/20 rounded-lg mb-8 flex items-center justify-center">
                  <span className="text-sm text-charcoal/30">Sauna types comparison image</span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-8 mb-3">Infrared Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Infrared saunas use invisible light waves to heat your body directly, rather than heating the air around you. Think of it like standing in warm sunlight on a cool day — the air temperature is moderate, but you feel warmth penetrating your skin. This makes infrared saunas comfortable for people who find traditional steam saunas overwhelming.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Operating temperatures range from 45-65°C (113-150°F), significantly lower than steam saunas, yet many users report sweating just as much due to the direct tissue heating. Infrared saunas warm up in just 10-20 minutes, use less electricity, and fit in smaller spaces. They come in two main subtypes: <strong>full spectrum</strong> (emitting near, mid, and far infrared wavelengths for the deepest therapeutic penetration) and <strong>carbon panel</strong> (emitting far infrared for even, efficient heating at a lower price point).
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-6">
                  Explore our infrared collections: <Link href="/collections/solace-series" className="text-cedar hover:underline">Solace Series (Full Spectrum)</Link> and <Link href="/collections/glow-series" className="text-cedar hover:underline">Glow Series (Carbon Panel)</Link>.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-8 mb-3">Traditional Steam Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Traditional steam saunas — the kind you would find in Finland, where sauna culture originated — work by heating an electric stove loaded with natural stones. When you ladle water over the hot stones, it creates a burst of steam (called löyly) that fills the cabin with humid heat. The temperatures range from 70-100°C (158-212°F), delivering an intense, full-body experience.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  The ritual of tending the stones, controlling the steam, and cycling between intense heat and cool air is a deeply satisfying practice that has been central to Nordic wellness for centuries. Steam saunas excel as social spaces — the higher ceilings and tiered benches accommodate groups and create natural temperature zones.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-6">
                  Explore our <Link href="/collections/summit-series" className="text-cedar hover:underline">Summit Series</Link> for traditional steam saunas.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-8 mb-3">Dual System Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-6">
                  Dual system saunas combine infrared panels and a traditional steam stove in a single cabin. Switch between gentle infrared therapy and intense steam sessions, or run both simultaneously for a hybrid experience. They cost more upfront but eliminate the need to choose — ideal for households where preferences differ or for enthusiasts who want maximum flexibility. See our <Link href="/collections/harmony-series" className="text-cedar hover:underline">Harmony Series</Link>.
                </p>

                {/* Comparison Table */}
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[500px] text-sm rounded-lg overflow-hidden border border-stone/30">
                    <thead>
                      <tr className="bg-charcoal text-cream">
                        <th className="px-4 py-3 text-left font-semibold">Feature</th>
                        <th className="px-4 py-3 text-left font-semibold">Infrared</th>
                        <th className="px-4 py-3 text-left font-semibold">Steam</th>
                        <th className="px-4 py-3 text-left font-semibold">Dual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Temperature", "45-65°C / 113-150°F", "70-100°C / 158-212°F", "Both ranges"],
                        ["Warm-Up Time", "10-20 minutes", "30-45 minutes", "15-30 minutes"],
                        ["Energy Use", "1.3-2.7 kW", "3-9 kW", "Combined system"],
                        ["Space Needed", "Small — fits a closet", "Medium to large", "Medium to large"],
                        ["Price Range", "From $2,799", "From $3,999", "From $5,999"],
                        ["Best For", "Daily gentle therapy", "Authentic intense heat", "Maximum flexibility"],
                      ].map(([feature, infrared, steam, dual], i) => (
                        <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                          <td className="px-4 py-3 font-medium text-charcoal">{feature}</td>
                          <td className="px-4 py-3 text-charcoal/70">{infrared}</td>
                          <td className="px-4 py-3 text-charcoal/70">{steam}</td>
                          <td className="px-4 py-3 text-charcoal/70">{dual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeInUp>
            </section>

            {/* Section 2: Full Spectrum vs Carbon Panel */}
            <section id="infrared-types" className="scroll-mt-24 py-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Full Spectrum vs Carbon Panel Infrared</h2>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  If you have decided on an infrared sauna, your next choice is the type of heater. The two modern options are full spectrum and carbon panel — each with distinct advantages.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-8 mb-3">Full Spectrum Infrared</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Full spectrum heaters emit all three wavelengths of infrared light: near (700-1400nm), mid (1400-3000nm), and far (3000nm+). Near infrared penetrates deepest into tissue and is associated with skin rejuvenation, wound healing, and cellular energy production. Mid infrared targets joints and soft tissue, supporting pain relief and improved circulation. Far infrared produces the most heat and promotes deep sweating and detoxification.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  By combining all three wavelengths, full spectrum saunas deliver the widest range of therapeutic benefits in a single session. This is the premium choice for users who want maximum health returns from their sauna investment. Our <Link href="/collections/solace-series" className="text-cedar hover:underline">Solace Series</Link> features full spectrum heaters in every model.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-8 mb-3">Carbon Panel Infrared</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Carbon panel heaters emit far infrared wavelengths across a large, flat surface area. This creates exceptionally even heat distribution — no hot spots, no cold corners. Carbon panels are energy efficient, long-lasting, and produce very low EMF (electromagnetic field) levels. They are the most popular heater type in modern infrared saunas.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  While carbon panels lack the near and mid wavelengths of full spectrum heaters, far infrared alone delivers significant benefits including deep sweating, muscle relaxation, and stress relief. Our <Link href="/collections/glow-series" className="text-cedar hover:underline">Glow Series</Link> uses carbon panel technology at a more accessible price point.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-8 mb-3">Ceramic Tube (Legacy Technology)</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Ceramic tube heaters are an older infrared technology that produces intense, focused heat from small rod-shaped elements. While effective, they create uneven heating patterns — areas close to the tubes get very hot while other areas remain cool. Ceramic heaters also consume more energy and have a shorter lifespan than carbon panels. You may encounter ceramic tube saunas from other brands, but Everwood does not use this technology in any of our models.
                </p>

                <div className="rounded-lg bg-warmWhite p-6 mt-6">
                  <p className="text-sm font-semibold text-charcoal mb-2">Our Recommendation</p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    Choose <strong>full spectrum</strong> if you want the maximum therapeutic range and are willing to invest in the premium option. Choose <strong>carbon panel</strong> if you want excellent infrared therapy at a more accessible price point — you will still get a fantastic sauna experience.
                  </p>
                </div>
              </FadeInUp>
            </section>

            {/* Section 3: Sizing */}
            <section id="sizing" className="scroll-mt-24 py-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Choosing the Right Size</h2>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Sauna size affects everything: where it fits, how many people can use it, the electrical requirements, and the price. Here is how to think about sizing:
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">1-Person Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  The smallest footprint — roughly 90x90cm (35x35 inches). These fit in a bedroom corner, walk-in closet, home office, or condo balcony. Ideal for apartment dwellers and anyone who wants a personal daily wellness ritual. Most 1-person models plug into a standard 120V outlet.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">2-Person Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Our most popular size. Roughly 120x105cm (47x41 inches). Fits comfortably in a spare room, basement, or garage. Spacious enough for one person to stretch out fully, or cozy for two people side by side. Still compact enough for most homes.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">3-4 Person Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Family-sized models ranging from 150x120cm to 180x180cm. These need a dedicated space — a basement corner, garage bay, or purpose-built room. Great for couples who want extra room to move, families with older children, or anyone who uses their sauna for stretching and yoga.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">5+ Person Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-6">
                  Entertainment-sized saunas for social use. These are typically outdoor models (barrel saunas, cabins) with generous interior space. Perfect for hosting friends, post-game recovery sessions, or making sauna time a family gathering.
                </p>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[500px] text-sm rounded-lg overflow-hidden border border-stone/30">
                    <thead>
                      <tr className="bg-charcoal text-cream">
                        <th className="px-4 py-3 text-left font-semibold">Size</th>
                        <th className="px-4 py-3 text-left font-semibold">Min. Room Space</th>
                        <th className="px-4 py-3 text-left font-semibold">Typical Models</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["1 Person", "5' x 5' (1.5m x 1.5m)", "Solace 1"],
                        ["2 Person", "6' x 6' (1.8m x 1.8m)", "Solace 2, Glow 2, Summit 2"],
                        ["3-4 Person", "8' x 7' (2.4m x 2.1m)", "Solace 3-4, Glow Corner 4, Harmony 3"],
                        ["5+ Person", "10' x 10' (3m x 3m) or outdoor", "Summit 4-6, Timberline, Harmony 5, Lodge"],
                      ].map(([size, room, models], i) => (
                        <tr key={size} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                          <td className="px-4 py-3 font-medium text-charcoal">{size}</td>
                          <td className="px-4 py-3 text-charcoal/70">{room}</td>
                          <td className="px-4 py-3 text-charcoal/70">{models}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeInUp>
            </section>

            {/* Section 4: Indoor vs Outdoor */}
            <section id="location" className="scroll-mt-24 py-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Indoor vs Outdoor Saunas</h2>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">Indoor Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Indoor saunas are the most convenient option — they are climate controlled, accessible year-round regardless of weather, and typically easier to install. Most infrared models are designed for indoor use and simply need a flat floor, adequate clearance from walls (usually 2-3 inches), and access to the appropriate electrical outlet.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Key considerations for indoor installation: ensure adequate ventilation in the room (a window or exhaust fan), protect flooring from potential moisture (especially with steam models), and verify that your electrical panel can support the sauna&apos;s requirements. Basements, spare bedrooms, garages, and large bathrooms are all popular locations.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">Outdoor Saunas</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Outdoor saunas — barrel saunas and cabin models — transform your backyard into a Nordic wellness retreat. The experience of stepping from a hot sauna into cool fresh air is invigorating and is a core part of traditional sauna culture. Outdoor models are built with weather-resistant materials like Canadian Red Cedar and thermo-treated wood that stand up to rain, snow, and UV exposure.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Installation requirements include a level, stable surface (concrete pad, paver stones, or reinforced deck), an electrical run from your panel to the sauna location, and adequate clearance from fences and structures. Consider proximity to your house for convenience, drainage for water runoff, and local building codes. Some municipalities require permits for outdoor structures — check with your local building department before installation.
                </p>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Explore our outdoor collections: <Link href="/collections/timberline-series" className="text-cedar hover:underline">Timberline Series (Barrel)</Link> and <Link href="/collections/lodge-series" className="text-cedar hover:underline">Lodge Series (Cabin)</Link>.
                </p>
              </FadeInUp>
            </section>

            {/* Section 5: Electrical Requirements */}
            <section id="electrical" className="scroll-mt-24 py-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Electrical Requirements</h2>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-6">
                  <p className="text-sm font-semibold text-amber-900">Important: Read this section before ordering.</p>
                  <p className="text-sm text-amber-800 mt-1">Understanding your electrical setup prevents delays, additional costs, and returns. A few minutes of preparation here saves significant hassle later.</p>
                </div>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">120V / 15A — Standard Outlet</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Smaller infrared saunas (1-2 person models) operate on a standard North American household outlet. No electrician needed — simply plug in and use. However, avoid using extension cords or power strips. Plug directly into a wall outlet on a circuit that is not heavily loaded with other appliances.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">120V / 20A — Dedicated Circuit</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Mid-size infrared models draw more power and should be on a dedicated 20-amp circuit — meaning nothing else shares that breaker. Many homes already have 20A circuits in kitchens and bathrooms. An electrician can verify your setup or install a dedicated circuit for $100-200 if needed.
                </p>

                <h3 className="font-heading text-xl font-semibold text-charcoal mt-6 mb-3">240V / 20-40A — Dedicated Circuit (Electrician Required)</h3>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  All steam saunas, large infrared models, barrel saunas, and cabin saunas require a 240V dedicated circuit installed by a licensed electrician. This is similar to what an electric dryer, oven, or hot tub uses. The specific amperage (20A, 30A, or 40A) depends on the model. Budget $300-800 for electrical installation, depending on the distance from your electrical panel to the sauna location.
                </p>

                <div className="overflow-x-auto -mx-4 sm:mx-0 mt-6">
                  <table className="w-full min-w-[500px] text-sm rounded-lg overflow-hidden border border-stone/30">
                    <thead>
                      <tr className="bg-charcoal text-cream">
                        <th className="px-4 py-3 text-left font-semibold">Collection</th>
                        <th className="px-4 py-3 text-left font-semibold">Electrical Requirement</th>
                        <th className="px-4 py-3 text-left font-semibold">Electrician Needed?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Solace 1-2", "120V / 15A standard", "No"],
                        ["Solace 3", "120V / 20A dedicated", "Recommended"],
                        ["Solace 4", "240V / 20A dedicated", "Yes"],
                        ["Glow 2", "120V / 15A standard", "No"],
                        ["Glow Corner 4", "120V / 20A dedicated", "Recommended"],
                        ["Summit (all)", "240V / 20-40A dedicated", "Yes"],
                        ["Timberline (all)", "240V / 30A dedicated", "Yes"],
                        ["Harmony (all)", "240V / 30A dedicated", "Yes"],
                        ["Lodge (all)", "240V / 20-30A dedicated", "Yes"],
                      ].map(([collection, req, electrician], i) => (
                        <tr key={collection} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                          <td className="px-4 py-3 font-medium text-charcoal">{collection}</td>
                          <td className="px-4 py-3 text-charcoal/70">{req}</td>
                          <td className="px-4 py-3 text-charcoal/70">{electrician}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-warmWhite p-6 mt-6">
                  <p className="text-sm font-semibold text-charcoal mb-2">Our Recommendation</p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    Check your electrical panel before ordering. If you are unsure about your home&apos;s capacity, have a licensed electrician do a quick assessment — typically $50-100 for a service call. This small upfront investment prevents surprises after your sauna arrives.
                  </p>
                </div>
              </FadeInUp>
            </section>

            {/* Section 6: Health Benefits */}
            <section id="health" className="scroll-mt-24 py-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Health Benefits of Regular Sauna Use</h2>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Regular sauna use has been studied extensively, particularly in Finland where sauna bathing is a daily practice for much of the population. While individual results vary, the following benefits are supported by published research:
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    ["Muscle Recovery & Pain Relief", "Heat increases blood flow to muscles and joints, accelerating recovery after exercise and easing chronic pain conditions. Many athletes use saunas as part of their recovery protocol."],
                    ["Stress Reduction", "Sauna sessions promote the release of endorphins and reduce cortisol levels. The forced disconnection from screens and obligations creates a natural mindfulness practice."],
                    ["Improved Circulation", "Repeated heat exposure trains your cardiovascular system, improving blood flow and vascular function over time. Some studies compare the cardiovascular benefits to moderate exercise."],
                    ["Skin Health", "Deep sweating cleanses pores and increases blood flow to the skin surface, promoting a healthy complexion. Infrared saunas in particular are associated with improvements in skin tone and elasticity."],
                    ["Better Sleep", "A sauna session 1-2 hours before bedtime helps regulate your body temperature cycle, making it easier to fall asleep and improving sleep quality."],
                    ["Cardiovascular Health", "A landmark Finnish study following over 2,300 men for 20 years found that frequent sauna use was associated with a significantly reduced risk of cardiovascular events."],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-cedar mt-2.5 flex-shrink-0" />
                      <div>
                        <strong className="text-charcoal">{title}:</strong>{" "}
                        <span className="text-charcoal/70">{desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg bg-stone/20 p-6">
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    <strong className="text-charcoal">Medical Disclaimer:</strong> The information above is for educational purposes and is not medical advice. Consult your doctor before starting regular sauna use, especially if you have cardiovascular conditions, low blood pressure, are pregnant, or take medications that affect heat tolerance.
                  </p>
                </div>
              </FadeInUp>
            </section>

            {/* Section 7: Maintenance */}
            <section id="maintenance" className="scroll-mt-24 py-12 border-b border-stone/30">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">Maintenance & Care</h2>
                <p className="text-charcoal/80 leading-[1.8] mb-4">
                  Saunas are low-maintenance by nature, but a few simple habits will keep yours looking and performing like new for years:
                </p>

                <div className="space-y-4">
                  {[
                    ["After Every Session", "Wipe down benches and backrests with a dry towel to remove perspiration. Leave the sauna door open for 15-20 minutes to allow moisture to evaporate and air to circulate."],
                    ["Monthly", "Inspect the interior for any signs of wear. Lightly sand any rough spots on bench surfaces with fine-grit sandpaper (220 grit). Check that door hinges and latches operate smoothly."],
                    ["Twice Per Year", "Deep clean interior wood surfaces with a light sanding if needed. For steam saunas, inspect sauna stones and replace any that have cracked or crumbled. Check electrical connections and control panel operation."],
                    ["Outdoor Saunas", "Apply a UV-protective wood treatment to exterior surfaces annually. Clear debris from around the base. Check stainless steel bands (barrel saunas) for proper tension. Consider a sauna cover when not in regular use during off-seasons."],
                    ["Heater & Stove Care", "Infrared panels are maintenance-free — simply keep them clean and unobstructed. For steam stoves, replace sauna stones every 1-2 years as they degrade with repeated heating cycles. Never use damaged or river stones not rated for sauna use."],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-lg bg-warmWhite p-5">
                      <p className="font-semibold text-charcoal text-sm mb-1">{title}</p>
                      <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </FadeInUp>
            </section>

            {/* Section 8: Quiz */}
            <section id="quiz" className="scroll-mt-24 py-12">
              <FadeInUp>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-4">Find Your Perfect Sauna</h2>
                <p className="text-charcoal/80 leading-[1.8] mb-8">
                  Not sure where to start? Answer four quick questions and we will recommend the best Everwood sauna for your needs.
                </p>
                <SaunaQuiz />
              </FadeInUp>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
