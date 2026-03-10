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

export interface ContactFormProps {
  fields?: ContactField[]
  onSubmit?: (data: Record<string, string>) => void | Promise<void>
  submitLabel?: string
  successMessage?: string
  variant?: FormVariant
  className?: string
}

const DEFAULT_FIELDS: ContactField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us about your project…",
    required: true,
    rows: 4,
  },
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

const inputBase = [
  "w-full rounded-lg border bg-white px-3.5 py-2.5",
  "text-sm text-zinc-900 placeholder:text-zinc-400",
  "transition-all duration-150",
  "outline-none",
].join(" ")

const inputNormal =
  "border-zinc-200 hover:border-zinc-300 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"

const inputError =
  "border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: ContactField
  value: string
  error?: string
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
    className: cn(inputBase, hasError ? inputError : inputNormal),
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="select-none text-sm font-medium text-zinc-700">
        {field.label}
        {field.required ? (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...sharedProps}
          rows={field.rows ?? 4}
          className={cn(sharedProps.className, "resize-none leading-relaxed")}
        />
      ) : (
        <input {...sharedProps} type={field.type ?? "text"} />
      )}

      {hasError ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 text-xs text-red-500"
        >
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  )
}

function SuccessState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-900">Message sent</p>
        <p className="mt-1 text-sm text-zinc-500">{message}</p>
      </div>
    </div>
  )
}

const variantClasses: Record<FormVariant, string> = {
  default: "",
  card: "rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm",
  minimal: "rounded-xl bg-zinc-50 p-6",
}

function createInitialValues(fields: ContactField[]) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]))
}

export function ContactForm({
  fields = DEFAULT_FIELDS,
  onSubmit,
  submitLabel = "Send message",
  successMessage = "Thanks! We'll be in touch shortly.",
  variant = "default",
  className,
}: ContactFormProps) {
  const initialValues = useMemo(() => createInitialValues(fields), [fields])

  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target

    setValues((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    if (status === "error") {
      setStatus("idle")
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nextErrors = validate(fields, values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus("idle")

      const firstName = Object.keys(nextErrors)[0]
      document.querySelector<HTMLElement>(`[name="${firstName}"]`)?.focus()
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
        <SuccessState message={successMessage} />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-5", variantClasses[variant], className)}
    >
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name] ?? ""}
          error={errors[field.name]}
          onChange={handleChange}
        />
      ))}

      {status === "error" ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          Something went wrong. Please try again.
        </p>
      ) : null}

      <Button type="submit" isLoading={status === "loading"} fullWidth size="lg">
        {submitLabel}
      </Button>
    </form>
  )
}