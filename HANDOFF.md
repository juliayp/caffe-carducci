# Caffè Carducci — handoff

## Project

- Path: `C:\Users\kiril\Documents\ChatGPT\Carducci cafe web-site`
- Stack: Vite 8, React, HTML/CSS/JavaScript; static Italian one-page site.
- Current page order and displayed editorial numbering: Header → Hero → `01 La nostra storia` → `02 I nostri piatti` → `03 Vivi Caffè Carducci` → `04 Dicono di noi` → `05 Gallery` → `06 Nel cuore di Grosseto` → Footer. IDs and section order remain unchanged.
- Brand tokens: blue `#18444B`, gold `#E1B669`, warm white `#FFFAF0`.
- Display serif: Italiana with the global token `--serif-weight: 600` (intentional synthetic weight).
- Official logo is localized at `public/assets/brand/caffe-carducci-logo.png`.
- Heading-like brand references use the full name `Caffè Carducci`; body copy, Corso Carducci addresses, captions, alt text, asset names, and URLs retain their context-specific wording.

## Shared UI

- `.brand-cta--primary`: blue fill/border with warm-white content; hover/focus reverses to warm-white fill with blue content.
- `.brand-cta--underline`: blue text/arrow/underline; hover/focus reverses all three to warm white. Keyboard focus also has a visible outline.
- IntersectionObserver powers `.reveal`; `prefers-reduced-motion` removes reveal transforms, delays, and image zoom.

## Completed sections

### Header and Hero

- Fixed solid-blue header with accessible non-modal `Orari` and `Contatti` popovers. Only one opens at a time; repeat click, outside click/tap, and Escape close it. Escape returns focus to its trigger; triggers expose `aria-expanded` and `aria-controls`.
- Booking uses an accessible telephone dialog, not a form. Primary action: `tel:+393393673693`.
- The `Chiamaci` action in `Orari` and phone-number action in `Contatti` are semantic inline buttons wired to that same BookingDialog. Opening resets/closes the header popover before the modal appears. Closing the modal, including via Escape, restores the originating popover and focus to the exact inline action; the direct `tel:` actions remain inside BookingDialog, while the Visit phone link is intentionally unchanged.
- Hero is temporarily running a reversible still-photo experiment via `HERO_MEDIA = 'photo'`. The user-supplied cup close-up is rendered as an eager, high-priority `<picture>` with `public/assets/hero/carducci-cup-closeup.webp` and PNG fallback (1672×941); it is decorative because the adjacent hero already carries the brand heading. The video replay control is not rendered in photo mode.
- The original silent video implementation remains intact behind the `video` variant, and `public/assets/hero/hero-carducci.mp4`, `public/assets/hero/hero-carducci.webm`, and `public/assets/hero/poster.webp` were retained unchanged for an easy return to motion.
- At `≤760 px`, the hero wordmark deliberately breaks into the centered lines `CAFFÈ` / `CARDUCCI`. Its fluid size and tighter display tracking keep both complete words inside the safe page width at 390 px and 320 px without clipping or an overflow mask; desktop stays on one line.
- Hero menu CTA opens `https://menu.caffecarducci.com/`.

### 01 La nostra storia

- Warm-white asymmetric editorial section with shared `01` marker and local vertical-cropped interior photograph.
- Assets: `public/assets/story/carducci-interior.webp` with fallback `public/assets/story/carducci-interior.jpg` (943×943).
- The compact semantic quote `“Un luogo da vivere.”` sits in the left copy column after the body. The section has no CTA.

### 02 I nostri piatti

- Unified section replacing the obsolete Moments and MenuPreview drafts.
- Assets: `public/assets/piatti/insalatone.webp` with `insalatone.png` fallback; `public/assets/piatti/cocktail-sera.webp` with `cocktail-sera.jpeg` fallback.
- No watermarked prototype assets remain. The external CTA opens `https://menu.caffecarducci.com/`.
- Cards reveal with a stagger and use restrained inner-image hover scaling; reduced motion remains static.

### 03 Vivi Caffè Carducci

