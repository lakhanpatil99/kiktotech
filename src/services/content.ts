import type { BlogPost, GalleryItem, Partner, Stat, TeamMember } from "@/types";
import { blogPosts, gallery, partners, stats } from "@/data/mock/content";
import { team } from "@/data/mock/team";
import { delay } from "@/lib/utils";

export type { TeamMember };

export interface ContentService {
  getStats(): Promise<Stat[]>;
  getPartners(): Promise<Partner[]>;
  getTeam(): Promise<TeamMember[]>;
  getGallery(): Promise<GalleryItem[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | null>;
}

export const contentService: ContentService = {
  async getStats() {
    await delay(300);
    return stats;
  },
  async getPartners() {
    await delay(400);
    return partners;
  },
  async getTeam() {
    await delay(500);
    return team;
  },
  async getGallery() {
    await delay(600);
    return gallery;
  },
  async getBlogPosts() {
    await delay(500);
    return blogPosts;
  },
  async getBlogPost(slug) {
    await delay(400);
    return blogPosts.find((p) => p.slug === slug) ?? null;
  },
};
