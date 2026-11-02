# Comprehensive Technical SEO Audit & Strategy Report

**Target Website:** `https://zariel.dev`  
**Platform:** Next.js 15.5.12 (App Router), React 19, Tailwind CSS v4  
**Audit Date:** November 2026  
**Auditor:** Senior Technical SEO Engineer  
**Status:** Phase 1 & 2 Complete (Pre-Implementation)

---

## 1. Executive Summary

A comprehensive technical SEO audit was conducted across the `zariel.dev` portfolio codebase. The site is built with Next.js 15 (App Router) and features rich interactive animations (GSAP, Motion, COBE 3D globe).

While the application builds cleanly and prerenders static HTML at build time, several **critical and high-severity SEO issues** directly hinder search engine discoverability, indexing, social sharing, and search snippet presentation:

1. **Zero Crawling & Indexing Infrastructure:** No `robots.txt` or `sitemap.xml` exists. Search engine crawlers have no sitemap declaration or crawl directives.
2. **Missing Canonicalization & metadataBase:** No `<link rel="canonical">` tag is generated, and `metadataBase` is not defined in the Next.js Metadata API, risking duplicate content penalties and broken relative social URLs.
3. **Broken Heading Architecture:** The above-the-fold Hero section has **zero** `<h1>` headings (it renders within a generic `<span>`), while the Bento grid in the About section contains **five separate `<h1>` tags** (including one wrapping an inspirational quote). Major sections skip heading levels entirely.
4. **Incomplete Social Graph (OG & Twitter):** Open Graph and Twitter Card metadata lack image declarations (`og:image`, `twitter:image`), resulting in broken, unstyled links when shared across LinkedIn, X/Twitter, Discord, and Slack.
5. **No Structured Data (Schema.org):** The site has zero JSON-LD schema markup (`ProfilePage`, `Person`, `WebSite`), missing out on Google Knowledge Graph entities and rich search features.
6. **Performance & Rendering Bottlenecks:** A full-screen splash overlay delays user-perceived content until `window.load` fires; hidden modal dialog images are marked with `priority` preloading; and relative asset URLs lack root slashes.
7. **Unbranded 404 Experience & Placeholder Outbound Links:** No custom `not-found.tsx` exists, and outbound links point to dummy `example.com` domains.

Addressing these issues will ensure proper indexing, establish a cohesive entity graph with Google, eliminate duplicate content risks, and maximize organic search discoverability.

---

## 2. Current SEO Implementation Analysis

| SEO Component | Current State | Evaluation |
|---|---|---|
| **Rendering Strategy** | Static Generation (SSG) via App Router | ✅ Good. Next.js prerenders static HTML for `/`. |
| **Page Title** | Hardcoded static string in `layout.tsx` | ⚠️ Missing dynamic template (`%s \| Zariel Dev`). |
| **Meta Description** | Present in `layout.tsx` (139 chars) | ✅ Concise and descriptive. |
| **Canonical URL** | Missing | ❌ **Critical**. No canonical link emitted. |
| **metadataBase** | Missing | ❌ **High**. Fails Next.js best practices for URL resolution. |
| **Open Graph** | `title`, `description`, `url`, `type`, `locale` present | ❌ Missing `images` array. |
| **Twitter Card** | `card: "summary_large_image"`, `title`, `description` present | ❌ Missing `images`, `creator`, `site`. |
| **Robots Meta Directives** | Default implicit | ⚠️ Missing explicit `index, follow, max-image-preview:large`. |
| **robots.txt** | Non-existent | ❌ **Critical**. No crawl instructions or sitemap pointer. |
| **sitemap.xml** | Non-existent | ❌ **Critical**. No XML sitemap for Google Search Console. |
| **Structured Data** | None | ❌ Missing `Person`, `WebSite`, `ProfilePage` JSON-LD. |
| **Heading Hierarchy** | 0 H1 in Hero, 5 H1s in About, missing H2s, H5 in modal | ❌ **Critical**. Inverted and skipped heading levels. |
| **Semantic HTML** | `div`-heavy wrappers for major sections; 2 duplicate `<footer>` tags | ⚠️ Multiple page-level footers; sections wrapped in plain divs. |
| **Image Optimization** | `next/image` used for most graphics | ⚠️ Generic `alt` attributes (`alt="Logo"`, `alt="Project preview"`). |
| **404 Handling** | Default Next.js unstyled `_not-found` page | ⚠️ No branded 404 page with navigation back home. |
| **Internationalization** | `<html lang="en">` declared | ✅ Sufficient for single-language site. |

