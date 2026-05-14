# Agents Guidance for Design Slicing

## Purpose
This file defines how AI should approach slicing the visual design into HTML/CSS for the ABSG-CODEX project.

Follow AGENTS.md strictly.

Task:
Fix the current page so it matches the design images in /design.

Important:
Do not say the task is complete until you have done rendered visual verification.

Required workflow:
1. List the design images found in /design.
2. Identify which design image applies to the current page/section.
3. Take a screenshot of the current rendered page.
4. Compare the screenshot against the design image.
5. Create a mismatch list grouped by:
   - spacing
   - typography
   - colors
   - layout
   - images/icons
   - responsiveness
6. Fix only those mismatches.
7. Re-render and screenshot again.
8. Report:
   - what now matches
   - what still does not match
   - exact files changed

Do not rely on code inspection alone.
Do not make broad redesigns.
Do not change unrelated sections.

## Key Instructions

- Always inspect the `design/` folder first. The design assets there are the single source of truth.
- Before editing HTML or CSS, compare the current `index.html`, `css/`, and `partials/` with the visual design.
- Any section you implement or adjust must match the design details precisely: spacing, typography, colors, layout, button styles, icons, images, and text alignment.
- Do not assume behavior or style details that are not shown in the design. If something is unclear, preserve the existing structure and styling as much as possible.
- For any prompt that asks to fix, refine, or match a UI/design, do not confirm completion from code inspection alone. Run the page on a local server, capture a real browser render, compare that render with the relevant files in `design/`, and only then state what is confirmed fixed versus what still needs adjustment.

## Non-Negotiable Verification Rule

The agent must not mark a design task as complete unless it has:
1. started a local server,
2. captured a browser screenshot of the implemented page,
3. compared that screenshot with the relevant file in `design/`,
4. listed visible mismatches,
5. fixed the mismatches, and
6. repeated screenshot verification.

If browser rendering or screenshot capture is unavailable, the agent must explicitly say:
“Rendered verification could not be performed,”
and must not claim the design is fully matched.