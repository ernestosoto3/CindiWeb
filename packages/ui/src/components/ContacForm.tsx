"use client"

import { ChangeEvent, FormEvent, useId, useMemo, useState } from "react"
import { Button } from "./Button"

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

type FieldType = "text" | "email" | "tel" | "textarea"

export interface ContactField {
  name: string
  label: string
  type?: FieldType
  placeholder?: string
  required?: boolean
  rows?: number
}

type FormVariant = "default" | "card" | "minimal"
type FormTheme = "light" | "dark"

export interface ContactFormProps {
  fields?: ContactField[]
  onSubmit?: (data: Record<string, string>) => void | Promise<void>
  submitLabel?: string
  successMessage?: string
  variant?: FormVariant
  theme?: FormTheme
  className?: string
}

const DEFAULT_FIELDS: ContactField[] = [
  { name: "name",    label: "Name",    type: "text",     placeholder: "Your name",              required: true },
  { name: "email",   label: "Email",   type: "email",    placeholder: "you@example.com",         required: true },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell us about your project…", required: true, rows: 5 },
]

function validate(fields: ContactField[], values: Record<string, string>) {
  const errors: Record<string, string> = {}
  for (const field of fields) {
    const value = values[field.name]?.trim() ?? ""
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`
      continue
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = "Enter a valid email address."
    }
    if (field.type === "tel" && value && !/^[\d\s\-+().]{7,}$/.test(value)) {
      errors[field.name] = "Enter a valid phone number."
    }
  }
  return errors
}

// ─── Theme-aware input styles ─────────────────────────────────────────────────

function getInputStyles(theme: FormTheme, hasError: boolean) {
  const base = "w-full border px-4 py-3.5 text-sm transition-all duration-150 outline-none focus:ring-2"

  if (theme === "dark") {
    return cn(
      base,
      "bg-transparent text-white placeholder:text-white/30 rounded-none",
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-500/20"
        : "border-white/20 hover:border-white/40 focus:border-white/60 focus:ring-white/10"
    )
  }

  // light theme — rounded, clean
  return cn(
    base,
    "bg-white text-zinc-900 placeholder:text-zinc-400 rounded-xl",
    hasError
      ? "border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/10"
      : "border-zinc-200 hover:border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/8"
  )
}

function getLabelStyles(theme: FormTheme) {
  return theme === "dark"
    ? "text-xs font-medium tracking-widest uppercase text-white/50 select-none"
    : "text-sm font-medium text-zinc-700 select-none"
}

// ─── Field ───────────────────────────────────────────────────────────────────

function Field({
  field, value, error, theme, onChange,
}: {
  field: ContactField
  value: string
  error?: string
  theme: FormTheme
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
  const uid = useId()
  const id = `${uid}-${field.name}`
  const hasError = Boolean(error)

  const sharedProps = {
    id,
    name: field.name,
    value,
    onChange,
    placeholder: field.placeholder,
    "aria-describedby": hasError ? `${id}-error` : undefined,
    "aria-invalid": hasError || undefined,
    className: getInputStyles(theme, hasError),
  }

  return (
    // gap-2.5 between label and input, generous spacing
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className={getLabelStyles(theme)}>
        {field.label}
        {field.required ? (
          <span className="ml-0.5 text-red-400" aria-hidden="true">*</span>
        ) : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...sharedProps}
          rows={field.rows ?? 5}
          className={cn(sharedProps.className, "resize-none leading-relaxed")}
        />
      ) : (
        <input {...sharedProps} type={field.type ?? "text"} />
      )}

      {hasError ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-xs text-red-400">
          <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────

function SuccessState({ message, theme }: { message: string; theme: FormTheme }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full",
        theme === "dark" ? "bg-white" : "bg-zinc-900"
      )}>
        <svg className={cn("h-6 w-6", theme === "dark" ? "text-zinc-900" : "text-white")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className={cn("text-sm font-semibold", theme === "dark" ? "text-white" : "text-zinc-900")}>
          Message sent
        </p>
        <p className={cn("mt-1 text-sm", theme === "dark" ? "text-white/50" : "text-zinc-500")}>
          {message}
        </p>
      </div>
    </div>
  )
}

// ─── Variant wrappers ─────────────────────────────────────────────────────────

const variantClasses: Record<FormVariant, string> = {
  default: "",
  // card: generous internal padding, rounded, shadow, white bg
  card: "rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm",
  minimal: "rounded-xl bg-zinc-50 p-6",
}

function createInitialValues(fields: ContactField[]) {
  return Object.fromEntries(fields.map((f) => [f.name, ""]))
}

// ─── ContactForm ──────────────────────────────────────────────────────────────

export function ContactForm({
  fields = DEFAULT_FIELDS,
  onSubmit,
  submitLabel = "Send message",
  successMessage = "Thanks! We'll be in touch shortly.",
  variant = "default",
  theme = "light",
  className,
}: ContactFormProps) {
  const initialValues = useMemo(() => createInitialValues(fields), [fields])

  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    if (status === "error") setStatus("idle")
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validate(fields, values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      document.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus()
      return
    }
    setErrors({})
    setStatus("loading")
    try {
      await onSubmit?.(values)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className={cn(variantClasses[variant], className)}>
        <SuccessState message={successMessage} theme={theme} />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      // gap-6 between every field for breathing room
      className={cn("flex flex-col gap-6", variantClasses[variant], className)}
    >
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name] ?? ""}
          error={errors[field.name]}
          theme={theme}
          onChange={handleChange}
        />
      ))}

      {status === "error" ? (
        <p role="alert" className={cn(
          "rounded-lg border px-4 py-3 text-sm",
          theme === "dark"
            ? "border-red-500/30 bg-red-500/10 text-red-400"
            : "border-red-200 bg-red-50 text-red-600"
        )}>
          Something went wrong. Please try again.
        </p>
      ) : null}

      {/* Dark theme gets a custom button to match the aesthetic */}
      {theme === "dark" ? (
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-full py-4 text-sm font-medium tracking-[0.2em] uppercase bg-white text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer disabled:opacity-50"
        >
          {status === "loading" ? "Sending…" : submitLabel}
        </button>
      ) : (
        <div className="mt-2">
          <Button type="submit" isLoading={status === "loading"} fullWidth size="lg">
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  )
}