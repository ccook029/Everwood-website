import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { products, getProductBySlug, getProductsByCollection } from "../../../data/products";
import { formatPrice } from "../../../lib/formatPrice";
import FadeInUp from "../../../components/ui/FadeInUp";
import ProductCard from "../../../components/ui/ProductCard";
import ProductTabs from "./ProductTabs";
import ImageGallery from "./ImageGallery";
import AddToCartButton from "../../../components/cart/AddToCartButton";
import JsonLd from "../../../components/ui/JsonLd";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  const desc = `${product.shortDescription} ${formatPrice(product.price)} with free shipping across North America.`;
  return {
    title: `${product.name} — ${product.capacity} ${product.collection.replace(" Series", "")} Sauna`,
    description: desc,
    openGraph: {
      title: `${product.name} | Everwood Sauna`,
      description: desc,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const discount = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const isStandard = product.electrical.includes("120V/15A") && !product.electrical.includes("dedicated");
  const electricalMessage = isStandard
    ? "Requires a standard 120V/15A outlet"
    : `Requires a dedicated ${product.electrical} circuit — professional installation recommended`;

  // Related products: same collection first, fill with others if needed
  const sameCollection = getProductsByCollection(product.collectionSlug).filter(
    (p) => p.slug !== product.slug
  );
  const otherProducts = products.filter(
    (p) => p.slug !== product.slug && p.collectionSlug !== product.collectionSlug
  );
  const related = [...sameCollection, ...otherProducts].slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "Everwood Sauna" },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "CAD",
      availability:
        product.stockStatus === "in-stock"
          ? "https://schema.org/InStock"
          : product.stockStatus === "pre-order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      url: `https://everwoodsauna.com/products/${product.slug}`,
      seller: { "@type": "Organization", name: "Everwood Sauna" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "CAD" },
        shippingDestination: [
          { "@type": "DefinedRegion", addressCountry: "CA" },
          { "@type": "DefinedRegion", addressCountry: "US" },
        ],
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Capacity", value: product.capacity },
      { "@type": "PropertyValue", name: "Heater Type", value: product.heaterType },
      { "@type": "PropertyValue", name: "Power", value: product.power },
    ],
  };

  return (
    <div className="bg-cream min-h-screen">
      <JsonLd data={productSchema} />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-charcoal/50">
          <Link href="/" className="hover:text-cedar transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/collections/${product.collectionSlug}`} className="hover:text-cedar transition-colors">
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product Main */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <FadeInUp>
            <ImageGallery productName={product.name} />
          </FadeInUp>

          {/* Product Info */}
          <FadeInUp delay={0.1}>
            <div>
              <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest mb-3">
                {product.collection}
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice > product.price && (
                  <>
                    <span className="text-lg text-charcoal/40 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className="rounded bg-ember/10 px-2 py-0.5 text-sm font-semibold text-ember">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="mt-4 text-charcoal/70 leading-relaxed">
                {product.shortDescription}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-stone/30 px-3 py-1 text-sm text-charcoal/70">
                {product.capacity}
              </div>

              {/* Electrical Requirements Callout */}
              <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
                <span className="text-xl mt-0.5" role="img" aria-label="electrical">&#9889;</span>
                <div>
                  <p className="text-sm font-semibold text-amber-900">Electrical Requirements</p>
                  <p className="text-sm text-amber-800 mt-1">{electricalMessage}</p>
                </div>
              </div>

              {/* Add to Cart */}
              <AddToCartButton
                slug={product.slug}
                name={product.name}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                collection={product.collection}
                capacity={product.capacity}
                className="mt-6 w-full"
              />

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg border border-stone/50 py-3 px-2">
                  <p className="text-xs font-semibold text-charcoal">Free Shipping</p>
                  <p className="text-xs text-charcoal/50 mt-0.5">North America</p>
                </div>
                <div className="rounded-lg border border-stone/50 py-3 px-2">
                  <p className="text-xs font-semibold text-charcoal">1-Year Warranty</p>
                  <p className="text-xs text-charcoal/50 mt-0.5">Full coverage</p>
                </div>
                <div className="rounded-lg border border-stone/50 py-3 px-2">
                  <p className="text-xs font-semibold text-charcoal">Easy Returns</p>
                  <p className="text-xs text-charcoal/50 mt-0.5">Hassle-free</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-warmWhite py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-8">
                You May Also Like
              </h2>
            </FadeInUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <FadeInUp key={p.slug} delay={i * 0.08}>
                  <ProductCard product={p} />
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
