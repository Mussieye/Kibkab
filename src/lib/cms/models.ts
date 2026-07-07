export type CMSProvider = "strapi" | "wordpress";

export type Leader = {
  id: string;
  name: string;
  role: string;
  description: string;
};

export type Ministry = {
  id: string;
  slug: string;
  name: string;
  focus: string;
  schedule: string;
  lead: string;
  summary: string;
};

export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  mediaUrl: string;
  tags: string[];
  series?: string;
};

export type EventItem = {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  rsvpLink?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featuredImage?: string;
  tags: string[];
};

export type GalleryAlbum = {
  id: string;
  slug: string;
  title: string;
  year: number;
  imageUrls: string[];
};

export type PrayerRequest = {
  id: string;
  name?: string;
  request: string;
  date: string;
  isPrivate?: boolean;
};
