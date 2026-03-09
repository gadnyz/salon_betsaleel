import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ExhibitorRegistrationForm from "@/components/homepage/ExhibitorRegistrationForm";
import { Button } from "@/components/ui/button";

export default function InscriptionExposantPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl px-4 md:px-6">
        <Link href="/" className="inline-flex">
          <Button variant="outline" className="group">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour a l'accueil
          </Button>
        </Link>

        <div className="mt-6 rounded-2xl border bg-background p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Inscription exposant</h1>
          <p className="mt-2 text-muted-foreground">
            Remplissez ce formulaire pour vous enregistrer comme exposant.
          </p>
          <ExhibitorRegistrationForm />
        </div>
      </div>
    </section>
  );
}