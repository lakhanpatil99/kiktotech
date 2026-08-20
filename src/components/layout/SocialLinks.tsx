import { Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "X", href: siteConfig.social.twitter, Icon: Twitter },
  { label: "WhatsApp", href: siteConfig.social.whatsapp, Icon: MessageCircle },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-primary-foreground/70 transition-colors hover:text-accent"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
