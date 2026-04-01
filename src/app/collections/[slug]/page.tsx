import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { collections, getCollectionBySlug } from "../../../data/collections";
import { getProductsByCollection } from "../../../data/products";
import { formatPrice } from "../../../lib/formatPrice";
import ProductCard from "../../../components/ui/ProductCard";
import FadeInUp from "../../../components/ui/FadeInUp";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: "Collection Not Found" };
  const desc = `Explore the Everwood ${collection.name}. ${collection.tagline} saunas for your home. Starting from ${formatPrice(collection.startingPrice)}.`;
  return {
    title: `${collection.name} — ${collection.tagline} Saunas`,
    description: desc,
    openGraph: {
      title: `${collection.name} — ${collection.tagline} Saunas | Everwood Sauna`,
      description: desc,
      type: "website",
    },
  };
}

export default function CollectionPage({ params }: Props) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(params.slug);
  const descParagraphs = collection.description.split("\n\n");

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <p className="text-cedar font-body text-sm font-medium tracking-wide uppercase mb-3">
              {collection.tagline}
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
              {collection.name}
            </h1>
            <p className="mt-6 text-cream/70 max-w-2xl text-lg leading-relaxed">
              {descParagraphs[0]}
            </p>
            <p className="mt-4 text-cream/50 text-sm">
              {collection.productCount} {collection.productCount === 1 ? "product" : "products"} &middot; Starting from {formatPrice(collection.startingPrice)}
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionProducts.map((product, i) => (
              <FadeInUp key={product.slug} delay={i * 0.08}>
                <ProductCard product={product} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {collectionProducts.length > 1 && (
        <section className="bg-warmWhite py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-8">
                Compare Models
              </h2>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b border-stone">
                      <th className="py-3 px-4 text-sm font-semibold text-charcoal/60 font-body">
                        Feature
                      </th>
                      {collectionProducts.map((p) => (
                        <th
                          key={p.slug}
                          className="py-3 px-4 text-sm font-semibold text-charcoal font-heading"
                        >
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm text-charcoal/80">
                    <tr className="border-b border-stone/50">
                      <td className="py-3 px-4 font-medium text-charcoal">Capacity</td>
                      {collectionProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4">{p.capacity}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone/50">
                      <td className="py-3 px-4 font-medium text-charcoal">Dimensions</td>
                      {collectionProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4">
                          {p.dimensions.imperial}
                          <br />
                          <span className="text-xs text-charcoal/50">{p.dimensions.metric}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone/50">
                      <td className="py-3 px-4 font-medium text-charcoal">Heater Type</td>
                      {collectionProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4">{p.heaterType}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone/50">
                      <td className="py-3 px-4 font-medium text-charcoal">Power</td>
                      {collectionProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4">{p.power}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-stone/50">
                      <td className="py-3 px-4 font-medium text-charcoal">Electrical</td>
                      {collectionProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4">{p.electrical}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-charcoal">Price</td>
                      {collectionProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4">
                          <span className="font-bold text-charcoal">{formatPrice(p.price)}</span>
                          {p.compareAtPrice > p.price && (
                            <span className="ml-2 text-xs text-charcoal/40 line-through">
                              {formatPrice(p.compareAtPrice)}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeInUp>
          </div>
        </section>
      )}

      {/* Need Help CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
              Need Help Choosing?
            </h2>
            <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
              Our buying guide walks you through everything you need to know — from heat types
              and sizing to electrical requirements and assembly.
            </p>
            <Link
              href="/buying-guide"
              className="mt-6 inline-block rounded-lg bg-cedar px-8 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
            >
              Read the Buying Guide
            </Link>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
