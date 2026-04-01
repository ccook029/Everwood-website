import { Suspense } from "react";
import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop All Saunas",
  description:
    "Browse our full collection of infrared, steam, barrel, and outdoor saunas. Free shipping across North America. Starting from $2,499 CAD.",
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