- Asymmetric lifestyle collage with intentional overlap on desktop and unequal-width editorial overlap on mobile. PEOPLE is the prominent lower-left image (50% of the desktop page shell); INTERIOR anchors the upper composition and BAR sits lower-right.
- Assets, each localized as JPEG and optimized WebP: `public/assets/vivi/interior.*`, `public/assets/vivi/drink.*`, `public/assets/vivi/people.*`.
- Captions: `INTERIOR — Dentro Carducci`, `PEOPLE — Insieme`, `BAR — L’aperitivo`. Desktop captions reveal on hover; touch/mobile captions remain visible.
- The closing line is grouped as `Dal primo caffè del mattino` / `all’ultimo aperitivo della sera.` followed by the functional secondary CTA `UN LUOGO DA VIVERE →` to `#recensioni`.
- Reveal sequence is `0 / 150 / 300 ms`; hover zoom is `1.025`; reduced motion disables reveal and zoom.
- Supplied photographs include embedded event graphics/logos as part of the originals. They were not removed or retouched.

### 04 Dicono di noi

- Full-width blue editorial review section with no cards and no autoplay. It uses three user-approved Tripadvisor excerpts only: Adriana A, Ennio M., and Francesca R.
- Gold `★★★★★` is decorative (`aria-hidden="true"`); no individual or overall rating is claimed.
- Accessible manual carousel keeps one review in place and transitions vertically in about 620 ms. Previous/next controls use circular indexing, expose Italian labels, retain keyboard focus, reject rapid repeated activation, and update an atomic polite live region. There is no autoplay; reduced motion switches reviews instantly.
- External CTA opens the official Caffè Carducci Tripadvisor review page in a new tab with `rel="noreferrer"`; its `→` glyph and hover/focus motion are strictly horizontal.

### 05 Gallery

- Warm-white editorial gallery with one native horizontal overflow track. Ten unique photographs use deliberately varied widths, aspect ratios, and offsets; captions remain visible on touch/mobile.
- Desktop interaction preserves genuine `deltaX` trackpad scrolling and translates vertical wheel input only while the track can move in that direction. It also supports pointer-capture mouse/pen drag with a 7 px click-suppression threshold and neighboring-card arrow controls. The single previous/next control group sits in the header's upper-right action zone; the obsolete `Scorri per scoprire →` hint and lower control row were removed. At either horizontal boundary, vertical wheel input continues to the document. Phone/tablet uses native touch overflow and scroll-snap proximity rather than a JS carousel.
- Each photograph is a semantic button opening a native `<dialog>` lightbox. The lightbox has circular previous/next navigation, `01 / 10` counter, changing descriptive alt text, a polite announcement, Escape/backdrop/X close, ArrowLeft/ArrowRight keys, restrained horizontal mobile swipe, native focus trapping, body scroll lock, and focus return to the originating item. Image clicks do not close it; focus stays on a navigation control while the active image changes.
- The established gallery assets are localized 2048×1367 JPEG fallbacks plus optimized WebP: `01-fuori`, `02-barmen`, `03-friends`, `04-aperitivo`, `05-food`, `06-ragazze`, `07-rituale`, `08-boys`, and `09-carducci`. The newly supplied square espresso photograph is localized losslessly as `caffe-espresso.png` plus optimized `caffe-espresso.webp`, both with accurate 1254×1254 metadata.
- `caffe-espresso` is the second narrative item after `Fuori`: `02 — Il rito del caffè`, alt `Tazzina di espresso vista dall’alto accanto a un tovagliolo ricamato Caffè Carducci`, square format with a medium offset. Existing indices shift automatically and all lightbox counters/announcements continue to derive from `GALLERY_ITEMS.length`.
- Six files from the same submission were deliberately not copied because their SHA-256 hashes exactly match localized assets: `fuori.jpeg` → `01-fuori.jpeg`, `barmen.jpeg` → `05-food.jpeg` (the incoming name is misleading), `kok3.jpeg` → `04-aperitivo.jpeg`, `kok2.jpeg` → `07-rituale.jpeg`, `boys.jpeg` → `08-boys.jpeg`, and `noi.jpeg` → `09-carducci.jpeg`. The earlier `g sweet k.jpeg` also remains omitted because it is byte-identical to the used `g koktail.jpeg`. A post-addition hash audit found no duplicate fallback content among the ten gallery items.
- Supplied event graphics/logos remain part of the original photographs and were not retouched.
- The turquoise end card uses the promotional label `Vivi Caffè Carducci` and links to the verified official Instagram URL `https://www.instagram.com/caffecarducci/`; it is not part of the ten-image lightbox count.

