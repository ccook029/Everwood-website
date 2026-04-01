"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "../../data/types";
import { formatPrice } from "../../lib/formatPrice";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      collection: product.collection,
      capacity: product.capacity,
    });
  };

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
        {/* Quick Add to Cart */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-cedar px-3 py-2 text-xs font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity touch:opacity-100 hover:bg-cedar/90"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add to Cart</span>
        </button>
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
      </div>
    </Link>
  );
}
