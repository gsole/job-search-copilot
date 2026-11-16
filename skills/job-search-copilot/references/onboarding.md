# Onboarding (first run)

Goal: by the end, the user has a `job-profile.md` they recognize as true, a tracker, their materials in one place, and has seen the search score a few real roles the way they would. Expect this to take 20 to 40 minutes of their time. Tell them that up front, and tell them they can stop and resume.

## How to interview

- **Ask in rounds, not one wall of questions.** Three to six questions per round, grouped by topic. Wait for answers before moving on.
- **Offer a menu, then let them talk.** People answer "what's your ideal company stage?" badly in the abstract. They answer well when you offer options ("Seed / Series A / B-C / late-stage / public / PE-backed, pick all that apply") and then ask "anything you've learned the hard way about this?"
- **Draft from their resume first.** Once you have the resume, propose answers ("Your last two roles were Series B SaaS at under 200 people. Is that the target, or are you trying to move?") rather than asking from zero. Confirming is faster than inventing.
- **Separate dealbreakers from preferences.** For every constraint, ask: is this a hard no, or a strong preference? Hard nos become filters. Preferences become score adjustments. Mixing them up is the most common way a profile goes wrong.
- **Push on vague answers once.** "Senior role" or "good culture" can't be scored. Ask what it looks like in a job posting. If they still can't say, record it as an open question and move on.
- If your platform supports multiple-choice question widgets, use them for the menu questions.

## Round 0: Setup (2 min)

1. Run the platform check from SKILL.md Step 0 and tell them what will and won't work here.
2. Ask where to keep their job-search folder. Create the layout from SKILL.md Step 1.
3. Ask how they want tailored resumes delivered: Google Doc (needs a Google Drive connection), Word file, or Markdown/PDF. Record it.

## Round 1: Materials

Ask for:
- Their current resume (file or paste). Required.
- Their LinkedIn profile URL. Optional.
- Past cover letters or tailored resumes they were happy with. Optional but valuable: these show their voice and which framings they already use.
- Any longer write-up of recent work (projects, metrics, a brag doc, performance reviews). Optional. Many people's best evidence never made it onto the resume.

Save everything into `materials/`. Read it all before Round 2 so later questions can be specific.

## Round 2: The work they want

- Target titles. Offer 6 to 10 drawn from their resume plus adjacent ones, and ask them to keep, cut, and add.
- Level: the lowest title they'd accept, and whether senior individual-contributor roles count (Principal, Staff, Lead) or they need to manage people.
- The kind of mandate. Ask: "Are you happiest building something that doesn't exist yet, fixing something broken, or running and scaling something that works?" This becomes the role-type test in `scoring.md`, and it's often the single sharpest filter.
- Functions or role families that look adjacent but they *don't* want (for example: "I can do RevOps but I don't want it", "no pure people-management roles", "no quota"). These become caps or exclusions.

## Round 3: The companies they want

- Stage and funding (menu).
- Company size band, and whether any size has gone badly for them before.
- Industries in two tiers: **Tier 1** is where they have real credibility a resume screen can see (their lived domain). **Tier 2** is adjacent and acceptable. Then **avoid**: industries that are a hard no.
- Company type rules (for example: "must be AI-native", "B2B software only", "no agencies or consultancies").

## Round 4: Logistics and money

- Location. Get precise: remote OK? Which cities for hybrid or on-site, and does a city mean the city proper or the metro area? Any countries? Be concrete because "remote" postings often hide office requirements.
- Travel ceiling (as a percentage).
- Compensation floor, and whether that's base salary or total compensation. Ask how to treat a posted range: midpoint or top? (Recommend midpoint; ranges that span several levels usually hire in the middle.)
- Work authorization: which countries can they work in without sponsorship? This only goes in their own profile file, to filter postings.

## Round 5: Dealbreakers and red flags

Offer this menu and ask which apply, then ask for any of their own:
- Personal sales quota or commission-heavy pay
- Requires a background they don't have (engineering degree, specific certification, top-tier consulting)
- Experience requirement that tops out below their level ("3 to 5 years")
- "Supporting" roles that assist an owner rather than own something
- Role that's mostly running an existing machine at volume rather than building
- Large public companies, or companies above some headcount
- Recruiter or aggregator listings that hide the employer
- Anything else they've been burned by

## Round 6: Differentiators

From their materials, draft 5 to 8 things that make them stand out (domain credibility, a quantified win, a rare skill combination, awards, citizenship or languages). Show the list and ask them to correct it. These get matched against postings in scoring and fuel resume tailoring.

## Draft, review, confirm

1. Write `job-profile.md` using `profile-template.md`. Mark it `Status: draft`.
2. Show the user a short summary (not the whole file): target roles, top three filters, comp and location rules, Tier 1 industries, and the dealbreakers. Ask what's wrong.
3. Apply corrections. Add a first Decision Log entry: "Profile created from onboarding interview, [date]."

## Set up the tracker

This is the user's choice. Read `tracker-setup.md`, show them the three options (Google Sheet with Apps Script, Google Sheet via a connector, local spreadsheet file) with the trade-offs, and let them pick. Don't pre-select one for them. If they choose Apps Script, walk them through the guided setup in that file step by step. Whatever they pick, finish with a test write and read before moving on.

## Test it (this is what makes the profile real)

Don't skip this. A profile that hasn't been checked against real postings is a guess.

**Test 1: Calibration with their own examples.** Ask for 3 to 5 job postings they've already seen: at least one they loved and one they'd never apply to. Score each with `scoring.md` and show the score, the rule that drove it, and the fit reasoning. Ask: "Does each score match your gut?" Every mismatch is a profile bug. Find which rule caused it, fix the rule (not the score), and log the fix.

**Test 2: A small live search** (only if a browser is available). Run two of the daily searches, score the top ten results, and show the shortlist and the near-misses with the rule that caught each. Ask what's missing and what shouldn't be there. Adjust.

**Test 3: Tailor once.** Have them pick one role from the tests and produce a tailored resume and cover letter with `resume-tailoring.md`. This checks that their materials are good enough and surfaces gaps they may want to fill in `materials/` now.

When the tests feel right to the user, change the profile to `Status: active`.

## Make it run on its own

Offer to schedule the daily search (and the Monday review) if your platform supports scheduled tasks. See `platform-notes.md`. Explain that scheduled runs need the browser available at run time (for example, the desktop app open and Chrome running).

## Close out

Tell them, in a few lines:
- What happens daily and weekly.
- The two things they should do to make it smarter: **write a short reason in Fit Notes when a surfaced role isn't a fit**, and **fill in Application Date and Outcome when they apply**. The weekly review learns from exactly those two columns.
- How to change a rule anytime: just say it ("stop showing me agency roles").
