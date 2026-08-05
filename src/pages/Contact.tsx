import { useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import Reveal, { Stagger, staggerItem } from "../components/Reveal";
import LiveMonitorVisual from "../components/LiveMonitorVisual";
import { company, propertyTypes, solutions, serviceAreas } from "../data/site";
import "./Contact.css";

type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = "2b34141f-971d-4eaa-8a97-4690b9d2b64a";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  /* The coverage map hands off the checked address and recommended package. */
  const [params] = useSearchParams();
  const prefillLocation = params.get("location") || "";
  const prefillPackage = params.get("package") || "";

  const validate = (data: FormData) => {
    const e: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) e.name = "Please enter your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    if (!String(data.get("phone") || "").trim()) e.phone = "Please enter your phone number.";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("submitting");
    setSubmitError("");

    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "Telegroup Security Website");
    data.append(
      "subject",
      `New Quote Request from ${data.get("name")} - Telegroup Security`
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setSubmitError(
          result.message || "Something went wrong. Please try again or call us directly."
        );
      }
    } catch {
      setStatus("error");
      setSubmitError(
        "We couldn't send your request. Please check your connection and try again."
      );
    }
  };

  const contactCards: {
    icon: string;
    label: string;
    value: ReactNode;
    href?: string;
  }[] = [
    { icon: "phone", label: "Phone", value: company.phone, href: company.phoneHref },
    { icon: "globe", label: "Website", value: company.web, href: "https://telegroup.ca" },
    { icon: "mail", label: "Email", value: company.email, href: `mailto:${company.email}` },
    {
      icon: "pin",
      label: "Address",
      value: (
        <>
          {company.address.street}
          <br />
          {company.address.city} {company.address.region} {company.address.postal}
        </>
      ),
    },
  ];

  return (
    <>
      <Seo
        title="Contact | Request a Quote, Telegroup Security"
        description="Contact Telegroup Security in Windsor, Ontario. Call 519-258-1888 or request a quote. We walk the site, map the risks, and respond with a clear proposal within one business day."
        path="/contact"
      />

      <section className="pagehero">
        <div className="pagehero__grid" aria-hidden="true" />
        <div className="container pagehero__inner pagehero__inner--split contact-hero">
          <div className="pagehero__copy">
            <span className="eyebrow">Contact us</span>
            <h1 className="display">
              Let's engineer your <span className="gold">protection strategy.</span>
            </h1>
            <p className="lead">
              Tell us about your property, your security needs, and the right
              solution for your project. We'll walk the site, map the risks, and
              respond with a clear, itemized proposal within one business day.
            </p>
          </div>
          <div className="pagehero__visual">
            <LiveMonitorVisual videoSrc="/videos/security-monitor.mp4" />
          </div>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-grid">
          {/* Form */}
          <Reveal className="contact-form-wrap" id="contact-form">
            <div className="contact-form-head">
              <div className="card__icon">
                <Icon name="mail" size={24} />
              </div>
              <div>
                <h2>Request a quote</h2>
                <p>Tell us what you need, and we'll get back to you with the next step.</p>
              </div>
            </div>

            {status === "success" ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="contact-success__check">
                  <Icon name="check" size={34} />
                </div>
                <h3>Request received.</h3>
                <p>
                  Thank you, a member of the Telegroup Security team will reach
                  out within one business day.
                </p>
                <button className="btn btn--ghost" onClick={() => setStatus("idle")}>
                  <span>Send another request</span>
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <input
                  type="checkbox"
                  name="botcheck"
                  className="contact-form__honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <Field label="Full name" name="name" error={errors.name} required />
                <Field label="Company name" name="company_name" />
                <Field label="Phone number" name="phone" type="tel" error={errors.phone} required />
                <Field label="Email address" name="email" type="email" error={errors.email} required />
                <Field
                  label="Project location"
                  name="project_location"
                  defaultValue={prefillLocation}
                />
                <div className="field">
                  <label htmlFor="property">Property type</label>
                  <select id="property" name="property_type" defaultValue="">
                    <option value="" disabled>
                      Select property type
                    </option>
                    {propertyTypes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="service">Service needed</label>
                  <select id="service" name="service_needed" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {solutions.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Complete System">Complete System / Not sure yet</option>
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="details">Project details</label>
                  <textarea
                    id="details"
                    name="project_details"
                    rows={4}
                    defaultValue={
                      prefillPackage
                        ? `Security Snapshot suggested: ${prefillPackage}.\n\n`
                        : undefined
                    }
                    placeholder="Tell us about your property, entrances, current systems, and what you'd like to protect."
                  />
                </div>
                {status === "error" && (
                  <div className="field--full contact-form__error" role="alert">
                    <Icon name="alert" size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="field--full">
                  <button
                    type="submit"
                    className="btn btn--primary contact-submit"
                    disabled={status === "submitting"}
                  >
                    <span>{status === "submitting" ? "Sending…" : "Submit request"}</span>
                    {status !== "submitting" && <Icon name="arrow" size={18} className="btn__icon" />}
                  </button>
                </div>
              </form>
            )}

            <div className="contact-trust">
              {[
                { icon: "shield", t: "Fast response" },
                { icon: "check", t: "Expert advice" },
                { icon: "target", t: "Custom solutions" },
                { icon: "headset", t: "Ongoing support" },
              ].map((b) => (
                <div key={b.t} className="contact-trust__item">
                  <Icon name={b.icon} size={18} />
                  <span>{b.t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal className="contact-info" delay={0.1}>
            <h2 className="contact-info__heading">Contact information</h2>
            <div className="contact-cards">
              {contactCards.map((c) => (
                <div key={c.label} className="contact-card">
                  <div className="contact-card__icon">
                    <Icon name={c.icon} size={20} />
                  </div>
                  <div>
                    <span className="contact-card__label">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} className="contact-card__value">
                        {c.value}
                      </a>
                    ) : (
                      <span className="contact-card__value">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-hours">
              <Icon name="clock" size={18} />
              <div>
                <strong>Response time</strong>
                <span>Quotes delivered within one business day.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service areas */}
      <section className="section--light section areas-sec">
        <div className="container">
          <Reveal className="sectionhead sectionhead--center">
            <span className="eyebrow">Service areas</span>
            <h2 className="h2">Serving Windsor, Essex &amp; beyond.</h2>
          </Reveal>
          <Stagger className="areas-grid" gap={0.04}>
            {serviceAreas.map((a) => (
              <motion.div key={a} className="area-chip" variants={staggerItem}>
                <Icon name="pin" size={16} />
                <span>{a}</span>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
      />
      {error && (
        <span className="field__err" id={`${name}-err`}>
          {error}
        </span>
      )}
    </div>
  );
}
