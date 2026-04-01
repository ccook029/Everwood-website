import type { MetadataRoute } from "next";
import { products } from "../data/products";
import { collections } from "../data/collections";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://everwoodsauna.com";

const policySlugs = ["shipping", "returns", "warranty", "privacy", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/guide`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}/guide/infrared-vs-steam`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const collectionPages: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const policyPages: MetadataRoute.Sitemap = policySlugs.map((slug) => ({
    url: `${siteUrl}/policies/${slug}`,
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  return [...staticPages, ...collectionPages, ...productPages, ...policyPages];
}
