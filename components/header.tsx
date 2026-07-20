import { site } from "@/lib/content";

export function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-[68rem] items-center justify-between px-6 py-8 sm:px-10">
        <p className="font-display text-sm tracking-wide">{site.name}</p>
        <nav aria-label="Site">
          <ul className="flex items-center gap-6 sm:gap-8">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-accent">
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
