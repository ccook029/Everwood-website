import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed | Everwood Sauna",
  description: "Thank you for your order!",
};

interface Props {
  searchParams: { session_id?: string };
}

export default function CheckoutSuccessPage({ searchParams }: Props) {
  return (
    <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-4 text-center py-20">
      <CheckCircle className="w-16 h-16 text-forest mb-6" />
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
        Thank you for your order!
      </h1>
      <p className="text-charcoal/60 max-w-md mb-2">
        We&apos;ve received your order and will be in touch with shipping details within
        24 hours.
      </p>
      {searchParams.session_id && (
        <p className="text-xs text-charcoal/40 mb-8">
          Order reference: {searchParams.session_id}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/shop"
          className="rounded-lg bg-cedar px-8 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-stone px-8 py-3 text-sm font-semibold text-charcoal hover:bg-stone/20 transition-colors"
        >
          Questions? Contact Us
        </Link>
      </div>
    </div>
  );
}
