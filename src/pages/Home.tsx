import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Button from "../components/Button";
import Icon from "../components/Icon";
import SystemHubVisual from "../components/SystemHubVisual";
import Reveal, { Stagger, staggerItem } from "../components/Reveal";
import CountUp from "../components/CountUp";
import CtaBand from "../components/CtaBand";
import {
  solutions,
  industries,
  stats,
  method,
  company,
  solutionImages,
  industryImages,
} from "../data/site";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Seo
        title="Telegroup Security | Protection, Engineered — Windsor & Essex County"
        description="Telegroup Security designs, installs, and supports AI surveillance, access control, alarms, networking, and low-voltage infrastructure across Windsor–Essex and Southwestern Ontario. One accountable team, engineered around your property."
        path="/"
      />

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {company.region}
            </motion.span>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Protection,
              <br />
              <span className="gold">Engineered.</span>
            </motion.h1>

            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Security technology and low-voltage infrastructure — designed,
              installed, and supported by one accountable team. We build systems
              that detect, deter, and respond, not just record.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32 }}
            >
              <Button to="/contact">Request a Quote</Button>
              <Button to="/solutions" variant="ghost">
                Explore Solutions
              </Button>
            </motion.div>

            <motion.ul
              className="hero__capabilities"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {["AI Surveillance", "Access Control", "Alarms", "Networking", "Low-Voltage"].map(
                (c) => (
                  <li key={c}>{c}</li>
                )
              )}
            </motion.ul>
          </div>

          <SystemHubVisual />
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="section--tight stats">
        <div className="stats__glow" aria-hidden="true" />
        <div className="container">
          <Stagger className="stats__grid">
            {stats.map((s) => (
              <motion.div key={s.label} className="stats__item" variants={staggerItem}>
                <span className="stats__icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <div className="stats__value">
                  <CountUp value={s.value} />
                </div>
                <div className="stats__label">{s.label}</div>
                <div className="stats__sub">{s.sub}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- CORE SOLUTIONS ---------------- */}
      <section className="section--white section">
        <div className="container">
          <Reveal className="sectionhead">
            <span className="eyebrow">What we engineer</span>
            <h2 className="h2">Eight capabilities. One integrated system.</h2>
            <p className="lead">
              Each capability can stand alone — together they form a single,
              coherent security and technology infrastructure, built by one
              accountable team.
            </p>
          </Reveal>

          <Stagger className="grid-4 solutions-grid">
            {solutions.map((s) => (
              <motion.div key={s.slug} variants={staggerItem} style={{ display: "flex" }}>
                <Link to={`/solutions#${s.slug}`} className="media-card">
                  <div className="media-card__media">
                    <img src={solutionImages[s.slug]} alt={s.title} loading="lazy" />
                    <span className="media-card__badge">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <span className="media-card__index">{s.index}</span>
                  </div>
                  <div className="media-card__body">
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="media-card__more">
                      Learn more <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- DETECT / DETER / RESPOND ---------------- */}
      <section className="section ddr">
        <div className="ddr__glow" aria-hidden="true" />
        <div className="container ddr__inner">
          <Reveal className="ddr__head">
            <span className="eyebrow">The Telegroup difference</span>
            <h2 className="h2 text-balance">
              Designed to <span className="gold">detect</span>,{" "}
              <span className="gold">deter</span>, and{" "}
              <span className="gold">respond</span> — not just record.
            </h2>
            <blockquote className="ddr__quote">
              "Recorded footage is evidence. Detection as it happens is
              protection."
            </blockquote>
          </Reveal>

          <Stagger className="ddr__cards">
            {[
              {
                icon: "eye",
                title: "Detect",
                body: "AI analytics, recognition, and sensors identify threats early — the moment they matter, not hours later.",
              },
              {
                icon: "shield",
                title: "Deter",
                body: "Visible protection and active monitoring discourage activity before it becomes an incident.",
              },
              {
                icon: "bolt",
                title: "Respond",
                body: "Connected systems deliver instant alerts and control, so the right people act faster.",
              },
            ].map((c) => (
              <motion.div key={c.title} className="ddr__card" variants={staggerItem}>
                <div className="card__icon">
                  <Icon name={c.icon} size={26} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- METHOD ---------------- */}
      <section className="section section--light method-sec">
        <div className="method-sec__glow" aria-hidden="true" />
        <div className="container">
          <Reveal className="sectionhead">
            <span className="eyebrow">The Telegroup method</span>
            <h2 className="h2">Engineered in four phases.</h2>
            <p className="lead">
              A disciplined process from first site walk to long-term support —
              so nothing is improvised and everything is documented.
            </p>
          </Reveal>

          <Stagger className="method__grid">
            {method.map((m) => (
              <motion.div key={m.index} className="method__item" variants={staggerItem}>
                <span className="method__index">{m.index}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- INDUSTRIES ---------------- */}
      <section className="section--white section">
        <div className="container">
          <Reveal className="sectionhead">
            <span className="eyebrow">Industries we serve</span>
            <h2 className="h2">Built around how each property works.</h2>
            <p className="lead">
              We don't sell equipment packages. We engineer systems around the
              site, the operation, and the level of risk — so the solution fits
              the way the property is actually used.
            </p>
          </Reveal>

          <Stagger className="industries-preview">
            {industries.map((ind) => (
              <motion.div key={ind.slug} variants={staggerItem} style={{ display: "flex" }}>
                <Link to={`/industries#${ind.slug}`} className="ind-tile">
                  <img src={industryImages[ind.slug]} alt={ind.title} loading="lazy" />
                  <div className="ind-tile__overlay" />
                  <div className="ind-tile__content">
                    <Icon name={ind.icon} size={26} className="ind-tile__icon" />
                    <span className="ind-tile__title">{ind.title}</span>
                    <span className="ind-tile__arrow">
                      Explore <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Stagger>

          <Reveal className="home__ind-cta" delay={0.1}>
            <Button to="/industries">View all industries</Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
