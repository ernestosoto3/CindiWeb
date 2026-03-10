import type {
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react"

// ─── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ─── Types ────────────────────────────────────────────────────────────────────

type CardVariant = "default" | "elevated" | "flat" | "outlined" | "ghost"
type CardPadding = "none" | "sm" | "md" | "lg"
type FooterAlign = "left" | "right" | "between" | "center"

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant
  padding?: CardPadding
  /**
   * Adds hover/focus styles and keyboard support for non-native clickable cards.
   */
  interactive?: boolean
  /**
   * Render as any HTML element — div (default), article, li, section, etc.
   */
  as?: ElementType
  children?: ReactNode
  className?: string
}

interface CardMediaProps {
  children: ReactNode
  /** Aspect ratio utility class, e.g. "aspect-video", "aspect-square" */
  aspectClass?: string
  className?: string
}

interface CardHeaderProps {
  title: ReactNode
  description?: ReactNode
  /** Right-aligned slot — badge, icon button, status chip, etc. */
  action?: ReactNode
  className?: string
}

interface CardBodyProps {
  children: ReactNode
  padding?: CardPadding
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  /** Show a top divider (default: true) */
  divider?: boolean
  /** Alignment of footer children */
  align?: FooterAlign
  className?: string
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border border-zinc-200 rounded-xl shadow-sm",
  elevated: "bg-white border border-zinc-100 rounded-xl shadow-md shadow-zinc-900/5",
  flat: "bg-zinc-50 border border-zinc-100 rounded-xl",
  outlined: "bg-transparent border border-zinc-200 rounded-xl",
  ghost: "bg-transparent border border-transparent rounded-xl",
}

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

const interactiveClasses = [
  "transition-all duration-200 ease-in-out",
  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/8 hover:border-zinc-300",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
  "active:translate-y-0 active:shadow-sm",
].join(" ")

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardMedia({
  children,
  aspectClass = "aspect-video",
  className,
}: CardMediaProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-xl",
        "[&_img]:w-full [&_img]:h-full [&_img]:object-cover",
        "[&_video]:w-full [&_video]:h-full [&_video]:object-cover",
        aspectClass,
        className
      )}
    >
      {children}
    </div>
  )
}

function CardHeader({
  title,
  description,
  action,
  className,
}: CardHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-snug text-zinc-900">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-sm leading-snug text-zinc-500">{description}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

function CardBody({
  children,
  padding = "md",
  className,
}: CardBodyProps) {
  return <div className={cn(paddingClasses[padding], className)}>{children}</div>
}

function CardFooter({
  children,
  divider = true,
  align = "right",
  className,
}: CardFooterProps) {
  const alignClass: Record<FooterAlign, string> = {
    left: "justify-start",
    right: "justify-end",
    between: "justify-between",
    center: "justify-center",
  }

  return (
    <div
      className={cn(
        "mt-4 flex items-center gap-2 pt-4",
        divider && "border-t border-zinc-100",
        alignClass[align],
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── Compound Component Type ─────────────────────────────────────────────────

type CardComponent = ((props: CardProps) => JSX.Element) & {
  Media: typeof CardMedia
  Header: typeof CardHeader
  Body: typeof CardBody
  Footer: typeof CardFooter
}

// ─── Root Card ────────────────────────────────────────────────────────────────

const CardBase = ({
  variant = "default",
  padding = "md",
  interactive = false,
  as: Tag = "div",
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: CardProps) => {
  const isNativeInteractive =
    Tag === "button" || Tag === "a" || Tag === "input" || Tag === "select" || Tag === "textarea"

  const shouldAddA11yButtonBehavior = interactive && !isNativeInteractive

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event)

    if (event.defaultPrevented || !shouldAddA11yButtonBehavior || !onClick) return

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClick(event as unknown as React.MouseEvent<HTMLElement>)
    }
  }

  return (
    <Tag
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        interactive && "cursor-pointer",
        interactive && interactiveClasses,
        className
      )}
      tabIndex={shouldAddA11yButtonBehavior ? 0 : props.tabIndex}
      role={shouldAddA11yButtonBehavior ? "button" : props.role}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </Tag>
  )
}

export const Card = CardBase as CardComponent

Card.Media = CardMedia
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter