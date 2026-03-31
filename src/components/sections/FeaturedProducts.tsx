"use client";

import Link from "next/link";
import FadeInUp from "../ui/FadeInUp";
import { formatPrice } from "../../lib/formatPrice";
import products from "../../data/featured-products.json";

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
            Featured Products
          </h2>
        </FadeInUp>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {products.map((product, i) => (
            <FadeInUp key={product.slug} delay={i * 0.1}>
              <Link
                href={`/products/${product.slug}`}
                className="group flex-shrink-0 w-72 sm:w-80 snap-start"
              >
                <div className="overflow-hidden rounded-lg bg-warmWhite transition-shadow hover:shadow-lg">
                  {/* Placeholder image */}
                  <div className="aspect-[4/3] bg-stone/30 rounded-t-lg" />
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest mb-2">
                      {product.collection}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-charcoal group-hover:text-cedar transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold text-charcoal">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-charcoal/40 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span className="ml-auto rounded bg-ember/10 px-2 py-0.5 text-xs font-semibold text-ember">
                        Sale
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
