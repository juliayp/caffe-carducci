# Caffè Carducci — HANDOFF

Актуальный снимок проекта на 2026-08-14. Начинать следующую сессию с этого файла, затем открыть `src/App.jsx` и `src/styles.css`.

## 1. Текущее состояние

- Проект: статический итальянский one-page сайт Caffè Carducci на Vite 8 + React.
- Папка: `C:\Users\kiril\Documents\ChatGPT\Carducci cafe web-site`.
- Фактический порядок страницы: Header → Hero → `01 La nostra storia` → `02 I nostri piatti` → `03 Vivi Caffè Carducci` → `04 Dicono di noi` → `05 Gallery` → `06 Nel cuore di Grosseto` → Footer. Menu Drawer находится вне document flow рядом с dialogs.
- Основные anchors: `#top`, `#storia`, `#piatti`, `#vivi`, `#recensioni`, `#gallery`, `#dove`.
- Секции пронумерованы последовательно `01–06`; прежний конфликт нумерации исправлен. IDs и порядок сейчас менять не нужно.
- Интерфейс, тексты и доступные имена — на итальянском. Исходники и этот файл сохранены в UTF-8 без mojibake.

## 2. Архитектура и файлы

- `src/App.jsx` — все React-компоненты, shared constants, dialogs и интерактивная логика одной страницы.
- `src/styles.css` — дизайн-токены, общие CTA/focus/reveal rules, секционные композиции и responsive breakpoints `1040 / 760 / 430 px`.
- `src/main.jsx` — React entry point.
- `index.html` — `lang="it"`, базовые description/Open Graph/title. `theme-color` пока остаётся старым `#201813`; проверить на финальном SEO/polish этапе.
- `public/assets/` — все используемые фотографии и логотип локализованы; supplied photography не hotlink-ится.
- `package.json` — только React, React DOM, Vite и `@vitejs/plugin-react`; новых зависимостей для gallery, map, dialogs или icons не добавлено.
- `vite.config.js` — стандартный React plugin, без deployment-specific конфигурации.

## 3. Бренд-система

- Главный turquoise/blue: `--carducci-blue: #18444B`.
- Gold: `--carducci-gold: #E1B669`.
- Milk/warm white: `--white: #FFFAF0`; дополнительные cream/paper оттенки определены в `:root`.
- Display serif: `Italiana`, token `--serif`; глобально утверждён `--serif-weight: 600`. Не возвращать serif headings к `400`.
- Sans: `DM Sans`. Оба шрифта сейчас импортируются из Google Fonts в CSS.
- Header и Footer используют solid `#18444B`, не прозрачный и не espresso.
- `.brand-cta--primary`: blue fill/border + warm-white text; hover/focus — warm-white surface + blue text/arrow.
- `.brand-cta--underline`: blue text/arrow/underline; hover/focus — white treatment. Focus-visible остаётся явным, gold outline.
- Heading-like упоминания бренда используют полное `Caffè Carducci`; не делать массовую замену в body copy, адресе Corso Carducci, captions, alt, URLs или именах файлов.
- Фотографии остаются тёплыми и спокойными, с кремовой/teal направленностью; без агрессивных фильтров.

## 4. Shared data и внешние destinations

Constants вверху `App.jsx` являются источником истины для повторяемых данных:

- Адрес: `Corso Giosuè Carducci, 18`, `58100 Grosseto GR`.
- Часы: `Lun–Sab 07:00–21:00`; `Dom 08:00–20:00`.
- Телефон: display `+39 339 3673 693`, `tel:+393393673693`.
- Email: `info@caffecarducci.com`.
- Menu: `https://menu.caffecarducci.com/`.
- Directions: Google Maps directions URL с destination Corso Giosuè Carducci 18.
- Instagram: `https://www.instagram.com/caffecarducci/`.
- Facebook: `https://www.facebook.com/124934174240588/`.
- WhatsApp: `https://wa.me/393393673693`.
- TripAdvisor: официальный Caffè Carducci review URL в constant `TRIPADVISOR_URL`.

External links открываются в новой вкладке с `rel="noreferrer"`, где это уместно. Не дублировать эти значения секционными строками.

