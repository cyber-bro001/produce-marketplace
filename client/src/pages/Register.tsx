import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { register } from "../api/auth";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ThemeToggle from "../components/ThemeToggle";

import { styles } from "../styles";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const { name, email, phone, password } = formData;

    if (!name || !email || !phone || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await register(formData);

      navigate("/login");
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
    <main
      className={`${styles.layout.page} flex items-center justify-center px-6 py-10`}
      style={{
        background: "var(--background)",
      }}
    >
      <div
        className="w-full max-w-lg rounded-[var(--radius-lg)] border p-8"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className={styles.typography.h2}>Create Account</h1>

            <p
              style={{
                color: "var(--muted)",
              }}
            >
              Join the Produce Marketplace.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234..."
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="space-y-2">
            <label className={styles.typography.label}>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.components.input}
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <option value="buyer">Buyer</option>

              <option value="seller">Seller</option>
            </select>
          </div>

          {error && (
            <div
              className={styles.components.alert}
              style={{
                borderColor: "var(--danger)",
                color: "var(--danger)",
              }}
            >
              {error}
            </div>
          )}

          <Button loading={loading} type="submit">
            Create Account
          </Button>

          <p
            className="text-center"
            style={{
              color: "var(--muted)",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--primary)",
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
