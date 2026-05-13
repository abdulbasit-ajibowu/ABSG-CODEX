# Agents Guidance for Design Slicing

## Purpose
This file defines how AI should approach slicing the visual design into HTML/CSS for the ABSG-CODEX project.

## Key Instructions
- Always inspect the `design/` folder first. The design assets there are the single source of truth.
- Before editing HTML or CSS, compare the current `index.html`, `css/`, and `partials/` with the visual design.
- Any section you implement or adjust must match the design details precisely: spacing, typography, colors, layout, button styles, icons, images, and text alignment.
- Do not assume behavior or style details that are not shown in the design. If something is unclear, preserve the existing structure and styling as much as possible.
- For any prompt that asks to fix, refine, or match a UI/design, do not confirm completion from code inspection alone. Run the page on a local server, capture a real browser render, compare that render with the relevant files in `design/`, and only then state what is confirmed fixed versus what still needs adjustment.

## Workflow
1. Open all image files in `design/` and absorb the layout, structure, and styling details.
2. Identify the major page sections from the design: header/navigation, hero/banner, content blocks, footer, mobile nav, etc.
3. Map each design section to existing files:
   - `index.html`
   - `partials/navigation.html`
   - `partials/footer.html`
   - `css/style.css`
   - `css/navigation.css`
   - `css/footer.css`
4. Implement missing sections by translating exact visual details into HTML structure and CSS rules.
5. When updating styles, match the design with 100% fidelity:
   - exact paddings/margins
   - exact font sizes, weights, and families
   - exact color values
   - exact border radii, shadows, and backgrounds
   - exact responsive layout behavior shown in mobile/composite designs
6. If the design includes a mobile version (`Abia Nav Mobile.png`), ensure the navigation and page layout adapt accordingly.
7. After UI edits, perform rendered verification:
   - run a local static server
   - open the page in a real browser or headless browser
   - capture a screenshot of the rendered result
   - compare the screenshot directly against the design asset for that section
   - if the screenshot does not match closely, continue iterating before confirming the work

## Quality Requirements
- Use the design as the authoritative reference for all layout and styling decisions.
- Keep existing partials and CSS organization intact unless the design requires a structural change.
- Do not remove or replace design-visible elements without justification.
- Document any implemented sections clearly in code comments if a new subsection or component is created.

## Notes for Developers
- The `design/` folder contains:
  - `Abia Nav Mobile.png`
  - `Abia Nav.png`
  - `extraordinary-figolla-e4e6d1.netlify.app_.png`
  - `Home.png`
- Use these images to confirm your approach before making markup and style changes.
- The design should be treated as exact: if a margin, font, or color is visible, it must be reflected in the final sliced page.

## Final Assurance
When you complete a slice or adjustment, verify that the rendered page visually matches the design images in the `design/` folder using an actual rendered screenshot. If a section is changed, ensure the styles are consistent with the design and the changes are explicit in both HTML and CSS. Never state that a design issue is fixed unless that rendered verification has been performed.
