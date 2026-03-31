import Link from "next/link";
import FadeInUp from "../ui/FadeInUp";
import { formatPrice } from "../../lib/formatPrice";
import collections from "../../data/collections.json";

export default function ShopByCollection() {
  return (
    <section className="bg-warmWhite py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
            Shop by Collection
          </h2>
          <p className="mt-4 text-center text-charcoal/60 max-w-xl mx-auto">
            From compact infrared cabins to full-size outdoor saunas, find the perfect fit for your space and lifestyle.
          </p>
        </FadeInUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <FadeInUp key={collection.slug} delay={i * 0.08}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group block overflow-hidden rounded-lg bg-cream transition-shadow hover:shadow-lg"
              >
                {/* Placeholder image */}
                <div className="aspect-video bg-stone/30 rounded-t-lg" />
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-cedar transition-colors">
                    {collection.name}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/60">
                    {collection.description}
                  </p>
                  <p className="mt-2 text-sm font-medium text-cedar">
                    Starting from {formatPrice(collection.startingPrice)}
                  </p>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
