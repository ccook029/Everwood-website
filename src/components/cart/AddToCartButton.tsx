"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface AddToCartButtonProps {
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number;
  collection: string;
  capacity: string;
  className?: string;
}

export default function AddToCartButton({
  slug,
  name,
  price,
  compareAtPrice,
  collection,
  capacity,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  const handleClick = () => {
    addItem({ slug, name, price, compareAtPrice, collection, capacity });
    setAdded(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg bg-cedar py-4 text-base font-semibold text-white hover:bg-cedar/90 transition-colors ${className}`}
    >
      {added ? (
        <span className="inline-flex items-center gap-2">
          <Check className="w-5 h-5" />
          Added!
        </span>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}
