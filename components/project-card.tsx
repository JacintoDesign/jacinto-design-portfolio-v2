import Image from "next/image";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-card bg-surface">
      <Image
        src={project.screenshot}
        alt={project.alt}
        width={1920}
        height={1020}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="w-full"
      />
      <div className="p-8">
        <p className="text-sm text-muted">{project.index}</p>
        <h3 className="mt-2 font-display text-2xl tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.tags.join(" · ")}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-6 text-sm">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            Live site
            <span className="sr-only">
              {" "}
              — {project.title} (opens in new tab)
            </span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            GitHub
            <span className="sr-only">
              {" "}
              — {project.title} (opens in new tab)
            </span>
          </a>
        </p>
      </div>
    </article>
  );
}