## 5. Header и общий BookingDialog

- Fixed Header: solid blue `#18444B`, локальный gold transparent logo, controls `Orari` и `Contatti`.
- Popovers не modal: только один открыт одновременно; повторный click, outside pointer и Escape закрывают его. Triggers имеют `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`; Escape возвращает focus к trigger.
- Часы в `Orari` берутся из shared `HOURS`, те же значения выводятся в секции 06.
- `Chiamaci` внутри `Orari` и номер телефона внутри `Contatti` — semantic buttons, визуально совпадающие с inline links. Они не вызывают `tel:` напрямую, а открывают единственный shared `BookingDialog` через `Header({ onBook })`.
- Перед открытием BookingDialog активный popover закрывается и его `aria-expanded` становится `false`.
- При закрытии BookingDialog исходный popover повторно открывается, чтобы вернуть focus ровно на `Chiamaci` или nav phone button. Следующий Escape закрывает восстановленный popover и возвращает focus к его top-level trigger.
- BookingDialog — единственный booking modal для Header, Hero и Footer. Он поддерживает native focus trapping, initial focus на phone link, X/Escape/backdrop close и focus restoration к opener.
- Фактические `tel:` links находятся внутри BookingDialog. Телефон в практической части секции 06 намеренно остаётся прямой `tel:` ссылкой.

## 6. Hero

- Фото окончательно выбрано как единственный Hero-media; временного media switch и video branch больше нет.
- User-supplied cup close-up: `public/assets/hero/carducci-cup-closeup.webp` + PNG fallback, `1672×941`. `<picture>` eager/high-priority, декоративный `alt=""`, потому что рядом уже есть полноценный `h1`.
- Desktop title остаётся одной строкой `CAFFÈ CARDUCCI`. При `≤760 px` два span становятся намеренными центрированными строками `CAFFÈ` / `CARDUCCI`; полностью помещаются на 390 и 320 px.
- Все прежние video assets, video poster, video state/effects и media control удалены по окончательному решению пользователя; не восстанавливать без нового прямого запроса.
- На фото работает один локальный teal/espresso gradient overlay для читаемости, без отдельного второго слоя и без агрессивного image filter.
- Hero `PRENOTA` имеет milk-white text/arrow/underline по умолчанию; hover/focus использует milk-white surface с фирменным turquoise `#18444B` и gold focus outline. Это локальный Hero override, остальные CTA не изменены.
- Оба внутренних CTA `Scopri il menu` — в Hero и Piatti — теперь semantic buttons и открывают один shared editorial `MenuDrawer`. Единственный прямой external menu link находится в footer drawer: `APRI IL MENU COMPLETO ↗`, `_blank` + `noreferrer`.
- Drawer: custom `role="dialog"`, `aria-modal="true"`, labelled `IL MENU`; desktop panel `94vw × 92dvh`, milk `#F2EEE7`, teal type, sharp `3px` geometry, overlay `rgba(16,12,10,.68)` + `blur(8px)`. При `≤760 px` становится `100vw × 100dvh` без внешних полей.
- Временный inline `MenuEmbedTest` полностью удалён. Menu iframe монтируется только после открытия drawer, остаётся на время exit transition и размонтируется после закрытия; до клика menu network request из DOM не инициируется.
- Open focus переходит на `CHIUDI ×`; Tab/Shift+Tab удерживаются внутри parent dialog и включают iframe в последовательность. Close button, Escape в parent document и click ровно по overlay запускают 540ms exit; после unmount focus возвращается к конкретному Hero/Piatti opener.
- Body scroll lock хранит и точно восстанавливает прежние inline `overflow`/`padding-right`; rapid state changes отменяют старые frames/timers, поэтому устаревший close callback не размонтирует повторно открытый drawer.
- Branded loading layer `CAFFÈ CARDUCCI / IL MENU STA ARRIVANDO…` скрывается после iframe `onLoad`; reduced-motion использует почти мгновенный exit, без transform movement и бесконечной loader animation.
- BookingDialog остаётся отдельным и его wiring не изменён.

## 7. Редакционные секции 01–04

### 01 — La nostra storia

