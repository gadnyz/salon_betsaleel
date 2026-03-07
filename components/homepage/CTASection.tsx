import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-black py-20 text-white md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prêts pour le Salon Betsaleel 2026?</h2>
          <p className="max-w-[700px] text-lg text-gray-300">
            Rejoignez la première édition de Talents & Talents et contribuez à la valorisation des talents entrepreneuriaux chrétiens.
          </p>
          <Link href="#contact" className="mt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">Contacter l'organisation</Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <img className="h-48 w-full rounded-lg object-cover" src="/homepage/excursion%202026_78.jpg" alt="Événement" />
          <img className="h-48 w-full rounded-lg object-cover" src="/homepage/excursion%202026_97.jpg" alt="Équipe" />
          <img className="h-48 w-full rounded-lg object-cover" src="/homepage/excursion%202026_100.jpg" alt="Audience" />
          <img className="h-48 w-full rounded-lg object-cover" src="/homepage/excursion%202026_101.jpg" alt="Pitch" />
        </div>
      </div>
    </section>
  );
}
