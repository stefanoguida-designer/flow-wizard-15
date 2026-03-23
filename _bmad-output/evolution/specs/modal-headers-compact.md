# Edit Permissions & Invite User modals — Compact header specification

## Change Summary

Reduce the vertical space used by the fixed header in both the Edit Permissions and Invite User modals so that more space is available for the scrollable content area. All essential information (title, context, user identity where applicable, step indicator) remains visible but in a more compact form: single-line or two-line header where possible, inline user chip instead of a large info box, and a denser step indicator.

---

## Before

### Edit Permissions modal

- **DialogHeader:** Title "Edit Permissions" (text-lg) + DialogDescription (full sentence: "Modify access permissions for {user.name}. Assign building blocks and roles per unit.") — typically 2–3 lines.
- **User info block:** Dedicated `div` with `p-3 bg-muted/50 rounded-lg`, two lines: bold name + muted email. Adds noticeable vertical padding and margin (`mb-2`).
- **Step indicator:** Full-width row with pills (rounded-full px-3 py-1.5), step labels, and separators; `mb-4` below.
- **Content area:** Starts after the above; `py-4` on the wrapper adds more vertical padding.

### Invite User modal

- **DialogHeader:** Title "Invite User" + DialogDescription (full sentence: "Invite a civil servant to access the platform. Complete identity, units, and building blocks.") — 2–3 lines.
- **Step indicator:** Same as Edit Permissions; shown from step 0 (no user info box; name/email are in the form).
- **Content area:** `space-y-4 py-4`; step indicator is above the step content.

### Shared issues

- DialogHeader uses default `space-y-1.5`; title and description each take a line.
- Step indicator uses `px-3 py-1.5` and `mb-4`, consuming a lot of vertical space.
- Edit Permissions uses a large, boxed user block instead of an inline identity line.

---

## After

### Design approach: compact single-band header

Both modals use a **compact header band** that combines title, optional subtitle, optional user identity, and step indicator in one or two tight rows.

### Edit Permissions modal — header layout

1. **Single header row (flex, items-center, gap-3, flex-wrap):**
   - **Title:** "Edit Permissions" — keep `text-lg font-semibold`, no change.
   - **Subtitle (short):** Replace long description with a single short line, e.g. "Assign building blocks and roles per unit." Use `text-sm text-muted-foreground` so it sits on the same line as the title when space allows, or wraps to a second line on narrow widths.
   - **User identity (compact):** Remove the large user info box. Replace with a single **inline chip/line**: e.g. `{user.name} · {user.email}` in one line, `text-sm text-muted-foreground`, optionally inside a small pill or left as plain text. Truncate with ellipsis if needed (e.g. `min-w-0 truncate` on a container). Place this immediately after the subtitle (same row or next row).
2. **Step indicator (denser):**
   - Reduce vertical padding: use `py-1` (or `py-1.5`) and reduce `mb-4` to `mb-2` or `mb-3`.
   - Keep pills and labels; optionally reduce gap between steps (e.g. `gap-1.5` instead of `gap-2`) so the indicator is one compact row.
3. **Spacing:**
   - Use `pb-2` or `pb-3` between header band and content (instead of `py-4` on the content wrapper). Ensure the scrollable content area has a clear top boundary (e.g. border-t or consistent padding).

### Invite User modal — header layout

1. **Single header row:**
   - **Title:** "Invite User" — keep.
   - **Subtitle (short):** Replace with one short line, e.g. "Identity, units, and building blocks." Same styling as Edit Permissions subtitle.
2. **Step indicator (denser):**
   - Same as Edit Permissions: reduced padding and bottom margin so it takes less vertical space.
3. **Spacing:**
   - Same as Edit Permissions: reduce padding between header and content.

### Shared header structure (conceptual)

```
[ Title (e.g. "Edit Permissions") ] [ Short subtitle (muted, sm) ] [ Optional: User chip "Name · email" ]
[ Step 1 — Step 2 — Step 3 ]   (denser, smaller margin below)
────────────────────────────────────────────────────────────────
Scrollable content...
```