- Warm-white asymmetric editorial layout, текст + фото интерьера.
- Assets: `story/carducci-interior.webp` + `.jpg`, `943×943`.
- Heading: `Caffè Carducci è un luogo...`; semantic quote: `“Un luogo da vivere.”`; CTA нет.

### 02 — I nostri piatti

- Два асимметричных food/aperitivo visuals и общий external menu CTA.
- Assets: `piatti/insalatone.webp` + `.png` (`1535×1024`), `piatti/cocktail-sera.webp` + `.jpeg` (`524×533`).
- Heading заканчивается `La cucina di Caffè Carducci.`.

### 03 — Vivi Caffè Carducci

- Asymmetric collage: INTERIOR сверху, PEOPLE как главный нижний-left кадр, BAR справа; мобильная версия сохраняет overlap и видимые captions.
- Assets: `vivi/interior.*` и `vivi/people.*` (`2048×1367`), `vivi/drink.*` (`1080×1080`), везде JPEG fallback + WebP.
- Captions: `INTERIOR — Dentro Carducci`, `PEOPLE — Insieme`, `BAR — L’aperitivo`.
- Secondary CTA `UN LUOGO DA VIVERE →` ведёт к `#recensioni`.

### 04 — Dicono di noi

- Blue editorial reviews section без cards и autoplay; три утверждённых excerpt: Adriana A, Ennio M., Francesca R.
- Manual circular carousel: previous/next buttons, counter, polite atomic live region, rapid-click lock, vertical transition; reduced motion переключает мгновенно.
- `★★★★★` декоративны и не заявляют численный rating.
- External CTA ведёт на `TRIPADVISOR_URL`, показывает горизонтальную стрелку `→`; hover/focus двигает её только `translateX(3px)`.

## 8. 05 — Gallery

- Одна native horizontal track, ровно 10 уникальных фотографий. Один circular previous/next control group расположен top-right в header секции; hint `Scorri per scoprire →` и нижний duplicate controls удалены.
- Порядок items и fallback assets:
  1. `01-fuori.jpeg/.webp` — `Fuori`.
  2. `caffe-espresso.png/.webp` — `Il rito del caffè`, square `1254×1254`.
  3. `02-barmen.jpeg/.webp` — `Dietro il banco`.
  4. `03-friends.jpeg/.webp` — `Insieme`.
  5. `04-aperitivo.jpeg/.webp` — `L’aperitivo`.
  6. `05-food.jpeg/.webp` — `Sapori`.
  7. `06-ragazze.jpeg/.webp` — `Serata`.
  8. `07-rituale.jpeg/.webp` — `Il rituale`.
  9. `08-boys.jpeg/.webp` — `Amici`.
  10. `09-carducci.jpeg/.webp` — `Carducci`.
- Все numbered fallbacks — `2048×1367`; каждый имеет optimized WebP. Coffee item использует explicit fallback/dimensions в data array.
- Coffee item всегда второй: caption index `02`, alt `Tazzina di espresso vista dall’alto accanto a un tovagliolo ricamato Caffè Carducci`.
- Counters, accessible labels и live announcements вычисляются из `GALLERY_ITEMS.length`; lightbox показывает `01 / 10 ... 10 / 10` и circularly переходит `10 ↔ 01`.
- Track: native touch overflow/snap на phone/tablet; на desktop сохраняет horizontal trackpad delta, переводит vertical wheel только пока может двигаться, поддерживает mouse/pen drag с click suppression. Header arrows скроллят к соседнему item.
- Каждый item — semantic button, открывающий native dialog. Lightbox: X/Escape/backdrop close, native focus trap, opener focus return, ArrowLeft/ArrowRight, mobile horizontal swipe, circular controls, `object-fit: contain` без destructive crop.
- Instagram end card `Vivi Caffè Carducci` ведёт на официальный Instagram и не входит в 10-image count.
- Из последней user submission не копировались шесть byte-identical duplicates: `fuori.jpeg`, `barmen.jpeg` (совпадает с `05-food.jpeg` несмотря на имя), `kok3.jpeg`, `kok2.jpeg`, `boys.jpeg`, `noi.jpeg`. В gallery assets нет второго набора этих файлов.

