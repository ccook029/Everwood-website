import type { Metadata } from "next";
import CartPageContent from "./CartPageContent";

export const metadata: Metadata = {
  title: "Your Cart | Everwood Sauna",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}
