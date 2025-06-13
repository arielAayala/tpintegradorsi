import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Sistemas Inteligentes
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explora y aprende sobre diferentes sistemas inteligentes y software de inteligencia artificial
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/clasificaciones">
              <Button size="lg">Explorar Clasificaciones</Button>
            </Link>
            <Link href="/foro">
              <Button size="lg" variant="outline">
                Unirse al Debate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