## 9. 06 — Nel cuore di Grosseto

- Секция сохраняет `id="dove"` и состоит из трёх актов: emotion → place → practical information.
- Reveal heading sequence: `06 — NEL CUORE DI GROSSETO` → `Passi da Grosseto?` → `Fermati da Caffè Carducci.`.
- Dominant user-supplied facade photo: `location/caffe-carducci-facade.webp` + `.jpg`, `866×866`. Это не Wikimedia asset; внешняя атрибуция не требуется.
- Desktop: square facade слева и overlapping map справа-ниже. Mobile: facade остаётся читаемым, map сохраняет editorial negative overlap без horizontal overflow.

### Privacy-first map

- Initial render содержит только локальный code-native inline SVG preview; iframe отсутствует, поэтому до consent нет запросов Google Maps.
- Preview — иллюстративная схема, не turn-by-turn карта: более контрастные milk-white streets, blue-gray blocks, усиленный gold Corso Carducci, brand marker и label `MAPPA ILLUSTRATIVA`.
- `CENTRO STORICO`, `CORSO CARDUCCI`, `GROSSETO` имеют точный solid `#18444B`; mobile SVG type sizes повышены для читаемости.
- Semantic button `Mostra mappa` в accessible name предупреждает, что загрузка обратится к Google. Click монтирует существующий titled/lazy Google iframe в той же frame.
- `Torna all’anteprima` размонтирует iframe и возвращает focus к preview control. У active iframe нет overlay, блокирующего pointer interaction.
- Независимый `APRI IN GOOGLE MAPS →` открывает реальный directions URL в новой вкладке; это явный user-initiated переход к Google.

### Practical information и coordinates

- Чистая grid без icon cards: `VISITACI`, `ORARI`, `CONTATTI`, `SEGUICI`, `INDICAZIONI`.
- `ORARI` читает shared `HOURS`; Visit phone остаётся `tel:`; email — `mailto:`.
- `SEGUICI`: Instagram, Facebook, WhatsApp; `INDICAZIONI`: directions Google Maps.
- Decorative coordinates: `42.7604° N` / `11.1137° E`, `aria-hidden`, потому что смысловой адрес уже дан выше.
- Coordinates используют ту же Italiana review-quote typography (`--serif`, weight 600), muted `rgba(24,68,75,.34)`, около `72 px` desktop / `27 px` на 390. Рядом `GROSSETO · TOSCANA · ITALIA`.
- Coordinate tail специально компактен; не увеличивать обратно section bottom spacing без визуального решения.

## 10. Footer

- Background solid `#18444B`; milk-white text; gold top/bottom rules, logo и details.
- Локальный transparent gold logo `brand/caffe-carducci-logo.png`, затем отдельный wordmark `CAFFÈ CARDUCCI`.
- Desktop editorial two-column: invitation `Un caffè, un pranzo, un aperitivo. Ti aspettiamo.` слева; `Il piacere di stare insieme, nel cuore di Grosseto.` справа. Mobile stack сохраняет естественный порядок.
- `PRENOTA →` — semantic button, вызывает тот же application-level BookingDialog; отдельного footer dialog нет. После close focus возвращается к footer button.
- Ровно два social anchors, только inline SVG icons, hit area `46×46`: Instagram и Facebook. Accessible names: `Instagram — Caffè Carducci`, `Facebook — Caffè Carducci`; SVG `aria-hidden`, links `_blank` + `noreferrer`.
- Footer social URLs: Instagram `https://www.instagram.com/caffecarducci/`, Facebook `https://www.facebook.com/124934174240588/`. WhatsApp в Footer не повторяется.
- Legal row: copyright, `Storia`, `Menu`, `Dove siamo`, `Privacy Policy`, email. `Menu` ведёт к `#piatti`; `Dove siamo` — к `#dove`.
- `Privacy Policy` пока честный placeholder: `href="#privacy-policy"`, preparation status в title/aria-label, `preventDefault()` не меняет URL/hash. Это не privacy policy и не legal text.

## 11. Responsive, accessibility и motion

