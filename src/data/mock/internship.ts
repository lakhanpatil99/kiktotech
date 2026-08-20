import type { InternshipDomain, InternshipProgram } from "@/types";

/** Real internship domains + pricing/duration preserved from the legacy site. */
export const internshipDomains: InternshipDomain[] = [
  {
    id: "python",
    title: "Python (AI + Projects)",
    tagline: "Build AI-powered projects with Python",
    description:
      "Hands-on Python foundations extended into applied AI, automation, and real project delivery.",
    icon: "Brain",
    accent: "#3b82f6",
    skills: ["Python", "APIs", "Data", "AI/ML basics", "Project delivery"],
    mentor: "Omkar Pawar",
    mentorImage: "/team/omkar-pawar.jpeg",
  },
  {
    id: "java",
    title: "Java Development",
    tagline: "Engineer robust backend systems",
    description:
      "Core Java, OOP, and backend fundamentals with an emphasis on clean, production-grade code.",
    icon: "Coffee",
    accent: "#f59e0b",
    skills: ["Java", "OOP", "Collections", "Backend basics"],
    mentor: "Pooja Kolekar",
    mentorImage: "/team/pooja-kolekar.jpg",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Defend systems, think like an attacker",
    description:
      "Practical security fundamentals: threat models, secure practices, and defensive tooling.",
    icon: "ShieldCheck",
    accent: "#10b981",
    skills: ["Security fundamentals", "Networking", "Threat modeling"],
    mentor: "Samruddhi More",
    mentorImage: "/team/samruddhi-more.png",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    tagline: "Turn raw data into decisions",
    description:
      "From spreadsheets to insights — analysis, visualization, and data storytelling.",
    icon: "BarChart3",
    accent: "#a855f7",
    skills: ["Analytics", "Visualization", "SQL basics", "Storytelling"],
    mentor: "Tauheed",
    mentorImage: "/team/tauheed.jpeg",
  },
];

export const internshipProgram: InternshipProgram = {
  domains: internshipDomains,
  priceRupees: 222,
  durationLabel: "5 Weeks (18 May 2026 - 21 June 2026)",
  seatsLabel: "Limited Seats Available",
  perks: [
    "Real-world project work",
    "Industry-standard mentorship",
    "Verifiable completion certificate",
    "Community + placement guidance",
  ],
};
