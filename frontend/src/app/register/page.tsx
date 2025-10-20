"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components";
import api from "@/utils/api";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface RegisterResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters with a number and special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      // newErrors.termsAccepted = "You must accept the terms and conditions";
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
      const response = await api.post<RegisterResponse>("/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Store token in localStorage by default for registration
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });

      // Redirect to dashboard or onboarding
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during registration. Please try again.";

      // Check if it's an email already exists error
      if (message.toLowerCase().includes("already exists")) {
        setErrors({ email: message });
      } else {
        setErrors({ email: message });
      }
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
        <div className="p-8 sm:p-10 bg-teal-50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold flex items-center">
              <span className="mr-2">✨</span> Create a New Account
            </h2>
            <span className="border px-3 py-1 rounded-full text-xs font-medium text-teal-600 border-teal-400">
              Secure
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Join Rajmahal to rent your dream outfit
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="text-sm text-gray-500 mb-1 block"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-red-500 text-xs mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

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
                  placeholder="Create a password"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-500 mb-1 block"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
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
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-start">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 mt-0.5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                  aria-describedby={
                    errors.termsAccepted ? "terms-error" : undefined
                  }
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-teal-600 underline hover:text-teal-700"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errors.termsAccepted && (
                <p id="terms-error" className="text-red-500 text-xs mt-1 ml-6">
                  {errors.termsAccepted}
                </p>
              )}
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-teal-600 underline hover:text-teal-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
