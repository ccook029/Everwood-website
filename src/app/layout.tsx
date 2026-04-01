import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/cart/CartDrawer";
import JsonLd from "../components/ui/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://everwoodsauna.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Everwood Sauna — Premium Saunas for Your Home",
    template: "%s | Everwood Sauna",
  },
  description:
    "Premium infrared, steam, barrel, and outdoor saunas delivered free across Canada and the USA. Quality craftsmanship at accessible prices. Shop Everwood today.",
  openGraph: {
    siteName: "Everwood Sauna",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Everwood Sauna",
  url: "https://everwoodsauna.com",
  logo: "https://everwoodsauna.com/logo.png",
  description:
    "Premium infrared, steam, barrel, and outdoor saunas delivered free across Canada and the USA.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-555-0199",
    contactType: "customer service",
    areaServed: ["CA", "US"],
    availableLanguage: "English",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        <JsonLd data={organizationSchema} />
        <CartProvider>
          <Header />
          <main role="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
