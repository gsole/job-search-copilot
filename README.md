# Job Search Copilot

An AI agent skill that runs your job search the way a sharp chief of staff would. It learns what you actually want, searches for it every morning, scores every role honestly, tailors your resume to the ones worth applying to, and gets smarter from your feedback each week.

Built by [Gemma Sole](https://gemmaksole.com) from the system she uses for her own search.

## What it does

- **Onboarding interview.** The first time you use it, it interviews you in short rounds (target roles, companies, location, comp, dealbreakers, what makes you stand out) and builds your **Ideal Employer Profile**: a plain-text file you own and can edit.
- **Daily shortlist.** It searches LinkedIn and company job boards (Ashby, Greenhouse, Lever) in your browser, checks that each role is live and really matches your location rules, scores it 1 to 10 against your profile, and logs new matches to your tracker. It also finds the likely hiring manager and recruiter for the strongest roles.
- **Resume and cover letter tailoring.** Give it a job description and it picks the 10 qualifications that matter, maps your real experience to them, calls out gaps honestly, and rewrites your bullets in the XYZ format ("Accomplished X as measured by Y by doing Z"). It never invents qualifications.
- **Weekly review.** It marks expired roles, reads your "not a fit" notes and application outcomes, and suggests specific changes to your profile with the evidence behind each one. You decide what changes. A decision log keeps it from re-suggesting things you already turned down.

## What you need

The daily search drives your web browser, so you need one of these:

- **Claude desktop app** with **Claude in Chrome**, or
- **OpenAI Codex app** with the **Codex Chrome extension**

A browser signed in to LinkedIn gives the best results. Without a browser, onboarding, scoring postings you paste in, resume tailoring, and the profile review all still work.

## Install

### Claude (desktop or web app)

1. Download `job-search-copilot.skill` from the [latest release](../../releases/latest).
2. In the Claude app, open the skills section of settings and upload the file.
3. Start a chat and say: **"Set up my job search."**

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

## Your tracker

During onboarding you choose where roles get logged:

- **Google Sheet + Apps Script**: most reliable. About 10 minutes of one-time setup; the agent walks you through it and the script is included (`assets/tracker-apps-script.gs`).
- **Google Sheet via a connector**: if your agent already has a working Google Sheets connection.
- **A local spreadsheet file**: fastest start, opens in Excel, Numbers, or Sheets.

## Make it smarter

Two habits do most of the work:

1. When a surfaced role isn't right, write a few words in the **Fit Notes** column saying why.
2. When you apply, fill in **Application Date** and, later, **Outcome**.

The weekly review learns from exactly those columns.

## Privacy

Your profile, resume, and tracker stay in your own folder or Google account. Nothing in this skill sends your data anywhere else. If you use the Apps Script option, treat its URL and secret like a password.

## License

MIT. See [LICENSE](LICENSE).
