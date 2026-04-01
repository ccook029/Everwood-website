"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CheckoutButton() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  const hasStripeKey = typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const handleCheckout = async () => {
    if (!hasStripeKey) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasStripeKey) {
    return (
      <div className="rounded-lg bg-stone/20 p-4 text-center">
        <p className="text-sm text-charcoal/70 mb-2">
          Checkout is being set up — please contact us to place an order.
        </p>
        <Link
          href="/contact"
          className="text-sm font-medium text-cedar hover:underline"
        >
          Contact Us
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="w-full rounded-lg bg-cedar py-3.5 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Redirecting..." : "Proceed to Checkout"}
    </button>
  );
}
