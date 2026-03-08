import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RegistrationCounters from "@/components/homepage/RegistrationCounters";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <Badge className="mb-4" variant="outline">Premiere edition 2026</Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Salon Betsaleel: activité entrepreneuriale pour <span className="text-primary">valoriser les talents chrétiens</span>
          </h1>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/inscription-exposant" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto">
                S'inscrire pour exposer
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            {/* <Button size="lg" variant="outline" className="w-full sm:w-auto" disabled>
              Inscriptions concours bientot disponibles
            </Button> */}
          </div>

          <RegistrationCounters />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <img className="h-64 w-full rounded-xl object-cover" src="/homepage/excursion%202026_63.jpg" alt="Jeunes organisateurs" />
          <img className="h-64 w-full rounded-xl object-cover" src="/homepage/excursion%202026_71.jpg" alt="Panel entrepreneurial" />
          <img className="h-64 w-full rounded-xl object-cover" src="/homepage/excursion%202026_72.jpg" alt="Presentation de projet" />
        </div>
      </div>
    </section>
  );
}