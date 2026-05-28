# Showroom Photos

This folder holds the photos rendered inside the 3D showroom at `/showroom`.
Filenames are read from `src/lib/showroom-config.ts` — edit that file if you
want to add, remove, or relocate products. The components never hardcode
image paths.

## How to add a photo (static panel)

1. Create a folder for the product, named after its slug:

   ```
   public/showroom/<slug>/
   ```

   The slug must match the one in `src/data/products.ts` and the config file.
   Example: `public/showroom/everwood-solace-2/`

2. Drop a single image inside named `main.jpg` (or `.png`/`.webp` — update
   the `image` path in the config if you change the extension):

   ```
   public/showroom/everwood-solace-2/main.jpg
   ```

3. That's it. Reload `/showroom`.

## How to add a 360° spin sequence

1. Photograph (or render) the product from evenly-spaced angles around a
   single axis. **24 frames is fine, 36 is smoother.**

2. Name them with a zero-padded numeric prefix:

   ```
   public/showroom/<slug>/spin/01.jpg
   public/showroom/<slug>/spin/02.jpg
   …
   public/showroom/<slug>/spin/36.jpg
   ```

3. In `src/lib/showroom-config.ts`, set the product's entry to:

   ```ts
   {
     slug: "everwood-timberline-4",
     name: "Everwood Timberline 4",
     collection: "Timberline Series",
     price: 6499,
     mode: "spin",
     spinFolder: "/showroom/everwood-timberline-4/spin",
     frameCount: 36,
     extension: "jpg",
     pad: 2,
   }
   ```

   Users will drag-to-rotate the panel; clicking without dragging routes to
   the PDP.

## Recommended aspect ratios

| Subject | Aspect | Pixel target | Notes |
|---|---|---|---|
| Indoor cabin (Solace, Glow, Summit, Harmony) | **4 : 5 portrait** | 1200 × 1500 | Tall framing flatters cabinet-style saunas |
| Outdoor cabin (Lodge) | **4 : 5 portrait** | 1200 × 1500 | Include some surroundings for context |
| Barrel (Timberline) still | **1 : 1 square** | 1400 × 1400 | Centred on the barrel cross-section |
| Barrel (Timberline) spin | **1 : 1 square** | 1024 × 1024 per frame | Keep the product centred between frames |
| Hero / room shot | 16 : 9 landscape | 1920 × 1080 | Override `aspect` in the config to 16/9 |

The config supports a per-product `aspect` field (width / height). Override
it if your photo's framing differs from the defaults above.

## File size guidance

- Compress to **150–250 KB** per panel (JPEG quality ~78 or WebP). Anything
  larger will tax mobile.
- For 36-frame spin sequences keep each frame **≤ 80 KB**; total budget
  ~2.5 MB per product.
- Strip EXIF data; ICC profile should be sRGB.

## Behaviour when an image is missing

The scene degrades gracefully — a missing image renders as a forest-green
placeholder panel rather than crashing the canvas. Open the browser console
to spot 404s during development.

## Performance notes

- Textures are loaded lazily and cached across navigations.
- `<Preload all />` warms the scene once all panels are mounted.
- The canvas caps device pixel ratio at 1.5 (see `showroomScene.maxDpr` in
  the config) and uses adaptive DPR while the camera is moving.
- Reduced-motion users and devices without WebGL automatically get the 2D
  grid fallback rendered from the same config.