---

## 3. Comprehensive Issue Log & Severity Matrix

Issues are categorized by their nature:
- **[CONFIRMED]**: Definitively present in the codebase.
- **[POTENTIAL]**: Requires runtime verification or real-device observation.
- **[RECOMMENDATION]**: Best-practice enhancements.

```
Severity Scale:
[CRITICAL] -> Blocks indexing, dilutes equity, or violates fundamental SEO rules.
[HIGH]     -> Degrades CTR, social previews, rich snippets, or crawler understanding.
[MEDIUM]   -> Semantic defects, accessibility overlap, or missing standard files.
[LOW]      -> Minor optimizations and code hygiene.
```

---

### Issue 1: Missing Canonical Tag & `metadataBase`
- **Classification:** `[CONFIRMED]`
- **Severity:** **CRITICAL**
- **Affected Files:** `src/app/layout.tsx`
- **Why It Matters:** Without a canonical link, search engines index any URL variation separately (e.g., `https://zariel.dev/`, `https://www.zariel.dev/`, `https://zariel.dev/?ref=producthunt`). This splits PageRank and link equity, and may cause Google to pick an unintended URL as canonical. Next.js 15 requires `metadataBase` to resolve relative canonical and social image paths.
- **Recommended Solution:** Define `metadataBase: new URL("https://zariel.dev")` and configure `alternates: { canonical: "/" }` in `metadata`.

---

### Issue 2: Missing `robots.txt` and `sitemap.xml`
- **Classification:** `[CONFIRMED]`
- **Severity:** **CRITICAL**
- **Affected Files:** Missing `src/app/robots.ts` and `src/app/sitemap.ts`
- **Why It Matters:** Web crawlers expect `/robots.txt` upon first contact to identify crawl limits and find the XML sitemap. Without an XML sitemap, search engines rely solely on link discovery, and webmasters cannot verify indexation coverage in Google Search Console.
- **Recommended Solution:** Implement native Next.js `src/app/robots.ts` (pointing to sitemap) and `src/app/sitemap.ts` (listing root and last modified date).

---

### Issue 3: Inverted & Broken Heading Hierarchy (0 H1 in Hero, 5 H1s in About)
- **Classification:** `[CONFIRMED]`
- **Severity:** **CRITICAL**
- **Affected Files:**
  - `src/components/Hero.tsx`
  - `src/components/HackedText.tsx`
  - `src/components/About.tsx`
  - `src/components/Experience.tsx`
  - `src/components/Projects.tsx`
  - `src/components/Project.tsx`
  - `src/components/ProjectDetails.tsx`
- **Why It Matters:** Google uses headings to determine the topical structure and entity focus of a document.
  1. In `Hero.tsx`, the main title `"Hi, I'm Zariel"` is rendered via `HackedText`, which defaults to a `<span>`. The primary above-the-fold identity has no H1.
  2. In `About.tsx`, 5 separate `<h1>` tags exist (`"Bonjour, I'm Zariel"`, `"Tech stack"`, `"Time Zone"`, `"CURRENTLY"`, and `"Know how to learn. Then, want to learn."`). An inspirational quote should never be an H1.
  3. In `Experience.tsx`, the title is a `<span>` and individual items jump straight to `<h3>` and `<h4>` without an `<h2>`.
  4. In `Projects.tsx`, the section title is a `<span>`, project titles in `Project.tsx` are `<p>`, and in `ProjectDetails.tsx` the project title is an `<h5>`.
- **Recommended Solution:**
  - Set `tag="h1"` on `Hero.tsx` for the main introduction headline.
  - In `About.tsx`, convert section title to `<h2>` and card headers to `<h3>`. Convert the quote to `<blockquote>`.
  - In `Experience.tsx`, convert section title to `<h2>`, company names to `<h3>`, roles to `<h4>` or `<p>`.
  - In `Projects.tsx`, convert section title to `<h2>`, project titles to `<h3>`, and modal title to `<h3>`.

---

