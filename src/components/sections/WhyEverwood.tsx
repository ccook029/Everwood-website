import Link from "next/link";
import FadeInUp from "../ui/FadeInUp";

export default function WhyEverwood() {
  return (
    <section className="bg-warmWhite py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Placeholder image */}
          <FadeInUp>
            <div className="aspect-[4/3] rounded-lg bg-stone/30" />
          </FadeInUp>

          <FadeInUp delay={0.15}>
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Why Everwood?
            </h2>
            <p className="mt-6 text-charcoal/70 leading-relaxed">
              We believe everyone deserves access to the health benefits of regular
              sauna use &mdash; without paying luxury prices. Every Everwood sauna is
              built with premium materials, rigorously tested, and shipped directly to
              your door. No middlemen, no showroom markup.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-md bg-cedar px-6 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
            >
              Our Story
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
