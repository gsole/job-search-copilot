# Weekly review (Mondays, or on request)

Two parts: housekeeping (which tracked roles have closed) and learning (what the user's notes and outcomes say about the profile). The learning half is what makes this get better over time, so give it real attention.

## Part A: Expired check

1. For every tracked row not already marked Expired = Yes (and whose Expired cell isn't the user's own free-text note), open the posting.
2. **Expired** if: HTTP 404, or the page says "No longer accepting applications", "no longer available", "Job not found", "this job was removed", or redirects to a general careers board. Match case-insensitively on the visible text.
3. **Active** only on positive evidence: a real posting body *and* a live apply control. Don't infer "active" from a page simply loading or being long; closed LinkedIn postings still return plenty of boilerplate.
4. **Ambiguous** (login wall, bot check, empty render): retry once, then leave it and list it under "check manually".
5. Write Yes/No to the Expired column only where it changed or was blank (for Apps Script, use `setExpired`; see `tracker-setup.md`).
6. Report: N checked, N newly expired (list them), N active, N ambiguous. Always state the ambiguous count, even when it's zero; a run with no ambiguous rows at all is more likely a broken check than a perfect tracker. Spot-check two or three results by eye once per run.

## Part B: Learn from outcomes (the higher-signal half)

Outcomes reflect what employers actually did, which beats any rule written in advance.

1. Collect rows with an Application Date and an Outcome. Classify each: **advanced** (screen, next round, offer), **rejected** (declined, no response after a reasonable wait), or **pending**.
2. For resolved rows, compare advanced vs rejected across: industry tier, headcount band, fit score, role family, level, comp band, and whether the user made direct contact (a referral or outreach) before or during applying.
3. **Always give the denominator.** "2 of 3 Tier 1 applications advanced" is a different claim from "2 of 30". With small numbers, say the pattern is directional.
4. **Check whether the fit score predicts anything.** Compare the mean score of advanced vs rejected rows. If they're within about half a point, say plainly that the score isn't discriminating and propose a reweighting.
5. Be clear about what the data can't show: fast automated rejections tell you about screening, not interview performance.

## Part C: Learn from Fit Notes

1. Collect every row where the user wrote a "not a fit" reason.
2. Group them: same industry, company size, comp structure, level, mandate type ("actually a run role"), location nuance, background requirement, anything the profile doesn't yet capture.
3. Also look for execution misses: roles the profile *should* have excluded but didn't (wrong location, already closed when they clicked). Those point to verification steps, not new rules.

## Part D: Suggest profile changes

For each suggestion:
- **Change**: the specific edit, phrased against a profile section ("Add 'growth marketing roles' to Hard filters").
- **Evidence**: the notes or outcomes behind it (Company: note excerpt, or the outcome pattern with its denominator).
- **Options**: where it's a judgment call, offer two or three strengths (exclude / cap / score penalty), since the user often wants visibility on a category without it taking shortlist slots.

Only suggest a change supported by two or more notes, one note that states a clear hard rule, or an outcome pattern with a stated denominator. If the evidence is thin, say so instead of inventing a pattern.

**Check the Decision Log first.** Don't re-suggest something the user already declined, unless there's new evidence, and say so if there is.

**Don't change the profile in this step.** Present suggestions; the user picks.

## The Decision Log

When the user adopts, rejects, or modifies a suggestion, or asks for any rule change directly:
1. Edit the relevant section of `job-profile.md`, with the date beside the rule.
2. Add a Decision Log entry: date, what changed, the evidence, and **what was offered but declined**. The declined options are what stop future reviews from going in circles.
3. If a change reverses an earlier rule, mark the old entry as superseded rather than deleting it, so the history stays readable.

Over time, also note which strict rules are catching otherwise-strong roles, so the user can see what each rule costs and reverse it on evidence.