### Issue 4: Missing Open Graph & Twitter Social Preview Images
- **Classification:** `[CONFIRMED]`
- **Severity:** **HIGH**
- **Affected Files:** `src/app/layout.tsx`, `public/`
- **Why It Matters:** When portfolio URLs are shared on X, LinkedIn, Discord, Telegram, or WhatsApp, no image is rendered. Social clicks drop by 60-80% without rich preview cards.
- **Recommended Solution:** Add `openGraph.images` and `twitter.images` referencing a dedicated 1200x630 social preview card (e.g., `/imgs/portfolio.png` or a custom generated OG image), with width, height, and alt text.

---

### Issue 5: Lack of Schema.org Structured Data (JSON-LD)
- **Classification:** `[CONFIRMED]`
- **Severity:** **HIGH**
- **Affected Files:** `src/app/layout.tsx` or `src/app/page.tsx`
- **Why It Matters:** Without Schema.org data, search engines must infer personal and professional details. Adding `ProfilePage`, `Person`, and `WebSite` JSON-LD explicitly connects the website entity with Zariel's GitHub, LinkedIn, skills (Go, Temporal, Next.js, React), and software engineering role in Google's Knowledge Graph.
- **Recommended Solution:** Add a valid JSON-LD script block in `layout.tsx` containing `ProfilePage`, `Person`, and `WebSite` schemas adhering to Google Search Central guidelines.

---

### Issue 6: Missing Custom 404 Error Page (`not-found.tsx`)
- **Classification:** `[CONFIRMED]`
- **Severity:** **HIGH**
- **Affected Files:** Missing `src/app/not-found.tsx`
- **Why It Matters:** The default Next.js 404 page is an unstyled, stark page with no navigation, no branding, and no canonical or indexation directives. Users and crawlers hitting a typo or broken URL bounce immediately rather than returning to the homepage.
- **Recommended Solution:** Implement a branded `src/app/not-found.tsx` with clear navigation back to the homepage and appropriate robots `noindex` metadata.

---

### Issue 7: Placeholder Outbound Links to `example.com`
- **Classification:** `[CONFIRMED]`
- **Severity:** **HIGH**
- **Affected Files:** `src/data/projects.ts`
- **Why It Matters:** Project 1 links to `https://example.com/project-one`, and both project logos link to `https://example.com/logo1.png`. Outbound links to dummy domains signal unfinished or untrustworthy content to web crawlers.
- **Recommended Solution:** Replace placeholder links with authentic URLs (e.g. GitHub repository link or internal section anchor) or disable outbound navigation for unhosted demo projects.

---

### Issue 8: Duplicate Landmark `<footer>` Elements
- **Classification:** `[CONFIRMED]`
- **Severity:** **MEDIUM**
- **Affected Files:** `src/components/KprFooter.tsx`, `src/components/Footer.tsx`, `src/components/App.tsx`
- **Why It Matters:** `App.tsx` mounts both `<KprFooter>` and `<Footer>` as top-level landmarks. `KprFooter` is a background visual decorative console pinned to the viewport, while `Footer` is the actual content footer. Multiple top-level `<footer>` landmarks confuse screen readers and search crawler document outlines.
- **Recommended Solution:** Convert `KprFooter` to a decorative `<aside>` or `<div>` with `aria-hidden="true"` or appropriate landmark semantics, preserving `Footer` as the sole landmark `<footer>`.

---

### Issue 9: Non-Semantic Section Containers
- **Classification:** `[CONFIRMED]`
- **Severity:** **MEDIUM**
- **Affected Files:**
  - `src/components/Hero.tsx` (`<div id="home">`)
  - `src/components/Experience.tsx` (`<div id="work">`)
  - `src/components/Project.tsx` (`<div>`)
- **Why It Matters:** Semantic containers (`<section>`, `<article>`) provide document hierarchy, making it easier for search crawlers to segment content and understand topics.
- **Recommended Solution:** Replace `div` containers with `<section id="home" aria-label="Introduction">`, `<section id="work" aria-label="Work Experience">`, and `<article>` for individual projects.

---

### Issue 10: Non-Descriptive Alt Attributes and Anchor Text
- **Classification:** `[CONFIRMED]`
- **Severity:** **MEDIUM**
- **Affected Files:**
  - `src/components/KprFooter.tsx` (`alt="Logo"`)
  - `src/components/Projects.tsx` (`alt="Project preview"`)
  - `src/components/ProjectDetails.tsx` (`View Project` without descriptive accessible context)
