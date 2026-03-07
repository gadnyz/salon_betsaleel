import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <Badge className="mb-4" variant="outline">Premiere edition 2026</Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Salon Betsaleel: activite entrepreneuriale pour <span className="text-primary">valoriser les talents chretiens</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-lg text-muted-foreground md:text-xl">
            Une initiative organisee par les jeunes de l'eglise PPUNILU, ouverte a toute personne chretienne porteuse d'un projet d'entreprise deja engage.
          </p>
          <p className="mx-auto mt-5 max-w-[820px] text-base text-muted-foreground md:text-lg">
            "La reussite de l'un de nous est notre reussite a tous" - Exode 35:30-35: "Il les a remplis d'intelligence pour executer toutes sortes de travaux et d'inventions."
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="#inscription-exposant" className="w-full sm:w-auto">
              <Button size="lg" className="group">
                S'inscrire pour exposer
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <img className="h-64 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80" alt="Jeunes organisateurs" />
          <img className="h-64 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1000&q=80" alt="Panel entrepreneurial" />
          <img className="h-64 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=1000&q=80" alt="Presentation de projet" />
        </div>
      </div>
    </section>
  );
}
