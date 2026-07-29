import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p
        className="text-8xl font-bold"
        style={{ color: "var(--primary)" }}
      >
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium text-white"
        style={{ background: "var(--primary)" }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
