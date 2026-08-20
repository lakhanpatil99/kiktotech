import type { EventItem, EventRegistration, Result } from "@/types";
import { events as mockEvents } from "@/data/mock/content";
import { delay } from "@/lib/utils";

export interface EventService {
  getEvents(): Promise<EventItem[]>;
  getEvent(idOrSlug: string): Promise<EventItem | null>;
  registerForEvent(input: EventRegistration): Promise<Result<null>>;
}

export const eventService: EventService = {
  async getEvents() {
    await delay(650);
    return mockEvents;
  },
  async getEvent(idOrSlug) {
    await delay(500);
    return mockEvents.find((e) => e.id === idOrSlug || e.slug === idOrSlug) ?? null;
  },
  async registerForEvent(input) {
    await delay(800);
    if (!input.email || !input.name) return { ok: false, error: "Name and email are required." };
    return { ok: true, data: null };
  },
};
