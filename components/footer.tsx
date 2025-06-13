import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">SistemaIA</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Sistemas Inteligentes: Explora y Aprende. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary">
            Términos
          </Link>
          <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary">
            Privacidad
          </Link>
          <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
