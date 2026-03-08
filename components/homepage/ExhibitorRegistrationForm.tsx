"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ExhibitorFormData = {
  fullName: string;
  whatsappPhone: string;
  gmailAddress: string;
  gender: "Masculin" | "Feminin" | "";
  church: string;
  activityName: string;
  activityDomain: string;
  activityDescription: string;
  exposedProductType: string;
  needsTable: "Oui" | "Non" | "";
  logisticsDetails: string;
  commitmentConfirmed: boolean;
};

const initialState: ExhibitorFormData = {
  fullName: "",
  whatsappPhone: "",
  gmailAddress: "",
  gender: "",
  church: "",
  activityName: "",
  activityDomain: "",
  activityDescription: "",
  exposedProductType: "",
  needsTable: "",
  logisticsDetails: "",
  commitmentConfirmed: false,
};

const domains = [
  "Artisanat", "Agriculture", "Couture / mode", "Restauration", "Evenementiel",
  "Technologie/ Digital", "Cosmetique/ soins de beaute", "Service", "Other / Autre",
];

export default function ExhibitorRegistrationForm() {
  const [form, setForm] = useState<ExhibitorFormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "exposant", data: form }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "L'inscription exposant a echoue.");
        return;
      }
      setForm(initialState);
      setMessage("Inscription exposant enregistree avec succes.");
    } catch {
      setError("Impossible d'envoyer le formulaire exposant.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="exhibitor-fullName">Nom et prenom</Label>
          <Input id="exhibitor-fullName" value={form.fullName} onChange={(e)=>setForm((p)=>({...p,fullName:e.target.value}))} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exhibitor-whatsapp">Numéro téléphone (WhatsApp)</Label>
          <Input id="exhibitor-whatsapp" value={form.whatsappPhone} onChange={(e)=>setForm((p)=>({...p,whatsappPhone:e.target.value}))} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="exhibitor-gmail">Email</Label>
        <Input id="exhibitor-gmail" type="email" value={form.gmailAddress} onChange={(e)=>setForm((p)=>({...p,gmailAddress:e.target.value}))} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="exhibitor-gender">Sexe</Label>
          <select id="exhibitor-gender" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.gender} onChange={(e)=>setForm((p)=>({...p,gender:e.target.value as ExhibitorFormData["gender"]}))} required>
            <option value="">Selectionner</option><option value="Masculin">Masculin</option><option value="Feminin">Feminin</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="exhibitor-church">Eglise d'attache</Label>
          <Input id="exhibitor-church" value={form.church} onChange={(e)=>setForm((p)=>({...p,church:e.target.value}))} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="exhibitor-activityName">Nom l'activité/entreprise</Label>
        <Input id="exhibitor-activityName" value={form.activityName} onChange={(e)=>setForm((p)=>({...p,activityName:e.target.value}))} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exhibitor-domain">Domaine d'activité</Label>
        <select id="exhibitor-domain" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.activityDomain} onChange={(e)=>setForm((p)=>({...p,activityDomain:e.target.value}))} required>
          <option value="">Selectionner un domaine</option>{domains.map((d)=><option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="exhibitor-description">Description detaillée de votre activité (produits, services proposes)</Label>
        <Textarea id="exhibitor-description" value={form.activityDescription} onChange={(e)=>setForm((p)=>({...p,activityDescription:e.target.value}))} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="exhibitor-needsTable">Avez-vous besoin d'une table ?</Label>
          <select id="exhibitor-needsTable" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.needsTable} onChange={(e)=>setForm((p)=>({...p,needsTable:e.target.value as ExhibitorFormData["needsTable"]}))} required>
            <option value="">Séléctionner</option><option value="Oui">Oui</option><option value="Non">Non</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="exhibitor-logistics">Avez-vous besoin d'une logistique spécifique ? (Decrivez)</Label>
          <Input id="exhibitor-logistics" value={form.logisticsDetails} onChange={(e)=>setForm((p)=>({...p,logisticsDetails:e.target.value}))} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.commitmentConfirmed} onChange={(e)=>setForm((p)=>({...p,commitmentConfirmed:e.target.checked}))} required />
        Je certifie l'exactitude des informations fournies et j'accepte le règlement du Salon Betsaleel.
      </label>

      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Envoi en cours..." : "Valider l'inscription exposant"}
      </Button>
    </form>
  );
}