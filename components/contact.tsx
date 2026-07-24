import { contact } from "@/lib/content";
import { ArrowUpRightIcon, MapPinIcon } from "@/components/icons";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="grid gap-16 border-t border-muted/20 pt-10 lg:grid-cols-2">
          <div>
            <p className="mono-label text-muted">
              03<span aria-hidden="true"> / </span>
              {contact.eyebrow}
            </p>
            <h2
              id="contact-heading"
              className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-balance"
            >
              {contact.heading}
            </h2>
            <p className="mt-8 max-w-[26rem] leading-relaxed text-muted">
              {contact.supporting}
            </p>
            <p className="mt-8">
              <a
                href={`mailto:${contact.email}`}
                className="link-sweep inline-flex items-center gap-2 font-display text-xl text-accent sm:text-2xl"
              >
                {contact.email}
                <ArrowUpRightIcon className="h-5 w-5" />
              </a>
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <MapPinIcon className="h-4 w-4" />
              {contact.location}
            </p>
          </div>

          {/* Backend intentionally unwired this phase; connected and tested
              end to end before ship. */}
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="mono-label text-muted"
              >
                {contact.form.name.label}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={contact.form.name.placeholder}
                className="rounded-card border border-muted/30 bg-surface px-4 py-3 placeholder:text-muted/60"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="mono-label text-muted"
              >
                {contact.form.email.label}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={contact.form.email.placeholder}
                className="rounded-card border border-muted/30 bg-surface px-4 py-3 placeholder:text-muted/60"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="mono-label text-muted"
              >
                {contact.form.message.label}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder={contact.form.message.placeholder}
                className="resize-none rounded-card border border-muted/30 bg-surface px-4 py-3 placeholder:text-muted/60"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer self-start rounded-full bg-fg px-8 py-4 font-display text-sm text-bg transition-colors duration-300 hover:bg-accent"
            >
              {contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
