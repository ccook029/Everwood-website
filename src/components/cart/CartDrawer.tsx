"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/formatPrice";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isDrawerOpen,
    closeDrawer,
    cartTotal,
    cartCount,
    savings,
  } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[400px] bg-warmWhite shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone/30">
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Your Cart{" "}
                <span className="text-sm font-body text-charcoal/50 font-normal">
                  ({cartCount} {cartCount === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                onClick={closeDrawer}
                className="p-1 text-charcoal/60 hover:text-charcoal transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items or empty state */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="w-12 h-12 text-charcoal/20 mb-4" />
                <p className="font-heading text-lg font-semibold text-charcoal mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-charcoal/50 mb-6">
                  Browse our collections to find your perfect sauna.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="rounded-lg bg-cedar px-6 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
                >
                  Shop Saunas
                </Link>
              </div>
            ) : (
              <>
                {/* Item list */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex gap-4 bg-white rounded-lg p-4"
                    >
                      {/* Placeholder image */}
                      <div className="w-20 h-20 rounded-md bg-stone/20 flex-shrink-0 flex items-center justify-center">
                        <span className="text-[10px] text-charcoal/30 text-center leading-tight px-1">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-charcoal truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-charcoal/50">{item.collection}</p>
                        <span className="inline-block mt-1 text-xs text-charcoal/50 bg-stone/20 rounded-full px-2 py-0.5">
                          {item.capacity}
                        </span>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm font-bold text-charcoal">
                            {formatPrice(item.price)}
                          </span>
                          {item.compareAtPrice > item.price && (
                            <span className="text-xs text-charcoal/40 line-through">
                              {formatPrice(item.compareAtPrice)}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone/50 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.slug, item.quantity - 1)
                              }
                              className="px-2.5 py-1.5 text-charcoal/60 hover:text-charcoal transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-medium text-charcoal min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.slug, item.quantity + 1)
                              }
                              disabled={item.quantity >= 5}
                              className="px-2.5 py-1.5 text-charcoal/60 hover:text-charcoal transition-colors disabled:opacity-30"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.slug)}
                            className="p-1.5 text-charcoal/40 hover:text-ember transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary (sticky bottom) */}
                <div className="border-t border-stone/30 px-6 py-4 space-y-3 bg-warmWhite">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Subtotal</span>
                    <span className="font-semibold text-charcoal">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-forest">You&apos;re saving</span>
                      <span className="font-semibold text-forest">
                        {formatPrice(savings)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Shipping</span>
                    <span className="font-semibold text-forest">FREE</span>
                  </div>
                  <p className="text-xs text-charcoal/40">
                    Taxes calculated at checkout
                  </p>

                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="block w-full rounded-lg bg-cedar py-3.5 text-center text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={closeDrawer}
                    className="block w-full text-center text-sm text-charcoal/60 hover:text-charcoal transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