- **Why It Matters:** Google Image search and screen readers rely on descriptive alt text. Generic text like "Logo" or "Project preview" provides zero indexable context.
- **Recommended Solution:** Upgrade alt text to "Zariel Dev Logo" and dynamic project previews (`${project.title} screenshot`). Add descriptive `aria-label` to "View Project" links (`aria-label={`View ${project.title} live project`}`).

---

### Issue 11: Splash Screen Delaying Core Web Vitals (LCP)
- **Classification:** `[POTENTIAL]`
- **Severity:** **MEDIUM**
- **Affected Files:** `src/components/RemoveSplash.tsx`, `src/app/layout.tsx`, `src/app/globals.css`
- **Why It Matters:** The `#splash` element is a fixed black screen (`z-[9999]`) that listens for `window.addEventListener("load")`. If any background video, font, or script stalls, the screen remains black. For automated crawlers, snapshots may capture an empty spinner.
- **Recommended Solution:** Ensure the splash screen has a strict timeout fail-safe (e.g., maximum 800ms) or fades out gracefully on DOM ready, ensuring crawlers and slow-network users immediately receive rendered content.

---

### Issue 12: Premature `priority` Loading on Hidden Modal Images
- **Classification:** `[CONFIRMED]`
- **Severity:** **MEDIUM**
- **Affected Files:** `src/components/ProjectDetails.tsx` (line 68)
- **Why It Matters:** The `priority` attribute in Next.js adds `<link rel="preload">` to the HTML `<head>`. Because `ProjectDetails` is a modal dialog that is hidden by default, preloading its image wastes critical network bandwidth and competes with hero assets for Largest Contentful Paint (LCP).
- **Recommended Solution:** Remove `priority` from `ProjectDetails.tsx` and allow lazy loading.

---

### Issue 13: Fragile Relative Media URLs
- **Classification:** `[CONFIRMED]`
- **Severity:** **LOW**
- **Affected Files:**
  - `src/components/Hero.tsx` (`"videos/vlhlll.mp4"`)
  - `src/components/About.tsx` (`"videos/feature-1.mp4"`, `"videos/feature-4.mp4"`)
  - `src/components/Frameworks.tsx` (`"logos/${skill}.svg"`)
- **Why It Matters:** URLs without leading slashes (e.g. `videos/...`) resolve relative to the current route. If nested routes or 404 pages are accessed, assets fail to load (404).
- **Recommended Solution:** Prefix all asset URLs with `/` (e.g. `/videos/...`, `/logos/...`).

---

### Issue 14: Font Display & Undeclared Font Rule in CSS
- **Classification:** `[CONFIRMED]`
- **Severity:** **LOW**
- **Affected Files:** `src/app/layout.tsx`, `src/app/globals.css`
- **Why It Matters:** `Geist` and `Geist_Mono` lack explicit `display: "swap"`. Furthermore, `globals.css` declares `font-family: Space Mono, monospace, sans-serif;` on `body`, but `Space Mono` is never imported, falling back directly to monospace.
- **Recommended Solution:** Add `display: "swap"` to Google Fonts in `layout.tsx` and align `globals.css` font declarations with `--font-geist-sans` and `--font-geist-mono`.

---

## 4. Implementation Priority Matrix

