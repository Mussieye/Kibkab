import type {
  BlogPost,
  EventItem,
  GalleryAlbum,
  Leader,
  Ministry,
  Sermon,
} from "@/lib/cms/models";

export const fallbackMinistries: Ministry[] = [
  {
    id: "youth",
    slug: "youth",
    name: "Youth Ministry",
    focus: "Discipleship, mentorship, and Christ-centered identity for teens.",
    schedule: "Fridays, 6:30 PM",
    lead: "Youth Leadership Team",
    summary:
      "A vibrant space where young people grow in scripture, worship, and meaningful friendships.",
  },
  {
    id: "worship",
    slug: "worship",
    name: "Worship Ministry",
    focus: "Leading congregational worship with excellence and reverence.",
    schedule: "Saturdays, 4:00 PM rehearsal",
    lead: "Worship Director",
    summary:
      "Musicians and vocalists serve together to create prayerful worship experiences.",
  },
  {
    id: "outreach",
    slug: "outreach",
    name: "Outreach Ministry",
    focus: "Serving neighborhoods through evangelism and practical support.",
    schedule: "Monthly community outreach",
    lead: "Outreach Coordinators",
    summary:
      "We share the love of Christ through local mission projects, care visits, and service drives.",
  },
  {
    id: "small-groups",
    slug: "small-groups",
    name: "Small Groups Ministry",
    focus: "Bible study, fellowship, and spiritual growth in community.",
    schedule: "Weeknights in homes and online",
    lead: "Small Group Leaders",
    summary:
      "Small groups create a welcoming environment for prayer, encouragement, and accountability.",
  },
];

export const fallbackLeaders: Leader[] = [
  {
    id: "pastor-daniel-bekele",
    name: "Pastor Daniel Bekele",
    role: "Lead Pastor",
    description:
      "Provides spiritual oversight, preaching, and pastoral care for the church family.",
  },
  {
    id: "hannah-tesfaye",
    name: "Hannah Tesfaye",
    role: "Worship Director",
    description:
      "Leads worship teams and helps cultivate a reverent, Christ-centered worship culture.",
  },
  {
    id: "samuel-kassa",
    name: "Samuel Kassa",
    role: "Outreach Coordinator",
    description:
      "Coordinates local outreach efforts, community partnerships, and evangelism initiatives.",
  },
];

export const fallbackSermons: Sermon[] = [
  {
    id: "sermon-1",
    title: "Walking in Faith",
    speaker: "Pastor Daniel Bekele",
    date: "2026-04-20",
    mediaUrl: "https://www.youtube.com/watch?v=placeholder",
    tags: ["faith", "discipleship"],
    series: "Foundations",
  },
];

export const fallbackEvents: EventItem[] = [
  {
    id: "event-1",
    title: "Sunday Worship Service",
    dateTime: "2026-05-03T09:00:00.000Z",
    location: "Main Sanctuary",
    rsvpLink: "",
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "daily-devotion-hope",
    title: "Daily Devotion: Hope in Christ",
    excerpt: "A short encouragement on anchoring your heart in Christ.",
    body: "Our hope is secure in Jesus. In every season, we trust His promises.",
    featuredImage: "",
    tags: ["devotional", "hope"],
  },
];

export const fallbackGalleryAlbums: GalleryAlbum[] = [
  {
    id: "gallery-1",
    slug: "easter-service-2026",
    title: "Easter Service 2026",
    year: 2026,
    imageUrls: [],
  },
];
