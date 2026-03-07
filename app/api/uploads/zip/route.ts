import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/googleServiceAccount";

const driveScope = ["https://www.googleapis.com/auth/drive"];
const maxZipSizeBytes = 25 * 1024 * 1024;

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
      return NextResponse.json({ error: "Fichier zip requis." }, { status: 400 });
    }

    const fileName = file.name || "documents.zip";
    const isZip =
      file.type === "application/zip" ||
      file.type === "application/x-zip-compressed" ||
      fileName.toLowerCase().endsWith(".zip");

    if (!isZip) {
      return NextResponse.json({ error: "Le fichier doit etre au format .zip." }, { status: 400 });
    }

    if (file.size > maxZipSizeBytes) {
      return NextResponse.json({ error: "Le fichier zip depasse 25MB." }, { status: 400 });
    }

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim();
    const makePublic = (process.env.GOOGLE_DRIVE_PUBLIC || "false").toLowerCase() === "true";

    const accessToken = await getGoogleAccessToken(driveScope);

    const metadata: Record<string, unknown> = {
      name: `${Date.now()}-${fileName}`,
      mimeType: "application/zip",
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
      "Content-Type: application/zip\r\n\r\n",
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
      return NextResponse.json({ error: "Echec upload Google Drive." }, { status: 502 });
    }

    const uploaded = (await uploadResponse.json()) as { id?: string };

    if (!uploaded.id) {
      return NextResponse.json({ error: "ID fichier Google Drive manquant." }, { status: 502 });
    }

    if (makePublic) {
      await fetch(`https://www.googleapis.com/drive/v3/files/${uploaded.id}/permissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "reader", type: "anyone" }),
        cache: "no-store",
      });
    }

    const fileUrl = `https://drive.google.com/file/d/${uploaded.id}/view`;
    return NextResponse.json({ success: true, fileUrl, fileId: uploaded.id });
  } catch {
    return NextResponse.json({ error: "Impossible de televerser le fichier zip." }, { status: 502 });
  }
}