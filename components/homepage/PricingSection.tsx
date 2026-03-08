import { Badge } from "@/components/ui/badge";

const steps = [
  "Dépôt des candidatures",
  "Selection des projets",
  "Pitch devant le jury",
  "Publication des resultats",
];

const criteria = [
  "Concision",
  "Maitrise du projet",
  "Pertinence",
  "Valeur ajoutée du projet",
];

const prizes = ["1er prix", "2e prix", "3e prix"];

export default function PricingSection() {
  return (
    <section id="concours" className="border-t bg-muted/30 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <Badge variant="outline" className="mb-2">Concours de projets</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Regles, selection et recompenses</h2>
          {/* <p className="max-w-[780px] text-lg text-muted-foreground">
            Les inscriptions au concours sont temporairement fermeees. Elles seront reouvertes apres correction des erreurs techniques.
          </p> */}
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2" id="inscription-concours">
          <div className="rounded-2xl border bg-background p-6">
            <h3 className="text-xl font-semibold">Important a savoir</h3>
            <p className="mt-3 text-muted-foreground">
              Les projets non selectionnes ne sont pas de mauvais projets. La selection est limitee a cinq projets pour la presentation officielle.
            </p>

            <h4 className="mt-6 text-lg font-semibold">Deroulement du concours</h4>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {steps.map((step) => (
                <li key={step} className="rounded-md border bg-muted/40 px-3 py-2">{step}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <h3 className="text-xl font-semibold">Pitch</h3>
            <p className="mt-3 text-muted-foreground">
              Chaque candidat dispose de 3 minutes maximum, au format elevator pitch.
            </p>

            <h4 className="mt-6 text-lg font-semibold">Critères d'evaluation</h4>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {criteria.map((criterion) => (
                <li key={criterion} className="rounded-md border bg-muted/40 px-3 py-2">{criterion}</li>
              ))}
            </ul>

            <h4 className="mt-6 text-lg font-semibold">Prix</h4>
            <p className="mt-2 text-muted-foreground">Trois projets seront récompensés selon un échelonnement.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {prizes.map((prize) => (
                <span key={prize} className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
                  {prize}
                </span>
              ))}
            </div>

            <p className="mt-6 rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              Inscriptions concours bientot disponibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}