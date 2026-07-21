import Image from "next/image";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 py-14 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-5xl tracking-tight text-muted sm:text-6xl">
            {project.index}
          </p>
          <p className="mono-label text-muted">{project.tags.join(" · ")}</p>
        </div>
        <h3 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[36rem] leading-relaxed text-muted">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          {project.tech.map((item, i) => (
            <li key={item} className="flex items-center gap-x-3">
              {i > 0 && <span aria-hidden="true">✦</span>}
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 flex items-center gap-6 text-sm">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            Visit
            <span className="sr-only">
              {" "}
              — {project.title} (opens in new tab)
            </span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            GitHub
            <span className="sr-only">
              {" "}
              — {project.title} (opens in new tab)
            </span>
          </a>
        </p>
      </div>

      <Image
        src={project.screenshot}
        alt={project.alt}
        width={1920}
        height={1020}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full self-center rounded-card border border-muted/20"
      />
    </article>
  );
}
