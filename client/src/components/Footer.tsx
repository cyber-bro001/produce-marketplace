import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div
            className="flex items-center gap-2 font-bold"
            style={{ color: "var(--primary)" }}
          >
            <span>Ketlam</span>
          </div>

          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Ketlam, get fresh produce and foodstuffs direct from trusted
            sellers.
          </p>

          <div className="flex gap-4 text-sm" style={{ color: "var(--muted)" }}>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/register" className="hover:underline">
              Sell with us
            </Link>
          </div>
        </div>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: "var(--muted)" }}
        >
          © {new Date().getFullYear()} Ketlam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
