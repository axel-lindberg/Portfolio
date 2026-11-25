# Portfolio redesign spec — Axel Lindberg

Context file for redesigning **axel-lindberg.github.io/Portfolio** (repo `axel-lindberg/Portfolio`, static GitHub Pages site).

The new look is a **minimal, professional, Apple-like dark design**. The site exists to show projects: a short "Hi, I'm Axel" intro, then the projects. There are two page types to build:

1. **Front page** (`index.html`): hero + an even 2-column project grid + contact row.
2. **Project page** (`projects/*.html`): one shared template, designed first for Tape 31 and then applied to every project.

---

## 1. Goals and principles

- **Projects first.** Everything on the front page leads to the projects. **Remove the Skills section entirely** ("What I work with" plus the Languages / Frameworks / AI subsections). Skills show through each project's tech tags.
- **Clean and calm.** Black background, near-white text, grey secondary text. No gradients, glows, emoji, terminal-style `~/paths`, or decorative noise. Colour comes only from the project images.
- **Structured.** Every project card is the same size, two per row, so the grid stays tidy as projects are added.
- **Generous whitespace, large confident type, rounded surfaces**, as on Apple's product pages.
- **No framework needed.** Plain HTML + one shared CSS file (e.g. `css/style.css`) is enough. Font Awesome can be dropped: icons are small inline SVGs.

---

## 2. Design tokens

```css
:root {
  /* Colours */
  --bg:            #000000;  /* page background */
  --surface:       #111113;  /* cards, video frame, next-project card */
  --surface-hover: #1c1c1f;  /* card hover */
  --surface-2:     #1c1c1e;  /* tags, icon buttons, image placeholders, dividers */
  --surface-3:     #2c2c2e;  /* active nav pill, "Latest" badge */
  --nav-bg:        #161618;  /* nav pill container, header tech tags */
  --border:        #1f1f22;  /* card borders */
  --border-2:      #232326;  /* nav container, header tags */
  --border-3:      #2c2c2e;  /* outline buttons (contact row) */
  --border-btn:    #3a3a3c;  /* hero "Get in touch" outline button */
  --divider:       #1c1c1e;  /* section rules */

  --text:          #f5f5f7;  /* primary text */
  --text-2:        #a1a1a6;  /* body/secondary text */
  --text-3:        #86868b;  /* labels, captions, muted */
  --text-tag:      #c7c7cc;  /* tag text */

  /* Type */
  --font: "Inter", system-ui, -apple-system, sans-serif;  /* weights 400/500/600/700 from Google Fonts */

  /* Radii */
  --r-card:   28px;   /* outer card */
  --r-media:  18px;   /* image inside a card (card padding 12px → 28 - 12 ≈ 18) */
  --r-tile:   24px;   /* feature cards, gallery images */
  --r-pill:   999px;

  /* Layout */
  --max-w:    1120px; /* content max width */
  --pad-x:    32px;   /* side padding */
}
body { background: var(--bg); color: var(--text); font-family: var(--font); -webkit-font-smoothing: antialiased; margin: 0; }
a { color: var(--text); text-decoration: none; }
```

### Type scale

| Use | Size / line-height | Weight | Letter-spacing | Colour |
|---|---|---|---|---|
| Front-page hero h1 | 60px / 1.06 | 700 | -0.035em | text; second line `--text-3` |
| Project page h1 | 80px / 1.0 | 700 | -0.04em | text |
| Section heading (h2) | 28px | 600 | -0.02em | text |
| Card title (h3) | 26px | 600 | -0.02em | text |
| Feature/role heading | 19px | 600 | — | text |
| Lead paragraph (project overview) | 24px / 1.45 | 400 | -0.01em | text |
| Project intro paragraph | 21px / 1.45 | 400 | — | text-2 |
| Body (long) | 17–19px / 1.6 | 400 | — | text-2 |
| Body (cards) | 16px / 1.5 | 400 | — | text-2 |
| Hero sub-line | 18px / 1.5 | 400 | — | text-2 |
| Nav, buttons | 14–15px | 500–600 | — | — |
| Labels / captions | 13px | 500 | — | text-3 |
| Tags | 12px (cards) / 13px (project header) | 400 | — | text-tag |

---

## 3. Shared components

