"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components";
import api from "@/utils/api";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
  };
  token: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Store token based on rememberMe
      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", response.data.token);

      // Optionally store user info
      storage.setItem("user", JSON.stringify(response.data.user));

      // Redirect based on role
      if (response.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password. Please try again.";
      setErrors({ email: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-md sm:max-w-lg font-['Space_Grotesk',sans-serif]">
        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold flex items-center">
              <span className="mr-2">🔒</span> Welcome Back
            </h2>
            <span className="border px-3 py-1 rounded-full text-xs font-medium text-teal-600 border-teal-400">
              Secure
            </span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-500 mb-1 block"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm text-gray-500 mb-1 block"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="rememberMe"
                className="text-sm flex items-center cursor-pointer"
              >
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-teal-600 text-sm underline hover:text-teal-700"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging In...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-teal-600 underline hover:text-teal-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
