"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-4 text-center py-20">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-3">
        Something went wrong
      </h1>
      <p className="text-charcoal/60 max-w-md mb-8">
        We encountered an unexpected error. Please try again or return to the
        homepage.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-cedar px-8 py-3 text-sm font-semibold text-white hover:bg-cedar/90 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="text-sm font-medium text-charcoal/60 hover:text-charcoal"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
