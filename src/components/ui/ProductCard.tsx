import Link from "next/link";
import { Product } from "../../data/types";
import { formatPrice } from "../../lib/formatPrice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg bg-warmWhite transition-shadow hover:shadow-lg"
    >
      {/* Placeholder image */}
      <div className="relative aspect-[4/3] bg-stone/30 rounded-t-lg flex items-center justify-center">
        <span className="text-sm text-charcoal/30 font-body">{product.name}</span>
        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded bg-ember px-2 py-0.5 text-xs font-semibold text-white">
            Save {discount}%
          </span>
        )}
      </div>
      <div className="p-5">
        <span className="inline-block rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest mb-2">
          {product.collection}
        </span>
        <h3 className="font-heading text-base font-semibold text-charcoal group-hover:text-cedar transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-charcoal/60">{product.capacity}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-sm text-charcoal/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium text-cedar">View Details &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
