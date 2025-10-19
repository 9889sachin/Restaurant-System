"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registration successful!");
        router.push("/login");
      } else {
        const errorMessage = data.error || "Registration failed. Please check your details.";
        setError(errorMessage);
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100">
        
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Create Account 📝
        </h2>
        <p className="text-center text-gray-500 mb-8">
            Start ordering your favorite food today!
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Set Password (min. 6 characters)"
              className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
                <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Registering...
                </>
            ) : (
                "Register Now"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 font-semibold hover:text-orange-700 transition">
                Login Here
            </Link>
        </p>
      </div>
    </div>
  );
}