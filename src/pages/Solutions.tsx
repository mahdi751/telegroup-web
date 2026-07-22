import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Reveal, { Stagger, staggerItem } from "../components/Reveal";
import CtaBand from "../components/CtaBand";
import BuildingVisual from "../components/BuildingVisual";
import { solutions, assurance, solutionImages } from "../data/site";
import "./Solutions.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Telegroup Security Solutions",
  itemListElement: solutions.map((s, i) => ({
    "@type": "Service",
    position: i + 1,
    name: s.title,
    description: s.short,
  })),
};

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions | AI Surveillance, Access Control & Low-Voltage — Telegroup Security"
        description="Eight integrated capabilities: AI surveillance, access control, alarms, network infrastructure, smart automation, low-voltage cabling, mobile camera towers, and 24/7 monitoring — engineered around your property."
        path="/solutions"
        jsonLd={jsonLd}
      />

      <section className="pagehero">
        <div className="pagehero__grid" aria-hidden="true" />
        <div className="container pagehero__inner pagehero__inner--split">
          <div className="pagehero__copy">
            <span className="eyebrow">Solutions</span>
            <h1 className="display">
              Built around <span className="gold">your property.</span>
            </h1>
            <p className="lead">
              Every property has different risks, access points, network needs,
              and daily operations. We design each system around how your space is
              actually used — not from one-size-fits-all equipment packages.
            </p>
            <div className="pagehero__actions">
              <Button to="/contact#contact-form">Request a Quote</Button>
              <Button href="#ai-surveillance" variant="ghost" icon="arrow">
                Explore Capabilities
              </Button>
            </div>
          </div>
          <div className="pagehero__visual">
            <BuildingVisual />
          </div>
        </div>
      </section>

      <section className="section solutions-detail">
        <div className="container">
          {solutions.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className={`sol-row ${i % 2 === 1 ? "sol-row--rev" : ""}`}
            >
              <Reveal className="sol-row__media" y={20}>
                <div className="sol-row__panel">
                  <img src={solutionImages[s.slug]} alt={s.title} loading="lazy" />
                  <div className="sol-row__badge">
                    <Icon name={s.icon} size={22} />
                  </div>
                  <span className="sol-row__index">{s.index}</span>
                </div>
              </Reveal>

              <Reveal className="sol-row__body" delay={0.08}>
                <span className="eyebrow">Capability {s.index}</span>
                <h2 className="h2 sol-row__title">{s.title}</h2>
                <p className="lead sol-row__desc">{s.description}</p>
                <Stagger className="sol-row__features">
                  {s.features.map((f) => (
                    <motion.div key={f} className="sol-feat" variants={staggerItem}>
                      <Icon name="check" size={17} />
                      <span>{f}</span>
                    </motion.div>
                  ))}
                </Stagger>
                <Button to="/contact#contact-form" variant="ghost" className="sol-row__cta">
                  Request a quote
                </Button>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* Assurance */}
      <section className="section--light section assurance-sec">
        <div className="container">
          <Reveal className="sectionhead sectionhead--center">
            <span className="eyebrow">Delivery & assurance</span>
            <h2 className="h2">Trusted. Reliable. Built to perform.</h2>
          </Reveal>
          <Stagger className="grid-4">
            {assurance.map((a) => (
              <motion.div key={a.title} className="assurance-card" variants={staggerItem}>
                <div className="assurance-card__check">
                  <Icon name="check" size={20} />
                </div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title={
          <>
            One company. Complete solutions.{" "}
            <span className="gold">Better protection.</span>
          </>
        }
        text="From design to installation and ongoing support, we build systems that work together to protect what matters most."
      />
    </>
  );
}