### Navigation (72px tall, inside the max-width container)
- **Left:** "Axel Lindberg" (14px, 600) linking home. On project pages this becomes a back link: chevron-left icon + "All projects" in `--text-2`.
- **Right:** a segmented **pill nav**. Container: `--nav-bg`, 1px `--border-2`, radius pill, 4px padding, 4px gap. Items: "Projects", "Resume" (the PDF), "Contact" (anchor to `#contact`). Each item has 8px 16px padding and radius pill. The active item has a `--surface-3` background and `--text`; the others use `--text-2`.
- Not sticky. Wraps on narrow screens.

### Buttons
- **Primary:** `--text` background, black text, 14px 24px padding, pill, 15px/600. Used for "Resume" in the hero and "Play on itch.io ↗".
- **Secondary:** transparent, 1px `--border-btn`, same size, 15px/500. Used for "Get in touch" in the hero.
- **Small outline:** 12px 20px padding, 1px `--border-3`, 14px/500. Used for GitHub / LinkedIn / Resume in the contact row.

### Tags (tech chips)
- Pill, 5px 10px padding, `--surface-2` background, 12px, `--text-tag`, 6px gap, wrap.
- On the project-page header: 6px 12px padding, `--nav-bg` background + 1px `--border-2`, 13px.

### Arrow icon button
- 40px circle, `--surface-2` background, holding a 16px stroke icon: a diagonal ↗ (`M5 11L11 5M6 5h5v5`, viewBox 16, stroke 1.6, round caps/joins).
- On card hover it inverts: `--text` background, black icon.

### Contact row (end of every page, `id="contact"`)
- 1px top divider, 56px vertical padding, flex `space-between`, wraps.
- Left: h2 "Get in touch" + email link `axelahus@gmail.com` (17px, `--text-2`).
- Right: small outline buttons GitHub, LinkedIn, Resume.

### Footer
- 0 0 40px padding, flex `space-between`, 13px `--text-3`: "© 2026 Axel Lindberg" … "Stockholm, Sweden".

---

## 4. Front page (`index.html`)

Order: **Nav → Hero → Projects → Contact row → Footer.** Nothing else.

### Hero
- Padding 96px top, 88px bottom. Flex row, `space-between`, `align-items: flex-end`, wraps, 32px gap.
- **Left column** (max-width 660px, vertical stack, 22px gap):
  1. **Headshot** `images/hero-headshot.webp`: 76×76 circle, `object-fit: cover`, `object-position: 50% 30%`. A subtle double ring: `box-shadow: 0 0 0 1px #2c2c2e, 0 0 0 5px #000, 0 0 0 6px #232326`.
  2. **h1:** "Hi, I'm Axel." then a line break and **"I build practical AI tools."** in `--text-3` (two lines, same size).
  3. **Sub-line:** "Full-stack developer and Computer Science student at KTH, Stockholm."
- **Right column:** primary "Resume" (PDF) + secondary "Get in touch" (`mailto:`), side by side, bottom-aligned with the text.

### Projects section (`id="projects"`, 120px bottom padding)
- **Header row:** h2 "Projects" on the left and "4 projects" (14px `--text-3`) on the right, baseline-aligned. 24px padding-bottom, 1px `--divider` bottom border, 32px margin-bottom. Generate the count from the number of cards.
- **Grid:** `display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px;`. **Every card is the same size**, two per row, continuing downward. Order: newest first.

### Project card (the whole card is one `<a>` to the project page)
- `--surface` background, 1px `--border`, radius 28px, **12px padding**, flex column.
- **Image:** 16:10 box, radius 18px, overflow hidden, image `object-fit: cover` (all images are cropped to the same shape on purpose).
- **Body** (padding 22px 16px 16px, column, 10px gap, `flex-grow: 1`):
  1. **Label row:** category label (13px/500 `--text-3`), e.g. "Game jam · 5 days". The newest project also gets a **"Latest" badge** on the right (12px/600, 4px 10px, pill, `--surface-3`).
  2. **Title** (h3).
  3. **One-line description** (16px `--text-2`).
  4. **Bottom row** (`margin-top: auto; padding-top: 14px`): tags on the left, arrow icon button on the right. This pins the bottom rows level across cards.
- **Hover:** background `--surface-hover`, `translateY(-2px)` (0.3s ease); image `scale(1.03)` (0.5s ease); arrow button inverts.

### Card content

