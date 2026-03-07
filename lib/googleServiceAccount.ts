import { createSign } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri: string;
};

function base64Url(input: string | Buffer): string {
  const base64 = Buffer.isBuffer(input)
    ? input.toString("base64")
    : Buffer.from(input, "utf8").toString("base64");

  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function readServiceAccount(): Promise<ServiceAccount> {
  const configuredPath = process.env.GOOGLE_SERVICE_ACCOUNT_FILE?.trim();
  const filePath = configuredPath || "salon-bestsaleel-c43f77aa08ee.json";
  const absolutePath = path.resolve(process.cwd(), filePath);

  const raw = await readFile(absolutePath, "utf8");
  const parsed = JSON.parse(raw) as ServiceAccount;

  if (!parsed.client_email || !parsed.private_key || !parsed.token_uri) {
    throw new Error("Invalid service account file.");
  }

  return parsed;
}

export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
  const serviceAccount = await readServiceAccount();
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: scopes.join(" "),
    aud: serviceAccount.token_uri,
    iat: now,
    exp: now + 3600,
  };

  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(serviceAccount.private_key);
  const assertion = `${unsignedToken}.${base64Url(signature)}`;

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const tokenResponse = await fetch(serviceAccount.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    throw new Error("Unable to fetch Google access token.");
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error("Google access token missing.");
  }

  return tokenData.access_token;
}