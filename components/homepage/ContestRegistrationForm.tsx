"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContestFormData = {
  email: string;
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
  businessPlanPdfUrl: string;
};

const initialState: ContestFormData = {
  email: "",
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
  businessPlanPdfUrl: "",
};

const domains = [
  "Artisanat", "Agriculture", "Couture / mode", "Restauration", "Evenementiel",
  "Technologie/ Digital", "Cosmetique/ soins de beaute", "Service", "Other / Autre",
];

export default function ContestRegistrationForm() {
  const [form, setForm] = useState<ContestFormData>(initialState);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function uploadPdfIfNeeded(): Promise<string> {
    if (form.businessPlanPdfUrl) return form.businessPlanPdfUrl;
    if (!pdfFile) throw new Error("Le fichier PDF du Business Plan est obligatoire.");

    setUploadingPdf(true);
    const uploadForm = new FormData();
    uploadForm.append("file", pdfFile);

    try {
      const response = await fetch("/api/uploads/business-plan", { method: "POST", body: uploadForm });
      const payload = (await response.json().catch(() => ({}))) as { error?: string; fileUrl?: string };
      if (!response.ok || !payload.fileUrl) throw new Error(payload.error ?? "Echec upload PDF.");
      setForm((prev) => ({ ...prev, businessPlanPdfUrl: payload.fileUrl as string }));
      return payload.fileUrl;
    } finally {
      setUploadingPdf(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const businessPlanPdfUrl = await uploadPdfIfNeeded();
      const response = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "concours", data: { ...form, businessPlanPdfUrl } }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "L'inscription au concours a echoue.");
        return;
      }
      setPdfFile(null);
      setForm(initialState);
      setMessage("Inscription au concours enregistree avec succes.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible d'envoyer le formulaire concours.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
      <div className="space-y-2">
        <Label htmlFor="contest-email">Email</Label>
        <Input id="contest-email" type="email" value={form.email} onChange={(e)=>setForm((p)=>({...p,email:e.target.value}))} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contest-fullName">Nom et prenom</Label>
          <Input id="contest-fullName" value={form.fullName} onChange={(e)=>setForm((p)=>({...p,fullName:e.target.value}))} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contest-whatsapp">Numero telephone (WhatsApp)</Label>
          <Input id="contest-whatsapp" value={form.whatsappPhone} onChange={(e)=>setForm((p)=>({...p,whatsappPhone:e.target.value}))} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contest-gmail">Adresse gmail</Label>
        <Input id="contest-gmail" type="email" value={form.gmailAddress} onChange={(e)=>setForm((p)=>({...p,gmailAddress:e.target.value}))} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contest-gender">Sexe</Label>
          <select id="contest-gender" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.gender} onChange={(e)=>setForm((p)=>({...p,gender:e.target.value as ContestFormData["gender"]}))} required>
            <option value="">Selectionner</option><option value="Masculin">Masculin</option><option value="Feminin">Feminin</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contest-church">Eglise d'attache</Label>
          <Input id="contest-church" value={form.church} onChange={(e)=>setForm((p)=>({...p,church:e.target.value}))} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contest-activityName">Nome l'activite/entreprise</Label>
        <Input id="contest-activityName" value={form.activityName} onChange={(e)=>setForm((p)=>({...p,activityName:e.target.value}))} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contest-domain">Domaine d'activite</Label>
        <select id="contest-domain" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.activityDomain} onChange={(e)=>setForm((p)=>({...p,activityDomain:e.target.value}))} required>
          <option value="">Selectionner un domaine</option>{domains.map((d)=><option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contest-description">Description detaillee de votre activite (produits, services proposes)</Label>
        <Textarea id="contest-description" value={form.activityDescription} onChange={(e)=>setForm((p)=>({...p,activityDescription:e.target.value}))} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contest-productType">Quel type de produit que vous allez exposer ?</Label>
        <Input id="contest-productType" value={form.exposedProductType} onChange={(e)=>setForm((p)=>({...p,exposedProductType:e.target.value}))} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contest-needsTable">Avez-vous besoin d'une table ?</Label>
          <select id="contest-needsTable" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.needsTable} onChange={(e)=>setForm((p)=>({...p,needsTable:e.target.value as ContestFormData["needsTable"]}))} required>
            <option value="">Selectionner</option><option value="Oui">Oui</option><option value="Non">Non</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contest-logistics">Avez-vous besoin d'une logistique specifique ? (Decrivez)</Label>
          <Input id="contest-logistics" value={form.logisticsDetails} onChange={(e)=>setForm((p)=>({...p,logisticsDetails:e.target.value}))} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contest-businessPlanPdf">Business Plan (PDF)</Label>
        <Input id="contest-businessPlanPdf" type="file" accept=".pdf,application/pdf" onChange={(e)=>setPdfFile(e.target.files?.[0] ?? null)} required={!form.businessPlanPdfUrl} />
        {form.businessPlanPdfUrl && <p className="text-xs text-muted-foreground">PDF televerse: {form.businessPlanPdfUrl}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.commitmentConfirmed} onChange={(e)=>setForm((p)=>({...p,commitmentConfirmed:e.target.checked}))} required />
        Je certifie l'exactitude des informations fournies et j'accepte le reglement du Salon Betsaleel.
      </label>

      {uploadingPdf && <p className="text-sm text-muted-foreground">Televersement du PDF en cours...</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full sm:w-auto" disabled={submitting || uploadingPdf}>
        {submitting ? "Envoi en cours..." : "Valider l'inscription concours"}
      </Button>
    </form>
  );
}