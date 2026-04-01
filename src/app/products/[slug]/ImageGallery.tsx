"use client";

import { useState } from "react";

interface ImageGalleryProps {
  productName: string;
}

export default function ImageGallery({ productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnails = [0, 1, 2, 3, 4];

  return (
    <div>
      {/* Main image */}
      <div className="aspect-square rounded-lg bg-stone/30 flex items-center justify-center">
        <span className="text-charcoal/30 text-sm font-body">
          {productName} — Image {activeIndex + 1}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-5 gap-3">
        {thumbnails.map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`aspect-square rounded-md bg-stone/20 flex items-center justify-center text-xs text-charcoal/30 transition-all ${
              activeIndex === idx
                ? "ring-2 ring-cedar"
                : "hover:ring-1 hover:ring-stone"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
