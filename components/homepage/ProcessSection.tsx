"use client";

import { Badge } from "@/components/ui/badge";

const schedule = [
  {
    title: "Ouverture du salon",
    desc: "Priere d'ouverture par Rev. Maitre Kalombo M. Wa Kasongo, Aumonier provincial de l'aumonerie protestante.",
  },
  {
    title: "Premier panel (conference)",
    desc: "Interventions autour de la vision entrepreneuriale et du developpement des talents.",
  },
  {
    title: "Reseautage et pause cafe",
    desc: "Temps d'echanges entre participants, exposants et partenaires.",
  },
  {
    title: "Deuxieme panel",
    desc: "Suite des presentations avec focus sur les initiatives locales et chretiennes.",
  },
  {
    title: "Tour des stands et reseautage",
    desc: "Visite des espaces d'exposition et rencontres directes avec les porteurs de projets.",
  },
  {
    title: "Concours de projets",
    desc: "Presentation des projets selectionnes devant le jury.",
  },
  {
    title: "Remise des prix et cloture",
    desc: "Annonce des gagnants et fin officielle de l'activite.",
  },
];

export default function ProcessSection() {
  return (
    <section id="programme" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <Badge variant="outline" className="mb-2">Programme de la journee</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Dimanche 29 mars 2026, de 14h a 18h</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Une apres-midi structuree pour apprendre, exposer, reseauter et celebrer les talents entrepreneuriaux chretiens.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {schedule.map((item, index) => (
            <div key={item.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-primary">Etape {index + 1}</p>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
