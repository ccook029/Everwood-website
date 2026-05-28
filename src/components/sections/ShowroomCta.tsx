"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ShowroomCta() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 sm:py-28">
      {/* Warm radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(196,87,26,0.25) 0%, rgba(43,43,43,0) 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(166,124,82,0.6), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(166,124,82,0.6), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-[11px] uppercase tracking-[0.3em] text-cedar"
        >
          New · Interactive
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl text-cream"
        >
          Step Inside the Everwood Showroom
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-cream/70"
        >
          A dim, cedar-lined room lit by warm ember light. Wander between floating
          pedestals, spin select models in 360°, and discover the entire
          collection in a single immersive space.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10"
        >
          <Link
            href="/showroom"
            className="group inline-flex items-center gap-3 rounded-md bg-cedar px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-cedar/90"
          >
            Enter Showroom
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-xs text-cream/40">
            Best on desktop · works on modern mobile · reduced-motion friendly
          </p>
        </motion.div>
      </div>
    </section>
  );
}
