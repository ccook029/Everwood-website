// ─────────────────────────────────────────────────────────────────────────────
// Showroom Configuration
// Edit this file to map each product to its photo(s) in /public/showroom/.
//
// Two display modes:
//   - mode: "panel"  → a single still image rendered on a floating 3D panel
//   - mode: "spin"   → a numbered image sequence rendered as a 360° drag-to-spin
//
// Pedestal positions are laid out automatically by the scene, but you can
// override `position` (in metres, [x, y, z]) per product if you want manual
// placement. The default scene arranges them in a gentle ring.
//
// Aspect ratio guidance:
//   - Panel photos: 4:5 portrait (e.g. 1200×1500) works best for cabin/barrel
//     shots; 16:9 landscape is fine for room-style hero images.
//   - Spin sequence: square (1:1) crops centred on the product, 24–36 frames
//     evenly spaced around the unit. Name them 01.jpg, 02.jpg, …, padded.
// ─────────────────────────────────────────────────────────────────────────────

export type ShowroomDisplayMode = "panel" | "spin";

export interface ShowroomProductBase {
  /** Must match the slug used in /products/[slug] for routing */
  slug: string;
  /** Display name shown under the panel */
  name: string;
  /** Collection name (used as a section/grouping label in the scene) */
  collection: string;
  /** Price in CAD; rendered with formatPrice */
  price: number;
  /** PDP link — defaults to /products/<slug> if omitted */
  href?: string;
  /** Optional manual pedestal placement [x, y, z]; otherwise auto-laid-out */
  position?: [number, number, number];
  /** Optional Y-axis rotation in radians for manual orientation */
  rotationY?: number;
  /** Aspect ratio (width / height) of the source image; default 0.8 (4:5) */
  aspect?: number;
  /** Cabin dimensions in metres (W × H × D). Defaults to Solace 2-ish proportions. */
  dimensions3d?: { w: number; h: number; d: number };
  /**
   * Optional UV crop applied to the front-face texture so the sauna fills the
   * cabin face instead of including floor/ceiling around it.
   * Format: [offsetX, offsetY, repeatX, repeatY] — all 0..1.
   * three.js UV origin is bottom-left; offsetY is measured from the bottom.
   */
  frontCrop?: [number, number, number, number];
}

export interface ShowroomPanelProduct extends ShowroomProductBase {
  mode: "panel";
  /** Path relative to /public, e.g. "/showroom/everwood-solace-2/main.jpg" */
  image: string;
}

export interface ShowroomSpinProduct extends ShowroomProductBase {
  mode: "spin";
  /** Folder path relative to /public containing the numbered frames */
  spinFolder: string;
  /** Total number of frames in the sequence */
  frameCount: number;
  /** Frame file extension (without dot); default "jpg" */
  extension?: "jpg" | "jpeg" | "png" | "webp";
  /** Number padding width; default 2 (e.g. 01.jpg). Use 3 for 001.jpg */
  pad?: number;
}

export type ShowroomProduct = ShowroomPanelProduct | ShowroomSpinProduct;

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT MAP
// One entry per product you want to feature in the 3D showroom.
// Drop photos into /public/showroom/<slug>/ with the filename shown below.
// ─────────────────────────────────────────────────────────────────────────────

