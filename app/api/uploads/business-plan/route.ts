import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/googleServiceAccount";

const driveScope = ["https://www.googleapis.com/auth/drive"];
const maxPdfSizeBytes = 15 * 1024 * 1024;

type UploadBlob = Blob & { name?: string };

function asUploadBlob(value: FormDataEntryValue | null): UploadBlob | null {
  if (!value || typeof value === "string") return null;
  if (typeof (value as Blob).arrayBuffer !== "function") return null;
  return value as UploadBlob;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = asUploadBlob(formData.get("file"));

    if (!file) {
      return NextResponse.json({ error: "Fichier PDF requis." }, { status: 400 });
    }

    const fileName = file.name || "business-plan.pdf";
    const isPdf = file.type === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json({ error: "Le fichier doit etre au format PDF." }, { status: 400 });
    }

    if (file.size > maxPdfSizeBytes) {
      return NextResponse.json({ error: "Le fichier PDF depasse 15MB." }, { status: 400 });
    }

    const folderId =
      process.env.GOOGLE_DRIVE_BUSINESS_PLAN_FOLDER_ID?.trim() ||
      process.env.GOOGLE_DRIVE_FOLDER_ID?.trim();
    const makePublic = (process.env.GOOGLE_DRIVE_PUBLIC || "false").toLowerCase() === "true";

    const accessToken = await getGoogleAccessToken(driveScope);

    const metadata: Record<string, unknown> = {
      name: `${Date.now()}-${fileName}`,
      mimeType: "application/pdf",
    };

    if (folderId) {
      metadata.parents = [folderId];
    }

    const boundary = `----SalonBetsaleelBoundary${Date.now()}`;
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const multipartBody = new Blob([
      `--${boundary}\r\n`,
      "Content-Type: application/json; charset=UTF-8\r\n\r\n",
      JSON.stringify(metadata),
      `\r\n--${boundary}\r\n`,
      "Content-Type: application/pdf\r\n\r\n",
      fileBytes,
      `\r\n--${boundary}--`,
    ]);

    const uploadResponse = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
      cache: "no-store",
    });

    if (!uploadResponse.ok) {
      const details = await uploadResponse.text();
      return NextResponse.json(
        { error: `Echec upload Google Drive (${uploadResponse.status}). ${details.slice(0, 300)}` },
        { status: 502 },
      );
    }

    const uploaded = (await uploadResponse.json()) as { id?: string };

    if (!uploaded.id) {
      return NextResponse.json({ error: "ID fichier Google Drive manquant." }, { status: 502 });
    }

    if (makePublic) {
      const perm = await fetch(`https://www.googleapis.com/drive/v3/files/${uploaded.id}/permissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "reader", type: "anyone" }),
        cache: "no-store",
      });

      if (!perm.ok) {
        const details = await perm.text();
        return NextResponse.json(
          { error: `Fichier charge, mais partage public impossible (${perm.status}). ${details.slice(0, 300)}` },
          { status: 502 },
        );
      }
    }

    const fileUrl = `https://drive.google.com/file/d/${uploaded.id}/view`;
    return NextResponse.json({ success: true, fileUrl, fileId: uploaded.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: `Impossible de televerser le fichier PDF. ${message}` }, { status: 502 });
  }
}