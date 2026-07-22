import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import Button from "./Button";
import Icon from "./Icon";
import { company } from "../data/site";
import { useTheme } from "../theme/ThemeContext";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" aria-label="Telegroup Security home">
          <Logo height={72} />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={company.phoneHref} className="nav__phone">
            <Icon name="phone" size={19} />
            <span>{company.phone}</span>
          </a>
          <Button to="/contact#contact-form" className="nav__cta">
            Request a Quote
          </Button>
        </div>

        <button
          className="nav__theme"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
        </button>

        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? "open" : ""} />
          <span className={open ? "open" : ""} />
          <span className={open ? "open" : ""} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="nav__mobile-links" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `nav__mobile-link ${isActive ? "nav__mobile-link--active" : ""}`
                    }
                  >
                    <span>{l.label}</span>
                    <Icon name="arrow" size={18} />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="nav__mobile-foot">
              <a href={company.phoneHref} className="nav__phone">
                <Icon name="phone" size={17} />
                <span>{company.phone}</span>
              </a>
              <Button to="/contact#contact-form">Request a Quote</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