- Проверенные ключевые widths: 1440, 768, 390, 320. Mobile primary breakpoint — `760 px`; minimum body width — `320 px`.
- Все новые interactive controls — native `button`/`a`, имеют accessible names и visible focus states; map и social targets не меньше 44 px.
- Есть skip link к `#main-content`.
- Booking и Gallery используют native `<dialog>`; focus restoration и body scroll-lock cleanup реализованы отдельно.
- `.reveal` управляется shared IntersectionObserver и unobserve после появления.
- `prefers-reduced-motion: reduce` отключает transforms, delays, smooth scrolling и image zoom; content остаётся сразу видимым.
- Body имеет защитный `overflow-x: hidden`, но browser QA дополнительно снимал mask и подтверждал отсутствие layout overflow.

## 12. Asset inventory

- `brand/`: `caffe-carducci-logo.png`.
- `hero/`: только финальные `carducci-cup-closeup.png/.webp`; video assets и poster удалены.
- `story/`: `carducci-interior.jpg/.webp`.
- `piatti/`: `insalatone.png/.webp`, `cocktail-sera.jpeg/.webp`.
- `vivi/`: `interior.jpeg/.webp`, `people.jpeg/.webp`, `drink.jpeg/.webp`.
- `gallery/`: nine numbered JPEG/WebP pairs + `caffe-espresso.png/.webp`.
- `location/`: `caffe-carducci-facade.jpg/.webp`.

Не удалять fallback formats: `<picture>` зависит от пары WebP + original fallback. Не заменять truthful supplied photos генеративными изображениями.

## 13. Запуск и сборка на этом Windows/Codex окружении

Обычный `pnpm` может найти wrapper, но не найти `node`. Надёжный вариант — использовать bundled runtime явно.

### Dev server на 4173

```powershell
$carducciNode = 'C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $carducciNode 'node_modules\vite\bin\vite.js' --configLoader native --host 127.0.0.1 --port 4173
```

Проверить до открытия браузера:

```powershell
(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173').StatusCode
```

### Production build

```powershell
$carducciNodeDir = 'C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$env:PATH = "$carducciNodeDir;$env:PATH"
& 'C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd' run build
```

Equivalent direct build:

```powershell
$carducciNode = 'C:\Users\kiril\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $carducciNode 'node_modules\vite\bin\vite.js' build --configLoader native
```

## 14. Последняя проверка

Проверено 2026-08-14 после Hero cleanup и реализации Menu Drawer:

- Vite 8.2.1 production build: success, 16 transformed modules, `167 ms`.
- `git diff --check`: pass.
- Local URL `http://127.0.0.1:4173`: HTTP 200.
- Удалённые video assets физически отсутствуют; в source нет прежних media switch, video refs/state, media control или poster references.
- Source/static checks: временный `MenuEmbedTest` и его CSS отсутствуют; оба `Scopri il menu` являются buttons с единым opener handler; `MENU_URL` используется в DOM только внутри условно mounted drawer iframe/fallback.
- Root Chrome QA при initial render: menu iframe count `0`, requests к `menu.caffecarducci.com` `0`; до пользовательского click удалённое меню не загружается.
- После Hero/Piatti click iframe монтируется, реальное menu.caffecarducci.com визуально загружается. Branded loader сначала видим, затем iframe `onLoad` переводит его в hidden state.
- Desktop `1440×900`: panel `1353.6×828 px`, то есть exact `94vw×92dvh`; overlay computed `rgba(16, 12, 10, 0.68)` + `blur(8px)`. Mobile `390×844`: panel exact `390×844`, без внешних margins.
- При open body имеет `overflow: hidden`. Во время closing transition iframe и body lock остаются; примерно после `540 ms` iframe/layer размонтируются, а прежние body inline styles восстанавливаются.
- Post-mount focus fix подтверждён: initial focus переходит на `CHIUDI`; close button, parent-document Escape и desktop outside click закрывают drawer и возвращают focus ровно на конкретный Hero/Piatti opener.
- No page/drawer overflow на `1440×900` и `390×844`.
- Drawer screenshots: `C:\Users\kiril\.codex\visualizations\2026\08\13\019ffacd-03c5-7160-a6dc-ad2046f0c435\menu-drawer-1440.png` и `menu-drawer-390.png` в той же папке.

