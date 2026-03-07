import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./homepage/theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span>Salon Betsaleel</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="#accueil" className="text-sm font-medium transition-colors hover:text-primary">
            Accueil
          </Link>
          <Link href="#programme" className="text-sm font-medium transition-colors hover:text-primary">
            Programme
          </Link>
          <Link href="#exposition" className="text-sm font-medium transition-colors hover:text-primary">
            Exposition
          </Link>
          <Link href="#concours" className="text-sm font-medium transition-colors hover:text-primary">
            Concours
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="#contact">
            <Button>Nous contacter</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