- The header block (title + subtitle + user chip + step indicator) is **fixed** (e.g. `flex-shrink-0`). The area below is the only scrollable region.
- User name and email (Edit Permissions) remain visible in the header in compact form; no separate box.

---

## Components

### Edit Permissions modal

| Component / area        | Change |
|-------------------------|--------|
| `DialogHeader`          | Single row or two rows: `DialogTitle` + shortened `DialogDescription` (one line of copy). Use `flex flex-row flex-wrap items-center gap-x-3 gap-y-1` and `space-y-0` or `space-y-1` so title and description sit close. |
| User identity           | Remove `div` with `p-3 bg-muted/50 rounded-lg`. Add inline line: `{user.name} · {user.email}` with `text-sm text-muted-foreground`, inside the header area. Optional: wrap in a span with `truncate` and a fixed max-width so long emails don’t push layout. |
| Step indicator          | Keep `StepIndicator` component; reduce `mb-4` to `mb-2` or `mb-3`. Optionally reduce internal padding (e.g. `py-1` / `py-1.5`) and gap so the row is shorter. |
| Content wrapper         | Keep `flex-1 overflow-hidden flex flex-col min-h-0`. Reduce top/bottom padding (e.g. `py-2` or `pt-2 pb-4`) so more space is left for the scrollable list. |

### Invite User modal

| Component / area        | Change |
|-------------------------|--------|
| `DialogHeader`          | Same pattern: title + one-line shortened description, `flex` layout with minimal vertical spacing. |
| Step indicator          | Same as Edit Permissions: denser padding and smaller margin below. |
| Content wrapper         | Same as Edit Permissions: reduce vertical padding so the scrollable area gains space. |

### Copy changes

- **Edit Permissions description:** From "Modify access permissions for {user.name}. Assign building blocks and roles per unit." → **"Assign building blocks and roles per unit."** (user is shown in the compact chip, so no need to repeat in the description.)
- **Invite User description:** From "Invite a civil servant to access the platform. Complete identity, units, and building blocks." → **"Identity, units, and building blocks."** (shorter, same meaning.)

---

## Responsive behavior

- **Desktop / wide:** Title, short subtitle, and user chip (Edit Permissions) can sit on one line if space allows; step indicator remains one row.
- **Narrow / small modals:** Subtitle and user chip may wrap to a second line; step indicator stays one row. Ensure long names/emails truncate with ellipsis so the header doesn’t grow beyond two lines plus one step row.

---

## Edge cases

- **Long user name or email (Edit Permissions):** Use `min-w-0 truncate` on the user chip container and a sensible max-width (e.g. `max-w-[240px]` or similar) so the header doesn’t overflow; tooltip on hover for full name/email is optional.
- **Many steps:** Step indicator already wraps or scrolls; keep the same denser styling so it doesn’t grow vertically.
- **Invite User step 0:** No user chip; only title, short subtitle, and step indicator. Step 1 and 2: same header, no user chip (identity is in the form on step 0).

---

## Acceptance criteria

1. **Edit Permissions:** Header contains title, short one-line description, and a single compact line showing user name and email (no large box). Step indicator is visually one compact row with reduced bottom margin.
2. **Invite User:** Header contains title and short one-line description; step indicator is the same compact style.
3. **Vertical space:** The combined fixed header (title + subtitle + user chip if present + step indicator) uses less vertical height than the current implementation (measurable by reduced padding/margins and removal of the user info box).
4. **Scrollable area:** The scrollable content region below the header is larger (same modal max height, less space taken by the fixed header).
5. **Information preserved:** User name and email remain visible in the Edit Permissions header; no essential copy is removed, only shortened.
6. **Layout:** On narrow widths, header content may wrap to two lines; step indicator remains one row; long name/email truncate with ellipsis.
