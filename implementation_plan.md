# Diagnose and Fix Sanity CMS 403 Sync Issue

This document outlines the investigation, root cause analysis, and the proposed fix for the `403 Forbidden` error when trying to sync Midex case studies to Sanity CMS.

## User Review Required
> [!IMPORTANT]
> The tokens you provided (`skc77...` and `skeLw...`) are being rejected by the Sanity project configured in your codebase (`7vhvbsex`).
> 
> There are two highly probable reasons for this:
> 1. **Project Mismatch:** The code is trying to update the project `7vhvbsex` (which might be the original developer's/agency's project), but the tokens you generated belong to a *different* Sanity project under your personal account.
> 2. **Token Role Restrictions:** The dataset is locked down, and the tokens you created ("Editor" and "Access Manager") are either on the wrong project OR the Sanity organization policies restrict API mutations unless it's a "Robot" token or explicitly granted dataset write access.
> 
> **Action needed from you:** We need to verify if `7vhvbsex` is actually the project you are managing in your Sanity dashboard. You can find your Project ID in your Sanity Management Dashboard (under the project name or settings). 

## 1. Data Flow Analysis

Currently, the data flow in the Midex project works as follows:

```text
Google Sheet (Export) / Local JSON (`scripts/data/case-studies-sheet.json`)
  ↓
Import Script (`import-case-studies-from-sheet.ts` or similar)
  ↓
Sanity CMS (Content Lake via Sanity API mutations)
  ↓
Next.js Frontend (via GROQ queries in `src/lib/cms/pages.ts`, etc.)
  ↓
Live Website
```

- **Source of Truth:** The Sanity Content Lake (`7vhvbsex` project, `production` dataset). 
- **JSON role:** The JSON files are just intermediary static seeds. Modifying them locally doesn't change the live site until a script pushes them to Sanity via the API.
- **Frontend Fetching:** The website fetches directly from Sanity using `sanityFetch` (via CDN `apicdn.sanity.io`).

## 2. Diagnostic Evidence

I ran several tests against `https://7vhvbsex.api.sanity.io/v2024-01-01/data/mutate/production` and `/data/query/production`:
- **Without Token:** 403 Forbidden.
- **With `SANITY_API_READ_TOKEN`:** 403 Forbidden.
- **With new `SANITY_API_WRITE_TOKEN`:** 403 Forbidden.
- **With simulated Frontend Headers (Origin: localhost):** 403 Forbidden.

This proves that Sanity API is strictly enforcing authorization. The `403 Forbidden` means the authentication was understood but access was denied. If the token was simply malformed, Sanity usually returns `401 Unauthorized`. A `403` implies the token is authenticated but has no rights to the `production` dataset on the `7vhvbsex` project.

## 3. Proposed Fix & Sync Script

I will create a production-grade sync script (`scripts/sync-case-studies.ts`) that will safely handle the synchronization.

### Script Features
- **Dry Run Mode:** `npm run sanity:case-studies:dry-run` will list exactly what documents will be deleted and created without touching the live database.
- **Execute Mode:** `npm run sanity:case-studies` will perform the actual mutations.
- **Validation:** Will check that the token is present and valid before attempting mutations.
- **Translations:** It will sync both the English and Arabic translations for the Cons Korra case study correctly as configured in your localization files.

## 4. Open Questions
> [!WARNING]
> Please check your Sanity Dashboard (https://manage.sanity.io):
> 1. What is the Project ID listed at the top of your project? Is it `7vhvbsex`?
> 2. If it is NOT `7vhvbsex`, please provide the correct Project ID so I can update `.env.local`.
> 3. If it IS `7vhvbsex`, please create a new token specifically categorized as a **"Robot/API Token"** with **Admin** or **Editor** rights, specifically granting Write access to the `production` dataset.
