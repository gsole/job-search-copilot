# Tracker setup

The user picks where their tracker lives. Present the options neutrally with the trade-offs, recommend based on what they already use, and let them decide. Record the choice in `job-profile.md` under Setup.

| Option | Good for | Setup | Trade-offs |
|---|---|---|---|
| **A. Google Sheet + Apps Script** | People who live in Google Sheets, want to edit from any device, and want the most reliable automated writes | About 10 minutes, once (guided below) | One-time setup in Google's script editor. Most robust option afterward: writes return a real confirmation, dedup sees filtered rows, and the agent can't touch the user's own columns. |
| **B. Google Sheet via a connector** | People with a Google Sheets/Drive connection already working in their agent | Create the sheet, test one write | Only works if the connector can actually append rows and edit cells. Test before relying on it. Some connectors read cached copies. |
| **C. Local spreadsheet file** | Fastest start, works offline and on any platform | None | `tracker.csv` lives in their folder. Opens in Excel, Numbers, or Sheets, but editing it in another app while a run is writing can cause conflicts. |

Whatever they choose, start from the columns in `assets/tracker-template.csv`. The user can switch later; moving rows between options is a simple copy.

## Option A: guided setup

Walk the user through this one step at a time, confirming each step before the next. If you can operate their browser, offer to do the clicking with them watching. Steps 4 and 5 involve Google's permission screens, which the user should read and approve themselves.

1. **Create the sheet.** New Google Sheet, named something like "Job Search Tracker". Paste the header row from `assets/tracker-template.csv` into row 1.
2. **Open the script editor.** Extensions > Apps Script. Delete the sample code.
3. **Paste the script.** Copy all of `assets/tracker-apps-script.gs` in. Change `SECRET` to a long random phrase (offer to generate one). Save.
4. **Deploy.** Deploy > New deployment > type Web app. Execute as: **Me**. Who has access: **Anyone**. Click Deploy.
5. **Authorize.** Google shows a permissions prompt for the user's own script ("Google hasn't verified this app" is expected for personal scripts; Advanced > Go to project). Explain what it allows: the script can edit this spreadsheet, and only accepts requests carrying the secret.
6. **Hand over the URL.** Copy the Web app URL ending in `/exec`. Store it and the secret in `job-profile.md` under Setup. Tell the user to treat the URL plus secret like a password: anyone with both could add rows to their sheet.
7. **Test.** Open the `/exec` URL in the browser: it should say `ok: tracker web app is running`. Then send a `getAll` (should return `count: 0`), an `append` of a dummy row, a `getAll` again to confirm it, and ask the user to delete the dummy row.

**If they later edit the script**, they must deploy a *new version* (Deploy > Manage deployments > edit > New version) or the old code keeps running. If they create a whole *new deployment*, the URL changes: update `job-profile.md` and never use the old URL again.

### Calling the web app

Send POSTs with `Content-Type: text/plain` and a JSON body that includes `secret`. Rows are sent as objects keyed by header name, so column order changes don't break anything.

```javascript
const r = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify({ secret: SECRET, action: 'append', row: { 'Date Surfaced': '11/16/2026', 'Role Name': '...', 'Company': '...', 'Role URL': '...' } })
});
await r.text(); // 'appended' | 'skipped: url already in sheet' | 'error: ...'
```

- **Read the response when you can.** Posting from a tab already on the `/exec` URL (same origin) gives a readable reply. From another site's tab you may need `mode: 'no-cors'`, which hides the reply; then verify with a `getAll` before retrying anything.
- **Never blind-retry an append.** Check with `getAll` first. The script also refuses an append whose Role URL already exists.
- `getAll` reads with `getDataRange()`, so rows hidden by the user's filter are still included. Use it for dedup.
- `setCell` only fills blanks or "Check manually"/"Not checked" cells. Pass `force: true` only when the user asks for that specific cell to be overwritten. User columns are always refused.
- `setExpired` won't overwrite a cell holding the user's own note.
- Each call can take several seconds (script cold start). For many writes, run them sequentially with awaited fetches and track progress in a `window` variable.

## Option B: connector

Create the sheet with the template headers, record its URL, then test: append a dummy row, read it back, and edit one cell. If any step fails or reads come back stale, say so and offer Option A or C instead.

## Option C: local file

Copy `assets/tracker-template.csv` to `tracker.csv` in the workspace. Read and write it with a CSV library, quoting fields properly (fit reasoning contains commas). Tell the user to close it in other apps during a run.
