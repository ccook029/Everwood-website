import { Star } from "lucide-react";
import FadeInUp from "../ui/FadeInUp";
import testimonials from "../../data/testimonials.json";

export default function Testimonials() {
  return (
    <section className="bg-warmWhite py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
            What Our Customers Say
          </h2>
        </FadeInUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="rounded-lg bg-cream p-6 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-cedar text-cedar"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm text-charcoal/70 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-4 border-t border-stone/40">
                  <p className="text-sm font-semibold text-charcoal">
                    {t.name}
                  </p>
                  <p className="text-xs text-charcoal/50">{t.city}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
