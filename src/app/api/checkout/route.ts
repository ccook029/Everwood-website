import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CheckoutItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);
  const { items } = (await req.json()) as { items: CheckoutItem[] };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "cad",
    line_items: items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // convert dollars to cents
      },
      quantity: item.quantity,
    })),
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "cad" },
          display_name: "Free Shipping — Crafted to Order",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 30 },
            maximum: { unit: "business_day", value: 40 },
          },
        },
      },
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
