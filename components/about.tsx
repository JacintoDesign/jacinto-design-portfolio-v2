import { about } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="max-w-[42rem]">
          <p className="text-sm font-medium tracking-widest text-muted uppercase">
            {about.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="mt-6 font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl"
          >
            {about.heading}
          </h2>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-5xl tracking-tight">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <ol className="mt-20 max-w-[42rem] space-y-12">
          {about.storyBeats.map((beat) => (
            <li key={beat.index}>
              <p className="text-sm text-muted">{beat.index}</p>
              <h3 className="mt-2 font-display text-xl tracking-tight">
                {beat.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{beat.body}</p>
            </li>
          ))}
        </ol>

        <aside
          aria-labelledby="now-heading"
          className="mt-20 max-w-[42rem] rounded-card bg-surface p-8 sm:p-10"
        >
          <p className="text-sm font-medium tracking-widest text-muted uppercase">
            {about.nowPanel.label}
          </p>
          <h3 id="now-heading" className="mt-4 font-display text-xl tracking-tight">
            {about.nowPanel.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            {about.nowPanel.blurb}
          </p>
        </aside>
      </div>
    </section>
  );
}
