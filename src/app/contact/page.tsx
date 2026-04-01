import type { Metadata } from "next";
import PageHero from "../../components/ui/PageHero";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Everwood Sauna",
  description:
    "Get in touch with the Everwood Sauna team. We're here to help with product questions, order status, warranty claims, and more.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        heading="Contact Us"
        subtext="We'd love to hear from you. Whether you have a question about our saunas, need help choosing, or want to check on an order — we're here to help."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <ContactContent />
    </>
  );
}
