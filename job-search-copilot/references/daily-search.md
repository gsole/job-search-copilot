# Daily shortlist run

Search, verify, dedupe, score, log, report. New roles only. Needs a browser signed in as the user (see SKILL.md Step 0). If none is available, do Step 3 (web search) only and say clearly in the summary that LinkedIn was skipped.

Keep the volume human-scale: this runs in the user's own signed-in browser, so pace requests, page through a few results pages rather than scraping everything, and stop on any rate-limit or verification wall rather than pushing through it.

## Step 1: Load the tracker

Read every row of the tracker, using the method for the user's tracker option in `tracker-setup.md` (for Apps Script, `getAll`). Build two dedup sets: canonical Role URLs, and `company + role title` pairs. Record the row count and compare it to the count in the last run's summary (stored at the bottom of `job-profile.md` or in the previous summary). A drop means rows were deleted or hidden by a filter; say so and lean on company+title dedup for this run.

Google Sheets note: rows hidden by a standard filter are often missing from exported or HTML views of the sheet, which silently breaks dedup. If the user filters their tracker, suggest a *filter view* instead (Data > Create filter view), which hides rows only on their screen.

## Step 2: LinkedIn searches

Build 4 to 7 searches from the profile. Good coverage usually means one search per cluster of target titles, one for each location mode (home city hybrid/on-site, remote), and one aimed at Tier 1 industries, since function-led searches tend to under-surface the user's best vertical.

URL pattern: `https://www.linkedin.com/jobs/search/?keywords=<query>&<filters>`

| Param | Meaning |
|---|---|
| `keywords=%22Head+of+Operations%22+OR+%22Chief+of+Staff%22` | quoted titles joined with OR; AND and parentheses also work |
| `location=Chicago%2C+IL` | location text |
| `f_TPR=r86400` / `r604800` | posted in last 24h / last 7 days (use 24h daily, 7 days for niche searches) |
| `f_E=4%2C5%2C6%2C7` | experience: 4 mid-senior, 5 director, 6 executive (widen for senior IC titles, which are often tagged lower) |
| `f_WT=2` / `1` / `3` | remote / on-site / hybrid |
| `f_I=6%2C96%2C4` | industry codes (6 software/IT, 96 tech/internet, 4 software dev) |
| `f_SAL=` | salary filter; easiest to copy from a search the user sets up themselves |

If the user has a LinkedIn saved search they like, ask for its URL during onboarding and include it. Saved and semantic searches are often the most productive single source.

**Reading results.**
- `get_page_text` (or equivalent) on the results page gives titles, companies, locations, and ages. Enough to triage.
- LinkedIn's newer `/jobs/search-results/` UI hides job IDs from the DOM. The classic `/jobs/search/` URL still exposes them: scrape `jobs/view/(\d{9,})` from the page HTML.
- From a linkedin.com tab, `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{id}` returns the full posting, often more reliably than the rendered page.
- A search with zero results shows a "Jobs you may be interested in" list instead. Those are recommendations, not results. Check for "No matching jobs found".
- Read location from the posting header, not the result card.

## Step 3: Job boards via web search

Run site-restricted searches built from the profile's titles, for example:
- `site:jobs.ashbyhq.com "Head of Operations" OR "Chief of Staff" remote`
- `site:job-boards.greenhouse.io "VP Operations" OR "Head of GTM"`
- `site:jobs.lever.co "Director" operations remote`
- An industry-led query for Tier 1: `site:jobs.ashbyhq.com marketplace OR commerce "Head of" operations`

Search indexes go stale. Open every hit before scoring. Ashby and most career sites need a real browser (JavaScript). A closed Greenhouse job usually redirects to the company's full board with `?error=true`.

**Aggregators** (Swooped, Jobgether, Lensa, Ladders and similar) hide the employer. The "About the company" paragraph is usually specific enough to identify it with one search. Resolve the employer, prefer the company's own job-board URL, and dedupe against the resolved name.

## Step 4: Filter and score

Apply `scoring.md` to each candidate. Drop anything already in the dedup sets, and report it as a re-surface ("already tracked from [date], [score]") rather than silently.

## Step 5: Verify before writing (every role at or above threshold)

1. **Work arrangement from the posting body.** Search the text for "hybrid", "in office", "on-site", "days a week", "commuting distance", and hub cities. Any required attendance outside the user's allowed cities is an exclude even if the card says Remote.
2. **Liveness.** The page must show a real posting body and a working apply control, and none of: "No longer accepting applications", "This job is no longer available", "Job not found", "this job was removed", a redirect to a general careers page. If you could read the posting text but couldn't see an apply button, log it but note "apply control not confirmed".
3. A role that fails either check is not logged. Name it in the summary with the reason.

## Step 6: Find the people (roles scoring 7+)

For each, find the two people worth messaging, strongest evidence first, and stop as soon as one source names them:
1. The posting itself ("reporting to the VP of X", a named recruiter).
2. LinkedIn's "Meet the hiring team" card on the job page.
3. A LinkedIn people search: hiring manager is usually one level above the role in the same function (the CEO or a co-founder under ~50 people); recruiter is the company plus "recruiter" OR "talent acquisition" OR "head of people".

Format: `Name, Title | linkedin.com/in/slug`. Prefix `likely:` when inferred. Leave blank when nothing is solid: a confidently wrong name burns a first impression at a company the user wants. Watch for company-name collisions and keep only people whose *current* employer matches.

Also run a quick connections check (`/search/results/people/?keywords=COMPANY&network=%5B%22F%22%2C%22S%22%5D`) for 1st and 2nd degree contacts. Budget about two to three searches per role; if time is short, do the highest scores first and mark the rest "deferred".

## Step 7: Write to the tracker

Append one row per new role using the columns in `assets/tracker-template.csv`, with the write method for the user's tracker option in `tracker-setup.md`. Strip tracking parameters from URLs (`utm_*`, `refId`, `trackingId`, `currentJobId`, `gh_src`) so dedup works next time. Fill only discovery columns. Never write Application Date, Outcome, Fit Notes, or any column the user maintains.

Never blind-retry a write that timed out: re-read the tracker first and retry only if the row isn't there. Duplicate rows are the most common tracker damage.

## Step 8: Summary for the user

Sorted by score, highest first. For each role:

```
[8/10] Company: Role Title  ⚡ warm (if a 1st-degree connection or named, reachable hiring manager)
- Location / Stage / Headcount / Comp (or "not listed")
- Mandate: [build / fix / run, in a phrase]   [IC, no team] if applicable
- Fit: [the fit reasoning]
- Outreach target: [best single person to message and why]
- Link
```

Then a short **search note**:
- Roles that scored 5 and the rule that caught them
- Strong-looking roles excluded by a single hard rule (so the user can see what strict rules cost)
- Re-surfaces skipped as duplicates
- Sources checked, anything that failed or was skipped
- Tracker row count

If nothing cleared the threshold, say so and list what was checked. A quiet day is useful information.