| Project | Label | Description | Tags | Image | Link |
|---|---|---|---|---|---|
| Tape 31 (Latest) | Game jam · 5 days | A horror game made in five days for a game jam. | Unity, C#, Game design | `images/tape31.webp` | `projects/tape31.html` |
| AI Calorie Tracker | Personal project | A personal AI assistant for nutrition tracking. Tell it what you ate — it does the counting. | Python, FastAPI, PostgreSQL, OpenAI API | `images/ai-calorie-tracker.webp` | `projects/ai_calorie_tracker.html` |
| MetroPed | Team project · VR | Improving realism in a metro VR simulation. | C#, Unity, Scrum | `images/metroped.webp` | `projects/metroped.html` |
| Bomberman | Embedded systems | A Bomberman replica running on a DE10-Lite board. | C, RISC-V | `images/bomberman_image1.webp` | `projects/bomberman.html` |

---

## 5. Project page template (designed with Tape 31)

The same nav, contact row and footer as the front page, in the same 1120px container. Section order:

### 5.1 Nav
Back link "‹ All projects" (to `../index.html#projects`) on the left. The pill nav on the right has "Projects" active.

### 5.2 Header (padding 80px 0 48px, column, 22px gap)
1. **Label row:** "Game jam project" (13px/500 `--text-3`) + "Latest" badge.
2. **h1:** project name, 80px.
3. **Intro paragraph:** 21px `--text-2`, max-width 680px.
4. **Row** (`space-between`, wraps): header-style tags on the left, the **primary CTA** on the right (e.g. "Play on itch.io" + ↗ icon). Use "View on GitHub" or similar for other projects, or omit it.

### 5.3 Facts strip (48px margin-bottom)
A 3-column grid with 1px `--divider` top and bottom borders, and 1px left borders between columns. Each cell: 24px vertical padding (24px horizontal on cells 2–3), a 13px `--text-3` label above a 17px/500 value.
Tape 31: **Role** — Game designer & developer · **Team** — 2 developers · **Timeline** — Nov 2026 · 5 days.

### 5.4 Hero media
- Frame: `--surface`, 1px `--border`, radius 28px, 12px padding. Inside it, a `<video controls playsinline preload="metadata" poster="…">` at 16:9, radius 18px, black background.
- 13px centred "Trailer" caption below in `--text-3`.
- Tape 31: `videos/tape31_trailer.mp4`, poster `images/tape31.webp`. Projects without a video use a 16:9 image in the same frame.
- **Re-encode the trailer for the web.** The current file is about 22.5 MB. A 720p H.264 version at CRF ~27 with `+faststart` is about 6.7 MB for 44 s:
  `ffmpeg -i tape31_trailer.mp4 -vf scale=-2:720 -c:v libx264 -preset veryfast -crf 27 -c:a aac -b:a 96k -movflags +faststart tape31_trailer_720.mp4`

### 5.5 Overview (120px top padding)
- **Two-column section layout,** used for every text section: `grid-template-columns: minmax(0,1fr) minmax(0,2fr); gap: 32px`. The h2 is on the left and the content on the right.
- Content: one **lead paragraph** (24px, `--text`), then a normal paragraph (19px / 1.6, `--text-2`), 20px apart.
- Tape 31 lead: "Halloween night, 1997. Danny brings his camcorder to the Hollister Mill, sealed since 1952, to film a Halloween special. Something takes him in the dark — and you follow him down."
- Tape 31 body: "Made for the Game Theory Fall Jam, where the theme was FALL. You drop and climb your way down through the mill while the tape keeps rolling, with voiced dialogue, chases and jumpscares along the way."

### 5.6 Feature cards (56px top padding)
- A 3-column equal grid, 24px gap. Each card: `--surface`, 1px `--border`, radius 24px, 28px padding, column with 12px gap.
- Each card: a **40px rounded-square icon tile** (radius 12px, `--surface-2`) holding a 20px stroke icon, then a 19px/600 heading, then a 15px / 1.55 `--text-2` paragraph.
- Tape 31:
  - 🎥 icon (camcorder): **Found-footage horror**: Everything is seen through a VHS camcorder, with tape noise, a REC light and a timestamp.
  - ↓ icon (arrow down): **Parkour downward**: Through an abandoned mill, its offices and the tunnels beneath. Fall too far and you die.
  - ⏱ icon (stopwatch): **Built in 5 days**: Designed, built and shipped during the jam, with an AI-assisted workflow built around Claude Code.
  - (The emoji above only say which icon is meant. Use simple inline stroke SVGs, not emoji.)

