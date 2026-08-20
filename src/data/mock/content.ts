import type { EventItem, Partner, GalleryItem, BlogPost, Stat } from "@/types";

/**
 * Real community/event photography copied into /public from the project assets.
 * Each real photo is used for ONE purpose only — never duplicated across items.
 */
const IMG = {
  conference: "/images/tech-community-conference.jpg",
  session: "/events/community-session.png", // real workshop/session photo
  gathering: "/events/community-gathering.png", // real community gathering
  hall: "/events/community-hall.png", // real photo: students in seminar hall
  placementWorkshop: "/events/workshop-placement-roadmap.png", // real event poster (GeeksForGeeks)
  event1: "/events/event-1.png", // real event photo
  event2: "/events/event-2.jpg", // real event photo
  event3: "/events/event-3.png", // real event photo
  blogTalent: "/blog/student-talent.jpg", // real blog image
} as const;

/** Headline stats preserved from the legacy site (backend-replaceable later). */
export const stats: Stat[] = [
  { label: "Students", value: 1000, suffix: "+" },
  { label: "Event Regs", value: 230, suffix: "+" },
  { label: "Partners", value: 4, suffix: "+" },
  { label: "College MoUs", value: 2, suffix: "+" },
];

/** Achievements/events observed on the legacy site. */
export const events: EventItem[] = [
  {
    id: "placement-roadmap-gfg",
    slug: "placement-roadmap-for-cs-students",
    title: "Placement Roadmap for CS Students",
    summary: "A hands-on workshop on DSA, projects & interview preparation, presented with GeeksForGeeks.",
    description:
      "Kick To Tech proudly presents a hands-on workshop on the Placement Roadmap for CS Students — covering DSA, projects, and interview preparation, delivered in collaboration with GeeksForGeeks.",
    category: "workshop",
    status: "upcoming",
    date: "2026-04-05",
    location: "Pune",
    organizer: "Kick To Tech × GeeksForGeeks",
    imageUrl: IMG.placementWorkshop,
    tags: ["DSA", "Placements", "Interview Prep", "GeeksForGeeks"],
    registrationOpen: true,
  },
  {
    id: "ai-cybersec-workshop",
    slug: "ai-cybersecurity-workshop",
    title: "AI & Cybersecurity Workshop",
    summary: "Hands-on workshop covering AI fundamentals and cybersecurity best practices.",
    description:
      "A hands-on workshop, run with Pune DAO, covering AI fundamentals alongside practical cybersecurity best practices for students and early-career developers.",
    category: "workshop",
    status: "past",
    date: "2026-02-14",
    location: "Pune",
    organizer: "Kick To Tech × Pune DAO",
    imageUrl: IMG.session,
    tags: ["AI", "Cybersecurity", "Workshop"],
    registrationOpen: false,
  },
  {
    id: "aakashpath-ideathon",
    slug: "aakashpath-ideathon-rakshaksat",
    title: "Aakashpath Ideathon Finalist — RakshakSat",
    summary: "Our team reached the finals with an innovative satellite security solution.",
    description:
      "Kick To Tech's team reached the finals of the Aakashpath Ideathon with RakshakSat, an innovative satellite-security concept.",
    category: "hackathon",
    status: "past",
    date: "2026-01-20",
    location: "Pune",
    organizer: "Aakashpath",
    imageUrl: IMG.conference,
    tags: ["Ideathon", "Space", "Security"],
    registrationOpen: false,
  },
  {
    id: "college-workshops",
    slug: "college-workshops-community-challenges",
    title: "College Workshops & Community Challenges",
    summary: "Collaborative workshops and coding challenges across colleges in Pune.",
    description:
      "An ongoing series of collaborative workshops and coding challenges hosted across multiple institutions in Pune.",
    category: "meetup",
    status: "ongoing",
    date: "2026-03-01",
    location: "Multiple Institutions, Pune",
    organizer: "Kick To Tech",
    imageUrl: IMG.gathering,
    tags: ["Workshops", "Community", "Coding"],
    registrationOpen: true,
  },
];

/**
 * Real partners preserved from the legacy site. Real logo URLs are used where
 * they genuinely exist (as the live site referenced them); others render as a
 * clean wordmark tile — no invented logos.
 */
export const partners: Partner[] = [
  { id: "gfg", name: "GeeksForGeeks", category: "community", logoUrl: "/partners/geeksforgeeks.jpg", url: "https://www.geeksforgeeks.org/" },
  { id: "jspm", name: "JSPM University", category: "academic", logoUrl: "/partners/jspm.webp", url: "https://jspm.edu.in/" },
  { id: "idc", name: "Indian Data Club", category: "community", logoUrl: "/partners/indian-data-club.png" },
  { id: "punedao", name: "Pune DAO", category: "community", logoUrl: "/partners/pune-dao.jpg" },
  { id: "cvtm", name: "CVTM", category: "industry", logoUrl: "/partners/cvtm.webp" },
  { id: "peaksol", name: "PeakSol", category: "industry", logoUrl: "/partners/peaksol.jpg" },
];

/** Gallery uses the REAL community/event photography we have (distinct each). */
export const gallery: GalleryItem[] = [
  { id: "g-session", title: "AI & Cybersecurity Workshop", category: "Workshop", imageUrl: IMG.session, width: 1280, height: 960 },
  { id: "g-hall", title: "Workshop in Session", category: "Workshop", imageUrl: IMG.hall, width: 1280, height: 960 },
  { id: "g-gathering", title: "Community Gathering", category: "Community", imageUrl: IMG.gathering, width: 1153, height: 616 },
  { id: "g-placement", title: "Placement Roadmap Workshop", category: "Workshop", imageUrl: IMG.placementWorkshop, width: 1545, height: 662 },
  { id: "g-event1", title: "Community Session", category: "Community", imageUrl: IMG.event1, width: 1200, height: 900 },
  { id: "g-event2", title: "Hands-on Workshop", category: "Workshop", imageUrl: IMG.event2, width: 1200, height: 800 },
  { id: "g-event3", title: "Tech Meetup", category: "Meetup", imageUrl: IMG.event3, width: 1200, height: 800 },
  { id: "g-conference", title: "Tech Community Conference", category: "Meetup", imageUrl: IMG.conference, width: 1200, height: 800 },
  { id: "g-talent", title: "Student Talent Showcase", category: "Community", imageUrl: IMG.blogTalent, width: 904, height: 1071 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "why-student-talent-infrastructure",
    title: "Building Student Talent Infrastructure",
    excerpt:
      "Why bridging education and employability needs infrastructure — not just events.",
    content:
      "Kick To Tech exists to build lasting infrastructure between colleges and industry. This post outlines the thesis behind that mission.",
    category: "Community",
    author: "Kick To Tech",
    coverUrl: IMG.blogTalent,
    publishedAt: "2026-03-10",
    readingMinutes: 4,
  },
  {
    id: "b2",
    slug: "inside-the-5-week-internship",
    title: "Inside the 5-Week Internship",
    excerpt: "What a domain-focused, project-first internship actually looks like.",
    content:
      "A look at how the 5-week internship is structured across Python, Java, Cybersecurity, and Data Analytics domains.",
    category: "Internship",
    author: "Kick To Tech",
    coverUrl: IMG.session,
    publishedAt: "2026-03-18",
    readingMinutes: 6,
  },
];
