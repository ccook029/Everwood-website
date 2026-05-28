"use client";

import { useEffect, useState } from "react";
import { LinearFilter, SRGBColorSpace, Texture, TextureLoader } from "three";

const cache = new Map<string, Texture>();

/**
 * Loads an image into a three.js Texture without suspending — falls back to
 * `null` while loading or if the file is missing. Cached across mounts.
 */
export function useImageTexture(url: string | undefined): Texture | null {
  const [texture, setTexture] = useState<Texture | null>(() =>
    url ? cache.get(url) ?? null : null,
  );

  useEffect(() => {
    if (!url) return;
    const cached = cache.get(url);
    if (cached) {
      setTexture(cached);
      return;
    }
    let cancelled = false;
    const loader = new TextureLoader();
    loader.load(
      url,
      (tex) => {
        if (cancelled) return;
        tex.colorSpace = SRGBColorSpace;
        tex.minFilter = LinearFilter;
        tex.magFilter = LinearFilter;
        tex.anisotropy = 4;
        cache.set(url, tex);
        setTexture(tex);
      },
      undefined,
      () => {
        if (!cancelled) setTexture(null);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [url]);

  return texture;
}

/**
 * Preloads a numbered image sequence into Texture objects.
 * Returns the array (entries may be null until each frame loads).
 */
export function useSequenceTextures(urls: string[]): (Texture | null)[] {
  const [textures, setTextures] = useState<(Texture | null)[]>(() =>
    urls.map((u) => cache.get(u) ?? null),
  );

  useEffect(() => {
    let cancelled = false;
    const loader = new TextureLoader();
    const next: (Texture | null)[] = urls.map((u) => cache.get(u) ?? null);
    setTextures(next);
    urls.forEach((u, i) => {
      if (cache.has(u)) return;
      loader.load(
        u,
        (tex) => {
          if (cancelled) return;
          tex.colorSpace = SRGBColorSpace;
          tex.minFilter = LinearFilter;
          tex.magFilter = LinearFilter;
          cache.set(u, tex);
          setTextures((prev) => {
            const copy = prev.slice();
            copy[i] = tex;
            return copy;
          });
        },
        undefined,
        () => {
          /* missing frame — leave null */
        },
      );
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join("|")]);

  return textures;
}
