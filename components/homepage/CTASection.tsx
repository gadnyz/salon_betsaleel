import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-black py-20 text-white md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prets pour le Salon Betsaleel 2026?</h2>
          <p className="max-w-[700px] text-lg text-gray-300">
            Rejoignez la premiere edition de Talents & Talents et contribuez a la valorisation des talents entrepreneuriaux chretiens.
          </p>
          <Link href="#contact" className="mt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">Contacter l'organisation</Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <img className="h-48 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" alt="Evenement" />
          <img className="h-48 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80" alt="Equipe" />
          <img className="h-48 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80" alt="Audience" />
          <img className="h-48 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=600&q=80" alt="Pitch" />
        </div>
      </div>
    </section>
  );
}
