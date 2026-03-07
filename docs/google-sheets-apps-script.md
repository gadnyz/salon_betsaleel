# Google Sheets Integration (Apps Script)

Create a Google Sheet with two tabs:
- `Exposants`
- `Concours`

Then create an Apps Script project linked to this sheet and paste:

```javascript
const TOKEN = 'optional-shared-token';

function doGet(e) {
  if (!isAuthorized(e)) return json({ error: 'Unauthorized' }, 401);

  const action = (e.parameter.action || '').toLowerCase();
  if (action !== 'stats') return json({ error: 'Invalid action' }, 400);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const exposants = Math.max((ss.getSheetByName('Exposants')?.getLastRow() || 1) - 1, 0);
  const concours = Math.max((ss.getSheetByName('Concours')?.getLastRow() || 1) - 1, 0);

  return json({ exposants, concours });
}

function doPost(e) {
  if (!isAuthorized(e)) return json({ error: 'Unauthorized' }, 401);

  const body = JSON.parse(e.postData?.contents || '{}');
  if (body.action !== 'submit') return json({ error: 'Invalid action' }, 400);

  const type = body.type;
  const data = body.data || {};
  const submittedAt = body.submittedAt || new Date().toISOString();

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (type === 'exposant') {
    const sheet = getOrCreateSheet(ss, 'Exposants', [
      'submittedAt', 'fullName', 'whatsappPhone', 'projectName', 'description', 'projectOwner'
    ]);
    sheet.appendRow([
      submittedAt,
      data.fullName || '',
      data.whatsappPhone || '',
      data.projectName || '',
      data.description || '',
      data.projectOwner || '',
    ]);
    return json({ success: true });
  }

  if (type === 'concours') {
    const sheet = getOrCreateSheet(ss, 'Concours', [
      'submittedAt', 'fullName', 'whatsappPhone', 'projectName', 'description', 'projectOwner',
      'businessPlan', 'maturityLevel', 'websiteUrl', 'socialLinks', 'otherLinks'
    ]);
    sheet.appendRow([
      submittedAt,
      data.fullName || '',
      data.whatsappPhone || '',
      data.projectName || '',
      data.description || '',
      data.projectOwner || '',
      data.businessPlan || '',
      data.maturityLevel || '',
      data.websiteUrl || '',
      data.socialLinks || '',
      data.otherLinks || '',
    ]);
    return json({ success: true });
  }

  return json({ error: 'Invalid type' }, 400);
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function isAuthorized(e) {
  if (!TOKEN) return true;
  const headerToken = e?.parameter?.token || '';
  return headerToken === TOKEN;
}

function json(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy as Web App, then add in `.env.local`:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_WEBHOOK_TOKEN=optional-shared-token
```

Note: if you use token auth in query params, append `?token=...` in the webhook URL.