export interface Product {
  name: string;
  slug: string;
  internalSku: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number;
  currency: string;
  category: string;
  collection: string;
  collectionSlug: string;
  capacity: string;
  capacityMin: number;
  capacityMax: number;
  dimensions: {
    metric: string;
    imperial: string;
  };
  heaterType: string;
  power: string;
  electrical: string;
  material?: string;
  includes?: string[];
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  stockStatus: "in-stock" | "pre-order" | "out-of-stock";
}

export interface Collection {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  startingPrice: number;
  productCount: number;
}
