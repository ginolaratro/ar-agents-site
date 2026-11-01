import type { MetadataRoute } from "next";
import { INDUSTRIES } from "./content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, priority: 1 },
    ...INDUSTRIES.map((i) => ({
      url: `${BASE}/industries/${i.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
