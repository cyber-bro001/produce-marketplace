import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { login } from "../api/auth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ThemeToggle from "../components/ThemeToggle";
import { styles } from "../styles";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
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
    <main
      className={`${styles.layout.page} flex items-center justify-center px-6`}
      style={{
        background: "var(--background)",
      }}
    >
      <div
        className="w-full max-w-md rounded-[var(--radius-lg)] border p-8"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className={styles.typography.h2}>Welcome back</h1>

            <p
              className="mt-2"
              style={{
                color: "var(--muted)",
              }}
            >
              Login to your marketplace account.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

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

          <Button type="submit" loading={loading}>
            Login
          </Button>

          <p
            className="text-center"
            style={{
              color: "var(--muted)",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--primary)",
              }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
