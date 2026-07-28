import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Leaf } from "lucide-react";

import { login } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let valid = true;

    setError("");
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password.trim()) {
      setError("Password is required.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

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
        setError(err.response?.data?.message || "Login failed.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <Leaf className="h-8 w-8 text-green-700" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-center text-gray-500">
            Login to your Produce Marketplace account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 placeholder:text-gray-400
                ${
                  emailError
                    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                }`}
            />

            {emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-green-600 transition hover:text-green-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-green-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-[3px] border-white border-t-transparent" />

                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
