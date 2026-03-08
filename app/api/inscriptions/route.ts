import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/googleServiceAccount";

type RegistrationType = "exposant" | "concours";

type RegistrationPayload = {
  fullName: string;
  whatsappPhone: string;
  gmailAddress: string;
  gender: "Masculin" | "Feminin";
  church: string;
  activityName: string;
  activityDomain:
    | "Artisanat"
    | "Agriculture"
    | "Couture / mode"
    | "Restauration"
    | "Evenementiel"
    | "Technologie/ Digital"
    | "Cosmetique/ soins de beaute"
    | "Service"
    | "Other / Autre";
  activityDescription: string;
  exposedProductType: string;
  needsTable: "Oui" | "Non";
  logisticsDetails?: string;
  commitmentConfirmed: boolean;
  businessPlanPdfUrl?: string;
};

const sheetsScope = ["https://www.googleapis.com/auth/spreadsheets"];
const allowedGenders = new Set(["Masculin", "Feminin"]);
const allowedDomains = new Set([
  "Artisanat",
  "Agriculture",
  "Couture / mode",
  "Restauration",
  "Evenementiel",
  "Technologie/ Digital",
  "Cosmetique/ soins de beaute",
  "Service",
  "Other / Autre",
]);
const allowedNeedsTable = new Set(["Oui", "Non"]);

const requiredCommonFields: Array<keyof RegistrationPayload> = [
  "fullName",
  "whatsappPhone",
  "gmailAddress",
  "gender",
  "church",
  "activityName",
  "activityDomain",
  "activityDescription",
  "needsTable",
];

function isFilled(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

function validate(type: RegistrationType, data: Record<string, unknown>): string | null {
  for (const field of requiredCommonFields) {
    if (!isFilled(data[field])) return `Le champ \"${field}\" est requis.`;
  }

  if (!allowedGenders.has(String(data.gender))) return "Le champ \"gender\" est invalide.";
  if (!allowedDomains.has(String(data.activityDomain))) return "Le champ \"activityDomain\" est invalide.";
  if (!allowedNeedsTable.has(String(data.needsTable))) return "Le champ \"needsTable\" est invalide.";
  if (data.commitmentConfirmed !== true) return "Vous devez confirmer votre engagement.";
  if (type === "concours" && !isFilled(data.businessPlanPdfUrl)) return "Le Business Plan PDF est requis pour le concours.";

  return null;
}

function getSheetConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID?.trim();
  const exposantsSheet = (process.env.GOOGLE_SHEET_EXPOSANTS_TAB || "Exposants").trim();
  const concoursSheet = (process.env.GOOGLE_SHEET_CONCOURS_TAB || "Concours").trim();
  return { spreadsheetId, exposantsSheet, concoursSheet };
}

async function getRangeValues(accessToken: string, spreadsheetId: string, range: string): Promise<string[][]> {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
  if (!response.ok) throw new Error("Unable to read Google Sheet range.");
  const data = (await response.json()) as { values?: string[][] };
  return data.values ?? [];
}

async function appendRow(accessToken: string, spreadsheetId: string, range: string, row: string[]) {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to append row in Google Sheet.");
}

async function phoneExistsInSheet(accessToken: string, spreadsheetId: string, sheetName: string, phone: string) {
  const rows = await getRangeValues(accessToken, spreadsheetId, `${sheetName}!A2:Z`);
  const target = normalizePhone(phone);
  return rows.some((row) => normalizePhone(row[4] || "") === target);
}

function toRow(type: RegistrationType, data: RegistrationPayload, submittedAt: string): string[] {
  return [
    submittedAt,
    type,
    data.fullName,
    data.whatsappPhone,
    data.gmailAddress,
    data.gender,
    data.church,
    data.activityName,
    data.activityDomain,
    data.activityDescription,
    data.needsTable,
    data.logisticsDetails ?? "",
    data.commitmentConfirmed ? "Engagement confirmé" : "",
    type === "concours" ? data.businessPlanPdfUrl ?? "" : "",
  ];
}

export async function GET() {
  const { spreadsheetId, exposantsSheet, concoursSheet } = getSheetConfig();
  if (!spreadsheetId) return NextResponse.json({ exposants: 0, concours: 0, configured: false });

  try {
    const accessToken = await getGoogleAccessToken(sheetsScope);
    const exposantsValues = await getRangeValues(accessToken, spreadsheetId, `${exposantsSheet}!A2:A`);
    const concoursValues = await getRangeValues(accessToken, spreadsheetId, `${concoursSheet}!A2:A`);
    return NextResponse.json({
      exposants: exposantsValues.filter((row) => row[0]?.trim()).length,
      concours: concoursValues.filter((row) => row[0]?.trim()).length,
      configured: true,
    });
  } catch {
    return NextResponse.json({ exposants: 0, concours: 0, configured: true });
  }
}

export async function POST(request: Request) {
  const { spreadsheetId, exposantsSheet, concoursSheet } = getSheetConfig();
  if (!spreadsheetId) return NextResponse.json({ error: "La base de données est actuellement inaccessible. Veuillez contacter l’administrateur du système. Merci." }, { status: 500 });

  let body: { type?: RegistrationType; data?: RegistrationPayload };
  try {
    body = (await request.json()) as { type?: RegistrationType; data?: RegistrationPayload };
  } catch {
    return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
  }

  if (!body.type || (body.type !== "exposant" && body.type !== "concours")) {
    return NextResponse.json({ error: "Type d'inscription invalide." }, { status: 400 });
  }

  const data = body.data ?? ({} as RegistrationPayload);
  const validationError = validate(body.type, data as Record<string, unknown>);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  try {
    const accessToken = await getGoogleAccessToken(sheetsScope);
    const targetSheet = body.type === "exposant" ? exposantsSheet : concoursSheet;
    const duplicate = await phoneExistsInSheet(accessToken, spreadsheetId, targetSheet, data.whatsappPhone);

    // if (duplicate) {
    //   return NextResponse.json({ error: "Ce numéro de téléphone existe deja pour ce formulaire." }, { status: 409 });
    // }

    await appendRow(accessToken, spreadsheetId, `${targetSheet}!A:P`, toRow(body.type, data, new Date().toISOString()));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Impossible d'enregistrer dans Google Sheets." }, { status: 502 });
  }
}