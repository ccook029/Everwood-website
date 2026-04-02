"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Lock, Truck, Shield } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/formatPrice";
import FadeInUp from "../../components/ui/FadeInUp";
import CheckoutButton from "../../components/cart/CheckoutButton";

export default function CartPageContent() {
  const { items, removeItem, updateQuantity, cartTotal, cartCount, savings } =
    useCart();
  const [promoCode, setPromoCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-4 text-center py-20">
        <ShoppingBag className="w-16 h-16 text-charcoal/20 mb-6" />
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
          Your cart is empty
        </h1>
        <p className="text-charcoal/50 mb-8 max-w-md">
          Browse our collections to find the perfect sauna for your home.
        </p>
        <Link
          href="/shop"
          className="rounded-lg bg-cedar px-8 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
        >
          Shop Saunas
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <FadeInUp>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-8">
            Your Cart{" "}
            <span className="text-lg font-body text-charcoal/50 font-normal">
              ({cartCount} {cartCount === 1 ? "item" : "items"})
            </span>
          </h1>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <FadeInUp key={item.slug} delay={i * 0.05}>
                <div className="flex gap-4 sm:gap-6 bg-warmWhite rounded-lg p-4 sm:p-6">
                  {/* Placeholder image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-stone/20 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-charcoal/30 text-center leading-tight px-2">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-heading text-base sm:text-lg font-semibold text-charcoal hover:text-cedar transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-charcoal/50">{item.collection}</p>
                        <span className="inline-block mt-1 text-xs text-charcoal/50 bg-stone/20 rounded-full px-2 py-0.5">
                          {item.capacity}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="p-1.5 text-charcoal/40 hover:text-ember transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-charcoal">
                          {formatPrice(item.price)}
                        </span>
                        {item.compareAtPrice > item.price && (
                          <span className="text-sm text-charcoal/40 line-through">
                            {formatPrice(item.compareAtPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center border border-stone/50 rounded-lg bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity - 1)
                          }
                          className="px-3 py-2 text-charcoal/60 hover:text-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium text-charcoal min-w-[2.5rem] text-center border-x border-stone/50">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity + 1)
                          }
                          disabled={item.quantity >= 5}
                          className="px-3 py-2 text-charcoal/60 hover:text-charcoal transition-colors disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-warmWhite rounded-lg p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Subtotal</span>
                  <span className="font-semibold text-charcoal">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-forest">Savings</span>
                    <span className="font-semibold text-forest">
                      -{formatPrice(savings)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Shipping</span>
                  <span className="font-semibold text-forest">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Estimated tax</span>
                  <span className="text-charcoal/50 text-xs">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              {/* Promo code */}
              <div className="pt-2 border-t border-stone/30">
                <label className="text-xs font-medium text-charcoal/70 block mb-1.5">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 rounded-lg border border-stone/50 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-cedar/30"
                  />
                  <button className="rounded-lg border border-cedar px-4 py-2 text-sm font-medium text-cedar hover:bg-cedar hover:text-white transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-stone/30 flex justify-between">
                <span className="font-heading text-base font-semibold text-charcoal">
                  Order Total
                </span>
                <span className="font-heading text-xl font-bold text-charcoal">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <CheckoutButton />

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="text-center">
                  <Lock className="w-5 h-5 mx-auto text-forest mb-1" />
                  <p className="text-xs text-charcoal/60">Secure Checkout</p>
                </div>
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto text-forest mb-1" />
                  <p className="text-xs text-charcoal/60">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto text-forest mb-1" />
                  <p className="text-xs text-charcoal/60">1-Year Warranty</p>
                </div>
              </div>

              {/* Electrical notice */}
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mt-3">
                <p className="text-xs text-amber-800">
                  Please verify your electrical setup before ordering. Some models
                  require a dedicated 240V circuit.{" "}
                  <Link
                    href="/guide"
                    className="underline font-medium hover:text-amber-900"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