### 06 Nel cuore di Grosseto and Footer

- The former green Visit draft was fully replaced by a warm-white editorial location section while preserving `id="dove"` for header/footer anchors.
- The section is structured as three acts: the staggered emotional heading (`NEL CUORE DI GROSSETO` → `Passi da Grosseto?` → `Fermati da Caffè Carducci.`), an asymmetric facade/map composition, and a clean practical-information grid without icon cards.
- The dominant photograph is the user-supplied square facade image, localized as `public/assets/location/caffe-carducci-facade.jpg` (866×866) with optimized WebP at `public/assets/location/caffe-carducci-facade.webp`. It is not Wikimedia material and requires no external attribution. Desktop and mobile retain the full square framing so the illuminated `Caffè Carducci` sign and facade stay legible.
- The map frame initially contains only a local, dependency-free illustrative SVG preview in the Carducci cream/blue/gold palette; there is no iframe and no Google Maps request before explicit consent. `Mostra mappa` explains in its accessible name that loading contacts Google, then mounts the existing titled, lazy iframe in the same frame. `Torna all’anteprima` unmounts it again; focus follows the replacement control and both controls meet the 44 px target minimum. The active iframe has no blocking tint/marker overlay.
- The static preview uses a more distinct cream street network against deeper blue-gray blocks, a stronger gold Corso Carducci, and exact solid brand turquoise `#18444B` for `CENTRO STORICO`, `CORSO CARDUCCI`, and `GROSSETO`; mobile-specific SVG type sizes keep these labels legible without changing the composition or Google opt-in behavior.
- The external `APRI IN GOOGLE MAPS →` CTA remains independent of the opt-in preview and opens the real directions destination for Corso Giosuè Carducci 18 in a new tab with `rel="noreferrer"`.
- Shared `LOCATION`, `HOURS`, and `CONTACT` constants keep the header popovers and this section synchronized. The approved schedule remains exactly `Lun–Sab 07:00–21:00` and `Dom 08:00–20:00`; phone is `+39 339 3673 693` and email is `info@caffecarducci.com`.
- Social links: official Instagram `https://www.instagram.com/caffecarducci/`, Facebook business profile `https://www.facebook.com/124934174240588/`, and WhatsApp `https://wa.me/393393673693`.
- Reveal choreography uses separate wrappers so positional overlap is independent of reveal transforms: marker `0 ms`, question `110 ms`, large serif line `340 ms`, photograph `90 ms`, map `320 ms`, details `160 ms`, and coordinates `280 ms`. Reduced-motion mode removes all related transforms, delays, and photo zoom.
- Desktop uses a large square facade with the map overlapping from the lower right. Mobile preserves the editorial overlap with a contained negative margin, one-column practical grid, and fluid coordinates without horizontal overflow.
- The decorative ending uses the same Italiana display serif system as review quotes (`var(--serif)`, `var(--serif-weight)`, `-0.035em`, `1.02` line-height) for `42.7604° N / 11.1137° E`. It remains restrained at `rgba(24, 68, 75, 0.34)` and is approximately half its previous size: up to `72 px` desktop and about `27 px` at 390 px. The solid small label remains `GROSSETO · TOSCANA · ITALIA`; coordinates are hidden from assistive technology because the meaningful address and location are already present above.
- Only the coordinate tail was compacted: its top padding and the Visit section's bottom padding are approximately halved while the contact grid, map, and their spacing remain unchanged. Chrome QA measured 259 px from the coordinate divider to the footer at 1440 px and 156 px at 390 px.

### Final footer

