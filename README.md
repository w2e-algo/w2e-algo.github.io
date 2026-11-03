# IERP Sustainability Project website

Static project showcase: `index.html` introduces the project and `progress.html`
presents all six phases. No build step or additional runtime dependencies are required.

- `assets/css/site.css`: shared palette, typography, spacing, accessible focus and motion preferences.
- `assets/css/index.css`: homepage components and responsive layouts.
- `assets/css/progress.css`: phase components, shared pipelines, dashboard, modal and evaluation cards.
- `assets/js/progress.js`: preserved stage/testimonial data and scoped interaction handlers.
- `pdf_images/`: original research and visual assets; unchanged by the refactor.

Breakpoints are documented in `site.css`. Native CSS custom properties cannot be
used inside media-query conditions, so these conditions use literal widths.

## Local preview and verification

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory and open
`http://127.0.0.1:8765/`. Open `/tests/responsive.html` for the browser checks.
The test page renders both pages in real iframe viewports at 1920, 1440, 1366,
1024, 768, 430, 375 and 320 pixels. It checks document overflow and exercises
all pipeline stages, previous/next boundaries, carousel navigation/indicators,
and both assignment dialogs, including source selection and focus restoration.
It does not emulate physical devices or replace manual accessibility testing.

## Refactor verification — 3 November 2026

- Both pages rendered in Chrome at all eight widths: no horizontal page overflow.
  Tables, text diagrams and timelines intentionally scroll within their own regions.
- Both pipelines, carousel controls/indicators and both modal controls passed at
  every width; no interaction runtime errors were captured.
- Visually inspected the 1440px dashboard, 768px testimonials, 375px homepage,
  320px pipeline, and 430px assignment/PDF dialog.
- The first assignment PDF rendered successfully in Chrome's viewer. Escape
  closed it and restored focus; Enter reopened it. Mobile navigation supported
  opening, Escape closing and keyboard reopening.
- Static checks found no duplicate IDs, missing local references or unresolved
  ARIA ID references. HTML tag nesting, CSS parsing and JavaScript syntax passed.
- Original visible project text and all pipeline/testimonial data were compared
  with the pre-refactor files and preserved exactly. No datasets, PDFs or images
  were modified. The hero CSS URL was adjusted for the extracted stylesheet location.

Remaining manual checks: Safari/Firefox and physical mobile devices, screen-reader
announcements and a full WCAG contrast audit, external GitHub link availability,
and the second PDF's visual rendering. The checks above are not a W3C validation
or WCAG conformance certification. Bootstrap CSS remains served by the existing CDN;
unused Bootstrap JavaScript and Mermaid imports were removed.
