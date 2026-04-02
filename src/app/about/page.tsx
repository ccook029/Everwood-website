import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/ui/PageHero";
import FadeInUp from "../../components/ui/FadeInUp";

export const metadata: Metadata = {
  title: "About Everwood Sauna — Our Story",
  description:
    "Premium saunas without the premium markup. Learn how Everwood delivers quality craftsmanship directly to your door across Canada and the USA.",
};

const values = [
  {
    color: "bg-cedar",
    title: "Quality Without Compromise",
    description:
      "Premium materials, rigorous testing, no cutting corners on what matters.",
  },
  {
    color: "bg-forest",
    title: "Honest Pricing",
    description:
      'No inflated MSRPs, no fake "sales." Our prices reflect real value.',
  },
  {
    color: "bg-ember",
    title: "Customer First",
    description:
      "Real humans answer the phone. We're here before, during, and after your purchase.",
  },
  {
    color: "bg-charcoal",
    title: "Built to Last",
    description:
      "1-year warranty backed by saunas built with decades of manufacturing expertise.",
  },
];

const stats = [
  { value: "1,000+", label: "Saunas Delivered" },
  { value: "4.8", label: "Average Rating", star: true },
  { value: "1-Year", label: "Warranty" },
  { value: "Free", label: "Shipping Always" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        heading="Our Story"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Brand Story */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6">
          <FadeInUp>
            <div className="space-y-6 text-charcoal/80 leading-relaxed">
              <p>
                If you&apos;ve ever shopped for a home sauna, you already know the
                frustration. On one end, boutique brands charge $8,000 or more for
                what amounts to a heated wooden box with nice branding. On the
                other, mystery imports flood the market with rock-bottom prices
                and zero accountability. You&apos;re left wondering: is there
                anything in between?
              </p>
              <p>
                That question is exactly why Everwood exists. We built direct
                relationships with experienced sauna manufacturers — the same
                facilities that produce for high-end brands — and cut out
                everything that inflates the price without adding value.
                No distributors. No showroom leases. No retail markup. The result
                is a sauna that&apos;s built to the same standards you&apos;d
                expect from a premium brand, at a price that actually makes sense.
                Every unit goes through quality testing before it ships.
              </p>
              <p>
                We&apos;re not here to reinvent the sauna. People have been using
                them for thousands of years for good reason — the health benefits
                of regular sauna use are well-documented and genuinely
                life-changing. Better sleep, reduced stress, improved circulation,
                muscle recovery. The only thing standing between most homeowners
                and those benefits has been the price tag.
              </p>
              <p>
                Our mission is simple: make the health benefits of regular sauna
                use accessible to every homeowner in North America. Not as a
                luxury. Not as a splurge. As something that just makes sense for
                your home and your wellbeing.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warmWhite py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12">
              What We Stand For
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <FadeInUp key={value.title} delay={i * 0.1}>
                <div className="bg-white rounded-lg p-8">
                  <div
                    className={`${value.color} w-3 h-3 rounded-full mb-4`}
                  />
                  <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12">
              By the Numbers
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <FadeInUp key={stat.label} delay={i * 0.1}>
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-charcoal flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.star && (
                      <svg
                        className="w-6 h-6 text-ember inline-block"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  <p className="mt-2 text-charcoal/60 text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cream mb-6">
              Ready to find your sauna?
            </h2>
            <Link
              href="/shop"
              className="inline-block bg-cedar text-white font-semibold px-8 py-3 rounded-lg hover:bg-cedar/90 transition-colors"
            >
              Shop Saunas
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
