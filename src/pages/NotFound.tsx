import Seo from "../components/Seo";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | Telegroup Security" description="The page you're looking for could not be found." path="/404" />
      <section
        className="pagehero"
        style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}
      >
        <div className="container pagehero__inner" style={{ margin: "0 auto" }}>
          <span className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Error 404
          </span>
          <h1 className="display" style={{ marginTop: 20 }}>
            Page <span className="gold">not found.</span>
          </h1>
          <p className="lead" style={{ margin: "22px auto 0" }}>
            The page you're looking for doesn't exist or may have moved. Let's get
            you back to safety.
          </p>
          <div style={{ marginTop: 34, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Button to="/">Back to Home</Button>
            <Button to="/contact" variant="ghost">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
