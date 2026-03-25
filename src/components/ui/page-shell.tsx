import * as React from "react";

import { cn } from "@/lib/utils";

export type PageShellProps = React.HTMLAttributes<HTMLDivElement>;

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  actions?: React.ReactNode;
  eyebrow?: string;
}

export interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export type PageCardProps = React.HTMLAttributes<HTMLDivElement>;

export interface PageCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export type PageCardContentProps = React.HTMLAttributes<HTMLDivElement>;

export type PageCardFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Provides a constrained, responsive shell for authenticated routed pages.
 */
export function PageShell({
  children,
  className,
  ...props
}: PageShellProps): React.JSX.Element {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8 lg:py-8">
        {children}
      </div>
    </div>
  );
}

/**
 * Renders the primary heading block for a routed page.
 */
export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
  className,
  ...props
}: PageHeaderProps): React.JSX.Element {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border/60 bg-card/95 p-5 shadow-sm shadow-black/[0.03] backdrop-blur sm:p-6 lg:flex-row lg:items-start lg:justify-between",
        className,
      )}
      {...props}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

/**
 * Groups related page content under a consistent responsive section layout.
 */
export function PageSection({
  title,
  description,
  action,
  children,
  className,
  ...props
}: PageSectionProps): React.JSX.Element {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </h3>
          {description ? (
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {action ? (
          <div className="flex shrink-0 items-center gap-2">{action}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/**
 * Displays content inside a subtle card surface that matches the app shell.
 */
export function PageCard({
  children,
  className,
  ...props
}: PageCardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-card/95 shadow-sm shadow-black/[0.03] backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Renders a standard title and description area inside a page card.
 */
export function PageCardHeader({
  title,
  description,
  action,
  className,
  ...props
}: PageCardHeaderProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border/60 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6",
        className,
      )}
      {...props}
    >
      <div className="space-y-1">
        <h4 className="text-base font-semibold text-foreground">{title}</h4>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="flex shrink-0 items-center gap-2">{action}</div>
      ) : null}
    </div>
  );
}

/**
 * Wraps the main content area of a page card.
 */
export function PageCardContent({
  children,
  className,
  ...props
}: PageCardContentProps): React.JSX.Element {
  return (
    <div className={cn("px-5 py-4 sm:px-6", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Renders the footer actions area for a page card.
 */
export function PageCardFooter({
  children,
  className,
  ...props
}: PageCardFooterProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-muted/20 px-5 py-4 sm:px-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
