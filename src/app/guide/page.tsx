import type { Metadata } from "next";
import PageHero from "../../components/ui/PageHero";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "How to Choose the Right Sauna | Buying Guide | Everwood Sauna",
  description:
    "Everything you need to know before buying your first sauna. Compare infrared vs steam, understand electrical requirements, sizing, health benefits, and find the perfect sauna for your home.",
};

export default function GuidePage() {
  return (
    <>
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
