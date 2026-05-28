"use client";

import Link from "next/link";
import {
  showroomProducts,
  productHref,
  ShowroomProduct,
} from "../../lib/showroom-config";
import { formatPrice } from "../../lib/formatPrice";

function previewImage(p: ShowroomProduct): string {
  if (p.mode === "panel") return p.image;
  const ext = p.extension ?? "jpg";
  const pad = p.pad ?? 2;
  return `${p.spinFolder.replace(/\/$/, "")}/${"1".padStart(pad, "0")}.${ext}`;
}

export default function ShowroomFallback({
  reason,
}: {
  reason: "reduced-motion" | "no-webgl";
}) {
  const heading =
    reason === "reduced-motion"
      ? "Browse the Showroom"
      : "The 3D Showroom";

  const sub =
    reason === "reduced-motion"
      ? "We've switched to a calmer grid view based on your reduced-motion preference."
      : "Your device doesn't support WebGL — here's a clean grid of the same collection.";

  return (
    <section className="bg-charcoal text-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl text-cream">
            {heading}
          </h1>
          <p className="mt-4 text-cream/70 text-base">{sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showroomProducts.map((p) => (
            <Link
              key={p.slug}
              href={productHref(p)}
              aria-label={`${p.name}, ${p.collection}, ${formatPrice(p.price)}. View product details.`}
              className="group block rounded-lg overflow-hidden bg-charcoal ring-1 ring-cedar/20 hover:ring-cedar/60 transition"
            >
              <div className="relative aspect-[4/5] bg-cedar/10 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage(p)}
                  alt={`${p.name} — ${p.collection}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                {p.mode === "spin" && (
                  <span className="absolute top-3 right-3 rounded-full bg-cedar/90 text-charcoal text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                    360°
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.15em] text-cedar">
                  {p.collection}
                </div>
                <h3 className="font-heading text-xl text-cream mt-1">
                  {p.name}
                </h3>
                <div className="mt-2 text-sm text-cream/75">
                  {formatPrice(p.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
