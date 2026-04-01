import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Everwood Sauna",
};

export default function FAQPage() {
  return (
    <>
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
