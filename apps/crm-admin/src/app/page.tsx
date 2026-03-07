import { Button } from "@cindiweb/ui"

export default function CRMDashboard() {
  return (
    <main className="px-[60px] py-[60px]">
      <p className="mb-4 text-[11px] tracking-[0.3em] text-lime-300">
        CINDIWEB CRM — INTERNAL
      </p>

      <h1 className="mb-6 text-5xl font-extrabold text-neutral-100">
        Dashboard
      </h1>

      <p className="mb-6 text-[13px] text-neutral-500">
        CRM admin panel · connect to Postgres and run prisma migrate dev to get started
      </p>

      <Button>Test UI Package</Button>
    </main>
  )
}