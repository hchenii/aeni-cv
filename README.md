# Personal CV and Portfolio Website

Student: **Chenybabes M. Dalogdug**

A personal CV and portfolio for a school assignment and future internship,
employment, and freelance opportunities. Built with HTML, CSS, and vanilla
JavaScript. AI assists development; this site does not include an AI chatbot.

## Current stage

The structure, burgundy design, responsive layouts, and accessible interactions
are implemented. Personal information still needs final review before publication.

The current design pairs Cormorant Garamond headings with Manrope body text,
a softly shaded hero, a straight rounded portrait, a dedicated About panel,
balanced skill groups, and a two-column burgundy contact section. The portrait file is unchanged.
RiceFlow remains the only project; its screenshot placeholder is clearly labeled.

## Main features

- Home, About, Education, Skills, Projects, Experience, Achievements, and Contact
- Accessible landmarks, heading hierarchy, skip link, and section navigation
- Email, approved public phone, and GitHub links
- Clearly labeled project status and planned RiceFlow features
- Supplied professional profile photo with descriptive alternative text
- Warm ivory and burgundy palette, serif headings, and subtle gold decoration
- Responsive hero, skill badges, timelines, project features, and achievement list
- Mobile navigation with Escape support and visible keyboard focus
- Gentle hover and scroll-reveal effects with reduced-motion support
- Clearly labeled screenshot placeholders; replace these with supplied project images

## Technologies and files

- `index.html`: HTML5 structure and verified personal content
- `style.css`: theme tokens, layouts, responsive breakpoints, animations, and print styles
- `script.js`: mobile menu controls and progressive scroll-reveal enhancement
- `dalogdug_cv.html`: pre-existing empty file, preserved
- `assets/images/chenybabes-dalogdug.jpg`: supplied professional photo, copied unchanged

No frameworks, backend, dependencies, or build step are required.

## Run locally

Open `index.html` in a browser. For automatic refresh in VS Code, install Live
Server if needed, right-click `index.html`, and select **Open with Live Server**.
All content and section links work without JavaScript; navigation stays expanded
when JavaScript is unavailable.

## Development stages

1. Add CV structure and verified content.
2. Add styling and responsive layouts: off-white, charcoal, muted burgundy,
   readable typography, photo area, timelines, and project cards.
3. Add interactions and accessibility improvements: mobile menu, hover effects,
   smooth scrolling, and gentle reveals respecting reduced motion. Content must
   remain visible if JavaScript fails.
4. Test, fix issues, and finish documentation. Check representative viewport widths
   of 375, 768, 1024, and 1440 pixels when browser tools are available.

Suggested design commit: `Polish CV spacing, typography, and responsive section layouts`.
Review the diff before staging; existing unrelated changes should be reviewed
separately. Do not fabricate development history.

## Verification

- Local headless Chrome: 375, 768, 1024, and 1440 pixel viewports had no horizontal
  overflow; the supplied portrait loaded at each width.
- Verified both Google Font families loaded; fallback fonts remain available offline.
- Visually inspected desktop and mobile hero screenshots and desktop About, Skills,
  Projects, Achievements, and Contact sections.
- Verified mobile menu opening, Escape closing and focus return, and section-link
  closing. Navigation remained visible after reloading with JavaScript disabled.
- Mobile section links move keyboard focus to the destination heading.
- Emulated reduced motion and confirmed smooth scrolling was disabled.
- No JavaScript runtime exceptions during browser checks; `node --check script.js`
  and `git diff --check` passed.
- External GitHub and email destinations were not submitted or live-tested.
- Project screenshot zoom is prepared in CSS for real images, but is not visually
  testable until screenshots are supplied. The current previews are labeled placeholders.

Before submission, review every section in your browser, use Tab and Enter to
navigate, and confirm all remaining personal details. No deployment was performed.

## Content pending review

- Confirm current year level and expected graduation; neither is displayed yet.
- Confirm January or February 2026 as the data entry starting month.
- Confirm RiceFlow individual contribution, actual stack, implemented features,
  screenshots, and repository URL. Features currently appear as planned only.
- Confirm actual HTML, CSS, JavaScript, and Git proficiency before listing skills.
- Supply LinkedIn only if desired.

Phone display was approved during content review. No private reference is included.
The supplied details replace older committed school and profile information.

## GitHub and deployment

Repository (matches the existing origin): https://github.com/hchenii/aeni-cv

Live Vercel URL: **[Add the actual URL after successful deployment]**

The site has not been deployed in this development session. Review personal
information before publishing. After review, push the code to the personal GitHub
repository and import it into Vercel as a static site. Confirm deployment settings
and test the real public URL at that stage, then update this README.

Final LMS submission requires both the public Vercel URL and GitHub repository URL.
