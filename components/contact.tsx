import { contact } from "@/lib/content";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">
        <div className="max-w-[42rem]">
          <p className="text-sm font-medium tracking-widest text-muted uppercase">
            {contact.eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="mt-6 font-display text-3xl leading-tight tracking-tight sm:text-4xl"
          >
            {contact.heading}
          </h2>
          <p className="mt-4 text-muted">
            {contact.supporting}{" "}
            <a href={`mailto:${contact.email}`} className="text-accent">
              {contact.email}
            </a>
            .
          </p>

          {/* Backend intentionally unwired this phase; connected and tested
              end to end before ship. */}
          <form className="mt-12 space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className="rounded-card border border-muted/30 bg-surface px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className="rounded-card border border-muted/30 bg-surface px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                className="rounded-card border border-muted/30 bg-surface px-4 py-3"
              />
            </div>
            <button
              type="submit"
              className="rounded-card bg-surface px-6 py-3 text-sm font-medium text-accent"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
