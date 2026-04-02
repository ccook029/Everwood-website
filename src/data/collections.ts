import { Collection } from "./types";

export const collections: Collection[] = [
  {
    name: "Solace Series",
    slug: "solace-series",
    tagline: "Full Spectrum Infrared",
    description: `The Solace Series harnesses the full spectrum of infrared light — near, mid, and far wavelengths — to deliver the deepest, most therapeutic heat available in a home sauna. Unlike single-wavelength systems, full spectrum infrared penetrates tissue at multiple depths simultaneously, promoting everything from surface-level skin rejuvenation to deep muscle recovery and improved cardiovascular function.

Designed for indoor use, every Solace model features low-EMF carbon panel heaters, chromotherapy lighting, and premium wood construction. The series spans from a compact single-person cabin that fits in an apartment corner to a spacious four-person model ideal for families. Most models plug into a standard household outlet, making installation as simple as unboxing and plugging in.

The Solace Series is ideal for anyone seeking daily wellness benefits without the complexity of traditional steam. If you want a sauna you can use every day with minimal preparation and maximum therapeutic benefit, start here.`,
    startingPrice: 2799,
    productCount: 4,
  },
  {
    name: "Glow Series",
    slug: "glow-series",
    tagline: "Carbon Panel Infrared",
    description: `The Glow Series delivers the core benefits of infrared therapy — detoxification, relaxation, and pain relief — through efficient carbon panel heating technology. Carbon panels produce gentle, even far-infrared heat across a large surface area, creating a comfortable and consistent sauna experience that is perfect for daily use.

With a modern, minimalist design language, the Glow Series blends seamlessly into contemporary homes. The tempered glass doors flood the cabin with natural light, while clean lines and premium finishes make these saunas as much a design statement as a wellness tool. Available in a standard two-person model and a clever corner unit that maximizes space in any room.

If you are new to infrared sauna or want an effective, beautifully designed entry point into daily heat therapy, the Glow Series offers outstanding value without compromising on build quality or therapeutic performance.`,
    startingPrice: 2999,
    productCount: 2,
  },
  {
    name: "Summit Series",
    slug: "summit-series",
    tagline: "Traditional Steam",
    description: `The Summit Series is our tribute to centuries of Finnish sauna tradition. Each model features a powerful electric stove that heats natural stones to create thick, aromatic steam — the kind of heat that opens your pores, clears your airways, and leaves you feeling deeply renewed. There is simply no substitute for the ritual of ladling water over hot stones and feeling the wave of steam wash over you.

Available in three sizes from an intimate two-person cabin to a commanding six-person room with double-tiered benches, the Summit Series caters to solo practitioners and social sauna enthusiasts alike. Every model ships with sauna stones, a traditional wooden bucket and ladle set, and a thermometer-hygrometer for monitoring conditions.

The Summit Series is built for those who believe the original is still the best. If you crave the authentic heat, humidity, and ritual of a traditional sauna — the kind you would find in a Finnish lake house — look no further.`,
    startingPrice: 3999,
    productCount: 3,
  },
  {
    name: "Timberline Series",
    slug: "timberline-series",
    tagline: "Barrel Saunas",
    description: `The Timberline Series features our iconic barrel saunas, handcrafted from Canadian Red Cedar and designed to become the centrepiece of your outdoor space. The barrel shape is more than aesthetic — it naturally eliminates wasted air volume, allowing the stove to heat the interior faster and more efficiently than rectangular designs. Rain and snow slide off the curved roof without pooling, extending the life of the wood.

Canadian Red Cedar was chosen for its natural resistance to rot, insects, and decay, as well as its beautiful warm tone and aromatic properties. Over time, the exterior develops a distinguished silver-grey patina while the interior retains its rich, fragrant character. Stainless steel bands and hardware ensure structural integrity through years of temperature cycling and weather exposure.

From a compact two-person model perfect for urban backyards to our flagship eight-person barrel built for entertaining, the Timberline Series transforms any outdoor space into a year-round Nordic retreat.`,
    startingPrice: 5499,
    productCount: 3,
  },
  {
    name: "Harmony Series",
    slug: "harmony-series",
    tagline: "Dual Infrared + Steam",
    description: `The Harmony Series is for those who refuse to choose. Each model combines full spectrum infrared panels with a traditional steam stove in a single cabin, giving you two completely different sauna experiences without needing two separate units. Use infrared for gentle daily detox sessions, fire up the stove for an intense steam bath on weekends, or run both systems simultaneously for a hybrid heat experience unlike anything else on the market.

Independent controls for each heating system let you customize your session with precision. Start with infrared to warm your core gradually, then add steam for a finishing burst of humidity. Or reverse the order. The Harmony Series adapts to your mood, your goals, and your schedule.

Available in a three-person and a five-person configuration, the Harmony Series is ideal for wellness enthusiasts who have experienced both infrared and traditional saunas and want the flexibility to enjoy both at home.`,
    startingPrice: 5999,
    productCount: 2,
  },
  {
    name: "Lodge Series",
    slug: "lodge-series",
    tagline: "Cabin & Outdoor",
    description: `The Lodge Series brings the romance of a Nordic sauna cabin to your backyard. These standalone outdoor structures are built from thermo-treated wood — a process that uses only heat and steam to dramatically improve dimensional stability, moisture resistance, and durability without any chemical treatments. The result is a sauna that withstands harsh winters, humid summers, and everything in between.

Each Lodge model features a charming cabin aesthetic with a peaked roof, solid wood door, and carefully insulated walls that hold heat efficiently while blending naturally into garden landscapes. The Lodge Grand adds a covered porch area — a dedicated space for cooling down between rounds, storing accessories, or simply enjoying the transition between the heat of the sauna and the cool of the outdoors.

The Lodge Series is perfect for homeowners who want their sauna to feel like a destination — a permanent, beautiful addition to their property that elevates both their wellness routine and their outdoor living space.`,
    startingPrice: 5999,
    productCount: 2,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
