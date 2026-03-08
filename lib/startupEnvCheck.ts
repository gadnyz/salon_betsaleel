import { getGoogleServiceAccountEnvStatus } from "@/lib/googleServiceAccount";

let alreadyChecked = false;

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

export function runStartupEnvCheck(): void {
  if (alreadyChecked) return;
  alreadyChecked = true;

  const missing: string[] = [];
  const spreadsheetId = env("GOOGLE_SHEET_ID");

  if (!spreadsheetId) {
    missing.push("GOOGLE_SHEET_ID");
  }

  const serviceAccountStatus = getGoogleServiceAccountEnvStatus();
  missing.push(...serviceAccountStatus.missing);

  if (missing.length === 0) {
    console.log("[Startup Env Check] OK: toutes les variables Google Sheets sont accessibles.");
    return;
  }

  console.error(
    `[Startup Env Check] Missing Google env vars: ${missing.join(", ")}. ` +
      "Check Vercel Project Settings > Environment Variables.",
  );
}
