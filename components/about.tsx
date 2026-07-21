import { about } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="border-t border-muted/20 pt-10">
          <p className="mono-label text-muted">
            01<span aria-hidden="true"> / </span>
            {about.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="mt-8 max-w-[46rem] font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl"
          >
            {about.heading}
          </h2>
        </div>

        <dl className="mt-20 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-muted/20">
          {about.stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "sm:pl-10" : undefined}>
              <dd className="font-display text-6xl tracking-tight sm:text-7xl">
                {stat.value}
              </dd>
              <dt className="mono-label mt-3 text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <ol className="mt-24 divide-y divide-muted/20 border-t border-muted/20">
          {about.storyBeats.map((beat) => (
            <li
              key={beat.index}
              className="grid gap-4 py-10 sm:grid-cols-[8rem_1fr] sm:gap-10"
            >
              <p className="font-display text-2xl tracking-tight text-muted">
                {beat.index}
              </p>
              <div className="max-w-[42rem]">
                <h3 className="font-display text-xl tracking-tight">
                  {beat.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{beat.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
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
        </div>
      </div>
    </section>
  );
}
