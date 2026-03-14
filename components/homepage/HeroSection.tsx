import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RegistrationCounters from "@/components/homepage/RegistrationCounters";
import ImageCarousel from "@/components/homepage/ImageCarousel";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative overflow-hidden">
      <div className="relative">
        <ImageCarousel variant="background" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/25" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 py-10 md:px-10">
          <div className="mx-auto max-w-3xl text-center text-white">
            <Badge className="mb-4 border-white/25 bg-white/10 text-white" variant="outline">
              Première édition 2026
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Salon Betsaleel : activité entrepreneuriale pour <span className="text-white">valoriser les talents chrétiens</span>
            </h1>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/inscription-exposant" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  S'inscrire pour exposer
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <RegistrationCounters />
          </div>
        </div>
      </div>
    </section>
  );
}