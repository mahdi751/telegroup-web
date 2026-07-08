import Button from "./Button";
import { company } from "../data/site";
import Reveal from "./Reveal";
import "./CtaBand.css";

type Props = {
  title?: React.ReactNode;
  text?: string;
};

export default function CtaBand({
  title = (
    <>
      Let's engineer your <span className="gold">protection strategy.</span>
    </>
  ),
  text = "Tell us about your property. We'll walk the site, map the risks, and respond with a clear, itemized proposal within one business day.",
}: Props) {
  return (
    <section className="ctaband">
      <div className="ctaband__inner">
        <div className="ctaband__glow" aria-hidden="true" />
        <Reveal className="ctaband__content">
          <h2 className="h2 text-balance">{title}</h2>
          <p className="lead">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="ctaband__actions">
          <Button to="/contact">Request a Quote</Button>
          <Button href={company.phoneHref} variant="ghost" icon="phone">
            {company.phone}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
