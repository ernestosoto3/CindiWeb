import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react"

// ─── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"
type ContainerPadding = "none" | "sm" | "md" | "lg"

type ContainerOwnProps = {
  size?: ContainerSize
  padding?: ContainerPadding
  as?: ElementType
  children?: ReactNode
}

type PropsOf<C extends ElementType> = ComponentPropsWithoutRef<C>
type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"]

type PolymorphicProps<C extends ElementType, Props = {}> = Props &
  Omit<PropsOf<C>, keyof Props | "as"> & {
    as?: C
  }

export type ContainerProps<C extends ElementType = "div"> = PolymorphicProps<
  C,
  ContainerOwnProps
>

// ─── Style Maps ───────────────────────────────────────────────────────────────

const sizeClasses: Record<ContainerSize, string> = {
  xs: "max-w-xl",
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
}

const paddingClasses: Record<ContainerPadding, string> = {
  none: "",
  sm: "px-4 md:px-6",
  md: "px-6 md:px-8",
  lg: "px-8 md:px-12",
}

// ─── Component ────────────────────────────────────────────────────────────────

type ContainerComponent = <C extends ElementType = "div">(
  props: ContainerProps<C> & { ref?: PolymorphicRef<C> }
) => ReactElement | null

const ContainerInner = <C extends ElementType = "div">(
  {
    size = "xl",
    padding = "md",
    as,
    className,
    children,
    ...props
  }: ContainerProps<C>,
  ref?: PolymorphicRef<C>
) => {
  const Tag = (as || "div") as ElementType

  return (
    <Tag
      ref={ref}
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

const ForwardedContainer = forwardRef(ContainerInner as any)
ForwardedContainer.displayName = "Container"

export const Container = ForwardedContainer as ContainerComponent