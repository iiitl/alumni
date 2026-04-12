"use client"

import Link from "next/link";
import { Section } from "@/components/Section";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [graduationYear, setGraduationYear] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/@iiitl\.ac\.in$/i.test(email)) {
      setError("Only @iiitl.ac.in emails are allowed.");
      return;
    }

    if (!name || !password || !graduationYear) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          branch,
          graduationYear: parseInt(graduationYear, 10),
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      const signInResult = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!signInResult.ok) {
        setError("Account created but failed to sign in.");
        setLoading(false);
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-8">
        <h1 className="font-serif text-3xl font-semibold">
          Join the IIITL Alumni Network
        </h1>
        <p className="mt-2 text-sm text-muted">
          Create your profile to access the directory, attend events, post
          jobs, and stay in the loop.
        </p>

        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleRegister}>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Full name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">IIITL email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="CSAI">CSAI</option>
              <option value="CSB">CSB</option>
              <option value="MBA">MBA</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Graduation year</label>
            <input
              type="number"
              required
              min="2019"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          {error && (
            <div className="sm:col-span-2">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>
        </form>

        <div className="relative mt-8 mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-background text-sm font-semibold hover:bg-brand hover:text-white hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand active:bg-brand-700 transition-colors cursor-pointer"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
             <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
             <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
             <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
             <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted">
          Already a member?{" "}
          <Link href="/login" className="font-medium text-brand">
            Sign in
          </Link>
        </p>
      </div>
    </Section>
  );
}
