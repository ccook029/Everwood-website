import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about shipping, assembly, electrical requirements, warranty, returns, and sauna use.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does shipping take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most orders ship within 3-5 business days. Smaller infrared models arrive in 2-3 weeks via standard freight. Larger steam, barrel, and cabin saunas ship via LTL freight and typically arrive in 3-4 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Is shipping really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, always. Free shipping is included on every order to Canada and the continental United States. No minimum order, no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an electrician?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the model. Saunas rated for 120V/15A plug into any standard household outlet. All 240V models require a licensed electrician to install a dedicated circuit.",
      },
    },
    {
      "@type": "Question",
      name: "How difficult is assembly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most indoor infrared models assemble in 30-60 minutes with two adults and basic household tools. Barrel saunas and outdoor cabins take 2-4 hours.",
      },
    },
    {
      "@type": "Question",
      name: "What does the warranty cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our 1-year limited warranty covers manufacturing defects in structural components, heater elements, control panels, and electrical components under normal residential use.",
      },
    },
    {
      "@type": "Question",
      name: "What is your return policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unassembled and unused saunas can be returned for a full refund minus return shipping costs. Assembled saunas are subject to a 15% restocking fee. Contact us to initiate a return.",
      },
    },
    {
      "@type": "Question",
      name: "How much electricity does a sauna use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical 2-person infrared sauna uses about 1.75kW, costing roughly $0.50-$1.00 per 30-minute session depending on your local electricity rates.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        heading="Frequently Asked Questions"
        subtext="Find answers to common questions about our saunas, shipping, installation, and more."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />
      <FAQContent />
    </>
  );
}
