import { Badge } from "@/components/ui/badge";
import { Users, Lightbulb, Rocket, Church } from "lucide-react";

const features = [
  {
    title: "Formation",
    description: "Sessions pratiques pour developper les competences et la posture entrepreneuriale.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Innovation",
    description: "Mise en valeur des initiatives creatives qui repondent a des besoins reels.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    title: "Reseautage",
    description: "Rencontres utiles entre porteurs de projets, mentors, partenaires et visiteurs.",
    icon: <Rocket className="h-6 w-6" />,
  },
  {
    title: "Vision et foi",
    description: "Developper l'entrepreneuriat avec des valeurs chretiennes de service, d'ethique et d'impact.",
    icon: <Church className="h-6 w-6" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">Objectif du salon</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mettre en valeur les talents et initiatives entrepreneuriales des chretiens</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
