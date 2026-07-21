# Motion Brief — Jacinto Design

## Look

Feel: Deep space, seen from a long way out — quiet, vast, and unhurried.
      Near-black ground with colour that drifts rather than moves, so the
      page feels like it's breathing rather than performing. Editorial and
      composed when still; the motion is the last ten percent, not the
      thing holding it together.

Palette:
  Background   #05030C   near-black void
  Surface      #0D0A18   raised panels, cards
  Foreground   #EDEAF5   primary text
  Muted        #8B84A8   secondary text, metadata
  Indigo       #2A1B5E   nebula, deep field
  Violet       #6B3FA0   nebula, mid
  Magenta      #A6329B   nebula, highlight
  Cyan         #4DD8E8   single accent — links, focus, active state only

Type:
  Display      Clash Display (500/600/700) — headings, wordmark, project titles
  Body         Inter (400/500) — prose, UI
  Micro        system mono stack — 11px uppercase labels: nav, eyebrows, tags
  Two loaded families plus the system mono, no more. Display goes big
  and tight; body stays quiet; labels run small and tracked wide.

Space: Airy. Wide outer margins, generous vertical rhythm between parts.
       Soft corners (12px) on cards, nothing sharper. Content column
       narrower than it wants to be — let the void do the work.

## Motion direction

Slow and weighted. Nothing snaps — everything eases out, and anything that
follows the cursor lags behind it rather than tracking it. If a movement
draws attention to itself, it's wrong.

## Hero  [content part]

- Treatment: full-screen shader — a slow drift of deep indigo, violet and
  magenta clouds over a near-black void, cyan catching the light at the
  edges, faint stars drifting behind, a soft glow at the centre
- Treatment: gentle parallax — the whole field drifts toward the cursor,
  eased so it lags and settles
- Treatment: pinned and scrubbed — as the visitor scrolls the pinned window,
  the field travels vertically and deepens, the palette evolves, and the
  central glow settles back
- Treatment: the headline arrives a line at a time rather than all at once
- Why: two seconds to establish the tier, and a live surface that responds
  to the visitor says "this was built, not bought" in a way no image can.
  Scrubbing makes the scroll feel like the visitor is directing it. The
  headline reveal paces the message instead of dumping it.

  -> Transition into About: parallax depth on the background as the hero
     unpins — the field keeps drifting, slower, behind the content
     Why: hands the visitor down the page with continuity, not a hard cut

## About  [content part]

- Treatment: the beats fade and rise as they enter, one after another
- Treatment: the three stats count up once, on first sight
- Treatment: otherwise still — the nebula is far behind here and barely moves
- Why: this section is read, not watched. The reveal paces the beats so
  they arrive one at a time instead of as a wall. Heavier motion would
  fight the words, which are the only thing that matters here.

## Project grid  [content part]

- Treatment: the cards rise in as a wave when the grid comes into view,
  each a beat behind the last
- Treatment: a small, calm lift on hover, with the cyan accent picking out
  the border
- Why: the stagger leads the eye across the work in the order I laid it
  out, which is the one place choreography genuinely serves the reader.
  The hover confirms focus without demanding attention the work should
  be getting. Nothing spins, flips, or bounces.

  -> Transition into Contact: none — a clean, quiet arrival
     Why: the visitor is about to act. Stillness signals "this is the point."

## Contact  [content part]

- Treatment: still, by decision
- Why: the conversion moment must be frictionless. Anything moving here
  competes with the one action I want, and a form that animates while
  you're filling it in is actively hostile. No treatment earns a place.

## Excluded

- Preloader with a percentage counter — cut. This site ships as kilobytes;
  a loading screen would be adding perceived wait to look serious. If the
  shader needs a beat to compile, that's a fade-in, not a progress bar.
- Magnetic buttons — cut. Fun to build, mildly annoying to use.
- SplitText on body copy — cut. Restricted to the hero headline only.
  If everything reveals, nothing reads as important.

## Content

Four projects, real, deployed, linked:
  01  VibeMail   Full-Stack · App · 2026
      A full-stack email client in a frosted-glass, fully monospaced
      interface — virtualised threads, instant search, Supabase backend.
      TypeScript, Next.js, Supabase, PostgreSQL
      vibemail-fullstack.vercel.app/demo
  02  Waypoint   Geospatial · Web App · 2026
      Editorial, photo-forward travel guides — authors pin places on an
      interactive map, attach photos, and publish curated guides to a
      public link.
      TypeScript, Next.js, Supabase, PostGIS, MapLibre
      ztm-waypoint.vercel.app
  03  ZTM Music  Audio · Web App · 2026
      A rebuilt streaming player — queue, library, search and playback
      against a live music API, lifted to portfolio grade.
      TypeScript, React, Next.js
      ztm-music.vercel.app
  04  Scoundrel Game · PWA · 2025
      A strategic single-player dungeon card game. Installable, fully
      offline, built to feel native on any device.
      JavaScript, PWA, Service Worker
      ztm-scoundrel-game.vercel.app

Courses, on the about panels:
  The Vibe Coding Bootcamp: Become an AI-Augmented Developer — live,
  linked: zerotomastery.io/courses/learn-vibe-coding
  Agentic Engineering course — in progress at Zero to Mastery

Contact: contact@jacinto.design — form posts and is tested end to end
before ship.

## Audience

Studios and teams hiring senior front-end and creative developers.
The test at audit is not "does this belong on Awwwards" — it's
"would that person reach out."