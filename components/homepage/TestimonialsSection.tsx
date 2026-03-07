import { Badge } from "@/components/ui/badge";
import TestimonialCard from "@/components/homepage/testimonial-card";

const testimonials = [
  {
    quote: "Le panel m'a aide a clarifier mon projet et a structurer ma proposition de valeur.",
    author: "Naomi K.",
    role: "Porteuse de projet",
    avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "L'exposition m'a permis de rencontrer de vrais partenaires et de generer des contacts utiles.",
    author: "Jordan M.",
    role: "Exposant",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "Le concours pousse les jeunes a presenter des idees solides et actionnables.",
    author: "Pasteur Remy P.",
    role: "Intervenant",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <Badge variant="outline" className="mb-2">Temoignages</Badge>
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