import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../../../components/ui/PageHero";
import FadeInUp from "../../../components/ui/FadeInUp";

interface PolicyPage {
  title: string;
  slug: string;
  metaDescription: string;
  content: { heading?: string; body: string[] }[];
}

const policies: PolicyPage[] = [
  {
    title: "Shipping Policy",
    slug: "shipping",
    metaDescription:
      "Free shipping on all Everwood Sauna orders across Canada and the continental US. Learn about delivery timelines and methods.",
    content: [
      {
        heading: "Free Shipping on Every Order",
        body: [
          "Every Everwood sauna ships free to all Canadian provinces and continental United States. No minimum order, no hidden surcharges, no exceptions. The price you see is the price you pay.",
        ],
      },
      {
        heading: "Crafted to Order",
        body: [
          "Every Everwood sauna is crafted to order, ensuring each unit meets our quality standards before it leaves the workshop. Once your order is confirmed, allow 6-8 weeks for production, quality inspection, and delivery.",
          "Select popular models may be available in stock for faster delivery. Check the product page for current availability. In-stock items typically ship within 5-7 business days.",
          "You will receive a confirmation email with estimated delivery dates when your order is placed, and tracking information as soon as your sauna ships.",
        ],
      },
      {
        heading: "LTL Freight Delivery",
        body: [
          "Larger saunas ship via LTL freight. Here is what to expect:",
          "The freight carrier will contact you by phone to schedule a delivery window. Delivery is curbside — the driver will unload your sauna to your driveway, garage entrance, or building loading dock. The driver is not required to carry items inside your home or up stairs.",
          "You may need one or two helpers to move the boxes from the delivery point to your installation location. Barrel saunas and cabin saunas ship on pallets and may require multiple people to move.",
          "Please inspect all boxes at the time of delivery. If you notice any visible damage to the packaging, note it on the delivery receipt and contact us within 48 hours with photos.",
        ],
      },
      {
        heading: "Alaska, Hawaii & Territories",
        body: [
          "We ship to Alaska, Hawaii, and Canadian territories on a case-by-case basis. Additional shipping charges may apply. Contact us before ordering and we will provide a shipping quote within one business day.",
        ],
      },
      {
        heading: "Duties & Taxes",
        body: [
          "For Canadian customers: All applicable duties and taxes are included in your order total. There are no additional charges upon delivery.",
          "For US customers: Orders may be subject to import duties and applicable state taxes. We will communicate any additional costs before your order ships. In most cases, duties are minimal or zero for residential sauna products.",
        ],
      },
      {
        heading: "Order Tracking",
        body: [
          "Once your order ships, you will receive an email with your tracking number and a link to track your delivery in real time. If you have questions about an in-transit order, contact our support team with your order number.",
        ],
      },
    ],
  },
  {
    title: "Return & Refund Policy",
    slug: "returns",
    metaDescription:
      "Learn about our return process and refund timeline for Everwood saunas.",
    content: [
      {
        heading: "Return Policy",
        body: [
          "We want you to love your Everwood sauna. If for any reason you are not satisfied, you may contact us to arrange a return.",
        ],
      },
      {
        heading: "Unassembled & Unused Saunas",
        body: [
          "Saunas that have not been assembled or used may be returned for a full refund minus return shipping costs. The product must be in its original packaging and in resalable condition. Contact us to initiate the return process. We will arrange carrier pickup.",
        ],
      },
      {
        heading: "Assembled Saunas",
        body: [
          "Saunas that have been assembled are subject to a 15% restocking fee. The sauna must be disassembled, carefully repacked in its original packaging, and in a condition suitable for resale. Contact us to discuss your return.",
          "If you assemble the unit and discover a defect or issue, that is covered under our warranty — not our return policy. Contact us and we will resolve the issue at no cost.",
        ],
      },
      {
        heading: "Damaged in Shipping",
        body: [
          "If your sauna arrives with shipping damage, contact us within 48 hours of delivery with photos of the damage. We will arrange replacement parts or a full replacement unit at no cost to you.",
          "Important: Do not refuse the delivery. Accept the shipment, document the damage with photos, and contact us. Refusing delivery can complicate the claims process and delay your resolution.",
        ],
      },
      {
        heading: "Defective Products",
        body: [
          "Products with manufacturing defects are covered under our 1-year warranty. If you discover a defect, contact our support team with your order number and photos of the issue. We will resolve it promptly — see our warranty policy for full details.",
        ],
      },
      {
        heading: "Refund Processing",
        body: [
          "Once we receive and inspect your returned product, refunds are processed within 7-10 business days to your original payment method. You will receive an email confirmation when your refund has been issued.",
          "Please allow an additional 3-5 business days for the refund to appear on your statement, depending on your bank or credit card provider.",
        ],
      },
      {
        heading: "How to Initiate a Return",
        body: [
          "Contact our support team at hello@everwoodsauna.com or call 1-800-555-0199 with your order number and reason for return. We will guide you through the process and arrange carrier pickup if applicable.",
        ],
      },
    ],
  },
  {
    title: "Warranty",
    slug: "warranty",
    metaDescription:
      "1-year limited warranty on all Everwood saunas. Coverage details, claim process, and what to expect.",
    content: [
      {
        heading: "1-Year Limited Warranty",
        body: [
          "Every Everwood sauna is backed by a comprehensive 1-year limited warranty, effective from the date of delivery. This warranty covers defects in materials and workmanship under normal residential use.",
        ],
      },
      {
        heading: "What Is Covered",
        body: [
          "Structural components: frame, wall panels, bench slats, door and hinges, floor panels.",
          "Heating elements: infrared heater panels, carbon panels, electric stove components, temperature sensors and controls.",
          "Electrical components: control panels, wiring harnesses, LED lighting, digital displays.",
          "If any covered component fails due to a manufacturing defect within 12 months of your delivery date, we will repair or replace it at no cost to you, including the cost of shipping replacement parts.",
        ],
      },
      {
        heading: "What Is Not Covered",
        body: [
          "Normal wear and tear, including natural wood aging, grain changes, and the development of patina on outdoor models.",
          "Cosmetic damage caused during self-assembly, including scratches, dents, or finish damage from tools.",
          "Damage resulting from improper use, modification, or installation not in accordance with our assembly instructions.",
          "Damage from power surges or electrical issues not related to the sauna's components. We strongly recommend using a surge protector with all sauna models.",
          "Use in commercial settings such as gyms, spas, or rental properties. Our warranty covers residential use only.",
          "Sauna stones, bucket and ladle sets, and other consumable accessories.",
        ],
      },
      {
        heading: "How to Make a Warranty Claim",
        body: [
          "Contact our support team at hello@everwoodsauna.com or call 1-800-555-0199. Please have the following information ready:",
          "Your order number and date of delivery. A description of the issue. Photos or video showing the defect or malfunction.",
          "Our team will assess your claim, typically within 2-3 business days. If the issue is covered, we will ship replacement parts at no charge. In cases where the issue cannot be resolved with replacement parts, we will arrange a full unit replacement.",
        ],
      },
      {
        heading: "Resolution Timeline",
        body: [
          "Most warranty claims are resolved within 5-7 business days. Replacement parts are shipped via expedited freight at no cost. If a full unit replacement is required, delivery follows the same timelines as new orders (6-8 weeks).",
        ],
      },
      {
        heading: "Warranty Transferability",
        body: [
          "The Everwood warranty is transferable to a new owner if the sauna is sold or gifted during the warranty period. The new owner must contact us with the original order number to register the transfer. The warranty expiration date does not change.",
        ],
      },
    ],
  },
  {
    title: "Privacy Policy",
    slug: "privacy",
    metaDescription:
      "How Everwood Sauna collects, uses, and protects your personal information.",
    content: [
      {
        heading: "Overview",
        body: [
          "At Everwood Sauna, we respect your privacy and are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights regarding that data.",
          "This policy applies to information collected through our website (everwoodsauna.com) and our ordering and customer service processes.",
        ],
      },
      {
        heading: "Information We Collect",
        body: [
          "When you place an order or create an account, we collect: your name, email address, shipping address, billing address, and phone number. Payment information (credit card numbers) is processed directly by Stripe and is never stored on our servers.",
          "When you browse our website, we may collect: your IP address, browser type, pages visited, and referring URL through standard analytics tools. This data is anonymized and used to improve our website experience.",
          "When you contact us, we retain your name, email, and the content of your communication to provide support and improve our service.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "Order fulfillment: processing your order, arranging shipping, and communicating delivery updates.",
          "Customer support: responding to inquiries, resolving issues, and processing warranty claims.",
          "Communication: sending order confirmations, shipping updates, and — only with your consent — occasional emails about new products, promotions, or sauna care tips. You can unsubscribe from marketing emails at any time.",
          "Website improvement: analyzing anonymized browsing data to improve our website, product pages, and shopping experience.",
        ],
      },
      {
        heading: "Third-Party Services",
        body: [
          "We use the following third-party services that may process your data:",
          "Stripe: payment processing. Stripe's privacy policy governs how your payment data is handled. We never see or store your full credit card number.",
          "Analytics: we use standard web analytics to understand how visitors use our site. This data is anonymized and cannot be used to identify individual users.",
          "Shipping carriers: your name, address, and phone number are shared with shipping carriers solely for the purpose of delivering your order.",
          "We do not sell, rent, or share your personal information with third parties for their marketing purposes.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "Our website uses cookies to remember your cart contents, improve site functionality, and collect anonymized analytics. You can disable cookies in your browser settings, but this may affect the functionality of our website, particularly the shopping cart.",
        ],
      },
      {
        heading: "Data Retention",
        body: [
          "We retain your order information for as long as necessary to fulfill our contractual obligations, provide customer support, and comply with legal requirements. Typically, order records are retained for 7 years for tax and accounting purposes.",
          "You may request deletion of your personal data at any time by contacting us at hello@everwoodsauna.com. We will process your request within 30 days, subject to any legal retention requirements.",
        ],
      },
      {
        heading: "Your Rights",
        body: [
          "You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data (subject to legal requirements), withdraw consent for marketing communications, and receive a copy of your data in a portable format.",
          "To exercise any of these rights, contact us at hello@everwoodsauna.com.",
        ],
      },
      {
        heading: "Changes to This Policy",
        body: [
          "We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this page periodically.",
          "Effective date: April 1, 2026.",
        ],
      },
    ],
  },
  {
    title: "Terms of Service",
    slug: "terms",
    metaDescription:
      "Terms and conditions for using the Everwood Sauna website and purchasing our products.",
    content: [
      {
        heading: "Agreement to Terms",
        body: [
          "By accessing or using the Everwood Sauna website (everwoodsauna.com) and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or purchase our products.",
        ],
      },
      {
        heading: "Use of the Website",
        body: [
          "You may use our website for lawful purposes related to browsing, purchasing, and learning about our products. You agree not to use the website in any way that could damage, disable, or impair its functionality, or interfere with other users' experience.",
          "All content on this website — including text, images, graphics, logos, and product descriptions — is the property of Everwood Sauna and is protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.",
        ],
      },
      {
        heading: "Product Descriptions & Accuracy",
        body: [
          "We make every effort to ensure that product descriptions, specifications, and images on our website are accurate and up to date. However, we do not warrant that all information is error-free. If you receive a product that differs materially from its description, you may return it under our return policy.",
          "Product dimensions, weights, and specifications are approximate and may vary slightly from unit to unit due to the nature of natural wood products and handcrafted manufacturing processes.",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "All prices on our website are listed in Canadian Dollars (CAD) unless otherwise noted. Prices are subject to change without notice, but changes will not affect orders that have already been confirmed.",
          "While we strive to ensure pricing accuracy, errors may occur. If we discover a pricing error after you have placed an order, we will contact you before processing the order and give you the option to proceed at the correct price or cancel for a full refund.",
        ],
      },
      {
        heading: "Payment Terms",
        body: [
          "Payment is due in full at the time of purchase. We accept Visa, Mastercard, American Express, and Apple Pay through our secure Stripe checkout. All transactions are encrypted and processed in accordance with PCI-DSS standards.",
        ],
      },
      {
        heading: "Order Acceptance",
        body: [
          "Your order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including but not limited to: product availability, pricing errors, or suspected fraudulent activity. If we cancel your order, you will receive a full refund.",
        ],
      },
      {
        heading: "Limitation of Liability",
        body: [
          "To the maximum extent permitted by law, Everwood Sauna shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website. Our total liability for any claim related to a product shall not exceed the purchase price of that product.",
          "This limitation does not apply to liability that cannot be excluded or limited by applicable law.",
        ],
      },
      {
        heading: "Indemnification",
        body: [
          "You agree to indemnify and hold harmless Everwood Sauna, its officers, employees, and agents from any claims, damages, or expenses arising from your use of our website, your breach of these terms, or your violation of any law or the rights of a third party.",
        ],
      },
      {
        heading: "Governing Law",
        body: [
          "These Terms of Service are governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to conflict of law principles. Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada.",
        ],
      },
      {
        heading: "Changes to These Terms",
        body: [
          "We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of the website after changes are posted constitutes acceptance of the updated terms.",
          "Effective date: April 1, 2026.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "If you have questions about these Terms of Service, contact us at hello@everwoodsauna.com or call 1-800-555-0199.",
        ],
      },
    ],
  },
];

