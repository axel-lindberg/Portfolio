# Add Scout-IQ to the portfolio

Add a new project, **Scout-IQ**, to the portfolio site. It needs two things:

1. A **project card** on the home page in the "Featured projects" grid.
2. A **project page** at `projects/scout-iq.html`.

Match the existing projects exactly: same components, CSS classes, layout and tone as `projects/ai_calorie_tracker.html` and `projects/tape31.html`. Do not invent new styles. Use the AI Calorie Tracker page as the main template, because it is also a personal software project (not a game jam).

---

## 1. Project card (home page)

Place it **first** in the grid. Scout-IQ is now the newest project, so move the **"Latest project"** label from Tape 31 to Scout-IQ.

| Field | Value |
|---|---|
| Image | `images/scout-iq/screenshot.png` (predictions table plus the chat agent) |
| Alt text | Scout-IQ predictions table with the AI agent answering "Who should I captain?" |
| Label | Latest project |
| Title | Scout-IQ |
| Tagline | An ML model and AI agent for Fantasy Premier League |
| Tags | Python, LightGBM, FastAPI, React, OpenAI API |
| Link | View project → `projects/scout-iq.html` |

---

## 2. Project page (`projects/scout-iq.html`)

### Title block
- **Label:** Personal project
- **Title:** Scout-IQ
- **Summary (one sentence):** A Fantasy Premier League scout: a LightGBM model predicts every player's points for the next five gameweeks, and an AI agent explains who to captain, pick and transfer.
- **Tags:** Python, LightGBM, Pandas, FastAPI, React, TypeScript, OpenAI API, Claude Code
- **CTA button:** View on GitHub → https://github.com/axel-lindberg/scout-iq

### Metadata
- **Role:** ML & full-stack developer
- **Team:** Solo
- **Timeline:** Oct 2026 – present

### Hero media
Use the main screenshot instead of a demo video (no video exists yet). Same frame/styling as the demo video on the Calorie Tracker page.
- Image: `images/scout-iq/screenshot.png`
- Caption: Predictions and the AI agent

### Overview
Every week, millions of FPL managers have to decide who to captain, who to start and who to transfer, mostly based on gut feeling and recent form. Scout-IQ replaces the guesswork with a model. It predicts expected points for every player for the next five gameweeks, and an AI agent answers questions like *"Who should I captain?"* using those predictions and the official injury news. You can load your own FPL team and get the best starting XI, captain and transfer suggestions.

Three short highlight blurbs (same component as the three feature blurbs on the Calorie Tracker page):

- **Beats the baselines:** Tested walk-forward on the full 2025-26 season. 5.9% lower error than the best baseline, and the model's captain picks score about 0.75 more points per gameweek.
- **No data leakage:** 52 features built only from earlier matches, with a test that proves a match's own result never leaks into its features.
- **Rules enforced in code:** Team selection and transfers are solved by deterministic code, not the LLM, so FPL rules always hold. The agent only explains the result.

### How it works
Five-step numbered flow (same component as the Calorie Tracker page):

1. **Collect data:** three past seasons plus the current season from the official FPL API, about 94,000 player-match rows.
2. **Build features:** 52 rolling stats such as form, minutes, xG, xA, price and opponent strength.
3. **Predict:** LightGBM predicts expected points for every player over the next five gameweeks.
4. **Optimise your team:** load your FPL team and get the best XI, captain and every legal transfer scored over five gameweeks.
5. **Ask the agent:** a GPT agent with tool calling answers questions from the predictions and injury news (RAG).

### My role
Four subsections, same layout as the Calorie Tracker page:

- **Machine learning & evaluation:** Built the data pipeline and the leakage-safe features, trained the LightGBM model and evaluated it walk-forward against baselines, retraining before every gameweek as it would run live. Found and fixed real problems along the way, such as early stopping on the wrong metric and a leak in FPL's own data, and ran an experiment showing that player ownership added nothing to the model.
- **AI agent & RAG:** Built an agent on `gpt-4o-mini` with tools that fetch predictions, compare players, search official injury news with embeddings and analyse your team. Every claim has to come from a tool result.
- **Team optimiser:** Wrote the logic that picks the best XI and captain and scores every legal transfer over the next five gameweeks in about 0.4 seconds, plus a planner for the next five gameweeks and a fixture-difficulty view built from the model's own xG data.
- **Backend & frontend:** FastAPI backend and a React + TypeScript frontend (Vite, TanStack Query, Tailwind). The TypeScript types are generated from the API schema, and a test fails if they get out of sync.

### Gallery
Use the same gallery component as Tape 31 (thumbnail strip + one large viewer, counter "1 / 4"):

1. `images/scout-iq/my_team.png` (caption: My team: the squad on the pitch with predicted points per player)
2. `images/scout-iq/my_team_transfers.png` (caption: Transfer suggestions with the points gain per gameweek)
3. `images/scout-iq/fixtures.png` (caption: Fixture difficulty for every team's next five gameweeks)
4. `images/scout-iq/mae_per_gw.png` (caption: Prediction error per gameweek, model vs baselines)

### Next project
Card linking to **Tape 31** (`projects/tape31.html`), since Scout-IQ comes before it in the grid. Also update the last project's "Next project" link if the chain loops back to the first project, so the order stays consistent.

### Get in touch + footer
Same as all other project pages.

---

## Images

Download these from the scout-iq repo into `images/scout-iq/` (create the folder, and use the same image folder convention the other projects use if it differs):

| Save as | Source |
|---|---|
| `screenshot.png` | https://raw.githubusercontent.com/axel-lindberg/scout-iq/main/docs/screenshot.png |
| `my_team.png` | https://raw.githubusercontent.com/axel-lindberg/scout-iq/main/docs/my_team.png |
| `my_team_transfers.png` | https://raw.githubusercontent.com/axel-lindberg/scout-iq/main/docs/my_team_transfers.png |
| `fixtures.png` | https://raw.githubusercontent.com/axel-lindberg/scout-iq/main/docs/fixtures.png |
| `mae_per_gw.png` | https://raw.githubusercontent.com/axel-lindberg/scout-iq/main/results/day2_mae_per_gw.png |

Compress or resize them to match the size of the other projects' images if they are much larger.

---

## Checklist
- [ ] Card added first in the grid; "Latest project" label moved from Tape 31 to Scout-IQ
- [ ] `projects/scout-iq.html` created from the existing project page template
- [ ] Images downloaded to `images/scout-iq/`, with alt text on every image
- [ ] "Next project" links updated so the chain is consistent
- [ ] Check on desktop and mobile widths; no new CSS unless something is genuinely missing
