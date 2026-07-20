import { site, contact } from "@/lib/content";

export function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto flex w-full max-w-[68rem] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:px-10">
        <p>© 2026 {site.name}</p>
        <p className="flex items-center gap-6">
          <a href={`mailto:${contact.email}`} className="text-accent">
            {contact.email}
          </a>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            GitHub
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
