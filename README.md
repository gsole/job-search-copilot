# Job Search Copilot

An AI agent skill that runs your job search the way a sharp chief of staff would. It learns what you actually want, searches for it every morning, scores every role honestly, tailors your resume to the ones worth applying to, tells you who to message to get eyeballs on your resume, and gets smarter from your feedback each week.

**Requires the Claude desktop app with the Claude in Chrome extension, or the OpenAI Codex app with its Chrome extension.** Details below.

It interviews you once to build an **Ideal Employer Profile**, then searches LinkedIn, Ashby, Greenhouse, and Lever against it. It scores every role out of 10, drops anything below your threshold, looks up the likely hiring manager and recruiter for each strong match, and logs it all to a tracker. When a role deserves real effort, it tailors your resume and cover letter to the posting. Once a week it marks dead listings, reads your notes on the roles that missed and your application outcomes, looks for patterns, and proposes specific changes to your profile.

Three things make it different from a job alert:

- It gets narrower where you keep saying no and wider where it keeps just missing.
- It gives you a name and a profile link per role, because applying through a portal and waiting is how most applications die.
- It never invents qualifications. Every resume bullet traces back to something you actually did.

Built by [Gemma Sole](https://gemmaksole.com) from the system she runs for her own search.

---

## What you need before you start

**A browser you're logged into.** LinkedIn and most company job boards render jobs with JavaScript behind a session, so the skill has to drive a real browser signed in as you. A logged-out browser quietly returns a thin public subset instead of an error, which looks exactly like a slow job market.

Two setups work:

- **Claude desktop app** with the **Claude in Chrome** extension installed and enabled.
- **OpenAI Codex app** with the **Codex Chrome extension**, which lets Codex act inside your signed-in Chrome.

Without browser access you can still do the interview, build your profile, set up the tracker, score postings you paste in, and tailor resumes. You just can't run the searches until you're somewhere with a browser.

**Your current resume.** Past cover letters and any longer write-ups of your work (a brag doc, project summaries, performance reviews) make the tailoring noticeably better.

**A Google account**, unless you use the local-file tracker.

**About 20 to 40 minutes** for setup, including the interview and the test run. Add about 10 minutes if you choose the Google Sheet + Apps Script tracker.

---

## Installing it

### Claude app (desktop or web)

1. Download `job-search-copilot.skill` from the [latest release](../../releases/latest).
2. In the Claude app, open the skills section of settings and upload the file.
3. Start a chat in the desktop app and say: **"Set up my job search."**

### Claude Code

```bash
git clone https://github.com/YOUR-USERNAME/job-search-copilot.git
cp -r job-search-copilot/skills/job-search-copilot ~/.claude/skills/
```

### OpenAI Codex

```bash
git clone https://github.com/YOUR-USERNAME/job-search-copilot.git
mkdir -p ~/.codex/skills
cp -r job-search-copilot/skills/job-search-copilot ~/.codex/skills/
```

Restart Codex, then say: **"Set up my job search."**

**If it doesn't trigger,** name it directly: "Use the job-search-copilot skill to set up my job search." **If searches come back empty,** check that Chrome is open, the extension is connected, and you're logged in to LinkedIn.

---

## Running it

Just ask. "Help me find jobs," "run my job search," "set up my job search," "is this role a fit?" and "tailor my resume to this job" all work. It looks for your profile and routes itself: no profile means it starts the interview, a profile means it gets to work.

The first run does the interview and then three tests:

1. **Calibration.** You bring three to five postings you've already seen, at least one you loved and one you'd never apply to. It scores each one and you check the scores against your gut. Every mismatch is a bug in the profile, and it fixes the rule, not the score.
2. **A small live search.** Two real searches with the top results scored, so you can see what gets through and what gets caught.
3. **One tailored resume.** This shows whether your materials are strong enough and surfaces gaps worth filling now.

Don't schedule anything until those look right. A broken search running every morning looks exactly like a quiet job market.

After that, ask it to set up a recurring run. Daily on weekdays, with the weekly review on Mondays, is a reasonable default. A once-a-week digest suits some people better. Scheduled runs need your computer awake, the app open, and Chrome running.

---

## Choosing your tracker

During onboarding you pick where roles get logged. It's your call:

| Option | Best for | Trade-offs |
|---|---|---|
| **Google Sheet + Apps Script** | People who live in Sheets and want the most reliable automated writes | About 10 minutes of one-time setup, and the skill walks you through it. Writes are confirmed, dedup sees filtered rows, and the script refuses to touch your own columns. |
| **Google Sheet via a connector** | People whose agent already has a working Google Sheets connection | Only works if the connector can actually append rows. The skill tests this before relying on it. |
| **Local spreadsheet file** | The fastest start; works offline and anywhere | A CSV in your folder that opens in Excel, Numbers, or Sheets. Close it in other apps while a run is writing. |

The Apps Script is included at `skills/job-search-copilot/assets/tracker-apps-script.gs`. It requires a secret phrase on every request, so treat the web app URL and secret like a password.

---

## Running it on other agents

The skill is portable. It's a `SKILL.md` file plus plain markdown reference files, following the [Agent Skills](https://agentskills.io) open standard, which both Claude and OpenAI Codex read.

**The browser is what decides it.** The question for any agent is not "can it browse" but "can it act inside *my* Chrome, with *my* session." A cloud browser, a fresh sandboxed browser, or a web-search tool won't work for LinkedIn.

- **Codex app with the Chrome extension**: the extension drives your real, signed-in Chrome, and Codex reads skills natively. Both halves are there.
- **Codex's in-app browser**: fine for public pages, but it has no logins, so LinkedIn people search and connection checks won't work.
- **ChatGPT**: its earlier agent mode has been retired. Onboarding, scoring, and resume tailoring work in a plain chat. The daily search doesn't.

The search URLs, scoring, tracker mechanics, resume method, and the whole profile and review loop don't depend on any one agent. If something breaks, it will most likely be a browser quirk; `references/platform-notes.md` collects the known ones.

This moves fast, so check current docs rather than trusting this list. If you get it working somewhere new, a note in the repo issues helps the next person.

---

## Working with it

Treat it as a research assistant that gets sharper the more you correct it, not a job board that mails you alerts. These six habits separate people who get value out of it from people who end up with a tidy spreadsheet nobody reads.

### 1. It goes looking on its own

Once setup and the tests are done, it runs on your schedule and writes new matches straight to your tracker. You don't have to prompt it.

Each run shows only roles at or above your threshold, deduped against everything it has surfaced before, so the digest stays short as the tracker grows. It also names near-misses and strong-looking roles that a single strict rule caught (location, comp floor, a dealbreaker). That's how you find out a filter is costing you more than it's worth.

### 2. Feed it new searches, sources, and one-off roles

It starts with whatever you gave it in the interview, and that is never the whole picture.

- **Found a LinkedIn saved search that works?** Paste it in. Saved and semantic searches routinely beat constructed keyword queries.
- **Know a job board, careers page, or newsletter it isn't checking?** Say so and it gets added.
- **Someone sent you a specific role?** Hand over the URL. It scores that role against your profile, tells you honestly where it fits and where it doesn't, and logs it as a manual addition rather than a search hit.

That last one is more useful than it sounds. A role you're already emotionally invested in is exactly the one worth scoring coldly.

### 3. It builds over time, and the scoring needs tuning

The first week is the worst week. Your profile came out of one conversation, and some of it will mean something different in practice than you intended.

Two things fix that:

- **Write one line in Fit Notes** whenever it surfaces something wrong.
- **When a score feels wrong, say so in the moment.** Changing a rule is a one-line edit to a file you own.

Then use the scores for what they're for: **application order**. A 9 and a 7 are both worth applying to, but your best hours of the week should go to the 9. The score tells you where your effort earns the most. It doesn't decide anything for you.

### 4. Tailor before you apply

When a role is worth real effort, give it the job description and ask for a tailored resume and cover letter. Tailoring to the specific posting is the step most people skip, and it changes most whether a human reads the application.

The method:

1. It picks the **10 qualifications** that matter most in the posting.
2. It marks each one as strong, partial, or a gap against your materials, and **calls out large gaps plainly** instead of papering over them.
3. It asks you for any missing numbers rather than guessing.
4. It rewrites your bullets in the **XYZ format**: *Accomplished [X] as measured by [Y] by doing [Z].*
5. It finishes with a list of improvements to your resume beyond this one application.

You choose the format during setup: Google Doc, Word, or Markdown/PDF.

### 5. Then message the hiring manager and the recruiter

A tailored resume uploaded to a portal still mostly disappears. The **Hiring Manager** and **Recruiter** columns exist so you can do the thing that actually works: send a short, specific note to a person.

How you reach them depends on your LinkedIn account:

- **A free account can only message people you're already connected to.** First-degree messages are ordinary messages and cost nothing.
- **Reaching someone you aren't connected to needs InMail**, which comes with Premium, Sales Navigator, or Recruiter. Doing this at any real volume means paying for Premium.
- **A connection request with a short note is free**, and for a job search it often lands better than an InMail. It's a lower-pressure ask and it leaves you connected afterward. The trade-off is that the note is short and they may not accept.
- **Premium members with Open Profile turned on can be messaged for free** by anyone. Recruiters enable this more often than you'd expect, so check a profile before assuming you need credits.
- **Email, where you can find or infer it,** sidesteps all of this.

Roles with a 1st-degree connection or a named, reachable hiring manager are flagged **⚡ warm** in the digest. Start there.

### 6. Log what happens

When you apply, fill in **Application Date**. When you hear back, fill in **Outcome**. The weekly review compares the roles that advanced with the ones that didn't. It always states the denominators and says plainly if your fit score isn't predicting anything. Outcomes beat any rule written in advance.

---

## The columns that matter

**Fit Notes** is the learning mechanism. When the search surfaces something wrong, write one line about why. On review day the skill reads those notes alongside your outcomes, finds the patterns, and proposes profile changes, each with the evidence behind it and an honest note about what the change would stop surfacing. You approve or decline. Declined suggestions go in a decision log so it stops raising them.

With an empty Fit Notes column, this is a spreadsheet with extra steps.

**Hiring Manager and Recruiter** are what make the list actionable. Each holds a name, a title, and a profile link. Where the skill inferred the person from a title search rather than finding them named in the posting or on LinkedIn's hiring-team card, it writes `likely:` in front. Where it couldn't work out who owns the req, it leaves the cell empty rather than guessing. A wrong name costs you a first impression at a company you want, so empty is the right answer more often than it looks. Glance at any `likely:` profile before messaging.

**Your columns stay yours.** The skill never writes Link to Resume, Application Date, Outcome, or Fit Notes.

Expect the first week to be mediocre. Three or four weeks of notes is where it gets good.

---

## Your profile is a file you can edit

Onboarding writes `job-profile.md` in your job-search folder and tells you where it is. Open it and change anything; every run reads it fresh. It holds:

- your target roles, companies, industries, location, and comp rules
- your hard filters and red flags
- your differentiators
- a **Decision Log** of every change, with the reason and what you turned down

If the search is returning junk, the fix is usually one line in that file, and you don't need to wait for review day. You can also just tell it: "stop showing me agency roles," "raise my comp floor to $210K."

---

## Privacy

Your profile, resume materials, and tracker stay in your own folder or your own Google account. The skill doesn't send your data anywhere else. It runs in your own browser session, at human pace, and stops at rate limits or verification walls instead of pushing through them.

---

## License

MIT. See [LICENSE](LICENSE).
