import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-4 text-center py-20">
      <h1 className="font-heading text-6xl sm:text-8xl font-bold text-charcoal/10 mb-4">
        404
      </h1>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
        Page Not Found
      </h2>
      <p className="text-charcoal/60 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-cedar px-8 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="text-sm font-medium text-cedar hover:underline"
        >
          Shop Saunas
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-charcoal/60 hover:text-charcoal"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