const allSlugs = policies.map((p) => p.slug);

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const policy = policies.find((p) => p.slug === params.slug);
  if (!policy) return { title: "Policy Not Found" };
  return {
    title: `${policy.title} | Everwood Sauna`,
    description: policy.metaDescription,
  };
}

export default function PolicyPage({ params }: Props) {
  const policy = policies.find((p) => p.slug === params.slug);
  if (!policy) notFound();

  return (
    <div className="bg-cream min-h-screen">
      <PageHero
        heading={policy.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Policies", href: "/policies/shipping" },
          { label: policy.title, href: `/policies/${policy.slug}` },
        ]}
      />

      <div className="mx-auto max-w-prose px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {policy.content.map((section, i) => (
          <FadeInUp key={i} delay={i * 0.04}>
            <div className="mb-10">
              {section.heading && (
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                  {section.heading}
                </h2>
              )}
              {section.body.map((para, j) => (
                <p
                  key={j}
                  className="text-charcoal/80 leading-[1.8] mb-3 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
          </FadeInUp>
        ))}

        {/* Footer links to other policies */}
        <div className="mt-16 pt-8 border-t border-stone/50">
          <p className="text-sm text-charcoal/50 mb-3">Other Policies</p>
          <div className="flex flex-wrap gap-4">
            {policies
              .filter((p) => p.slug !== policy.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/policies/${p.slug}`}
                  className="text-sm text-cedar hover:underline"
                >
                  {p.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
