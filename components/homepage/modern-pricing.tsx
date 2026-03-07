"use client";

import type React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Card {
  title: string;
  subtitle: string;
  details: string[];
  popular?: boolean;
}

export default function ModernPricing() {
  const tiers: Card[] = [
    {
      title: "Candidature",
      subtitle: "Depot du dossier",
      details: ["Resume du projet", "Objectif et impact", "Profil de l'equipe"],
    },
    {
      title: "Pitch Jury",
      subtitle: "Evaluation live",
      details: ["Innovation", "Faisabilite", "Clarte de presentation"],
      popular: true,
    },
    {
      title: "Accompagnement",
      subtitle: "Suivi post-salon",
      details: ["Annonce laureat", "Appui de demarrage", "Mentorat cible"],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mt-8 grid gap-6 md:grid-cols-3 lg:gap-8">
        {tiers.map((tier, index) => (
          <div key={index} className={cn("pricing-card", tier.popular && "pricing-card-popular")}>
            {tier.popular && <div className="pricing-badge">Etape centrale</div>}
            <h3 className="text-xl font-bold">{tier.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{tier.subtitle}</p>
            <ul className="my-6 space-y-4">
              {tier.details.map((item, itemIndex) => (
                <li key={itemIndex} className="pricing-feature">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}