- The footer uses the solid brand token `var(--carducci-blue)` (`#18444B`) with milk-white content and gold `var(--carducci-gold)` rules/details. A gold top rule introduces the localized official transparent logo at `public/assets/brand/caffe-carducci-logo.png`, followed by the standalone `CAFFÈ CARDUCCI` wordmark line.
- Desktop is an editorial two-column composition: `Un caffè, un pranzo, un aperitivo. Ti aspettiamo.` with booking/social actions on the left, and `Il piacere di stare insieme, nel cuore di Grosseto.` as the larger serif statement on the right. Mobile follows the natural order logo/name → invitation → statement → booking/social actions → legal/navigation.
- `PRENOTA →` is a semantic button wired through `Footer({ onBook })` to the existing application-level `openBooking` callback and shared `BookingDialog`. The dialog behavior is not duplicated; close restores focus to the footer button.
- Footer socials are intentionally limited to the official-page destinations already used in shared data: Instagram `https://www.instagram.com/caffecarducci/` and Facebook `https://www.facebook.com/124934174240588/`. They render as dependency-free inline SVG glyphs in 46×46 px circular hit areas, expose the accessible names `Instagram — Caffè Carducci` / `Facebook — Caffè Carducci`, and open in a new tab with `rel="noreferrer"`. WhatsApp remains available in the Visit section but is not repeated in the footer.
- The compact legal row preserves copyright, `Storia`, `Menu`, `Dove siamo`, `Privacy Policy`, and the email link. Privacy is an honest in-page placeholder (`href="#privacy-policy"`) with `Privacy Policy — in preparazione` in its title/accessibility label; click is prevented so it does not alter the URL or jump. Footer `Menu` points to `#piatti`; all established internal anchors retain existing section IDs.
- The editorial footer content participates in the shared `.reveal` system; the global reduced-motion treatment keeps it immediately visible without transforms or delays.

## Local development and verification

The Codex environment may need its bundled Node directory prepended to `PATH`:

```powershell
$env:PATH='C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
& 'C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'node_modules\vite\bin\vite.js' --configLoader native --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173`.

Production build:

```powershell
$env:PATH='C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
pnpm.cmd run build
```

Last verified 2026-08-12:

- Vite 8.2.1 production build succeeded with 16 modules (`154 ms` in the final run); `git diff --check` passed.
- Gallery desktop QA at 1440×1000: document/section width `1440 = 1440` (no page overflow), gallery track `5797 > 1440`, and the header control moved the track `40 → 694`.
- Gallery mobile QA at 390×844: document/section width `390 = 390`, gallery track `3414 > 390`, and the header control moved the track `18 → 356`.
- Verified coffee card order/index/alt, square 1254×1254 lightbox rendering, `02 / 10`, circular `01 ↔ 10`, rapid navigation stability, retained control focus, Escape/X/backdrop close with opener focus restoration, horizontal swipe without vertical-swipe hijacking, body lock cleanup, and instant reduced-motion behavior.
- Coffee-sequence screenshots: `C:\Users\kiril\.codex\visualizations\2026\08\13\019ffacd-03c5-7160-a6dc-ad2046f0c435\gallery-coffee-second-1440.png` and `gallery-coffee-second-390.png` in the same folder.
- The local development URL `http://127.0.0.1:4173` returned HTTP 200 at handoff time.

Location-section verification 2026-08-13:

- Vite 8.2.1 production build succeeded with 16 modules; `git diff --check` passed.
- Chrome Headless visual QA covered 1440×1000, 768×900, 390×844, and 320×800. At every size `document.scrollWidth`, `section.scrollWidth`, and viewport width were identical, including a check with the body's overflow mask temporarily removed.
- The localized facade completed at its correct intrinsic 866×866 size in every viewport; the square crop preserved the full sign and facade on desktop, tablet, and mobile.
- The location map now requires an explicit local-preview opt-in before its iframe can load; QA should confirm `0 → 1 → 0` iframe instances across preview, `Mostra mappa`, and `Torna all’anteprima`. Its title remains `Mappa interattiva del Caffè Carducci a Grosseto`, and every new-tab link in the section exposes `rel="noreferrer"`.
- Opt-in QA on 2026-08-13 confirmed `0 → 1 → 0` iframe instances and `0 → 1` Google Maps requests at 1440, 390, and 320 px. Focus moved to each replacement control, and scroll widths remained exactly equal to their 1440/390/320 px viewports after removing both body and document overflow masks. Real section-06 screenshots capture the facade/map overlap at 1440 and 390 px.
- Final 1440/390 QA of the contrast revision confirmed all three preview labels compute to `rgb(24, 68, 75)`, mobile label sizes rise to 16/13/20 px in SVG coordinates, the minor streets use milk-white against `rgb(223, 223, 210)`, and the gold route is visibly stronger. Initial iframe and Google Maps request counts remain zero; no viewport/Visit overflow was introduced.
- Header QA at 1440 and 390 covered keyboard activation from `Chiamaci`, pointer activation from the contact phone, Escape and close-button modal paths, initial focus on the dialog phone link, deterministic focus return to the exact originating inline action, and final `aria-expanded="false"` reset after closing the restored popover. Reviews QA confirmed the literal `→` and computed hover transform `matrix(1, 0, 0, 1, 3, 0)`.
- Reveal-visible screenshots confirmed the asymmetric photo/map overlap, four-column desktop details, two-column tablet details, single-column mobile details, and unclipped coordinates down to 320 px.

Numbering and gallery-control verification 2026-08-13:

- Editorial markers are sequential in DOM/page order: `01`, `02`, `03`, `04`, `05`, `06`.
- Chrome Headless QA at 1440×1000 and 390×844 found one gallery control group, exactly two buttons, no gallery hint, no title/control overlap, and no page or section overflow after temporarily removing the body overflow mask.
- With ten photographs, at 1440 px the next button moved the track from `40` to `694`; at 390 px it moved `18 → 356`. Track dimensions are now `5797 > 1440` and `3414 > 390` respectively.
- Final gallery screenshots: `C:\Users\kiril\.codex\visualizations\2026\08\13\019ffacd-03c5-7160-a6dc-ad2046f0c435\gallery-controls-1440.png` and `gallery-controls-390.png` in the same folder.

Footer verification 2026-08-13:

- Chrome Headless QA at 1440×1000 and 390×844 confirmed the computed footer background `rgb(24, 68, 75)`, exact social URLs/targets/`noreferrer`, working internal targets, and equal viewport/document/footer widths even with the body's overflow mask removed.
- At both sizes the footer booking button opened the existing dialog, initial dialog focus moved to the phone link, and closing restored focus to the footer button. The `Dove siamo` link produced `#dove` and its target existed.
- Computed coordinate typography was Italiana at weight `600`, `72 px` desktop / `26.91 px` mobile, with `rgba(24, 68, 75, 0.34)` color.
- Final focused screenshots: `C:\Users\kiril\.codex\visualizations\2026\08\13\019ffacd-03c5-7160-a6dc-ad2046f0c435\footer-final-1440-crop.png` and `footer-final-390-crop.png` in the same folder. Full-page versions are retained alongside them.

Footer social/privacy verification 2026-08-13:

- Chrome Headless QA at 1440×1000 and 390×844 found exactly two footer social anchors with no visible text, one inline SVG each, and `aria-hidden="true"` on both SVGs. Accessible names, official URLs, `_blank`, and `noreferrer` matched the footer contract exactly.
- Both circular social links measured 46×46 px. Keyboard traversal reached booking → Instagram → Facebook in order; the social focus ring computed as a solid 2 px gold outline.
- Legal order is `Storia`, `Menu`, `Dove siamo`, `Privacy Policy`. The privacy placeholder immediately follows `Dove siamo`, exposes the preparation status, and its click left the full URL/hash unchanged.
- Document/footer widths matched 1440/390 viewports with the body overflow mask removed. Final screenshots: `C:\Users\kiril\.codex\visualizations\2026\08\13\019ffacd-03c5-7160-a6dc-ad2046f0c435\footer-social-icons-1440.png` and `footer-social-icons-390.png`.

## Repository state and next work

- No commit has been created. Source and assets remain uncommitted/untracked as appropriate for the current empty-origin worktree.
- All used media assets are localized; the site does not hotlink supplied photography.
- The editorial sequence and `06 Nel cuore di Grosseto` are complete; ask the user which section to refine next rather than changing existing section IDs or order without a new brief.
