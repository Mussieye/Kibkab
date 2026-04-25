export type Ministry = {
  slug: string;
  name: string;
  focus: string;
  schedule: string;
  lead: string;
  summary: string;
};

export const ministries: Ministry[] = [
  {
    slug: "youth",
    name: "Youth Ministry",
    focus: "Discipleship, mentorship, and Christ-centered identity for teens.",
    schedule: "Fridays, 6:30 PM",
    lead: "Youth Leadership Team",
    summary:
      "A vibrant space where young people grow in scripture, worship, and meaningful friendships.",
  },
  {
    slug: "worship",
    name: "Worship Ministry",
    focus: "Leading congregational worship with excellence and reverence.",
    schedule: "Saturdays, 4:00 PM rehearsal",
    lead: "Worship Director",
    summary:
      "Musicians and vocalists serve together to create prayerful worship experiences.",
  },
  {
    slug: "outreach",
    name: "Outreach Ministry",
    focus: "Serving neighborhoods through evangelism and practical support.",
    schedule: "Monthly community outreach",
    lead: "Outreach Coordinators",
    summary:
      "We share the love of Christ through local mission projects, care visits, and service drives.",
  },
  {
    slug: "small-groups",
    name: "Small Groups Ministry",
    focus: "Bible study, fellowship, and spiritual growth in community.",
    schedule: "Weeknights in homes and online",
    lead: "Small Group Leaders",
    summary:
      "Small groups create a welcoming environment for prayer, encouragement, and accountability.",
  },
];