| Phase | Priority | Action Item | Affected File(s) | Impact |
|---|---|---|---|---|
| **P1** | **CRITICAL** | Define `metadataBase` & Canonical URL | `src/app/layout.tsx` | Eliminates duplicate content; fixes URL resolution |
| **P1** | **CRITICAL** | Implement `robots.ts` & `sitemap.ts` | `src/app/robots.ts`, `src/app/sitemap.ts` | Allows crawler indexing & search console verification |
| **P1** | **CRITICAL** | Fix Heading Hierarchy (H1 in Hero, H2/H3 in sections) | `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `ProjectDetails.tsx`, `HackedText.tsx` | Establishes single primary H1 & logical document outline |
| **P2** | **HIGH** | Open Graph & Twitter Social Image Metadata | `src/app/layout.tsx`, `public/imgs/` | Restores rich cards on social platforms |
| **P2** | **HIGH** | Add Schema.org JSON-LD (`ProfilePage`, `Person`, `WebSite`) | `src/app/layout.tsx` | Connects entity to Knowledge Graph |
| **P2** | **HIGH** | Create Custom Branded 404 Page | `src/app/not-found.tsx` | Prevents lost traffic; retains crawl equity |
| **P2** | **HIGH** | Replace `example.com` placeholder links | `src/data/projects.ts` | Eliminates dummy outbound links |
| **P3** | **MEDIUM** | Remove duplicate `<footer>` landmark | `KprFooter.tsx`, `App.tsx` | Fixes accessibility landmarks & screen reader tree |
| **P3** | **MEDIUM** | Convert Section Containers to Semantic HTML (`section`, `article`) | `Hero.tsx`, `Experience.tsx`, `Project.tsx` | Clean HTML5 semantic outline |
| **P3** | **MEDIUM** | Improve Image Alt Text & Link Anchor Accessibility | `KprFooter.tsx`, `Projects.tsx`, `ProjectDetails.tsx` | Enhances image indexing & descriptive navigation |
| **P3** | **MEDIUM** | Remove `priority` preload from hidden modal dialog | `ProjectDetails.tsx` | Frees bandwidth for critical LCP resources |
| **P4** | **LOW** | Fix relative asset paths with leading slashes | `Hero.tsx`, `About.tsx`, `Frameworks.tsx` | Prevents asset 404s on deep/error routes |
| **P4** | **LOW** | Font display swap & CSS font stack alignment | `layout.tsx`, `globals.css` | Improves font loading & prevents layout shifts |

---

## 5. Implementation Status

- [x] Comprehensive Codebase Audit (Phase 1)
- [x] `SEO_AUDIT.md` Created (Phase 2)
- [x] Phase 3: Detailed Implementation Plan approved by user
- [x] Phase 4: Implementation of P1 (Critical), P2 (High), P3 (Medium), P4 (Low) fixes
- [x] Phase 5: Verification (Build, TypeScript, Lint, HTML output inspection)

---

## 6. Verification & Validation Results

### 1. TypeScript & Lint
- Command: `npm run lint`
- Output: `✔ No ESLint warnings or errors`
- TypeScript status: All types validated cleanly with strict typechecking.

### 2. Production Build & Static Prerendering
- Command: `npm run build`
- Output: Compiled successfully in 3.5s; all 7 static pages and metadata routes rendered:
  - `○ /` (Static 125 kB)
  - `○ /_not-found` (Static 131 B)
  - `○ /robots.txt` (Static 131 B)
  - `○ /sitemap.xml` (Static 131 B)

### 3. Robots.txt Validation
- Verified route: `/robots.txt`
- Directives verified:
  ```txt
  User-Agent: *
  Allow: /

  Sitemap: https://zariel.dev/sitemap.xml
  ```

### 4. Sitemap Validation
- Verified route: `/sitemap.xml`
- Valid XML with `<loc>https://zariel.dev</loc>`, `<lastmod>`, `<changefreq>monthly</changefreq>`, and `<priority>1</priority>`.

### 5. Rendered HTML Verification
- Single H1 verified: `<h1>Hi, I'm Zariel</h1>`
- Logical heading tree:
  - `H1`: Hi, I'm Zariel
  - `H2`: About Me
    - `H3`: Bonjour, I'm Zariel
    - `H3`: Tech Stack
    - `H3`: Time Zone
    - `H3`: CURRENTLY
  - `H2`: My Professional Journey
    - `H3`: Thang Long Instrument. (`H4`: Software Engineer Intern)
    - `H3`: Lab SAP FPT University (`H4`: Software Engineer)
    - `H3`: Skydev (`H4`: Software Engineer)
    - `H3`: ANZ via HCLTech (`H4`: Software Engineer)
  - `H2`: My Selected Projects
    - `H3`: Portfolio Website
    - `H3`: Scientific Project Management System
  - `H2`: Let’s Talk
- Semantic landmarks: Exactly 1 `<main>`, 1 `<footer>`, 5 `<section>`, 2 `<article>`, and 1 decorative `<aside aria-hidden="true">`.
- Metadata verified: `<link rel="canonical" href="https://zariel.dev"/>`, `og:image` and `twitter:image` (1200x630 `/imgs/portfolio.png`), `googlebot` rich snippet directives.
- Structured data verified: 100% valid JSON-LD parsed with `@graph` containing `WebSite`, `ProfilePage`, and `Person`.

