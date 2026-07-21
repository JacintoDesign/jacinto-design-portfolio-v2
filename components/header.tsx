import { site } from "@/lib/content";

export function Header() {
  return (
    <header className="mix-blend-difference fixed inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto grid h-16 w-full max-w-[68rem] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10">
        <a
          href="#main"
          className="justify-self-start font-display text-xl font-bold tracking-[0.06em]"
        >
          {site.logo}
        </a>
        <nav aria-label="Site">
          <ul className="flex items-center gap-6 sm:gap-9">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mono-label text-muted hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
