import { Link } from "react-router-dom";
import Icon from "./Icon";
import "./Button.css";

type Variant = "primary" | "ghost" | "dark";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  icon?: string;
  className?: string;
};

type ButtonAsLink = BaseProps & { to: string; href?: never };
type ButtonAsAnchor = BaseProps & { href: string; to?: never };
type ButtonAsButton = BaseProps & {
  to?: never;
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type Props = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

export default function Button(props: Props) {
  const { children, variant = "primary", icon = "arrow", className = "" } = props;
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} className="btn__icon" />}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={cls}>
        {inner}
      </a>
    );
  }
  const { onClick, type = "button" } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
