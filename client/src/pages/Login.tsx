import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      const stored = localStorage.getItem("user");
      const user = stored ? JSON.parse(stored) : null;
      const dest = from || (user?.role === "seller" ? "/dashboard" : "/");
      navigate(dest, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Login failed.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Sign in to your account
          </p>
        </div>

        <div
          className="rounded-[var(--radius-lg)] border p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {error && (
              <p className="text-sm" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}

            <Button type="submit" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium hover:underline"
              style={{ color: "var(--primary)" }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