Проверено 2026-08-13 после последних source changes:

- Vite 8.2.1 production build: success, 16 transformed modules.
- `git diff --check`: pass.
- Local URL `http://127.0.0.1:4173`: HTTP 200 повторно подтверждён 2026-08-13 в 18:52 CEST.
- Chrome Headless QA: `1440×1000`, `768×900`, `390×844`, `320×800`.
- Sequential markers `01–06`, no duplicate gallery controls/hint, mobile Hero full title, Gallery 10-image order/counters/circularity, lightbox controls/focus/swipe, Footer social/privacy behavior.
- Header: `Chiamaci` и contact phone → popover closes → BookingDialog opens → initial phone focus → close/Escape restores exact inline opener; final popover Escape resets `aria-expanded=false`.
- Map: initial iframe count `0`, initial Google Maps requests `0`; opt-in sequence `0 → 1 → 0`; focus follows replacement control; external directions URL unchanged.
- Map computed labels: exact `rgb(24, 68, 75)`; Reviews glyph `→` and hover matrix corresponds to horizontal `translateX(3px)`.
- No page/section overflow at 1440/768/390/320 even after temporarily removing body/html overflow masks.
- Current QA screenshots are in `C:\Users\kiril\.codex\visualizations\2026\08\13\019ffacd-03c5-7160-a6dc-ad2046f0c435\`; key latest files include `hero-photo-title-390.png`, `hero-photo-title-320.png`, `gallery-coffee-second-1440.png`, `gallery-coffee-second-390.png`, `map-contrast-1440.png`, `map-contrast-390.png`, `footer-social-icons-1440.png`, `footer-social-icons-390.png`.

## 15. Repository state

- Git repository exists on branch `main`; current HEAD observed before this HANDOFF edit: `9cb0669 Initial Carducci website` (2026-08-13).
- Worktree was clean before rewriting this document. This HANDOFF update must remain uncommitted unless the user explicitly requests a commit.
- `origin` is configured as `https://github.com/juliayp/caffe-carducci.git`, but no push or remote-sync verification was performed in this task. Не считать локальное состояние автоматически опубликованным на GitHub.
- Не создавать commit/push/deployment без отдельной команды пользователя.

## 16. Known caveats

- Некоторые supplied lifestyle/gallery originals содержат встроенные event graphics, logos или watermarks. Они являются частью исходных фотографий и намеренно не ретушировались.
- Facebook destination `https://www.facebook.com/124934174240588/` был получен через официальную placeholder-страницу `https://www.caffecarducci.com/`. Это текущий recorded exact URL; перед production launch разумно ещё раз проверить ownership/актуальность.
- Section numbering сейчас исправлена и последовательна; не возвращать старые duplicate numbers.
- `Privacy Policy` — только UX placeholder, не юридический документ и не основание для production compliance.
- Google Fonts загружаются внешне. Google Maps iframe загружается только после opt-in; external directions CTA всё равно явно переводит пользователя на Google.
- Cross-origin keyboard boundary: parent Escape закрывает Menu Drawer, пока focus остаётся в parent document или на iframe element. После входа focus внутрь cross-origin menu document его keyboard events недоступны React parent, поэтому такой Escape нельзя перехватить; отдельный native `<dialog>` probe показал то же browser limitation. Видимые `CHIUDI`, external fallback и outside click остаются рабочими путями закрытия.
- Базовые SEO tags есть, но полноценные SEO/schema/local-business/social image/canonical/privacy decisions ещё не финализированы.

## 17. Tomorrow / next decisions

1. Показать пользователю desktop/mobile Menu Drawer и получить визуальное подтверждение; его core runtime lifecycle и opener restoration уже прошли root Chrome QA.
2. Показать и утвердить финальный контраст/стилистику local map preview; opt-in privacy architecture сохранять независимо от визуального решения.
3. Только после этих решений переходить к согласованному final polish/content pass, затем SEO/real Privacy Policy и deployment — без самостоятельного расширения scope.
