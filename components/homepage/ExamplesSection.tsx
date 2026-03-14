import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const benefits = [
  "Visibilité du projet devant le public et les partenaires",
  "Rencontres utiles et réseautage avec d'autres entrepreneurs",
  "Opportunités de partenariat et de collaboration",
  "Partage d'expérience entre porteurs de projets",
  "Mise en valeur des talents chrétiens",
];

export default function ExamplesSection() {
  return (
    <section id="exposition" className="border-t bg-muted/30 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <Badge variant="outline" className="mb-2">Exposition</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pourquoi exposer ?</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            L'exposition est un espace de valorisation concrète des initiatives entrepreneuriales chrétiennes.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="rounded-lg border bg-background p-5 text-muted-foreground">
              {benefit}
            </div>
          ))}
        </div>

        <div id="inscription-exposant" className="mx-auto mt-12 max-w-3xl rounded-2xl border bg-background p-8 text-center">
          <h3 className="text-2xl font-semibold">Espace d'enregistrement des exposants</h3>
          <p className="mt-3 text-muted-foreground">
            Enregistrez votre projet pour participer a l'exposition du salon entrepreneurial Betsaleel 2026.
          </p>
          <Link href="/inscription-exposant" className="mt-6 inline-flex">
            <Button size="lg" className="group">
              S'inscrire pour exposer
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}