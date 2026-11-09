"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { site } from "@/lib/content";
import { ArrowUpRightIcon } from "@/components/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Site-wide chrome (MOTION_BRIEF: Site-wide) — the bar stays put; past the
 * hero it takes a glassmorphic ground so it stays readable over copy and
 * screenshots; nav links track the section in view, the active one in cyan
 * with its underline swept in (via aria-current + link-sweep), desktop
 * only. On narrow screens the bar collapses to the wordmark and a menu —
 * the glass stays. A Portfolios disclosure after the section links opens a
 * small panel of external live builds. GSAP drives the scroll behaviour;
 * Motion owns the menu's and the panel's mount and exit.
 */

// Where the inline nav gives way to the menu button. Must stay the
// complement of the max-md/md classes on the markup below.
const DESKTOP_NAV = "(min-width: 48rem)";

export function Header() {
  const root = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [glass, setGlass] = useState(false);
  const [open, setOpen] = useState(false);
  const portfolios = useRef<HTMLLIElement>(null);
  const portfoliosButton = useRef<HTMLButtonElement>(null);
  const [portfoliosOpen, setPortfoliosOpen] = useState(false);

  // Close the Portfolios panel on a press anywhere outside it.
  useEffect(() => {
    if (!portfoliosOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!portfolios.current?.contains(event.target as Node)) {
        setPortfoliosOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [portfoliosOpen]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The glass ground engages the moment the hero hands off — About
      // entering the viewport — and lets go on the way back up.
      // Readability, not motion, so no reduced-motion gate.
      const about = document.querySelector("#about");
      if (about) {
        ScrollTrigger.create({
          trigger: about,
          start: "top bottom",
          onEnter: () => setGlass(true),
          onLeaveBack: () => setGlass(false),
        });
      }

      // Which section is in view — the nav doubles as a quiet progress
      // indicator, desktop only.
      mm.add(DESKTOP_NAV, () => {
        site.navLinks.forEach(({ href }) => {
          const section = document.querySelector(href);
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle(self) {
              // A section's deactivation can land after its neighbour's
              // activation — only clear a highlight this link still owns.
              if (self.isActive) setActive(href);
              else setActive((current) => (current === href ? null : current));
            },
          });
        });
        return () => setActive(null);
      });
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-50"
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (portfoliosOpen) {
          setPortfoliosOpen(false);
          portfoliosButton.current?.focus();
        } else if (open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-16 border-b border-fg/5 bg-surface/60 backdrop-blur-md transition-opacity duration-500 motion-reduce:transition-none ${
          glass ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Difference-blend keeps the bar legible over the hero shader, but a
          blend layer bypasses the sibling glass's backdrop blur (Chromium
          composites it against the unfiltered backdrop), so it hands off to
          normal rendering while the glass is engaged. The flip happens over
          near-black, where difference reads as identity. The open Portfolios
          panel sits inside this layer, so it takes the same hand-off. */}
      <div
        className={
          glass || portfoliosOpen ? "relative" : "relative mix-blend-difference"
        }
      >
        <div className="mx-auto grid h-16 w-full max-w-[68rem] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10">
          <a
            href="#main"
            className="justify-self-start font-display text-xl font-bold tracking-[0.06em]"
          >
            {site.logo}
          </a>
          <nav aria-label="Site" className="max-md:hidden">
            <ul className="flex items-center gap-9">
              {site.navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`mono-label link-sweep pb-1 transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-muted hover:text-fg"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li
                ref={portfolios}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setPortfoliosOpen(false);
                  }
                }}
              >
                <button
                  ref={portfoliosButton}
                  type="button"
                  aria-expanded={portfoliosOpen}
                  aria-controls="portfolios-menu"
                  onClick={() => setPortfoliosOpen((current) => !current)}
                  className={`mono-label link-sweep pb-1 transition-colors duration-300 ${
                    portfoliosOpen ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {site.portfolios.label}
                </button>
                <MotionConfig reducedMotion="user">
                  <AnimatePresence>
                    {portfoliosOpen && (
                      <motion.ul
                        id="portfolios-menu"
                        initial={{ opacity: 0, x: "-50%", y: -8 }}
                        animate={{ opacity: 1, x: "-50%", y: 0 }}
                        exit={{ opacity: 0, x: "-50%", y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full left-1/2 mt-5 w-max rounded-xl border border-fg/5 bg-surface/90 p-2 backdrop-blur-xl"
                      >
                        {site.portfolios.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setPortfoliosOpen(false)}
                              className="mono-label flex items-center justify-between gap-6 rounded-lg px-4 py-3 text-muted transition-colors duration-300 hover:text-fg"
                            >
                              <span className="link-sweep pb-1">{link.label}</span>
                              <ArrowUpRightIcon className="size-3 shrink-0" />
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </MotionConfig>
              </li>
            </ul>
          </nav>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((current) => !current)}
            className="mono-label col-start-3 justify-self-end text-muted transition-colors duration-300 hover:text-fg md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
            <motion.nav
              id="site-menu"
              aria-label="Site"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="border-b border-fg/5 bg-surface/85 backdrop-blur-xl md:hidden"
            >
              <ul className="mx-auto w-full max-w-[68rem] px-6 py-4 sm:px-10">
                {site.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="mono-label block py-4 text-muted transition-colors duration-300 hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 border-t border-fg/5 pt-4">
                  <p className="mono-label py-2 text-muted/60">
                    {site.portfolios.label}
                  </p>
                  <ul>
                    {site.portfolios.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="mono-label flex items-center gap-3 py-4 text-muted transition-colors duration-300 hover:text-fg"
                        >
                          {link.label}
                          <ArrowUpRightIcon className="size-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </MotionConfig>
    </header>
  );
}
