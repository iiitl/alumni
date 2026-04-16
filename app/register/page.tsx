import Link from "next/link";
import { Section } from "@/components/Section";
import { signUpWithGoogle } from "@/app/register/actions";

export const metadata = { title: "Join the network" };

export default function RegisterPage() {
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
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Full name</label>
            <input
              type="text"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">IIITL email or roll no.</label>
            <input
              type="text"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Branch</label>
            <select className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm">
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Graduation year</label>
            <input
              type="number"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700"
            >
              Create account
            </button>
          </div>
          <div className="flex gap-2 items-center justify-center w-full sm:col-span-2">
            <div className="h-0.5 bg-background-700 w-full"></div>
            <div>or</div>
            <div className="h-0.5 bg-background-700 w-full"></div>
          </div>
          <div className="sm:col-span-2">
            <button
              formAction={signUpWithGoogle}
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-background border border-border text-sm font-semibold text-white hover:bg-background-700"
            >
              <span className="h-5 w-5 mr-1"><img src="google.svg" alt="" className="w-full" /></span>Sign-up with Google
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Already a member?{" "}
          <Link href="/login" className="font-medium text-brand">
            Sign in
          </Link>
        </p>
      </div>
    </Section>
  );
}
