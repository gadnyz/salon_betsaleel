# Salon Betsaleel

Application web du **Salon Betsaleel 2026** pour gerer:
- les inscriptions des exposants
- les inscriptions au concours
- l'upload des fichiers (Business Plan PDF / ZIP) vers Google Drive
- l'enregistrement des soumissions dans Google Sheets

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + composants UI
- Google Sheets API (stockage des inscriptions)
- Google Drive API (stockage des fichiers)
- Deploiement Vercel

## Fonctionnalites principales

- Formulaire `Inscription exposant`
- Formulaire `Inscription concours`
- Validation des champs cote serveur
- Ecriture automatique dans Google Sheets
- Upload PDF/ZIP vers Google Drive
- Metadonnees SEO de partage (Open Graph / Twitter) configurees

## Arborescence utile

- `app/page.tsx` : page d'accueil
- `app/inscription-exposant/page.tsx` : page formulaire exposant
- `app/inscription-concours/page.tsx` : page formulaire concours
- `app/api/inscriptions/route.ts` : lecture/creation des inscriptions (Sheets)
- `app/api/uploads/business-plan/route.ts` : upload PDF vers Drive
- `app/api/uploads/zip/route.ts` : upload ZIP vers Drive
- `lib/googleServiceAccount.ts` : generation du token d'acces Google (service account)

## Installation locale

1. Installer les dependances:

```bash
npm install
```

2. Copier l'exemple d'environnement:

```bash
cp .env.local.example .env.local
```

3. Remplir les variables Google (voir section suivante).

4. Lancer le serveur:

```bash
npm run dev
```

5. Ouvrir `http://localhost:3000`.

## Variables d'environnement

Variables minimales pour le flux inscriptions:

```env
GOOGLE_SHEET_ID=
GOOGLE_SHEET_EXPOSANTS_TAB=Exposants
GOOGLE_SHEET_CONCOURS_TAB=Concours

GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
GOOGLE_SERVICE_ACCOUNT_TOKEN_URI=https://oauth2.googleapis.com/token

GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_DRIVE_BUSINESS_PLAN_FOLDER_ID=
GOOGLE_DRIVE_PUBLIC=false
```

Aliases acceptes pour compatibilite (si tu utilises deja ces noms):
- `CLIENT_EMAIL` / `GOOGLE_CLIENT_EMAIL`
- `PRIVATE_KEY` / `GOOGLE_PRIVATE_KEY`
- `TOKEN_URI`

## Configuration Google

### 1) Google Sheets

- Creer un Google Sheet avec 2 onglets:
  - `Exposants`
  - `Concours`
- Copier l'ID du fichier dans `GOOGLE_SHEET_ID`.

### 2) Service Account

- Creer un Service Account Google Cloud
- Activer les APIs:
  - Google Sheets API
  - Google Drive API
- Partager le Google Sheet (et dossier Drive) avec l'email du service account
- Injecter l'email et la cle privee dans les variables d'environnement

Important pour `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`:
- Sur Vercel, stocker la cle avec les sauts de ligne echappes (`\\n`) si necessaire.

### 3) Google Drive

- Definir `GOOGLE_DRIVE_FOLDER_ID` pour les uploads ZIP
- Optionnel: `GOOGLE_DRIVE_BUSINESS_PLAN_FOLDER_ID` pour separer les PDF
- `GOOGLE_DRIVE_PUBLIC=true` pour rendre les fichiers accessibles publiquement

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run update-types
```

## API

### `GET /api/inscriptions`
Retourne:

```json
{
  "exposants": 0,
  "concours": 0,
  "configured": true
}
```

### `POST /api/inscriptions`
Enregistre une inscription (`type: exposant | concours`) dans Google Sheets.

### `POST /api/uploads/business-plan`
Upload un PDF (max 15 MB) vers Google Drive.

### `POST /api/uploads/zip`
Upload un ZIP (max 25 MB) vers Google Drive.

## Deploiement Vercel

1. Connecter le repo a Vercel
2. Ajouter toutes les variables d'environnement (Production / Preview)
3. Redeployer apres chaque modification d'env vars

Checklist rapide en cas d'erreur:
- `configured: false` sur `/api/inscriptions` => `GOOGLE_SHEET_ID` manquant
- `500` a la soumission => variable(s) Google absente(s) ou invalide(s)
- `502` Google => verifier droits APIs, partage du Sheet/Drive, et cle privee

## Notes

- Le README precedent du template Headshot AI a ete remplace pour correspondre au projet Salon Betsaleel.
- Si besoin, on peut ajouter une section exploitation (sauvegarde Sheets, supervision logs, rotation des cles).
