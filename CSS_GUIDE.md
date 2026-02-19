# CSS Guide for this Portfolio

This guide explains what each part of `assets/css/style.css` does and when you would edit it.

## 1) Theme variables and color system

### `:root`

Defines your default (dark theme) design tokens:

- `--night`, `--midnight`, `--violet`: deep background colors.
- `--gold`: highlight/action color.
- `--mist`: soft light text/surface color.
- `--text`: base readable text color.
- `--accent`: focus-ring and interactive accent.

Use this block when you want to globally change the site palette.

### `html[data-theme="light"]`

Overrides some root variables when the light theme is active.

This means most components automatically restyle without changing each selector manually.

## 2) Base reset and page foundation

### `*`

Sets `box-sizing: border-box` so width/height calculations include padding and border.

### `html, body`

Removes default browser margins/padding.

### `body`

- Sets full-height page (`min-height: 100vh`).
- Sets main font (`Nunito`).
- Applies text color from variables.
- Builds layered gradient background.
- Uses `position: relative` and `overflow-x: hidden` to control visual effects and prevent horizontal scroll.

### `html[data-theme="light"] body`

Swaps in light-mode gradient background.

### `.page-glow`

Full-screen decorative glow overlay with radial gradients.

- `position: fixed` + `inset: 0` = covers viewport.
- `pointer-events: none` so it never blocks clicks.

## 3) Accessibility helpers

### `.skip-link` and `.skip-link:focus`

Creates a hidden “skip to content” link for keyboard users.

- Off-screen by default.
- Appears visibly when focused.

### `a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible`

Adds consistent, visible focus outline for keyboard navigation.

### `@media (prefers-reduced-motion: reduce)`

Disables reveal animation for users who prefer less motion.

## 4) Main layout containers

### `.hero, main, footer`

Constrains content width to `min(1100px, 92vw)` and centers it.

### `.hero`

Top section spacing.

## 5) Navigation and theme toggle

### `.nav`

Flex row with wrap + centered items + spacing.

### `.nav a`

Styles nav links as pill buttons with border/background/hover transitions.

### `.nav a:hover`

Adds small lift and brighter background on hover.

### `.nav a.active`

Marks current page link with stronger border and fill.

### `.theme-toggle` and `.theme-toggle:hover`

Styles theme toggle button to match nav pills.

## 6) Hero text and actions

### `.hero-content`

Centers hero text and controls vertical spacing.

### `.eyebrow`

Uppercase label styling (letter spacing, gold color, bold).

### `h1, h2, h3`

Sets heading font family to `Cinzel`.

### `h1`

Large responsive display heading:

- Uses `clamp(...)` for fluid size.
- Bright warm color and subtle text glow.

### `.intro`

Hero intro paragraph:

- Width cap for readability.
- Responsive font sizing.
- Mist color tone.

### `.hero-actions`

Wrap-friendly button row with spacing.

### `.btn`

Base button style shared by variants.

### `.btn-primary`

Gold gradient call-to-action style.

### `.btn-ghost`

Outlined transparent secondary button style.

## 7) Showcase section and project cards

### `.showcase`

Section spacing around project area.

### `h2`

Section heading style (centered, responsive size, warm color).

### `.projects`

Responsive CSS Grid:

- auto-fit columns,
- minimum card width 260px,
- collapses naturally based on viewport.

### `.project-card`

Card shell:

- glass-like gradient,
- light border,
- rounded corners,
- clipped overflow,
- backdrop blur.

### `html[data-theme="light"] .project-card, html[data-theme="light"] .project-detail`

Light-theme surface override for cards/details.

### `.project-card img`

Uniform image area with `object-fit: cover`.

### `.project-placeholder`

Fallback image panel using gradients and centered large icon/text.

### `.project-body`

Inner spacing for text area.

### `h3`

Card/detail heading color and margin.

### `.project-body p`

Paragraph spacing + line-height.

### `.project-body a`

Project links in gold with improved underline offset.

## 8) Detail page blocks and content chips

### `.project-detail`

Centered content panel for detail pages:

- max width,
- padding,
- rounded border,
- glass surface style.

### `.project-detail h3`

Adds spacing above subsection headings.

### `.project-detail p, .project-detail li`

Readable body text line-height and mist color.

### `.project-detail ul`

Left padding for list indentation.

### `.hobby-grid`

Responsive mini-grid for hobby cards.

### `.hobby-card`

Compact card row with icon + label.

### `.hobby-icon`

Slightly larger icon size.

### `.skills-grid`

Wrap-based layout for skill chips.

### `.skill-chip`

Rounded tag/chip appearance for skills.

### `.results-list`

Consistent list indentation for result lists.

## 9) Contact form styles

### `.contact-form`

Simple vertical grid with spacing between controls.

### `.contact-form label`

Bold label text.

### `.contact-form input, .contact-form textarea`

Shared control styling:

- full width,
- rounded borders,
- translucent background,
- inherits site font,
- variable text color.

### `.contact-note`

Small helper text below form.

## 10) Footer and social links

### `footer`

Centered footer spacing + default dark-theme text color.

### `html[data-theme="light"] footer`

Switches footer text for light theme contrast.

### `.socials`

Centered horizontal row for social icons.

### `.socials a`

Circular icon button shell.

### `.socials img`

Icon image size standardization.

## 11) Scroll reveal animation

### `.reveal`

Initial hidden/slid-down state.

### `.reveal.is-visible`

Visible state after JS adds class; fades + lifts into place.

## 12) Mobile breakpoint behavior

### `@media (max-width: 760px)`

At small widths:

- `.hero` gets tighter top padding.
- `.nav` gets less bottom margin.
- `.projects` becomes single column.
- `.project-card img` height is reduced to 210px.

---

## Quick edit cheat-sheet

- Change brand colors site-wide: edit variables in `:root` and `html[data-theme="light"]`.
- Adjust desktop content width: edit `.hero, main, footer` width rule.
- Change card look: edit `.project-card` and light override selector.
- Improve mobile layout: edit `@media (max-width: 760px)`.
- Tune accessibility focus style: edit the `:focus-visible` selector group.
- Remove/reduce motion effects: edit `.reveal` and reduced-motion media query.
