import Link from "next/link";
import { Section } from "@/components/Section";
import { signInWithCredentials, signInWithMagicLink, signInWithGoogle } from "./actions";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <h1 className="font-serif text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to access the alumni directory, events, and the job board.
        </p>
        <form action={signInWithCredentials} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required            
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
               type="password"
               name="password"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700"
          >
            Sign in
          </button>

          <button
            formAction={signInWithMagicLink}
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-transparent border border-brand text-brand text-sm font-semibold hover:bg-brand-50"
          >
            Send magic link instead
          </button>

          <div className="flex gap-2 items-center justify-center">
            <div className="h-0.5 bg-background-700 w-full"></div>
            <div>or</div>
            <div className="h-0.5 bg-background-700 w-full"></div>
          </div>
          <button
            formAction={signInWithGoogle}
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-background text-sm font-semibold text-white hover:bg-background-700"
          >
            <span className="h-5 w-5 mr-1"><img src="/google.svg" alt="" className="w-full" /></span>Sign-in with Google
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          New to IIITL Alumni?{" "}
          <Link href="/register" className="font-medium text-brand">
            Create an account
          </Link>
        </p>
      </div>
    </Section>
  );
}
