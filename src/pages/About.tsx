import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Reveal, { Stagger, staggerItem } from "../components/Reveal";
import CtaBand from "../components/CtaBand";
import { stats, method, whyUs } from "../data/site";
import "./About.css";

export default function About() {
  return (
    <>
      <Seo
        title="About | A Family Heritage in Security — Telegroup Security"
        description="Telegroup Security is built on a family heritage in security and low-voltage work spanning more than four decades, carried into the next generation in Canada and combined with modern technology."
        path="/about"
      />

      <section className="pagehero">
        <div className="pagehero__grid" aria-hidden="true" />
        <div className="container pagehero__inner">
          <span className="eyebrow">About us</span>
          <h1 className="display">
            Built on experience.
            <br />
            <span className="gold">Focused on protection.</span>
          </h1>
          <p className="lead">
            Telegroup Security designs, installs, and supports security and
            technology infrastructure for commercial, industrial, and residential
            properties — built around one goal: helping clients protect their
            property with systems that are clean, reliable, and designed for
            long-term use.
          </p>
          <div className="pagehero__actions about-hero__actions">
            <Button to="/contact">Request a Quote</Button>
            <Button href="#story" variant="ghost">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section--tight about-stats">
        <div className="container">
          <Stagger className="about-stats__grid">
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="about-stat">
                <span className="about-stat__value">{s.value}</span>
                <span className="about-stat__label">{s.label}</span>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="section about-story">
        <div className="container about-story__grid">
          <Reveal className="about-story__copy">
            <span className="eyebrow">Our story</span>
            <h2 className="h2">
              Experience that <span className="gold">builds confidence.</span>
            </h2>
            <p>
              Telegroup Security comes from a family background in security,
              technology, and low-voltage work that started more than 40 years
              ago. What began as a family business overseas has continued through
              the next generation in Canada — with the same focus on hard work,
              reliable service, and protecting people's properties the right way.
            </p>
            <p>
              Today, Telegroup Security combines that experience with modern
              technology — AI surveillance, access control, alarm systems,
              intercoms, networking, automation, and monitoring solutions.
            </p>
            <p>
              We are not here to install equipment and leave. We are here to build
              systems that perform, support our clients, and grow with their
              needs.
            </p>
            <blockquote className="about-quote">
              "We don't just install systems. We build solutions that protect what
              matters most."
            </blockquote>
          </Reveal>

          <Reveal className="about-story__aside" delay={0.1}>
            <div className="about-photo">
              <img src="/images/office-team.jpg" alt="The Telegroup Security team at work" loading="lazy" />
              <span className="about-photo__badge">
                <Icon name="people" size={18} /> One accountable team
              </span>
            </div>
            <div className="about-values">
              <h3>What defines us</h3>
              <ul className="checklist">
                {[
                  "A family heritage spanning four decades",
                  "One accountable team, design through support",
                  "Systems engineered around your property",
                  "Licensed & insured in Ontario",
                  "Clean, documented, professional work",
                  "1,000+ projects — residential to industrial",
                ].map((v) => (
                  <li key={v}>
                    <Icon name="check" size={17} />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach / Method */}
      <section className="section about-approach">
        <div className="approach__glow" aria-hidden="true" />
        <div className="container">
          <Reveal className="sectionhead">
            <span className="eyebrow">Our approach</span>
            <h2 className="h2">
              More than security <span className="gold">installation.</span>
            </h2>
            <p className="lead">
              Security should not be treated as a basic product on the wall. Every
              system is planned around the property, the risks, the layout, and
              the people who use it every day.
            </p>
          </Reveal>

          <Stagger className="grid-4 approach__grid">
            {method.map((m) => (
              <motion.div key={m.index} className="approach-card" variants={staggerItem}>
                <span className="approach-card__num">{m.index}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why choose */}
      <section className="section--light section why-sec">
        <div className="container">
          <Reveal className="sectionhead sectionhead--center">
            <span className="eyebrow">Why clients choose Telegroup</span>
            <h2 className="h2">
              Trusted. Reliable. <span className="gold">Built to perform.</span>
            </h2>
          </Reveal>

          <Stagger className="grid-3 why-grid">
            {whyUs.map((w) => (
              <motion.div key={w.title} className="why-card" variants={staggerItem}>
                <div className="why-card__icon">
                  <Icon name={w.icon} size={26} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Built to <span className="gold">protect.</span> Trusted to{" "}
            <span className="gold">perform.</span>
          </>
        }
        text="Tell us about your property, and we'll help you build the right security technology solution."
      />
    </>
  );
}
