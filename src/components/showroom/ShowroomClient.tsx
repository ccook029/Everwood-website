"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ShowroomFallback from "./ShowroomFallback";

const ShowroomScene = dynamic(() => import("./ShowroomScene"), {
  ssr: false,
  loading: () => <ShowroomLoading />,
});

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function ShowroomClient() {
  const [mode, setMode] = useState<"loading" | "3d" | "reduced-motion" | "no-webgl">("loading");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMode("reduced-motion");
      return;
    }
    if (!hasWebGL()) {
      setMode("no-webgl");
      return;
    }
    setMode("3d");
  }, []);

  if (mode === "loading") return <ShowroomLoading />;
  if (mode === "reduced-motion") return <ShowroomFallback reason="reduced-motion" />;
  if (mode === "no-webgl") return <ShowroomFallback reason="no-webgl" />;
  return <ShowroomScene />;
}

function ShowroomLoading() {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-charcoal"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-cedar/30 border-t-cedar" />
        <p className="mt-6 font-heading text-cream text-lg">Heating the showroom…</p>
        <p className="mt-2 text-cream/50 text-xs uppercase tracking-[0.25em]">
          Loading textures
        </p>
      </div>
    </div>
  );
}
