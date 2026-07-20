import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh w-full items-center bg-bg"
    >
      {/* Shader canvas mounts here at inset-0 z-0 in the motion phase. */}
      <div className="relative z-10 mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="max-w-[42rem]">
          <p className="text-sm font-medium tracking-widest text-muted uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted">
            {hero.subhead}
          </p>
          <p className="mt-10 flex items-center gap-8">
            {hero.ctas.map((cta) => (
              <a key={cta.href} href={cta.href} className="text-accent">
                {cta.label}
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
