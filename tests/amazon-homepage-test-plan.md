# Amazon.com Homepage Playwright Test Plan

## Application Overview

Browser-focused plan for the public Amazon.com homepage and guest shopping entry points. Live inspection showed the standard Amazon header with search, department selector, account/cart controls, and an International Shopping Transition Alert; exact promotions and regional prompts may vary. Tests should use a fresh unauthenticated browser context, avoid checkout/account sign-in, handle the regional prompt only when present, and assert stable semantic controls and navigation rather than volatile merchandising content.

## Test Scenarios

### 1. Homepage and Global Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage loads with primary controls

**File:** `tests/amazon-homepage/homepage-loads-with-primary-controls.spec.js`

**Steps:**
  1. Navigate to https://www.amazon.com in a fresh browser context.
    - expect: The document title identifies Amazon.
    - expect: The primary search field, department selector, Account & Lists entry, and Cart entry are available.
  2. If an international-shopping or location transition dialog appears, inspect its choices and dismiss it or continue to the United States storefront without changing account state.
    - expect: The dialog is no longer blocking the homepage, or no such dialog was shown.
  3. Inspect the primary navigation and main content landmarks without relying on the specific product or promotion shown.
    - expect: The page exposes a main content region and usable primary navigation.

#### 1.2. Today's Deals opens from the homepage

**File:** `tests/amazon-homepage/todays-deals-navigation.spec.js`

**Steps:**
  1. Navigate to the homepage and clear an optional regional transition dialog if it blocks interaction.
    - expect: The homepage navigation is interactive.
  2. Activate the visible Today's Deals navigation link.
    - expect: The browser navigates to an Amazon deals page and displays a deals-related page heading or content landmark.

### 2. Product Search

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search products from the homepage

**File:** `tests/amazon-homepage/search-products-from-homepage.spec.js`

**Steps:**
  1. Navigate to the homepage and handle an optional regional transition dialog.
    - expect: The Search Amazon field is available.
  2. Enter a stable generic query such as 'wireless headphones' and submit the search.
    - expect: The page navigates to search results.
    - expect: The query is reflected in the search field or URL, and a results region is visible.
  3. Verify at least one result card or product link is present, without asserting a specific product, price, rank, or inventory state.
    - expect: Search results are rendered for the submitted query.

#### 2.2. Search within a selected department

**File:** `tests/amazon-homepage/department-scoped-search.spec.js`

**Steps:**
  1. Navigate to the homepage and handle an optional regional transition dialog.
    - expect: The department selector is available.
  2. Choose a department that is present in the selector (prefer Books when available), enter a generic query, and submit.
    - expect: The results page loads and preserves the query.
    - expect: The selected department scope is represented by the selector, URL, or results-page context.

### 3. Guest Shopping Entry Points

**Seed:** `tests/seed.spec.ts`

#### 3.1. Open the cart as a guest

**File:** `tests/amazon-homepage/guest-cart-entry.spec.js`

**Steps:**
  1. Navigate to the homepage and handle an optional regional transition dialog.
    - expect: The Cart entry is available.
  2. Activate Cart without adding items or signing in.
    - expect: The browser opens the cart page or a guest cart/sign-in gate.
    - expect: The cart page presents an understandable empty-cart or sign-in-required state without exposing checkout as completed.

#### 3.2. Open account entry without signing in

**File:** `tests/amazon-homepage/account-entry.spec.js`

**Steps:**
  1. Navigate to the homepage and handle an optional regional transition dialog.
    - expect: The Account & Lists control is available.
  2. Open the Account & Lists menu or entry point without submitting credentials.
    - expect: A sign-in/account entry surface is visible, or the account page clearly requests authentication.
