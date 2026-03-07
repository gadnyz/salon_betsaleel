"use client";

import { Badge } from "@/components/ui/badge";

const schedule = [
  {
    title: "PANEL 1",
    desc: "De l’idée à l’entreprise",
  },
  {
    title: "PAUSE & RESEAUTAGE",
    desc: "Temps d'échanges entre participants, exposants et partenaires",
  },
  {
    title: "PANEL 2",
    desc: "L’entrepreneuriat selon la pensée de Dieu",
  },
  {
    title: "TOUR DES STANDS & RESEAUTAGE",
    desc: "Visite des espaces d'exposition et rencontres directes avec les porteurs de projets.",
  },
  {
    title: "CONCOURS DE PROJETS",
    desc: "Présentation des projets sélectionnés devant le jury.",
  },
  {
    title: "REMISE DES PRIX ET CLOTURE",
    desc: "Annonce des gagnants et fin officielle de l'activité.",
  },
];

export default function ProcessSection() {
  return (
    <section id="programme" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <Badge variant="outline" className="mb-2">Programme de la journée</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Dimanche 29 mars 2026, de 14h à 18h</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Une après-midi structurée pour apprendre, exposer, réseauter et célébrer les talents entrepreneuriaux chrétiens.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {schedule.map((item, index) => (
            <div key={item.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-primary">Étape {index + 1}</p>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
