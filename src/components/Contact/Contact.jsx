import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { profile, socials } from "../../data/portfolio";
import SplitText from "../ui/SplitText";
import Magnetic from "../ui/Magnetic";

/** Floating-label field: the label sits inside the input and lifts on focus / when filled. */
function Field({ id, label, as = "input", ...props }) {
  const Tag = as;
  return (
    <div className="group relative">
      <Tag
        id={id}
        name={id}
        placeholder=" "
        required
        className="peer w-full resize-none border-b border-line-strong bg-transparent pb-3 pt-7 text-lg text-fg outline-none transition-colors duration-500 focus:border-accent"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-0 text-xs uppercase tracking-[0.16em] text-subtle transition-all duration-500 ease-[var(--ease-out-expo)] peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-accent"
      >
        {label}
      </label>
      {/* focus underline that draws from the left */}
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] peer-focus:scale-x-100" />
    </div>
  );
}

/**
 * Contact: oversized kinetic invitation, a magnetic "say hello" orb,
 * contact rows with animated arrows, and a glass form.
 *
 * The site has no backend, so the form composes a pre-filled email in the
 * visitor's mail app instead of pretending to send.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app…");
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <section id="contact" className="section overflow-hidden" aria-labelledby="contact-title">
      <div aria-hidden="true" data-speed="0.4" className="orb left-1/2 top-[10%] h-[70vmin] w-[70vmin] -translate-x-1/2 bg-[radial-gradient(circle,var(--color-accent),transparent_60%)] !opacity-20" />

      <div className="shell relative">
        <p className="eyebrow mb-8" data-reveal="fade">
          <span className="text-accent">(05)</span> Get in touch
        </p>
        <h2 id="contact-title" className="font-display text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]" data-reveal="words">
          <SplitText type="words" text="Let's build something" />{" "}
          <SplitText type="words" text="amazing together." className="text-accent" />
        </h2>
        <p className="mt-8 max-w-xl text-[length:var(--step-lead)] leading-snug text-muted" data-reveal="up">
          Open to new opportunities, collaborations, and exciting projects. I'd love to hear from you.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          {/* ---- Direct contact ---- */}
          <div className="lg:col-span-5">
            <div data-reveal="up">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-accent font-display text-lg font-semibold text-ink shadow-[var(--shadow-glow)] md:h-48 md:w-48"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                  <span className="relative flex items-center gap-2">
                    Say hello <FaArrowRight aria-hidden="true" className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                  </span>
                </a>
              </Magnetic>
            </div>

            <ul className="mt-14 border-t border-line" data-reveal="stagger">
              {socials.map(({ label, handle, href, icon: Icon }) => (
                <li key={label} data-reveal-item className="border-b border-line">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <Icon aria-hidden="true" className="shrink-0 text-xl text-subtle transition-colors group-hover:text-accent" />
                      <span className="min-w-0">
                        <span className="label block">{label}</span>
                        <span className="block truncate text-fg transition-colors group-hover:text-accent">{handle}</span>
                      </span>
                    </span>
                    <FaArrowRight aria-hidden="true" className="shrink-0 -rotate-45 text-subtle transition-all duration-500 group-hover:rotate-0 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Form ---- */}
          <form onSubmit={handleSubmit} className="glass space-y-8 p-7 md:p-10 lg:col-span-6 lg:col-start-7" data-reveal="up" data-delay="0.1">
            <p className="label">Or send a message</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Field id="name" label="Your Name" type="text" autoComplete="name" value={form.name} onChange={update("name")} />
              <Field id="email" label="Your Email" type="email" autoComplete="email" value={form.email} onChange={update("email")} />
            </div>
            <Field id="message" label="Message" as="textarea" rows={4} value={form.message} onChange={update("message")} />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Magnetic strength={0.25}>
                <button type="submit" className="btn btn-solid">
                  Send Message <FaArrowRight aria-hidden="true" />
                </button>
              </Magnetic>
              <p role="status" aria-live="polite" className="text-sm text-accent">
                {status}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
