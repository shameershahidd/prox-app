# Prox Mobile — Grocery Search & Deals

Take-home assessment submission, Track A: Mobile UI/UX Implementation & App Deployment.

A mobile-first grocery search and deals experience with cross-retailer price 
comparison, saved deals, and full loading/empty/error states.

## Running it

```bash
npm install
npm run dev
```

Open the local URL in your browser and shrink the window to a phone width (or 
open dev tools device mode) to see it as intended — the layout is mobile-first 
and centers itself as a fixed phone-width frame on larger screens.

**To see the loading state:** every search has a ~650ms simulated network delay.

**To see the empty state:** search for something that doesn't exist, e.g. `xyz`.

**To see the error state (reproducibly):** search for the literal word `error`. 
This triggers a simulated failed request with a retry button, so the state is 
demoable on demand rather than waiting on a random failure.

## Tech stack choice

**React + TypeScript + Vite**, plain CSS (no UI framework), `react-router-dom` 
for navigation, `localStorage` for persisting saved deals.

I chose a web stack over React Native/Expo deliberately, given the 5–10 hour 
scope:

- It let me spend the time budget on UX polish and state/data-modeling 
  correctness rather than native tooling setup, and it's zero-install to 
  review (no Expo Go, no simulator).
- The component and state logic (screens, cards, filters, save/unsaved state, 
  the three UI states) is the same code you'd write in React Native — it 
  ports directly.
- The layout, spacing units, and interactions are all designed mobile-first 
  from the start, not adapted from desktop.

The tradeoff: this isn't a real native shell, so gestures, native navigation 
transitions, and platform-specific chrome (status bar, native tab bar) aren't 
present. See **Deployment readiness** below for how I'd take this from here to 
the App Store and Play Store.

## Component structure

```
src/
  types/          Product, DisplayProduct, RetailerPrice, SortOption
  data/
    products.ts   Mock catalog: 18 items, each priced at all 4 retailers
    pricing.ts    toDisplayProduct() — turns a Product into a priced,
                  filter-aware DisplayProduct for list rendering
    mockApi.ts    searchProducts() / fetchProductById() — simulated
                  network calls
  hooks/
    useSavedDeals.ts   Save/unsave state, persisted to localStorage
  components/
    ProductCard    Shared card used on both Search and Saved screens
    FilterBar      Retailer chips + price sort
    SkeletonCard   Loading skeleton matching the card's shape
    EmptyState     No-results / no-saved-items state
    ErrorState     Failed-request state with retry
    BottomNav      Fixed tab bar (Search / Saved)
  screens/
    SearchScreen         Home: search, filters, deals list
    ProductDetailScreen  Full cross-retailer price comparison for one item
    SavedScreen          Saved deals, reuses ProductCard
```

`ProductCard` and the three state components are shared between screens 
rather than rebuilt per-screen — Saved Deals is really just `SearchScreen`'s 
list filtered down to saved IDs, styled and stated identically, which is also 
why saving/unsaving from either screen stays in sync automatically.

## UX & data-modeling decisions

- **Every product is priced at every retailer, always.** Products don't 
  "belong" to one retailer — `allPrices` holds all four prices for every 
  item, and `toDisplayProduct()` computes which price to show based on the 
  active retailer filter (or the cheapest price anywhere, with no filter 
  active). I caught and fixed a bug during development where filtering by 
  retailer was hiding products instead of repricing them, which would have 
  quietly broken the entire point of a price-comparison app — filtering 
  should never reduce your ability to compare, it should sharpen it.
- **Debounced search (300ms)** so we're not firing a "network" request on 
  every keystroke, same as a real app would debounce before hitting a backend.
- **Skeleton loading, not a spinner.** A skeleton that matches the card's 
  shape gives the user a preview of layout before content arrives, which 
  reads faster than a centered spinner even at the same actual latency.
- **"Best price" tags only appear when a retailer filter is active.** With 
  no filter, the displayed price is always the cheapest by construction, so 
  the badge would be redundant on every card — it becomes meaningful again 
  once you're comparing within a filtered set.
- **Retry on error, not a dead end.** The error state gives the user a clear 
  next action instead of a wall.
- **Tab bar hides on the detail screen**, mirroring how native navigators 
  push a full-screen view on top of a tab bar rather than keeping tabs 
  visible while drilled into a single item.
