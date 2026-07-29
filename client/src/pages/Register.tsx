import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer" as "buyer" | "seller",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(formData);
      navigate(formData.role === "seller" ? "/dashboard" : "/", {
        replace: true,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Registration failed.");
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
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Join the marketplace today
          </p>
        </div>

        <div
          className="rounded-[var(--radius-lg)] border p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
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
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08012345678"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />

            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                I want to
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="h-14 w-full rounded-[var(--radius-md)] border px-5 text-sm outline-none"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <option value="buyer">Buy produce</option>
                <option value="seller">Sell produce</option>
              </select>
            </div>

            {error && (
              <p className="text-sm" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}

            <Button type="submit" loading={loading}>
              Create Account
            </Button>
          </form>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--muted)" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: "var(--primary)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
