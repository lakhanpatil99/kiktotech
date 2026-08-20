import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-accent-foreground hover:shadow-glow hover:-translate-y-0.5",
  primary: "bg-white text-ink-900 hover:bg-white/90 hover:-translate-y-0.5",
  outline: "border border-line text-primary-foreground hover:border-accent hover:text-accent",
  ghost: "text-primary-foreground/80 hover:text-accent hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { variant = "accent", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Strip non-DOM / styling props so they don't leak onto the element and,
  // crucially, so the raw `className` prop can't override the computed classes.
  const {
    href: _href,
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});
