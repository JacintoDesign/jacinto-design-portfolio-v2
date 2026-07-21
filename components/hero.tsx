import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh w-full flex-col bg-bg"
    >
      {/* Shader canvas mounts here at inset-0 z-0 in the motion phase. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[68rem] flex-1 flex-col px-6 pt-16 sm:px-10">
        <div className="my-auto">
          <p className="mono-label text-muted">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="mt-10 font-display font-bold leading-[0.85] tracking-tight uppercase"
          >
            <span className="block text-[clamp(3.5rem,14vw,13rem)]">
              {hero.name.first}
            </span>
            <span className="text-outline block text-[clamp(3.5rem,14vw,13rem)]">
              {hero.name.second}
            </span>
          </h1>
          <p className="mt-10 max-w-[34rem] text-lg leading-relaxed text-muted">
            {hero.subhead}
          </p>
        </div>

        <p
          aria-hidden="true"
          className="mono-label flex items-center gap-4 pb-8 text-muted"
        >
          <span className="inline-block h-px w-10 bg-muted/40" />
          {hero.scrollHint}
        </p>
      </div>
    </section>
  );
}
