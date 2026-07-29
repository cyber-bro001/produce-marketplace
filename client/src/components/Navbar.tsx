import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
  ClipboardList,
  User,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const close = () => setMenuOpen(false);

  const buyerLinks = [
    { to: "/buyer/orders", label: "My Orders", icon: <ClipboardList size={16} /> },
    { to: "/profile", label: "Profile", icon: <User size={16} /> },
  ];

  const sellerLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { to: "/seller/products", label: "My Products", icon: <Package size={16} /> },
    { to: "/seller/orders", label: "Orders", icon: <ClipboardList size={16} /> },
    { to: "/profile", label: "Profile", icon: <User size={16} /> },
  ];

  const navLinks = user?.role === "seller" ? sellerLinks : buyerLinks;

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg"
          style={{ color: "var(--primary)" }}
        >
          <Leaf size={22} />
          <span>ProduceMarket</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--background)]"
            style={{ color: "var(--foreground)" }}
          >
            Home
          </Link>

          {isAuthenticated &&
            navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--background)]"
                style={{ color: "var(--foreground)" }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Cart — buyers only */}
          {isAuthenticated && user?.role === "buyer" && (
            <Link
              to="/cart"
              className="relative rounded-lg p-2 hover:bg-[var(--background)]"
              style={{ color: "var(--foreground)" }}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: "var(--danger)" }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Desktop auth */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--background)] md:flex"
              style={{ color: "var(--muted)" }}
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-[var(--background)]"
                style={{ color: "var(--foreground)" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "var(--primary)" }}
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="rounded-lg p-2 md:hidden hover:bg-[var(--background)]"
            style={{ color: "var(--foreground)" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t md:hidden"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex flex-col px-4 py-3 gap-1">
            <Link
              to="/"
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--background)]"
              style={{ color: "var(--foreground)" }}
            >
              Home
            </Link>

            {isAuthenticated &&
              navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={close}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--background)]"
                  style={{ color: "var(--foreground)" }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

            {isAuthenticated && user?.role === "buyer" && (
              <Link
                to="/cart"
                onClick={close}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--background)]"
                style={{ color: "var(--foreground)" }}
              >
                <ShoppingCart size={16} />
                Cart{totalItems > 0 && ` (${totalItems})`}
              </Link>
            )}

            <div
              className="my-2 border-t"
              style={{ borderColor: "var(--border)" }}
            />

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-[var(--background)]"
                style={{ color: "var(--muted)" }}
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--background)]"
                  style={{ color: "var(--foreground)" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white"
                  style={{ background: "var(--primary)" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
