# Platform notes

The skill is a standard SKILL.md folder, so the same files work in Claude and in OpenAI Codex. What differs is how you install it, where the browser comes from, and how scheduling works. Product details change often: if something below doesn't match what you see, trust the product's current docs and tell the user.

## Claude

- **Install**: in the Claude app, upload the `.skill` file in the skills section of settings, or save it from a skill card in chat. In Claude Code, put the folder in `~/.claude/skills/`.
- **Browser**: the daily search needs the **Claude desktop app** with **Claude in Chrome** (the Chrome extension, which uses the user's own signed-in Chrome) or the desktop app's built-in browser. LinkedIn people search and connection checks need a LinkedIn login, which in practice means Claude in Chrome.
- **Folders**: the desktop app can connect a folder on the user's computer for the `job-search/` workspace.
- **Scheduling**: Claude can create scheduled tasks. Schedule the daily run in the morning in the user's time zone, plus the Monday review. Scheduled runs that need the browser require the computer awake, the desktop app open, and Chrome running.

## OpenAI Codex

- **Install**: put the skill folder in `~/.codex/skills/` (personal) or `.agents/skills/` in a project, then restart Codex. Codex reads the same SKILL.md frontmatter.
- **Browser**: the **Codex app's Chrome extension** lets Codex act in the user's signed-in Chrome, in its own tab group. The in-app browser works for public pages but has no logins, so it can't do LinkedIn people search.
- **Workspace**: run Codex in the `job-search/` folder so it can read and write the profile and tracker.
- **Scheduling**: use whatever automation Codex offers in the user's version; otherwise the user starts the run each morning with "run my job search".

## ChatGPT

ChatGPT's earlier "agent mode" has been retired. If the user is in plain ChatGPT, onboarding, scoring pasted postings, and resume tailoring all work, but the browser-driven daily search won't. Point them to Codex or Claude for that part.

## Browser quirks worth knowing (any platform)

- Many job sites block cross-origin requests. Run in-page fetches from a tab already on the target site (a linkedin.com tab for LinkedIn endpoints).
- Long in-page loops can time out the tool call while still running in the page. Start them without awaiting, store progress in a `window` variable, and poll it.
- If a tab stops responding to script calls, open a fresh tab rather than re-navigating the stuck one.
- If returned text gets blocked for containing URLs or tokens, strip long tokens and query strings before returning, or `JSON.stringify` the result.
- Don't trigger alert or confirm dialogs; they freeze browser automation.
