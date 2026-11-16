# job-profile.md template

Create the user's `job-profile.md` with these sections. Keep every rule concrete enough to apply to a posting: a rule you can't test against job-description text isn't a rule yet. Record the date beside every rule you add or change, so later reviews can tell old rules from new ones.

After the template there is a short worked example for a fictional candidate. Use it to calibrate the level of specificity, not as defaults.

---

```markdown
# Job Search Profile: [Name]
Status: draft | active
Last updated: [date]

## Setup
- Workspace folder: [path]
- Tracker: [tracker.csv path | Google Sheet URL]
- Resume delivery format: [Google Doc | Word | Markdown/PDF]
- Daily run: [time + timezone, or "manual"]
- Writing style notes: [anything beyond the defaults, e.g. "UK spelling", "no first person in bullets"]

## Candidate summary
[3-5 lines: current/last role, years of experience, functional strengths, what they're moving toward.]

## Target roles
- Titles: [list]
- Minimum level: [e.g. Director, or Senior Manager at companies under 200 people]
- Senior IC roles: [accepted / not accepted; which title markers count, e.g. Principal, Staff, Lead]
- Demoted or adjacent (scored but capped): [e.g. "pure RevOps, cap at 6"]

## Role type (the mandate test)
- Wants: [build / fix / run-and-scale, in the user's words]
- Language that signals a fit: [e.g. "stand up", "first hire", "0 to 1", "architect"]
- Language that signals a miss: [e.g. "take ownership of our existing", "drive continuous improvement", volume targets]
- Cap for a miss: [e.g. "roles that are mostly run-at-volume cap at 6/10"]

## Companies
- Stage: [list]
- Funding floor: [e.g. $15M+ raised, or profitable / PE-backed]
- Headcount: [bands, with any bonus or cap per band]
- Company type rules: [e.g. "AI-forward product, not a legacy tool with one AI feature"]

## Industries
- Tier 1 (lived domain, score bonus +[N]): [list, with a one-line test of what does and doesn't count]
- Tier 2 (acceptable, no bonus): [list]
- Avoid (excluded): [list]

## Location
- Remote: [OK / not OK; any country limits]
- Hybrid or on-site: [cities, and whether city proper or metro]
- Travel ceiling: [%]
- Work authorization: [countries; whether sponsorship is needed]

## Compensation
- Floor: [amount + currency] measured as [base | total comp | either]
- Posted ranges: judge against [midpoint | top]
- Unlisted comp: [allowed if strong funding signal | -1 | exclude]

## Hard filters (remove the role entirely)
- [One line each. Example: "Personal sales quota or commission-weighted OTE."]

## Red flags (remove unless the posting offers an alternative path)
- [Example: "Requires engineering background as a must-have. Apply the OR-branch test."]

## Differentiators (match against postings; feed resume tailoring)
- [5-8 lines, each traceable to materials/]

## Scoring adjustments
- [+N or -N, with the trigger. Example: "+1 if headcount under 300"]
- Shortlist threshold: [e.g. 6/10 and above gets logged]

## Open questions
- [Things the user hasn't decided yet. Raise them when a real posting makes them concrete.]

## Decision Log
Newest first. Every change to this profile goes here with the date, what changed, why (the evidence), and what was offered but declined. Before suggesting a change, check this log so you don't re-suggest something the user already turned down.

- [date]: Profile created from onboarding interview.
```

---

## Worked example (fictional)

```markdown
# Job Search Profile: Dana Reyes
Status: active

## Candidate summary
Operations and GTM leader, 11 years. Co-founded a marketplace startup (COO, exited), then led implementation at a Series C SaaS company. Strong at standing up functions from nothing; bored by steady-state management. Moving toward AI-enabled B2B software.

## Target roles
- Titles: Head of Operations, VP Customer Onboarding, Head of GTM Strategy & Ops, Chief of Staff to CEO, AI Implementation Lead
- Minimum level: Director. Senior Manager acceptable only under 100 employees.
- Senior IC roles: accepted when titled Principal, Staff, or Lead. Bare "Manager" or "Specialist" does not count.
- Demoted: pure Revenue Operations (forecasting, CRM admin, comp plans) caps at 6/10. "I could do it but it's not what I want." (2026-03-02)

## Role type
- Wants: build. "First hire into the function, or rebuilding after a merger."
- Fit signals: "stand up", "build from scratch", "no playbook exists", "unify", "design the operating model"
- Miss signals: "onboard 300+ customers a month", "lead managers who lead specialists", CSAT/SLA as the main scorecard, "enhance our existing"
- Implementation or CS roles cap at 6/10 unless there is an explicit standing-up or unification strand.

## Industries
- Tier 1 (+2): marketplaces and commerce software. Test: does the company build the platform commerce runs on? A consumer brand that sells products doesn't count.
- Tier 2: sales tech, workflow software, AI-native services firms
- Avoid: government, healthcare, pharma, traditional agencies and IT staffing

## Location
- Remote (US): OK. Hybrid or on-site: Chicago city proper only, not suburbs. Travel under 20%.

## Compensation
- Floor $190K, base or total comp. Judge posted ranges at the midpoint.

## Decision Log
- 2026-03-16: Excluded growth-marketing roles. Evidence: 3 Fit Notes ("not a marketing role"). Offered a -1 instead; Dana chose exclusion.
- 2026-03-02: Pure RevOps capped at 6 rather than excluded, so it stays visible as a near-miss. Hard exclude was offered and declined.
- 2026-02-23: Profile created from onboarding interview.
```

Notice what makes this work: every rule names its trigger language, the reasons are in the user's own words, and the Decision Log records what was declined as well as what was adopted.
