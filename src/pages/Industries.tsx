import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Reveal, { Stagger, staggerItem } from "../components/Reveal";
import CtaBand from "../components/CtaBand";
import CoverageRadarVisual from "../components/CoverageRadarVisual";
import { industries, industryImages } from "../data/site";
import "./Industries.css";

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve | Construction, Commercial, Industrial & More — Telegroup Security"
        description="Purpose-built security for construction sites, commercial properties, residential & multi-family, industrial & manufacturing, restaurant & retail, auto dealerships, special events, and municipal & government across Windsor–Essex."
        path="/industries"
      />

      <section className="pagehero">
        <div className="pagehero__grid" aria-hidden="true" />
        <div className="container pagehero__inner pagehero__inner--split">
          <div className="pagehero__copy">
            <span className="eyebrow">Industries we serve</span>
            <h1 className="display">
              Purpose-built for <span className="gold">your property.</span>
            </h1>
            <p className="lead">
              Every property has its own security challenges. We design each system
              around the site, the operation, and the level of risk — so the
              solution fits the way the property is actually used.
            </p>
            <div className="ind-hero__stats">
              <div>
                <strong>8</strong>
                <span>Industries</span>
              </div>
              <div>
                <strong>Site-first</strong>
                <span>Design</span>
              </div>
              <div>
                <strong>One partner</strong>
                <span>Design, install &amp; support</span>
              </div>
            </div>
          </div>
          <div className="pagehero__visual">
            <CoverageRadarVisual />
          </div>
        </div>
      </section>

      <section className="section industries-list">
        <div className="container">
          {industries.map((ind, i) => (
            <article key={ind.slug} id={ind.slug} className="ind-block">
              <Reveal className="ind-block__banner" y={20}>
                <img src={industryImages[ind.slug]} alt={ind.title} loading="lazy" />
                <div className="ind-block__banner-overlay" />
                <div className="ind-block__banner-content">
                  <div className="ind-block__icon">
                    <Icon name={ind.icon} size={28} />
                  </div>
                  <div>
                    <span className="ind-block__num">
                      {String(i + 1).padStart(2, "0")} — Industry
                    </span>
                    <h2 className="ind-block__title">{ind.title}</h2>
                  </div>
                </div>
              </Reveal>

              <div className="ind-block__grid">
                <Reveal className="ind-block__intro" delay={0.05}>
                  <p className="ind-block__headline gold">{ind.headline}</p>
                  <p className="ind-block__desc">{ind.description}</p>
                  <div className="tags">
                    {ind.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Button to="/contact" variant="ghost" className="ind-block__cta">
                    Request a quote
                  </Button>
                </Reveal>

                <Reveal className="ind-block__needs" delay={0.12}>
                  <p className="ind-block__needs-label">Common needs</p>
                  <Stagger className="ind-needs-grid" gap={0.05}>
                    {ind.needs.map((n) => (
                      <motion.div key={n} className="ind-need" variants={staggerItem}>
                        <Icon name="check" size={16} />
                        <span>{n}</span>
                      </motion.div>
                    ))}
                  </Stagger>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title={
          <>
            Built for <span className="gold">your property.</span>
          </>
        }
        text="Tell us about your property, and we'll help you choose the right security solution — designed around the way you actually use the site."
      />
    </>
  );
}
