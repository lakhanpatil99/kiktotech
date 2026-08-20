"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, MessageSquare, Briefcase, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

interface Activity {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
}

const activities: Activity[] = [
  { Icon: BookOpen, title: "Workshops & Bootcamps", desc: "Hands-on technical sessions covering trending technologies and practical, job-ready skills.", tag: "Learn" },
  { Icon: Trophy, title: "Hackathons & Challenges", desc: "Competitive events where innovators build real solutions and showcase what they can do.", tag: "Compete" },
  { Icon: MessageSquare, title: "Industry Talks & Mentorship", desc: "Expert-led sessions and 1:1 mentorship connecting students with industry professionals.", tag: "Grow" },
  { Icon: Briefcase, title: "Placement & Internship Guidance", desc: "Career development, resume reviews, and internship placement support that opens doors.", tag: "Launch" },
];

export function Activities() {
  const [active, setActive] = useState(0);
  const ActiveIcon = activities[active].Icon;

  return (
    <Section className="relative overflow-hidden border-y border-line">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-electric/10 blur-[130px]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky heading + visual */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> Ongoing
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Activities that <span className="text-gradient">build careers</span>
              </h2>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                Everything we run points at one outcome: turning learning into real, demonstrable
                capability — and capability into opportunity.
              </p>

              {/* Animated preview of the active item */}
              <div className="mt-8 hidden overflow-hidden rounded-3xl border border-line bg-surface p-8 lg:block">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easePremium }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <ActiveIcon className="h-8 w-8" />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-accent">{activities[active].tag}</p>
                  <h3 className="mt-1 text-2xl font-bold">{activities[active].title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{activities[active].desc}</p>
                </motion.div>
              </div>
              <Button href="/events" variant="outline" className="mt-8 hidden lg:inline-flex">
                Explore all events <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          {/* Right: interactive numbered list */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {activities.map((a, i) => {
                const selected = i === active;
                return (
                  <motion.button
                    key={a.title}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: easePremium }}
                    className={cn(
                      "group relative flex items-start gap-5 border-t border-line py-7 text-left transition-colors last:border-b sm:gap-7 sm:py-8",
                      selected ? "text-primary-foreground" : "text-primary-foreground/70",
                    )}
                  >
                    {/* animated accent bar */}
                    <span
                      className={cn(
                        "absolute left-0 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-accent to-electric transition-transform duration-300",
                        selected ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span className={cn("w-10 flex-shrink-0 pl-1 font-mono text-lg font-bold transition-colors sm:text-xl", selected ? "text-accent" : "text-muted")}>
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border transition-all duration-300",
                        selected ? "border-accent/40 bg-accent/10 text-accent" : "border-line bg-surface text-muted group-hover:text-accent",
                      )}
                    >
                      <a.Icon className="h-6 w-6" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-3">
                        <h3 className="text-lg font-bold sm:text-xl">{a.title}</h3>
                        <ArrowUpRight className={cn("h-4 w-4 transition-all duration-300", selected ? "translate-x-0 opacity-100 text-accent" : "-translate-x-1 opacity-0")} />
                      </span>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">{a.desc}</p>
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <Button href="/events" variant="outline" className="mt-8 w-full sm:w-auto lg:hidden">
              Explore all events <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
