# Portfolio redesign spec: "keep my layout, add a quiet terminal flavor"

Repo: `axel-lindberg/portfolio` (static HTML/CSS/JS on GitHub Pages: `index.html`, `styles.css`, `projects/*.html`, `projects/projects.css`).
Goal: restyle the existing site with light retro-terminal touches. **Keep the current structure, content, layout, images, animations and responsiveness.** Do not add a framework or build step. Make small, targeted CSS and markup edits.

## 1. What stays exactly as is
- Sticky blurred header, hero with round headshot, About (text, facts, timeline card), Skills (marquee plus skill groups), Projects (featured full-width card plus two cards with image + dark overlay), footer CTA.
- Dark neutral palette: `--bg #111113`, `--surface #18181b`, `--surface-2 #202024`, borders `rgba(255,255,255,.08/.18)`, text colors, radii (10/16/20px), shadows, hover lifts, `prefers-reduced-motion` handling, all breakpoints.
- Headings and body copy stay in **Poppins**, in the normal text color (not accent-colored).
- Font Awesome icons, the project pages' content and the images.

## 2. What changes

### 2.1 Accent color: muted mint instead of blue
In `:root` of `styles.css`:
```css
--accent: #7cc6a6;                      /* was #7c9cff */
--accent-soft: rgba(124, 198, 166, .12); /* was rgba(124,156,255,.12) */
```
- Primary buttons (`.btn-primary`): `background: var(--accent); color: #0c120f;` hover: `filter: brightness(1.08)` (replaces `--accent-strong` / `--accent-strong-hover`; remove those two variables if unused afterwards).
- `.card-tag` border `rgba(124,198,166,.45)`; the "latest project" card should use the gold variant (`.card-tag.award` styling: gold border and text). Keep the star icon.
- Everything else already uses `var(--accent)` / `var(--accent-soft)` (brand dot, eyebrow, timeline dots, skill-group icon tiles, card CTA, focus ring), so it updates automatically. Search the whole repo, including `projects/projects.css` and inline styles, for hard-coded `124, 156, 255`, `#7c9cff`, `#3b63d9`, `#3356c4` and replace them.
- Alternative accents, to be swapped by changing only `--accent` and `--accent-soft`: original blue `#7c9cff`, soft amber `#e6a96b`.

### 2.2 Monospace for "UI chrome"
Add JetBrains Mono (400/500/600) to the existing Google Fonts `<link>` on **every page** (`index.html` and all `projects/*.html`), and add `--mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;` to `:root`.
Apply `font-family: var(--mono)` to:
- `.site-header .brand` (weight 600, 19-20px), `.nav-links a` (14px), `.btn` (14px; primary 600, secondary 500)
- `.eyebrow`, `.hero .location`, `.facts .label`, `.timeline .when` (12px), `.timeline-card h3`
- `.tech-stack li`, `.chips li` (13px), `.card-tag`, `.card-cta` (14px, 600), `.footer-bottom`
Do NOT change: h1/h2/h3/h4 in sections and cards, paragraphs, `.lead`, `.facts .value`.

### 2.3 Terminal-flavored labels (text changes only)
- Section eyebrows, lowercase and not letter-spaced: `~/about`, `~/skills`, `~/work`. Style: mono, 14px, weight 500, `text-transform: none`, `letter-spacing: 0`, accent color.
- Hero eyebrow: `$ Full-Stack Developer · M.Sc. Student at KTH`, with the `$` in `var(--text-subtle)`, rest in accent, same mono style.
- Facts labels: `based_in`, `studying`, `languages` (replacing "Based in", "Studying", "Languages").
- Hero heading: `Hi, I'm <span>Axel</span><span class="cursor" aria-hidden="true">_</span>`. `.cursor` is `color: var(--gold); font-weight: 400;`. Optional: a slow blink (`animation: blink 1.1s steps(1) infinite`), disabled under `prefers-reduced-motion: reduce`.
- Skill-chip, tech-stack and similar pill text stays as is (content), only the font changes.

### 2.4 Things to explicitly NOT add
No bright cyan/mint line under the header, no dot-grid background, no fake terminal window, no mint or colored headings, no amber-filled buttons, no heavier borders, no glow effects. The goal is a quiet nod to the terminal, not a theme.

## 3. Project pages
Read `projects/projects.css` and the three project pages. Apply the same token change (accent), the JetBrains Mono link, and the monospace rule for the same kinds of elements (back link, tags, meta labels, buttons). Keep their layouts.

## 4. Accessibility and quality checks
- Contrast: accent on `#111113` is about 9:1; button text `#0c120f` on `#7cc6a6` also passes. Keep muted text at 4.5:1 or better.
- Keep `:focus-visible` outline (uses `--accent`).
- Keep the nav active-link highlight, marquee and mobile header behavior working.

## 5. Verify before finishing
Serve the site locally (for example `python3 -m http.server`) and check `index.html` and each project page at 1280px and 390px wide: no horizontal scroll, mono text wraps cleanly, header wraps as before, image cards look right. Then summarize the files changed.

## 6. Prompt to paste into Claude Code
> Read `portfolio-redesign-spec.md` and apply it to this repo. Keep the existing layout and content; only change what the spec says (muted mint accent, JetBrains Mono for UI chrome, the terminal-style labels, and the gold `_` cursor). Update `styles.css`, `index.html` and the project pages/`projects.css`. Don't add dependencies. When done, run a local server, check desktop and mobile widths, and list the changes.
