import * as React from "react";
import { CircleAlert, Inbox, LucideIcon, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type ContentStateTone = "default" | "info" | "warning";

const toneStyles: Record<ContentStateTone, string> = {
  default:
    "border-border/70 bg-muted/20 text-foreground [&_[data-slot=content-state-icon]]:border-border/70 [&_[data-slot=content-state-icon]]:bg-background/80 [&_[data-slot=content-state-icon]]:text-muted-foreground",
  info: "border-primary/20 bg-primary/5 text-foreground [&_[data-slot=content-state-icon]]:border-primary/20 [&_[data-slot=content-state-icon]]:bg-background/80 [&_[data-slot=content-state-icon]]:text-primary",
  warning:
    "border-destructive/20 bg-destructive/5 text-foreground [&_[data-slot=content-state-icon]]:border-destructive/20 [&_[data-slot=content-state-icon]]:bg-background/80 [&_[data-slot=content-state-icon]]:text-destructive",
};

const defaultIcons: Record<ContentStateTone, LucideIcon> = {
  default: Inbox,
  info: Sparkles,
  warning: CircleAlert,
};

export interface ContentStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  actions?: React.ReactNode;
  icon?: LucideIcon;
  tone?: ContentStateTone;
}

/**
 * Presents a reusable full-width content state for empty, informational, or warning scenarios.
 */
export function ContentState({
  title,
  description,
  actions,
  icon,
  tone = "default",
  children,
  className,
  ...props
}: ContentStateProps): React.JSX.Element {
  const Icon = icon ?? defaultIcons[tone];

  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center shadow-sm shadow-black/[0.02]",
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border"
        data-slot="content-state-icon"
      >
        <Icon aria-hidden="true" className="h-7 w-7" />
      </div>
      <div className="max-w-2xl space-y-2">
        <h4 className="text-lg font-semibold tracking-tight">{title}</h4>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      {children ? (
        <div className="mt-5 w-full max-w-2xl rounded-lg border border-border/60 bg-background/80 p-4 text-left">
          {children}
        </div>
      ) : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
