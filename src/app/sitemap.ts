import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://maranathachristianchurch.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { url: "/",                    priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: "/about",               priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/about/leadership",    priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/ministries",          priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/media",               priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: "/media/sermons",       priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: "/media/live-stream",   priority: 0.8,  changeFrequency: "weekly"  as const },
    { url: "/events",              priority: 0.9,  changeFrequency: "daily"   as const },
    { url: "/blog-devotionals",    priority: 0.8,  changeFrequency: "weekly"  as const },
    { url: "/gallery",             priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/prayer-requests",     priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/give-online",         priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/contact",             priority: 0.7,  changeFrequency: "yearly"  as const },
  ];

  return routes.map(r => ({
    url: `${BASE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
