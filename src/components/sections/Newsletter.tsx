"use client";

import FadeInUp from "../ui/FadeInUp";

export default function Newsletter() {
  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeInUp>
          <h2 className="font-heading text-3xl font-bold text-cream sm:text-4xl">
            Join the Everwood Community
          </h2>
          <p className="mt-4 text-cream/60">
            Tips on wellness, sauna care, and exclusive offers.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md bg-cream/10 border border-cream/10 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-cedar"
            />
            <button
              type="submit"
              className="rounded-md bg-cedar px-6 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </FadeInUp>
      </div>
    </section>
  );
}
