import { hero } from "@/lib/content";
import { NebulaProvider } from "@/components/nebula-uniforms";
import { ShaderBackground } from "@/components/shader-background";
import { HeroIntro } from "@/components/hero-intro";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh w-full flex-col bg-bg"
    >
      <NebulaProvider>
        <ShaderBackground />
        <div className="relative z-10 mx-auto flex w-full max-w-[68rem] flex-1 flex-col px-6 pt-16 sm:px-10">
          <HeroIntro />

          <p
            aria-hidden="true"
            className="mono-label flex items-center gap-4 pb-8 text-muted"
          >
            <span className="inline-block h-px w-10 bg-muted/40" />
            {hero.scrollHint}
          </p>
        </div>
      </NebulaProvider>
    </section>
  );
}
