/**
 * Job Search Copilot: tracker web app for Google Sheets.
 *
 * Paste this whole file into Extensions > Apps Script on the tracker sheet,
 * set SECRET below, then Deploy > New deployment > Web app
 * (Execute as: Me, Who has access: Anyone). Give the agent the /exec URL and the secret.
 *
 * Actions (POST body is JSON, Content-Type text/plain):
 *   {secret, action:'getAll'}                              -> every row as JSON, ignores filters
 *   {secret, action:'append', row:{Header: value, ...}}    -> adds a row, columns matched by header
 *   {secret, action:'setCell', url, column, value, force}  -> fills one cell in the row with that Role URL
 *   {secret, action:'setExpired', url, value:'Yes'|'No'}   -> sets the Expired column, keeps free-text notes
 */

const SECRET = 'CHANGE-ME-to-a-long-random-phrase';
const SHEET_NAME = ''; // blank = first sheet
const URL_HEADER = 'Role URL';
const EXPIRED_HEADER = 'Expired';
// Columns the agent may never write, even with force.
const USER_COLUMNS = ['Link to Resume', 'Application Date', 'Outcome', 'Fit Notes'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
}

function reply_(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return reply_('ok: tracker web app is running');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return reply_('error: bad secret');

    const sh = sheet_();
    const data = sh.getDataRange().getValues(); // ignores filters, so hidden rows are included
    const headers = data[0].map(String);
    const col = name => headers.indexOf(name);
    const urlCol = col(URL_HEADER);
    const findRow = url => {
      for (let i = 1; i < data.length; i++) if (String(data[i][urlCol]).trim() === String(url).trim()) return i;
      return -1;
    };

    switch (body.action) {
      case 'getAll': {
        const rows = data.slice(1).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
        return reply_(JSON.stringify({ count: rows.length, rows }));
      }
      case 'append': {
        if (urlCol >= 0 && body.row[URL_HEADER] && findRow(body.row[URL_HEADER]) > 0) {
          return reply_('skipped: url already in sheet');
        }
        const out = headers.map(h => (USER_COLUMNS.includes(h) ? '' : (body.row[h] ?? '')));
        sh.appendRow(out);
        return reply_('appended');
      }
      case 'setCell': {
        const c = col(body.column);
        if (c < 0) return reply_('column not found: ' + body.column);
        if (USER_COLUMNS.includes(body.column)) return reply_('refused: user column');
        const r = findRow(body.url);
        if (r < 0) return reply_('url not found');
        const cur = String(data[r][c]).trim();
        const replaceable = cur === '' || /^(check manually|not checked)/i.test(cur);
        if (!replaceable && !body.force) return reply_('kept existing value in row ' + (r + 1));
        sh.getRange(r + 1, c + 1).setValue(body.value);
        return reply_('updated row ' + (r + 1));
      }
      case 'setExpired': {
        const c = col(EXPIRED_HEADER);
        if (c < 0) return reply_('column not found: ' + EXPIRED_HEADER);
        const r = findRow(body.url);
        if (r < 0) return reply_('url not found');
        const cur = String(data[r][c]).trim();
        if (cur !== '' && !/^(yes|no)$/i.test(cur)) return reply_('kept existing note in row ' + (r + 1));
        sh.getRange(r + 1, c + 1).setValue(body.value);
        return reply_('updated row ' + (r + 1));
      }
      default:
        return reply_('no-op: unknown action');
    }
  } catch (err) {
    return reply_('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}
