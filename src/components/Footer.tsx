import { Link } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icon";
import { company, solutions, industries } from "../data/site";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Telegroup Security home">
            <Logo variant="on-dark" height={88} />
          </Link>
          <p className="footer__tag">
            Security technology and low-voltage infrastructure, designed,
            installed, and supported by one accountable team.
          </p>
          <p className="footer__region">{company.region}</p>
          <div className="footer__social" aria-label="Social media">
            <a href={company.social.facebook} aria-label="Facebook" className="footer__soc">
              <Icon name="facebook" size={17} />
            </a>
            <a href={company.social.instagram} aria-label="Instagram" className="footer__soc">
              <Icon name="instagram" size={17} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Solutions</h3>
          <ul>
            {solutions.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/solutions#${s.slug}`}>{s.title.replace(" Systems", "").replace(" Infrastructure", "")}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Industries</h3>
          <ul>
            {industries.map((i) => (
              <li key={i.slug}>
                <Link to={`/industries#${i.slug}`}>{i.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__contact">
          <h3 className="footer__heading">Contact</h3>
          <ul>
            <li>
              <a href={company.phoneHref}>
                <Icon name="phone" size={16} /> {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}>
                <Icon name="mail" size={16} /> {company.email}
              </a>
            </li>
            <li>
              <a href="https://telegroup.ca">
                <Icon name="globe" size={16} /> {company.web}
              </a>
            </li>
            <li className="footer__addr">
              <Icon name="pin" size={16} />
              <span>
                {company.address.street}
                <br />
                {company.address.city} {company.address.region} {company.address.postal}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} Telegroup Security. All rights reserved.</p>
        <p className="footer__power">
          <span className="gold">The Power To Protect</span>
        </p>
      </div>
    </footer>
  );
}
