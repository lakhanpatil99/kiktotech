import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/internship/admin",
        "/internship/dashboard",
        "/internship/mentor",
        "/internship/faculty",
        "/profile",
        "/login",
        "/signup",
        "/forgot-password",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
