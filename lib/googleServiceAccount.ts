import { createSign } from "node:crypto";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri: string;
};

type ServiceAccountEnvStatus = {
  isValid: boolean;
  missing: string[];
};

function base64Url(input: string | Buffer): string {
  const base64 = Buffer.isBuffer(input)
    ? input.toString("base64")
    : Buffer.from(input, "utf8").toString("base64");

  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

export function getGoogleServiceAccountEnvStatus(): ServiceAccountEnvStatus {
  const clientEmail =
    env("GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL") ||
    env("CLIENT_EMAIL") ||
    env("GOOGLE_CLIENT_EMAIL");

  const privateKeyRaw =
    env("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY") ||
    env("PRIVATE_KEY") ||
    env("GOOGLE_PRIVATE_KEY");

  const missing: string[] = [];

  if (!clientEmail) {
    missing.push(
      "GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL (or CLIENT_EMAIL / GOOGLE_CLIENT_EMAIL)",
    );
  }

  if (!privateKeyRaw) {
    missing.push(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY (or PRIVATE_KEY / GOOGLE_PRIVATE_KEY)",
    );
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}

function readServiceAccountFromEnv(): ServiceAccount {
  const clientEmail =
    env("GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL") ||
    env("CLIENT_EMAIL") ||
    env("GOOGLE_CLIENT_EMAIL");

  const privateKeyRaw =
    env("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY") ||
    env("PRIVATE_KEY") ||
    env("GOOGLE_PRIVATE_KEY");

  const tokenUri =
    env("GOOGLE_SERVICE_ACCOUNT_TOKEN_URI") ||
    env("TOKEN_URI") ||
    "https://oauth2.googleapis.com/token";

  const status = getGoogleServiceAccountEnvStatus();
  if (!status.isValid || !clientEmail || !privateKeyRaw) {
    throw new Error(`Service account env vars missing: ${status.missing.join(", ")}.`);
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  return {
    client_email: clientEmail,
    private_key: privateKey,
    token_uri: tokenUri,
  };
}

export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
  const serviceAccount = readServiceAccountFromEnv();

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