export const showroomProducts: ShowroomProduct[] = [
  // ── SOLACE SERIES (Full Spectrum Infrared) ──
  {
    slug: "everwood-solace-1",
    name: "Everwood Solace 1",
    collection: "Solace Series",
    price: 2799,
    mode: "panel",
    image: "/showroom/everwood-solace-1/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-solace-2",
    name: "Everwood Solace 2",
    collection: "Solace Series",
    price: 3499,
    mode: "panel",
    image: "/showroom/everwood-solace-2/main.jpg",
    aspect: 4 / 5,
    // Real cabin: 47" W × 75" H × 41" D ≈ 1.2 × 1.9 × 1.05 m
    dimensions3d: { w: 1.2, h: 1.9, d: 1.05 },
    // Crop tuned to the supplied photo (828×898): isolate the cabinet,
    // dropping the floor + surrounding wall so the photo edges land on the
    // cedar side faces. offsetY is from the bottom of the image.
    frontCrop: [0.2, 0.03, 0.6, 0.91],
  },
  {
    slug: "everwood-solace-3",
    name: "Everwood Solace 3",
    collection: "Solace Series",
    price: 4499,
    mode: "panel",
    image: "/showroom/everwood-solace-3/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-solace-4",
    name: "Everwood Solace 4",
    collection: "Solace Series",
    price: 5499,
    mode: "panel",
    image: "/showroom/everwood-solace-4/main.jpg",
    aspect: 4 / 5,
  },

  // ── GLOW SERIES (Carbon Panel Infrared) ──
  {
    slug: "everwood-glow-2",
    name: "Everwood Glow 2",
    collection: "Glow Series",
    price: 2999,
    mode: "panel",
    image: "/showroom/everwood-glow-2/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-glow-corner-4",
    name: "Everwood Glow Corner 4",
    collection: "Glow Series",
    price: 3999,
    mode: "panel",
    image: "/showroom/everwood-glow-corner-4/main.jpg",
    aspect: 4 / 5,
  },

  // ── SUMMIT SERIES (Traditional Steam) ──
  {
    slug: "everwood-summit-2",
    name: "Everwood Summit 2",
    collection: "Summit Series",
    price: 3999,
    mode: "panel",
    image: "/showroom/everwood-summit-2/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-summit-4",
    name: "Everwood Summit 4",
    collection: "Summit Series",
    price: 5999,
    mode: "panel",
    image: "/showroom/everwood-summit-4/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-summit-6",
    name: "Everwood Summit 6",
    collection: "Summit Series",
    price: 6999,
    mode: "panel",
    image: "/showroom/everwood-summit-6/main.jpg",
    aspect: 4 / 5,
  },

  // ── TIMBERLINE SERIES (Barrel Saunas) ──
  // Example: this one is wired up as a 360° spin viewer.
  // Drop 36 frames into /public/showroom/everwood-timberline-4/spin/01.jpg…36.jpg
  {
    slug: "everwood-timberline-2",
    name: "Everwood Timberline 2",
    collection: "Timberline Series",
    price: 5499,
    mode: "panel",
    image: "/showroom/everwood-timberline-2/main.jpg",
    aspect: 1, // square crop works well for barrels
  },
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
  },
  {
    slug: "everwood-timberline-8",
    name: "Everwood Timberline 8",
    collection: "Timberline Series",
    price: 7999,
    mode: "panel",
    image: "/showroom/everwood-timberline-8/main.jpg",
    aspect: 1,
  },

  // ── HARMONY SERIES (Dual System) ──
  {
    slug: "everwood-harmony-3",
    name: "Everwood Harmony 3",
    collection: "Harmony Series",
    price: 5999,
    mode: "panel",
    image: "/showroom/everwood-harmony-3/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-harmony-5",
    name: "Everwood Harmony 5",
    collection: "Harmony Series",
    price: 7499,
    mode: "panel",
    image: "/showroom/everwood-harmony-5/main.jpg",
    aspect: 4 / 5,
  },

  // ── LODGE SERIES (Cabin & Outdoor) ──
  {
    slug: "everwood-lodge-compact",
    name: "Everwood Lodge Compact",
    collection: "Lodge Series",
    price: 5999,
    mode: "panel",
    image: "/showroom/everwood-lodge-compact/main.jpg",
    aspect: 4 / 5,
  },
  {
    slug: "everwood-lodge-grand",
    name: "Everwood Lodge Grand",
    collection: "Lodge Series",
    price: 9499,
    mode: "panel",
    image: "/showroom/everwood-lodge-grand/main.jpg",
    aspect: 4 / 5,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCENE CONSTANTS
// Tweak the atmosphere of the showroom without touching the components.
// ─────────────────────────────────────────────────────────────────────────────

export const showroomScene = {
  /** Background colour for the scene (charcoal) */
  background: "#2B2B2B",
  /** Fog colour (matches background for seamless depth blend) */
  fogColor: "#2B2B2B",
  fogNear: 6,
  fogFar: 28,
  /** Warm point-light colour (cedar / ember tones) */
  warmLight: "#C4571A",
  warmLightIntensity: 6,
  /** Ambient cedar tone for the wood-lined room */
  cedar: "#A67C52",
  /** Forest accent used on the pedestals */
  forest: "#3B5A3B",
  /** Cream tone used for text labels */
  cream: "#F7F3EE",
  /** Radius of the ring on which product pedestals are laid out (metres) */
  ringRadius: 5.5,
  /** Height of each panel above the pedestal (metres) */
  panelHeight: 1.6,
  /** Width of each panel in metres (height derived from aspect) */
  panelWidth: 1.6,
  /** Maximum device pixel ratio for the canvas (perf cap) */
  maxDpr: 1.5,
} as const;

export function productHref(p: ShowroomProduct): string {
  return p.href ?? `/products/${p.slug}`;
}
