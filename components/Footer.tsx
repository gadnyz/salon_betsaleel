import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span>Salon Betsaleel</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premiere edition 2026 du salon entrepreneurial organise par les jeunes de l'eglise PPUNILU.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="#accueil" className="text-sm text-muted-foreground hover:text-foreground">Accueil</Link></li>
              <li><Link href="#programme" className="text-sm text-muted-foreground hover:text-foreground">Programme</Link></li>
              <li><Link href="#exposition" className="text-sm text-muted-foreground hover:text-foreground">Exposition</Link></li>
              <li><Link href="#concours" className="text-sm text-muted-foreground hover:text-foreground">Concours</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Infos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Date: Dimanche 29 mars 2026</li>
              <li>Horaire: 14h - 18h</li>
              <li>Lieu: Temple "Saintete a l'Eternel", Lubumbashi</li>
            </ul>
          </div>
          <div className="space-y-4" id="contact">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="space-y-2">
              <li><a className="text-sm text-muted-foreground hover:text-foreground" href="mailto:salon.betsaleel@eglise.org">salon.betsaleel@eglise.org</a></li>
              <li><a className="text-sm text-muted-foreground hover:text-foreground" href="tel:+243973900363">+243 973 900 363</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">(c) {new Date().getFullYear()} Salon Betsaleel. Tous droits reserves.</p>
          <p className="text-sm text-muted-foreground">Activite Talents & Talents - Edition 2026.</p>
        </div>
      </div>
    </footer>
  );
}
