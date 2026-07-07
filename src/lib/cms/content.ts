import { hasCMSBaseUrl, getCMSConfig } from "@/lib/cms/config";
import { fetchCMSJson } from "@/lib/cms/client";
import {
  fallbackBlogPosts,
  fallbackEvents,
  fallbackGalleryAlbums,
  fallbackLeaders,
  fallbackMinistries,
  fallbackSermons,
} from "@/lib/cms/mock-data";
import type {
  BlogPost,
  EventItem,
  GalleryAlbum,
  Leader,
  Ministry,
  Sermon,
} from "@/lib/cms/models";

function toSafeString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toSafeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function mapStrapiMinistry(item: Record<string, unknown>): Ministry {
  const id = String(item.id ?? "");
  const attributes = (item.attributes ?? {}) as Record<string, unknown>;

  return {
    id,
    slug: toSafeString(attributes.slug),
    name: toSafeString(attributes.name),
    focus: toSafeString(attributes.focus),
    schedule: toSafeString(attributes.schedule),
    lead: toSafeString(attributes.lead),
    summary: toSafeString(attributes.summary),
  };
}

function mapStrapiLeader(item: Record<string, unknown>): Leader {
  const id = String(item.id ?? "");
  const attributes = (item.attributes ?? {}) as Record<string, unknown>;

  return {
    id,
    name: toSafeString(attributes.name),
    role: toSafeString(attributes.role),
    description: toSafeString(attributes.description),
  };
}

function mapStrapiSermon(item: Record<string, unknown>): Sermon {
  const id = String(item.id ?? "");
  const attributes = (item.attributes ?? {}) as Record<string, unknown>;

  return {
    id,
    title: toSafeString(attributes.title),
    speaker: toSafeString(attributes.speaker),
    date: toSafeString(attributes.date),
    mediaUrl: toSafeString(attributes.mediaUrl),
    tags: toSafeStringArray(attributes.tags),
    series: toSafeString(attributes.series) || undefined,
  };
}

function mapStrapiEvent(item: Record<string, unknown>): EventItem {
  const id = String(item.id ?? "");
  const attributes = (item.attributes ?? {}) as Record<string, unknown>;

  return {
    id,
    title: toSafeString(attributes.title),
    dateTime: toSafeString(attributes.dateTime),
    location: toSafeString(attributes.location),
    rsvpLink: toSafeString(attributes.rsvpLink) || undefined,
  };
}

function mapStrapiBlogPost(item: Record<string, unknown>): BlogPost {
  const id = String(item.id ?? "");
  const attributes = (item.attributes ?? {}) as Record<string, unknown>;

  return {
    id,
    slug: toSafeString(attributes.slug),
    title: toSafeString(attributes.title),
    excerpt: toSafeString(attributes.excerpt),
    body: toSafeString(attributes.body),
    featuredImage: toSafeString(attributes.featuredImage) || undefined,
    tags: toSafeStringArray(attributes.tags),
  };
}

function mapStrapiGalleryAlbum(item: Record<string, unknown>): GalleryAlbum {
  const id = String(item.id ?? "");
  const attributes = (item.attributes ?? {}) as Record<string, unknown>;
  const yearRaw = attributes.year;

  return {
    id,
    slug: toSafeString(attributes.slug),
    title: toSafeString(attributes.title),
    year: typeof yearRaw === "number" ? yearRaw : 0,
    imageUrls: toSafeStringArray(attributes.imageUrls),
  };
}

export async function getMinistries(): Promise<Ministry[]> {
  const config = getCMSConfig();
  if (!hasCMSBaseUrl(config)) {
    return fallbackMinistries;
  }

  try {
    const data = await fetchCMSJson<{ data: Record<string, unknown>[] }>(
      "/api/ministries?pagination[pageSize]=100&sort=name:asc",
    );
    return data.data.map(mapStrapiMinistry).filter((item) => item.slug);
  } catch {
    return fallbackMinistries;
  }
}

export async function getLeadership(): Promise<Leader[]> {
  const config = getCMSConfig();
  if (!hasCMSBaseUrl(config)) {
    return fallbackLeaders;
  }

  try {
    const data = await fetchCMSJson<{ data: Record<string, unknown>[] }>(
      "/api/leaders?pagination[pageSize]=100&sort=name:asc",
    );
    return data.data.map(mapStrapiLeader).filter((item) => item.name);
  } catch {
    return fallbackLeaders;
  }
}

export async function getSermons(): Promise<Sermon[]> {
  const config = getCMSConfig();
  if (!hasCMSBaseUrl(config)) {
    return fallbackSermons;
  }

  try {
    const data = await fetchCMSJson<{ data: Record<string, unknown>[] }>(
      "/api/sermons?pagination[pageSize]=100&sort=date:desc",
    );
    return data.data.map(mapStrapiSermon).filter((item) => item.title);
  } catch {
    return fallbackSermons;
  }
}

export async function getEvents(): Promise<EventItem[]> {
  const config = getCMSConfig();
  if (!hasCMSBaseUrl(config)) {
    return fallbackEvents;
  }

  try {
    const data = await fetchCMSJson<{ data: Record<string, unknown>[] }>(
      "/api/events?pagination[pageSize]=100&sort=dateTime:asc",
    );
    return data.data.map(mapStrapiEvent).filter((item) => item.title);
  } catch {
    return fallbackEvents;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const config = getCMSConfig();
  if (!hasCMSBaseUrl(config)) {
    return fallbackBlogPosts;
  }

  try {
    const data = await fetchCMSJson<{ data: Record<string, unknown>[] }>(
      "/api/blog-posts?pagination[pageSize]=100&sort=publishedAt:desc",
    );
    return data.data.map(mapStrapiBlogPost).filter((item) => item.slug);
  } catch {
    return fallbackBlogPosts;
  }
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const config = getCMSConfig();
  if (!hasCMSBaseUrl(config)) {
    return fallbackGalleryAlbums;
  }

  try {
    const data = await fetchCMSJson<{ data: Record<string, unknown>[] }>(
      "/api/gallery-albums?pagination[pageSize]=100&sort=year:desc",
    );
    return data.data.map(mapStrapiGalleryAlbum).filter((item) => item.slug);
  } catch {
    return fallbackGalleryAlbums;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  const events = await getEvents();
  return events.find((eventItem) => eventItem.id === id);
}

export async function getSermonById(id: string): Promise<Sermon | undefined> {
  const sermons = await getSermons();
  return sermons.find((sermon) => sermon.id === id);
}

export async function getGalleryAlbumBySlug(
  slug: string,
): Promise<GalleryAlbum | undefined> {
  const albums = await getGalleryAlbums();
  return albums.find((album) => album.slug === slug);
}
