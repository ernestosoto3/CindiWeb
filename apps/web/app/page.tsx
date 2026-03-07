import { Button, HeroSection } from "@cindiweb/ui"

export default function Home() {
  return (
    <HeroSection
      headline="CindiWeb Agency"
      subheadline="Fast, beautiful websites built on proven templates."
      cta={<Button variant="primary">Get started</Button>}
    />
  )
}