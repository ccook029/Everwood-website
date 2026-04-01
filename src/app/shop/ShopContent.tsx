"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "../../data/products";
import { collections } from "../../data/collections";
import { Product } from "../../data/types";
import ProductCard from "../../components/ui/ProductCard";
import FadeInUp from "../../components/ui/FadeInUp";

const PRICE_RANGES = [
  { label: "Under $3,000", min: 0, max: 2999 },
  { label: "$3,000 - $5,000", min: 3000, max: 5000 },
  { label: "$5,000 - $8,000", min: 5000, max: 8000 },
  { label: "$8,000+", min: 8000, max: Infinity },
];

const CAPACITY_OPTIONS = [
  { label: "1-2 Person", min: 1, max: 2 },
  { label: "3-4 Person", min: 3, max: 4 },
  { label: "5+ Person", min: 5, max: 99 },
];

const HEAT_TYPES = ["Infrared", "Steam", "Dual"];
const LOCATION_TYPES = ["Indoor", "Outdoor"];

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

function getHeatType(product: Product): string {
  if (product.tags.includes("dual-system")) return "Dual";
  if (product.tags.includes("infrared")) return "Infrared";
  if (product.tags.includes("steam") || product.tags.includes("barrel") || product.tags.includes("outdoor"))
    return "Steam";
  return "Steam";
}

export default function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    searchParams.get("collection")?.split(",").filter(Boolean) || []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    searchParams.get("price") || null
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
    searchParams.get("capacity") || null
  );
  const [selectedHeatType, setSelectedHeatType] = useState<string | null>(
    searchParams.get("heat") || null
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    searchParams.get("location") || null
  );
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "featured"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Update URL params when filters change
  const updateUrl = useCallback(
    (cols: string[], price: string | null, cap: string | null, heat: string | null, loc: string | null, s: SortOption) => {
      const params = new URLSearchParams();
      if (cols.length) params.set("collection", cols.join(","));
      if (price) params.set("price", price);
      if (cap) params.set("capacity", cap);
      if (heat) params.set("heat", heat);
      if (loc) params.set("location", loc);
      if (s !== "featured") params.set("sort", s);
      const qs = params.toString();
      router.replace(`/shop${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    updateUrl(selectedCollections, selectedPriceRange, selectedCapacity, selectedHeatType, selectedLocation, sort);
  }, [selectedCollections, selectedPriceRange, selectedCapacity, selectedHeatType, selectedLocation, sort, updateUrl]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCollections.length > 0) {
      result = result.filter((p) => selectedCollections.includes(p.collectionSlug));
    }

    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.label === selectedPriceRange);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    if (selectedCapacity) {
      const cap = CAPACITY_OPTIONS.find((c) => c.label === selectedCapacity);
      if (cap) {
        result = result.filter(
          (p) => p.capacityMax >= cap.min && p.capacityMin <= cap.max
        );
      }
    }

    if (selectedHeatType) {
      result = result.filter((p) => getHeatType(p) === selectedHeatType);
    }

    if (selectedLocation) {
      result = result.filter((p) => p.category === selectedLocation);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.reverse();
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCollections, selectedPriceRange, selectedCapacity, selectedHeatType, selectedLocation, sort]);

  const activeFilters: { label: string; clear: () => void }[] = [];
  selectedCollections.forEach((slug) => {
    const col = collections.find((c) => c.slug === slug);
    if (col) {
      activeFilters.push({
        label: col.name,
        clear: () => setSelectedCollections((prev) => prev.filter((s) => s !== slug)),
      });
    }
  });
  if (selectedPriceRange)
    activeFilters.push({ label: selectedPriceRange, clear: () => setSelectedPriceRange(null) });
  if (selectedCapacity)
    activeFilters.push({ label: selectedCapacity, clear: () => setSelectedCapacity(null) });
  if (selectedHeatType)
    activeFilters.push({ label: selectedHeatType, clear: () => setSelectedHeatType(null) });
  if (selectedLocation)
    activeFilters.push({ label: selectedLocation, clear: () => setSelectedLocation(null) });

  const clearAll = () => {
    setSelectedCollections([]);
    setSelectedPriceRange(null);
    setSelectedCapacity(null);
    setSelectedHeatType(null);
    setSelectedLocation(null);
  };

  const toggleCollection = (slug: string) => {
    setSelectedCollections((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filterSidebar = (
    <div className="space-y-6">
      {/* Collections */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-charcoal mb-3">Collection</h3>
        <div className="space-y-2">
          {collections.map((col) => (
            <label key={col.slug} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCollections.includes(col.slug)}
                onChange={() => toggleCollection(col.slug)}
                className="rounded border-stone text-cedar focus:ring-cedar"
              />
              <span className="text-sm text-charcoal/80">{col.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-charcoal mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === range.label}
                onChange={() =>
                  setSelectedPriceRange(selectedPriceRange === range.label ? null : range.label)
                }
                className="border-stone text-cedar focus:ring-cedar"
              />
              <span className="text-sm text-charcoal/80">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-charcoal mb-3">Capacity</h3>
        <div className="space-y-2">
          {CAPACITY_OPTIONS.map((cap) => (
            <label key={cap.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="capacity"
                checked={selectedCapacity === cap.label}
                onChange={() =>
                  setSelectedCapacity(selectedCapacity === cap.label ? null : cap.label)
                }
                className="border-stone text-cedar focus:ring-cedar"
              />
              <span className="text-sm text-charcoal/80">{cap.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Heat Type */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-charcoal mb-3">Heat Type</h3>
        <div className="space-y-2">
          {HEAT_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="heat"
                checked={selectedHeatType === type}
                onChange={() =>
                  setSelectedHeatType(selectedHeatType === type ? null : type)
                }
                className="border-stone text-cedar focus:ring-cedar"
              />
              <span className="text-sm text-charcoal/80">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-charcoal mb-3">Location</h3>
        <div className="space-y-2">
          {LOCATION_TYPES.map((loc) => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="location"
                checked={selectedLocation === loc}
                onChange={() =>
                  setSelectedLocation(selectedLocation === loc ? null : loc)
                }
                className="border-stone text-cedar focus:ring-cedar"
              />
              <span className="text-sm text-charcoal/80">{loc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-charcoal py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Shop All Saunas
          </h1>
          <p className="mt-4 text-cream/60 max-w-xl mx-auto">
            {products.length} saunas across {collections.length} collections. Free shipping on every order.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeFilters.map((filter) => (
              <button
                key={filter.label}
                onClick={filter.clear}
                className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-3 py-1 text-sm text-forest hover:bg-forest/20 transition-colors"
              >
                {filter.label}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button
              onClick={clearAll}
              className="text-sm text-charcoal/50 hover:text-charcoal transition-colors underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-stone px-4 py-2 text-sm text-charcoal hover:bg-stone/20 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <p className="text-sm text-charcoal/60 hidden lg:block">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-stone bg-white px-4 py-2 pr-8 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-cedar/30"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {filterSidebar}
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-charcoal/60">No products match your filters.</p>
                <button
                  onClick={clearAll}
                  className="mt-4 text-cedar hover:underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <FadeInUp key={product.slug} delay={i * 0.05}>
                    <ProductCard product={product} />
                  </FadeInUp>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-cream overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-semibold text-charcoal">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterSidebar}
          </div>
        </div>
      )}
    </div>
  );
}
