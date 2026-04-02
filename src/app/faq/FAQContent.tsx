"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import FadeInUp from "@/components/ui/FadeInUp";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  heading: string;
  items: FAQItem[];
}

const faqGroups: FAQGroup[] = [
  {
    heading: "Ordering & Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, and Apple Pay through our secure Stripe checkout. All transactions are encrypted and PCI-compliant.",
      },
      {
        question: "Can I finance my sauna purchase?",
        answer:
          "We\u2019re working on financing options. In the meantime, contact us to discuss payment plans for orders over $4,000.",
      },
      {
        question: "Do you offer military/first responder discounts?",
        answer:
          "Yes. Contact us with verification and we\u2019ll provide a discount code for 5% off your order.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be cancelled or modified within 24 hours of placing them. After that, your order may have entered our fulfillment process. Contact us as soon as possible and we\u2019ll do our best to accommodate changes.",
      },
    ],
  },
  {
    heading: "Shipping & Delivery",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Every Everwood sauna is crafted to order to ensure the highest quality. Once your order is confirmed, allow 6\u20138 weeks for production and delivery. You\u2019ll receive tracking information as soon as your sauna ships. Select models may ship sooner when available in stock \u2014 check the product page for current availability.",
      },
      {
        question: "Do you ship to all of Canada and the US?",
        answer:
          "Yes, we offer free shipping to all Canadian provinces and continental US states. Alaska, Hawaii, and Canadian territories may have additional shipping charges \u2014 contact us for a quote.",
      },
      {
        question: "How does delivery work for large saunas?",
        answer:
          "Large saunas ship via LTL freight. The carrier will contact you to schedule a delivery window. Delivery is curbside or to your driveway/garage. You may need a helper to move boxes to the installation location. The driver will not carry items inside your home.",
      },
      {
        question: "Is shipping really free?",
        answer:
          "Yes, always. Free shipping is included on every order to Canada and the continental United States. No minimum order, no hidden fees.",
      },
    ],
  },
  {
    heading: "Assembly & Installation",
    items: [
      {
        question: "How difficult is assembly?",
        answer:
          "Most indoor infrared models assemble in 30\u201360 minutes with two adults and basic household tools. The panels click or slide together \u2014 no special skills required. Barrel saunas and outdoor cabins take 2\u20134 hours and benefit from having a second person to help.",
      },
      {
        question: "Do I need an electrician?",
        answer:
          "It depends on the model. Saunas rated for 120V/15A plug into any standard household outlet \u2014 no electrician needed. Models requiring 120V/20A should be on a dedicated circuit. All 240V models require a licensed electrician to install a dedicated circuit. Check the product page for your model\u2019s electrical requirements, or see our electrical guide for details.",
      },
      {
        question: "Do I need a permit?",
        answer:
          "Requirements vary by municipality. Indoor installations typically don\u2019t require permits. Outdoor structures like barrel saunas and cabins may require permits in some areas, particularly if they involve new electrical work. We recommend checking with your local building department before installation.",
      },
      {
        question: "Can I install a sauna in my apartment or condo?",
        answer:
          "Smaller 120V infrared models are apartment-friendly \u2014 they plug into a standard outlet and don\u2019t require any modifications. Check with your building management regarding any restrictions on electrical appliances or weight limits. We don\u2019t recommend steam saunas for apartments due to humidity and electrical requirements.",
      },
    ],
  },
  {
    heading: "Product & Technical",
    items: [
      {
        question: "What wood are your saunas made from?",
        answer:
          "Our indoor infrared models use premium Canadian Hemlock, known for its clean grain and hypoallergenic properties. Barrel saunas are crafted from Canadian Red Cedar, prized for natural rot resistance and beautiful aroma. Outdoor cabin models use thermo-treated wood for maximum weather resistance without chemical treatments.",
      },
      {
        question:
          "What\u2019s the difference between full spectrum and carbon panel infrared?",
        answer:
          "Full spectrum infrared emits near, mid, and far infrared wavelengths, providing the deepest tissue penetration and the widest range of therapeutic benefits. Carbon panel infrared emits far infrared only, offering even heat distribution at a more accessible price point. Both are effective \u2014 full spectrum is the premium choice. See our detailed comparison in the buying guide.",
      },
      {
        question: "How hot do infrared saunas get?",
        answer:
          "Infrared saunas operate between 45\u201365\u00b0C (113\u2013150\u00b0F). The heat feels gentler than steam because infrared warms your body directly rather than heating the air around you. Most users find 50\u201355\u00b0C comfortable for a 30-minute session.",
      },
      {
        question: "How hot do steam saunas get?",
        answer:
          "Traditional steam saunas reach 70\u2013100\u00b0C (158\u2013212\u00b0F) with humidity levels of 10\u201320%. The combination of high temperature and humidity creates the intense heat experience that Finnish sauna tradition is known for.",
      },
      {
        question: "How much electricity does a sauna use?",
        answer:
          "A typical 2-person infrared sauna uses about 1.75kW, costing roughly $0.50\u2013$1.00 per 30-minute session depending on your local electricity rates. Larger steam saunas use 3\u20139kW and cost approximately $1\u2013$3 per session.",
      },
    ],
  },
  {
    heading: "Warranty & Returns",
    items: [
      {
        question: "What does the warranty cover?",
        answer:
          "Our 1-year limited warranty covers manufacturing defects in structural components, heater elements, control panels, and electrical components under normal residential use. It does not cover normal wear and tear, cosmetic changes to natural wood, damage from improper installation, or commercial use.",
      },
      {
        question: "What if my sauna arrives damaged?",
        answer:
          "Contact us within 48 hours of delivery with photos of the damage. We\u2019ll arrange replacement parts or a full replacement at no cost to you. Do not refuse the delivery \u2014 accept it, document the damage, and reach out to us.",
      },
      {
        question: "What\u2019s your return policy?",
        answer:
          "Unassembled and unused saunas can be returned for a full refund minus return shipping costs. Assembled saunas are subject to a 15% restocking fee and must be disassembled and repacked in original packaging. Contact us to initiate a return.",
      },
    ],
  },
  {
    heading: "Health & Safety",
    items: [
      {
        question: "Is sauna use safe?",
        answer:
          "For most healthy adults, regular sauna use is safe and beneficial. However, we recommend consulting your doctor before starting regular sauna sessions if you have cardiovascular conditions, low blood pressure, are pregnant, or take medications that affect heat tolerance. Always stay hydrated and listen to your body.",
      },
      {
        question: "How long should a sauna session be?",
        answer:
          "If you\u2019re new to saunas, start with 15\u201320 minute sessions at a moderate temperature. As your body acclimates, you can gradually extend sessions to 30\u201345 minutes. Always listen to your body \u2014 if you feel lightheaded or uncomfortable, end your session. Drink water before, during, and after.",
      },
      {
        question: "Can children use the sauna?",
        answer:
          "Children over 6 can use the sauna under direct adult supervision at lower temperatures and for shorter sessions (10\u201315 minutes maximum). Consult your pediatrician before allowing children to use the sauna. Children should never use the sauna unsupervised.",
      },
    ],
  },
];

export default function FAQContent() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {faqGroups.map((group, groupIndex) => (
        <section
          key={group.heading}
          className={
            groupIndex % 2 === 0 ? "bg-cream" : "bg-warmWhite"
          }
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <FadeInUp>
              <h2 className="font-heading text-lg font-semibold text-charcoal mb-6">
                {group.heading}
              </h2>
            </FadeInUp>
            <div className="divide-y divide-stone/40">
              {group.items.map((item, itemIndex) => {
                const id = `${groupIndex}-${itemIndex}`;
                const isOpen = openId === id;

                return (
                  <FadeInUp key={id} delay={itemIndex * 0.05}>
                    <div>
                      <button
                        onClick={() => toggle(id)}
                        className="flex w-full items-center justify-between py-5 text-left gap-4"
                        aria-expanded={isOpen}
                      >
                        <span className="font-body text-base font-medium text-charcoal">
                          {item.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="flex-shrink-0 text-cedar"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 text-charcoal/70 font-body text-sm leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInUp>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
