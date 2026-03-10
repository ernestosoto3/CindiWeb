import type { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "link"
type Size = "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  children?: ReactNode
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-zinc-900 text-white border border-zinc-900",
    "hover:bg-zinc-700 hover:border-zinc-700",
    "focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
    "shadow-sm hover:shadow-md",
  ].join(" "),

  secondary: [
    "bg-white text-zinc-900 border border-zinc-200",
    "hover:bg-zinc-50 hover:border-zinc-300",
    "focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2",
    "shadow-sm",
  ].join(" "),

  ghost: [
    "bg-transparent text-zinc-600 border border-transparent",
    "hover:bg-zinc-100 hover:text-zinc-900",
    "focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2",
  ].join(" "),

  outline: [
    "bg-transparent text-zinc-900 border border-zinc-900",
    "hover:bg-zinc-900 hover:text-white",
    "focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
  ].join(" "),

  danger: [
    "bg-red-600 text-white border border-red-600",
    "hover:bg-red-700 hover:border-red-700",
    "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
    "shadow-sm",
  ].join(" "),

  link: [
    "bg-transparent text-zinc-900",
    "underline-offset-4 hover:underline hover:text-zinc-600",
    "focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2",
    "!h-auto !px-0 rounded-none shadow-none",
  ].join(" "),
}

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-11 px-5 text-sm gap-2 rounded-lg",
  xl: "h-14 px-7 text-base gap-2.5 rounded-xl tracking-wide",
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 shrink-0 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const isLink = variant === "link"

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center font-medium select-none",
        "transition-all duration-150 ease-in-out",
        "focus:outline-none focus-visible:outline-none",
        !isDisabled && "cursor-pointer",
        !isLink && "active:scale-[0.97]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}

      {children ? <span>{children}</span> : null}

      {!isLoading && rightIcon ? (
        <span className="shrink-0">{rightIcon}</span>
      ) : null}
    </button>
  )
}