- **Saves are pinned to a specific retailer/price, not just the product.**
  Saving "Bananas at Walmart, $0.54" and "Bananas at Kroger, $0.57" are two
  different saved deals. On the detail screen, where there's no single
  active retailer filter, "Save this deal" always saves whichever price is
  labeled "Cheapest" at the top of the comparison list, so the action stays
  unambiguous without asking the user to pick a retailer first.
- **Monospace prices.** Prices are set in IBM Plex Mono against a serif/sans 
  UI — makes them scannable and gives the app a "price tag" identity rather 
  than looking like a generic list.

## How this fits into the real Prox app

I looked at Prox's current app before building this. Its main screen is a 
grocery *list* you build, with a basket-level savings tracker ("$X saved 
this week," "~19% less than one store"), and Deals lives as a separate tab. 
Track A's brief maps onto that Deals tab specifically, not a replacement for 
the whole app — this project is the search/comparison layer, not the list 
builder.

The connection is direct, though: the real app's basket-level "19% less" 
number has to be computed from *item-level* price comparisons across 
retailers, which is exactly what `toDisplayProduct()` and the detail screen's 
price comparison list do here. If this fed into the real product, the 
natural next step is a basket/list feature that sums each saved item's 
cheapest price per store and surfaces the same kind of savings percentage — 
this project is the building block that calculation would sit on top of.

`mockApi.ts` is the other seam: `searchProducts()` and `fetchProductById()` 
are the only two functions that would change to hit Prox's real backend 
instead of the local mock array — every component above them is already 
written against that interface and wouldn't need to change.

## What I'd improve with more time

- A basket/list view that sums saved items' cheapest prices per store and 
  surfaces a savings percentage, matching the real app's core value prop 
  more directly than a single-item view can.
- Real product photography via a retailer catalog API instead of icon 
  placeholders (used here to keep the demo dependency-free and fast to load).
- Persist saved deals to an account instead of local device storage, so they 
  sync across devices.
- Debounce-cancel in-flight requests properly (currently a slow request can 
  resolve after a newer one if the network were more variable — I'd add an 
  AbortController or a request-id guard).
- A distance/location filter, which needs real geolocation and store data I 
  didn't want to fake.

## Deployment readiness

**How I'd test before release**

- Manual pass on real devices at common breakpoints: iPhone SE (smallest 
  common iOS screen), iPhone 15/16 standard, a large Android phone (e.g. 
  Pixel), and one tablet, checking that the phone-frame layout still reads 
  well at each.
- Keyboard/VoiceOver and TalkBack pass, since the cards, chips, and save 
  button all need accessible labels (I added `aria-label`/`aria-pressed` 
  throughout, but a real screen-reader pass would catch what static review 
  misses).
- Slow-network and offline testing — this app already simulates latency, but 
  real device testing on throttled 3G would surface anything the skeleton 
  doesn't cover.
- Regression pass on the three states (loading/empty/error) and on the 
  repricing logic after any data or API change, since both are easy to 
  silently break.

**Screen sizes to test:** 375×667 (SE), 390×844 (standard iPhone), 428×926 
(Pro Max), ~360×800 (common Android), and a tablet breakpoint (768px+) to 
confirm the centered-frame layout degrades gracefully rather than stretching.

**Bugs/UX issues I'd specifically check before shipping:** double-tap on the 
save button causing state flicker, back-navigation losing filter/search 
state, long product names overflowing the card (currently truncated with 
ellipsis, worth a real-device check), and safe-area insets on notched devices 
(the bottom nav already accounts for `env(safe-area-inset-bottom)`, but that 
needs verifying on-device).

**What's required to actually ship:**

- *iOS:* wrap in Capacitor or rebuild the screens in Expo/React Native (the 
  component logic ports directly, as noted above); Apple Developer Program 
  enrollment; app icons and launch screens at all required sizes; App Store 
  Connect listing (screenshots, description, privacy nutrition labels); 
  TestFlight beta for internal QA before public release.
- *Android:* same Capacitor/Expo path; Google Play Console developer account; 
  adaptive icon set; Play Store listing assets; closed testing track before 
  production rollout.
- *Tooling I'd use:* Expo + EAS Build for a single native build pipeline 
  across both platforms, TestFlight for iOS beta distribution, Play 
  Console's internal/closed testing tracks for Android, and Firebase 
  Crashlytics or Sentry for post-launch crash visibility.
