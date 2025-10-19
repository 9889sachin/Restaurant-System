"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { update } = useSession(); 

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    setLoading(false);

    if (!res.error) {
      await update(); 
      router.push("/menu");
      
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Welcome Back! 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
            Log in to manage your orders.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
                    Logging In...
                </>
            ) : (
                <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-orange-600 font-semibold hover:text-orange-700 transition">
                Register Here
            </Link>
        </p>
      </div>
    </div>
  );
}