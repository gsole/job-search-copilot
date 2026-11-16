---
name: job-search-copilot
description: Personal job-search agent. First run interviews the user to build their Ideal Employer Profile, then it searches LinkedIn and job boards in their browser daily, scores roles, logs matches to a tracker, tailors resumes and cover letters (XYZ bullets), and reviews outcomes weekly to refine the profile. Use whenever someone wants to find jobs, score a posting, tailor a resume, set up a job tracker, or says set up my job search.
---

# Job Search Copilot

This skill does four jobs for one person:

1. **Onboarding** (first run): interview the user, build their Ideal Employer Profile (IEP), collect their resume materials, set up a tracker, and run a test.
2. **Daily shortlist**: search for new roles, score them against the IEP, log the good ones.
3. **Resume and cover letter tailoring**: rewrite the user's real experience to target a specific job description.
4. **Weekly review**: check which tracked roles have expired, and learn from the user's notes and outcomes to sharpen the IEP over time.

The IEP is the heart of it. Everything else is only as good as that profile, and the profile only gets good by being corrected against real postings. So treat it as a living document the user owns, not a form you fill in once.

## Step 0: Check the platform before anything else

The daily search and the weekly expired check need a **browser the agent can drive, signed in as the user** (LinkedIn search, and most company job boards render with JavaScript and can't be read with a plain web fetch). Onboarding, scoring a pasted posting, resume tailoring, and the profile review do *not* need a browser.

Look at the tools you actually have:

- **Claude**: browser tools named like `claude-in-chrome`, or the built-in browser in the Claude desktop app. Folder access comes from the desktop app.
- **OpenAI Codex**: the Codex app's Chrome extension (signed-in Chrome) or its in-app browser.
- **Anything else**: any tool that can open a URL, read the rendered page, and run JavaScript on it.

If no browser tool is present, say so plainly in the first reply, then keep going with everything that doesn't need one:

> Heads up: the daily job search needs an agent that can drive your web browser. That means the **Claude desktop app with Claude in Chrome**, or the **OpenAI Codex app with its Chrome extension**. A plain chat window can't run it. I can still do your onboarding, build your profile, score postings you paste in, and tailor your resume right here. When you're on one of those, ask me to "run my job search" and I'll pick up from your profile.

Read `references/platform-notes.md` for the specifics of each platform (installing the skill, scheduling a daily run, browser quirks).

## Step 1: Find the user's workspace and decide the mode

The user's state lives in a folder they own, not in this skill. Look for a folder containing `job-profile.md` (check the current working folder, any connected folders, and ask if you can't find one). The expected layout:

```
job-search/
├── job-profile.md        # the IEP + decision log + preferences (created in onboarding)
├── tracker.csv           # or a Google Sheet; the user's choice, recorded in job-profile.md
├── materials/            # base resume, past cover letters, extra context docs
└── applications/         # tailored resumes and cover letters, one subfolder per role
```

Then route:

| Situation | Do this | Read |
|---|---|---|
| No `job-profile.md` exists, or the user says "set up", "get started", "onboard me" | Onboarding | `references/onboarding.md` |
| "Run my search", "find me jobs", "daily shortlist", a scheduled run | Daily shortlist | `references/daily-search.md` + `references/scoring.md` |
| User pastes a job link or description and asks if it's a fit | Score one role (and offer to log it) | `references/scoring.md` |
| User shares a job description and wants a resume or cover letter | Tailor | `references/resume-tailoring.md` |
| Monday scheduled run, or "review my search", "what's working", "update my profile" | Weekly review | `references/weekly-review.md` |
| User wants to change a rule ("stop showing me X", "raise my comp floor") | Edit `job-profile.md`, log it in the Decision Log | `references/weekly-review.md` (decision log section) |

If onboarding was started but not finished (the profile file has a `Status: draft` line), resume where it stopped rather than starting over.

## Rules that apply in every mode

**Never invent qualifications.** Every claim about the user, in a resume, cover letter, or fit reasoning, must trace back to their materials or something they told you. If a role needs something they don't have, say so as a gap. A tailored resume that gets someone an interview they can't back up is worse than no interview.

**The profile is theirs.** Don't quietly change the IEP based on your own judgment. Propose changes with evidence, let the user choose, then record the choice and the reason in the Decision Log so future runs don't re-litigate it. This is what makes the search get better over time instead of drifting.

**Be honest about fit.** If a role the user loves scores a 5, say which rule held it down and whether the rule actually fired (re-read the posting). If a role they sent in manually is a poor fit, say so. Flattering scores waste their applications.

**Show your exclusions.** When a strong-looking role is filtered out by a single hard rule (location, comp floor, a dealbreaker), name it in the run summary. Strict rules have a cost, and the user can only judge that cost if they see what's being caught.

**Never write the user's own fields.** In the tracker, the agent fills discovery columns. Application Date, Outcome, Fit Notes, and anything the user types are theirs. Read them, never overwrite them.

**Writing style for anything written as the user** (resumes, cover letters, outreach): direct, specific, no filler, no em dashes, no "it's not just X, it's Y" constructions, varied sentence length. Apply any style notes recorded in `job-profile.md` on top of this.

## Files in this skill

- `references/onboarding.md`: the first-run interview, tracker setup, and test run
- `references/profile-template.md`: the IEP structure, with a worked example
- `references/scoring.md`: how to score a role, including the reusable fit tests
- `references/daily-search.md`: the search, verify, dedup, log, and report loop
- `references/resume-tailoring.md`: the resume and cover letter method (XYZ bullets)
- `references/weekly-review.md`: expired check, outcome analysis, profile suggestions, decision log
- `references/tracker-setup.md`: the three tracker options (user chooses) and the guided Google Sheet + Apps Script setup
- `references/platform-notes.md`: Claude vs Codex setup, scheduling, browser quirks
- `assets/tracker-template.csv`: tracker columns
- `assets/tracker-apps-script.gs`: the Apps Script web app for the Google Sheet option
