import { projects, projectsSection } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="w-full py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="max-w-[42rem]">
          <p className="text-sm font-medium tracking-widest text-muted uppercase">
            {projectsSection.eyebrow}
          </p>
          <h2
            id="work-heading"
            className="mt-6 font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl"
          >
            {projectsSection.heading}
          </h2>
        </div>
        <ul className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.index}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
