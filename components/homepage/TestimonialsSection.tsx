import { Badge } from "@/components/ui/badge";
import TestimonialCard from "@/components/homepage/testimonial-card";

const testimonials = [
  {
    quote: "Le panel m'a aidé à clarifier mon projet et à structurer ma proposition de valeur.",
    author: "Naomi K.",
    role: "Porteuse de projet",
    avatarUrl: "/homepage/excursion%202026_105.jpg",
  },
  {
    quote: "L'exposition m'a permis de rencontrer de vrais partenaires et de générer des contacts utiles.",
    author: "Jordan M.",
    role: "Exposant",
    avatarUrl: "/homepage/excursion%202026_97.jpg",
  },
  {
    quote: "Le concours pousse les jeunes à présenter des idées solides et actionnables.",
    author: "Pasteur Rémy P.",
    role: "Intervenant",
    avatarUrl: "/homepage/excursion%202026_100.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <Badge variant="outline" className="mb-2">Témoignages</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ce que disent les participants</h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">Des retours concrets sur l'impact du Salon Betsaleel.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
