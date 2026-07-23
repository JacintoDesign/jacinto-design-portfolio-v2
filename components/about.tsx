import { about } from "@/lib/content";
import { AboutHeading } from "@/components/about-heading";
import { AboutStats } from "@/components/about-stats";
import { AboutCards } from "@/components/about-cards";
import { AboutTimeline } from "@/components/about-timeline";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 sm:py-32"
    >
      {/* Heading and stats stay in normal flow — the timeline below pins
          on its own, full-bleed, so these scroll away above it. */}
      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="border-t border-muted/20 pt-10">
          <p className="mono-label text-muted">
            01<span aria-hidden="true"> / </span>
            {about.eyebrow}
          </p>
          <AboutHeading>{about.heading}</AboutHeading>
        </div>

        <AboutStats />
      </div>

      <AboutTimeline />

      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <AboutCards>
          <aside
            aria-labelledby="course-heading"
            className="rounded-card border border-muted/20 bg-surface p-8 sm:p-10"
          >
            <p className="mono-label text-muted">{about.latestCourse.label}</p>
            <h3
              id="course-heading"
              className="mt-4 font-display text-xl tracking-tight"
            >
              {about.latestCourse.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              {about.latestCourse.blurb}
            </p>
            <p className="mt-6">
              <a
                href={about.latestCourse.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent underline underline-offset-4"
              >
                {about.latestCourse.linkLabel}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
          </aside>

          <aside
            aria-labelledby="now-heading"
            className="rounded-card border border-muted/20 bg-surface p-8 sm:p-10"
          >
            <p className="mono-label text-muted">{about.nowPanel.label}</p>
            <h3
              id="now-heading"
              className="mt-4 font-display text-xl tracking-tight"
            >
              {about.nowPanel.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              {about.nowPanel.blurb}
            </p>
          </aside>
        </AboutCards>
      </div>
    </section>
  );
}