### 5.7 My role (120px top padding, same two-column layout)
- On the right, a stack of blocks separated by 1px `--divider` lines (28px padding above and below each line). Each block: a 19px/600 heading and a 17px / 1.6 `--text-2` paragraph. Prose, not bullet lists.
- Tape 31:
  - **Game & story design:** Designed the gameplay, story and horror pacing together with my teammate, and planned how the game should look, sound and feel before we built it.
  - **AI-assisted development:** Claude Code was our main development tool. We wrote the design plans and specs, had Claude Code implement the systems in C# and Unity, then playtested, reviewed and iterated until it played the way we wanted. That is how we shipped a complete game in five days.
  - **Assets & integration:** Found the models, sounds and textures, and built them into the scenes and gameplay.

### 5.8 Gallery (120px top padding)
- h2 "Gallery", then **one full-width 16:9 image**, then a **2-column grid of two 16:9 images** (24px gaps, radius 24px, `object-fit: cover`). This repeats the front page's 2-column rhythm.
- Tape 31: `tape31_screenshot1.webp` (wide), then `tape31_screenshot2.webp` and `tape31_screenshot3.webp`.
- Write descriptive alt text, e.g. "Danny standing in the mill at night, seen through the camcorder", "Dr. Hollister's computer log in a green-lit office", "A brick tunnel corridor beneath the mill".

### 5.9 Next project (padding 120px 0 96px)
- One wide card-link: `--surface`, 1px `--border`, radius 28px, 12px padding (32px on the right), flex row, 28px gap, wraps.
- Contents: a 240px-wide 16:10 thumbnail (radius 18px), then the label "Next project" (13px `--text-3`) above the project name (28px/600), then a **48px white circle** holding a black → arrow on the far right.
- Hover: background `--surface-hover`, thumbnail `scale(1.04)`.
- Order the projects in a loop: Tape 31 → AI Calorie Tracker → MetroPed → Bomberman → Tape 31.

### 5.10 Contact row + footer
The same as the front page.

### Applying the template to the other projects
Reuse the exact structure and pull the content from each existing `projects/*.html` page. Use a video as the hero media where one exists: `videos/AI-Calorie-Tracker-Demo.mp4`, `videos/MetroPed_Part1_The_Station_short.mp4` and `…Part2_Impostor_Rendering_short.mp4` (compress these the same way). Fit each project's existing sections into Overview → Features → My role → Gallery. Drop sections that have no content rather than padding them out.

---

## 6. Responsive behaviour

- Container: `max-width: 1120px; margin: 0 auto; padding: 0 32px` (consider 20px side padding under ~480px).
- At **≤760px**:
  - The project grid, feature grid, gallery grid and two-column text sections all collapse to **one column**.
  - Front-page h1 drops to ~40px; project h1 drops to ~52px.
  - The facts strip stacks (drop the left borders and use top borders instead).
  - The hero buttons wrap below the text; the nav pill wraps under the name if needed.
- Images keep their aspect ratios at every width. No horizontal scrolling.

## 7. Interaction and motion
- Only subtle transitions: 0.3s ease for background and lift, 0.5s ease for image zoom. No scroll-jacking, parallax or entrance animations. Respect `prefers-reduced-motion` by turning off the transforms.
- Every card is a single `<a>`, so the whole card is clickable. Keep a visible `:focus-visible` outline, e.g. `outline: 2px solid #f5f5f7; outline-offset: 4px`.

## 8. Accessibility and quality
- Use semantic `nav`, `header`, `section`, `footer` and `h1`–`h3` in order. Decorative SVGs get `aria-hidden="true"`; every image gets meaningful `alt` text.
- Contrast: `--text-3` (#86868b) on black passes for 13px labels. Don't go darker than that for text.
- Lazy-load gallery and below-the-fold images (`loading="lazy"`) and give images width/height or aspect-ratio boxes to avoid layout shift.
- Keep the existing favicon (`images/favicon.svg`), the page titles, and the resume PDF at `resume/Axel_Lindberg_Resume.pdf`.

## 9. Links
- GitHub: https://github.com/axel-lindberg
- LinkedIn: https://www.linkedin.com/in/axellindberg
- Email: axelahus@gmail.com
- Resume: `resume/Axel_Lindberg_Resume.pdf`
- Tape 31 on itch.io: https://eugenranow.itch.io/tape-31

## 10. Out of scope / remove
- The Skills section and its nav link.
- The old "Let's work together" CTA block (replaced by the compact contact row).
- Terminal-style section labels (`~/skills`, `~/work`) and any colourful accents.
