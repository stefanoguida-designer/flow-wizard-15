# Logto Manager — Operational Guide

This guide is for technical super administrators (Logto / observability team) who are standing up and operating **Logto Manager** for the first time. It describes what the **current prototype** does in the product UI, not how to change application source code.

**Live prototype:** [https://stefanoguida-designer.github.io/logto-manager/](https://stefanoguida-designer.github.io/logto-manager/)  
The app is hosted under the path `/logto-manager/` (for example, Users is at `/logto-manager/users`).

---

## How this prototype differs from a production deployment

**Note:** In the hosted prototype, there is no real identity provider or Logto tenant. The home screen (“OGCIO Form Management Platform”) lets you **simulate** an operator by choosing one of three personas (Super Admin, Admin, Read Only). In production you would expect real sign-in and role assignment from your IdP and backend.

**Open question:** How the **first** Super Admin is created in production (bootstrap user in Logto, environment seed, break-glass account, etc.) is not represented in the UI prototype; that must be decided and documented for your environment.

---

## Role capabilities (summary)

The prototype defines three **platform administrator** roles. A full matrix is available in-app under **View full permissions reference** on the home page ([permissions page](https://stefanoguida-designer.github.io/logto-manager/permissions)).

| Role | Typical use |
|------|-------------|
| **Super Admin** | Full control: users, units (including delete), allow list, platform admins, activity logs. |
| **Admin** | Can invite/edit users and add/edit units; **cannot** delete users or units; allow list and **Team Overview** (platform admins) are **read-only**. |
| **Read Only** | View teams, users, allow list, Team Overview, and activity logs; **cannot** change data. |

**Note:** End-user permissions (Admin / Editor / Viewer on **building blocks**) are separate from these platform roles and are configured per user in **Users**.

---

## 1. First-time setup

**Intro:** Before civil servants can be invited, the organisation model (teams), optional units, email allow list entries, and at least one operator with **Super Admin** must exist. The prototype assumes **teams already exist** in the system data; only units, allow list, and users are managed inside the flows described below.

1. **Decide the source of truth for teams (departments).**  
   In the prototype, the Teams list is labelled as **read-only and managed externally**. Opening a team shows a **“Read-only (managed externally)”** badge.

2. **Ensure teams are present** in whatever backend or data feed will back production (or, in the prototype only, they are pre-loaded in demo data). There is **no “Add team”** action in the current UI.

3. **Create units** for each team that needs subdivisions (see [§3](#3-onboarding-a-new-unit)). Teams can have zero units; the Users invite flow still allows **whole-team** access when the invitee’s domain is allowed for that team.

4. **Configure the allow list** so invitees’ email domains map to the correct teams (see [§4](#4-configuring-the-allow-list)).

5. **Establish a Super Admin operator** for the platform (in the prototype: sign in by selecting the Super Admin persona; in production: follow your bootstrap process — **open question**).

6. **Optional:** Add additional platform administrators via **Team Overview** (see [§7](#7-managing-platform-admins-super-admin-only-for-changes)).

**Open question:** Whether teams are synchronised from an HR/directory API, a static config, or manual database seed is a deployment decision; the UI today only **displays** teams and does not create them.

---

## 2. Onboarding a new team (department)

**Intro:** A “team” in this app corresponds to a department/portfolio-style organisation. The prototype does not provide a screen to create a new team.

1. Confirm with your platform owners that a new team should exist in the **authoritative source** (external system, registry, or seed data — **open question**).

2. After the team appears in **Teams** (sidebar → **Teams**), open it to verify name, abbreviation, user count, and units.

3. **Add units** if the team is not modelled as a single flat access scope (see [§3](#3-onboarding-a-new-unit)).

4. **Allow list:** Add or update a domain (or domains) so that invitees from approved email domains can be assigned to this team (see [§4](#4-configuring-the-allow-list)).

5. **Invite users** as needed (see [§5](#5-inviting-a-new-user)).

**Note:** Until a team exists in backend data, you cannot attach allow list entries or invite users to it through the UI.

---

## 3. Onboarding a new unit

**Intro:** Units sit under a team (for example local authorities under a housing department). **Super Admin** and **Admin** can create and edit units; only **Super Admin** can delete them.

1. Go to **Teams** and click the team card.

2. In the **Units** section, click **Add Unit** (visible if your role can modify data).

3. Enter **Unit Name** (required).

4. Optionally enter **Acronym** (up to 10 characters).

5. Click **Create Unit**. A success message confirms creation; the table shows **Created** and **Created By** (in the prototype these are simulated).

6. To change a unit later, use the row **pencil** icon. To remove a unit, use the **trash** icon (**Super Admin** only). The UI warns if the unit still has users associated in the mock counts.

**Note:** In a real backend, unit creation might be restricted by policy or automated; the prototype performs the action entirely in the browser session.

---

## 4. Configuring the allow list

**Intro:** Only email addresses on the **allow list** can be used when **inviting** users. Each entry is a **domain** plus a **display name** and one or more **teams** that domain is allowed to join.

**Who can change it:** Only **Super Admin**. **Admin** and **Read Only** can open **Allow List** from the footer menu but see **view-only** actions.

1. Open **Allow List** (footer → user menu → **Allow List**).

2. Click **Add Domain**.

3. Enter **Domain Name** (display label for operators) and **Domain** (the part after `@`, e.g. `housing.gov.ie`). The domain must contain a dot (e.g. `gov.ie`).

4. Under **Team access**, search if needed, then tick **at least one team** whose members with this domain may be invited.

5. Click **Add Domain**. Duplicate domains are rejected with an error.

6. To **edit** an entry, use the **pencil** icon. You can change the display name and team associations; the **domain string itself is disabled** in edit mode in the prototype.

7. To **remove** an entry, use the **trash** icon and confirm. The copy warns that users with that domain can no longer be invited.

**Matching rules used when inviting:** The invite dialog treats an email as allowed if the address domain **equals** an allow-listed domain **or** is a **subdomain** of it (for example `mail.housing.gov.ie` can match `housing.gov.ie`).

**Open question:** Whether wildcard or multi-tenant domain rules should be supported beyond this parent-domain behaviour is a product/security decision for production.

---

## 5. Inviting a new user

**Intro:** Invitations are created from **Users** → **Invite User**. The flow is a **two-step wizard**: **Identity & units**, then **Building blocks & roles**. **Admin** and **Super Admin** can invite; **Read Only** cannot.

### Prerequisites

- The invitee’s email domain must match the allow list (see [§4](#4-configuring-the-allow-list)).
- The email must not already belong to an existing user.

### Step A — Identity & units

1. Go to **Users** → **Invite User**.

2. Enter **Full name** and **Email address**.

3. If the domain is not allow-listed, the UI shows an error and a link to **Manage allow list**. You cannot proceed until the domain is allowed.

4. If valid, the UI confirms the domain is whitelisted and shows how many teams are available for that domain.

5. Use **Search teams or units** if the list is long.

6. For each team the user should access, either:
   - Tick the **team** checkbox to grant **all units** in that team (“(all units)” is shown), **or**
   - Leave the team unchecked and tick **individual units** under that team.

   You cannot mix “whole team” and “specific units” for the **same** team in one invite: selecting the team clears unit picks for that team, and picking units clears whole-team selection for that team.

7. Click **Next**. You must have selected at least one team or unit.

### Step B — Building blocks & roles

**Intro:** Building blocks are named capabilities (in the prototype: `FormsIE`, `PaymentsIE`, `MessagingIE`, `JourneyBuilderIE`, `Analytics`). For **each** selected team or unit scope, you assign **one or more** building blocks and a **role** per building block.

1. For each card (each selected scope), use **Add building block** to add blocks until every scope has at least one.

2. For each row, set the role to **Admin**, **Editor**, or **Viewer**.

3. Remove a block with the **X** if needed.

4. Click **Send invitation**.

**Note:** The validation message refers to “each unit”; in the product logic it applies to **every selected scope**, including **whole-team** selections.

**Note:** The prototype shows a toast (“Invitation sent”) and adds the user to the table; it does **not** send real email.

**Open question:** How invited users complete activation in Logto (magic link, SSO, admin approval) is outside this UI.

---

## 6. Editing user permissions

**Intro:** **Admin** and **Super Admin** can change an end user’s teams/units, building blocks, and display name. **Read Only** cannot.

1. Go to **Users**.

2. Open a user: click the row, or use the row **⋯** menu → **Edit permissions**.

3. The **Edit Permissions** dialog uses the same two steps as invite: **Identity & units**, then **Building blocks & roles**.

4. **Step 1:** Update **Full name** if needed. **Email** is read-only. Select or clear **whole team** and **unit** checkboxes. The list includes **all teams** in the prototype (invite flow, by contrast, only lists teams allowed for the **invitee’s** domain).

5. Click **Next**.

6. **Step 2:** For each **active** selection, ensure at least one building block remains. Deselected scopes appear greyed out as “(deselected)” and are not saved as access.

7. Click **Save Changes**.

**Deleting a user:** **Super Admin** only — **⋯** → **Delete user**, bulk select + **Delete Selected**, or **Delete User** in the user sidebar. **Admin** cannot delete.

---

## 7. Managing platform admins (Super Admin only for changes)

**Intro:** Platform administrators (Super Admin / Admin / Read Only **for the Logto Manager app itself**) are managed under **Team Overview** in the sidebar footer menu. Despite the label, this screen is **platform-wide administrator management**, not per-team admins.

**Who can do what:**

- **Super Admin:** Invite admins, edit roles, disable, restore, delete, and use all actions.
- **Admin / Read Only:** Can open **Team Overview** and view the table; actions show **View only**.

### Invite an administrator

1. Open **Team Overview** (footer → **Team Overview**).

2. Click **Invite Admin**.

3. Enter **Full Name** and **Email Address**.

4. Choose **Role**: **Read Only**, **Admin**, or **Super Admin** (descriptions appear under the field).

5. Click **Send Invitation**. Duplicate emails are rejected.

### Edit an administrator’s role

1. In the **Active Administrators** table, open the row **⋯** menu → **Edit role** (or use the detail sheet from clicking the row).

2. Select the new role and **Save Changes**.

3. If a **Super Admin** lowers their **own** role, a confirmation dialog warns that only another Super Admin can restore full access.

### Disable an administrator

1. On **Active Administrators**, use **⋯** → **Disable admin**.  
   You cannot disable your own account.

2. Find the person under **Disabled Administrators**.

3. Use **⋯** → **Restore admin** to re-enable.

### Remove an administrator

1. Use **⋯** → **Delete admin** and confirm permanent removal.  
   You cannot remove yourself.

**Detail sheet:** Clicking a row opens a side panel with **Details** and **Activity** (activity is filtered from demo log data in the prototype).

**Note:** Inviting a platform admin in the prototype adds a row locally; it does **not** provision a real Logto user.

---

## 8. Activity logs

**Intro:** **Activity Logs** (sidebar → **Activity Logs**) is a read-only audit-style timeline for **administrator** actions (invites, access changes, unit changes, allow list, admin changes, etc.). **All three platform roles** can view it.

1. Open **Activity Logs**.

2. Use **Search logs** to match description, operator name, or target name.

3. Use **Date range** to restrict by calendar period (range picker).

4. Use **Filter by type**: All, Users, Units, Teams, Admins, Allow List.

5. Use **Operator** to show events performed by a specific named administrator.

6. Active filters appear as chips; remove them with the **X** on each chip.

7. From a user’s sidebar **Activity Log** tab, clicking an entry navigates to Activity Logs with `?highlight=<id>` to scroll and briefly highlight that row.

**Note:** In the prototype, log entries come from **static demo data**. Actions you perform in the session (invite user, add domain, etc.) update the on-screen lists but **do not** append new rows to **Activity Logs**. Expect a real system to stream or persist audit events from the API.

**Open question:** Retention, export, SIEM integration, and PII redaction for audit logs are operational concerns for production, not shown here.

---

## Quick reference — navigation

| Area | How to open |
|------|-------------|
| Teams | Sidebar → **Teams** |
| Team detail / units | Click a team card |
| Users | Sidebar → **Users** |
| Allow list | Footer user menu → **Allow List** |
| Platform admins | Footer user menu → **Team Overview** |
| Activity logs | Sidebar → **Activity Logs** |
| Permissions matrix | Home → **View full permissions reference** |

---

## Glossary

| Term | Meaning in this app |
|------|---------------------|
| **Team** | Department / portfolio; top-level access scope. |
| **Unit** | Subdivision under a team (optional). |
| **Allow list** | Permitted email **domains** and which **teams** they may join when inviting users. |
| **Building block** | A product module (e.g. FormsIE) with a per-scope role (Admin / Editor / Viewer). |
| **Platform role** | Super Admin / Admin / Read Only for **operating** Logto Manager. |
| **End-user role** | Admin / Editor / Viewer on a **building block** within a team or unit scope. |

---

*Document aligned with prototype behaviour and codebase as of the repository state used to produce this guide. Production behaviour may differ once backed by Logto and real APIs.*
