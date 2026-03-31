"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-charcoal">
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/80" />
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-heading text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Heat Crafted by Nature
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-cream/70 sm:text-xl"
        >
          Premium saunas for your home &mdash; delivered free across North America.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/shop"
            className="rounded-md bg-cedar px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-cedar/90 transition-colors"
          >
            Shop Saunas
          </Link>
          <Link
            href="/quiz"
            className="rounded-md border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream hover:bg-cream/10 transition-colors"
          >
            Take the Quiz
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
