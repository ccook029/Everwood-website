import type { Metadata } from "next";
import PageHero from "../../components/ui/PageHero";
import JsonLd from "../../components/ui/JsonLd";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "How to Choose the Right Sauna — Buying Guide",
  description:
    "Everything you need to know before buying a sauna. Compare infrared vs steam, sizing guide, electrical requirements, and more.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Choose the Right Sauna",
  description:
    "A complete guide to choosing the right sauna for your home, covering heat types, sizing, electrical requirements, health benefits, and maintenance.",
  author: { "@type": "Organization", name: "Everwood Sauna" },
  publisher: { "@type": "Organization", name: "Everwood Sauna" },
};

export default function GuidePage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHero
        heading="How to Choose the Right Sauna"
        subtext="Everything you need to know before buying your first sauna — from heat types to electrical requirements."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Buying Guide", href: "/guide" },
        ]}
      />
      <GuideContent />
    </>
  );
}
