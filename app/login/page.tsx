import Link from "next/link";
import { Section } from "@/components/Section";
import { signInWithCredentials, signInWithMagicLink, signInWithGoogle } from "./actions";

export const metadata = { title: "Sign in" };

const ERROR_MESSAGES: Record<string, string> = {
  InvalidCredentials: "That email and password don't match. Please try again.",
  CredentialsSignin: "That email and password don't match. Please try again.",
  AccessDenied: "Sign-in is limited to registered members with an @iiitl.ac.in email.",
  RateLimited: "Too many sign-in links requested. Please wait a while and try again.",
  OAuthAccountNotLinked:
    "This email is registered with a password. Sign in with your password instead.",
  SignupUnavailable: "Sign-up is temporarily unavailable. Please try again later.",
  TokenExpired: "That link has expired. Please start again.",
  InvalidToken: "That link is invalid. Please start again.",
  Verification: "That sign-in link is invalid or has already been used.",
};

const SUCCESS_MESSAGES: Record<string, string> = {
  EmailVerified: "Your email is verified. You can sign in now.",
  AccountCreated: "Your account is ready. Sign in to continue.",
};

const GENERIC_ERROR = "Something went wrong while signing you in. Please try again.";

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await props.searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] ?? GENERIC_ERROR : null;
  const successMessage = !errorMessage && success ? SUCCESS_MESSAGES[success] : null;

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <h1 className="font-serif text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to access the alumni directory, events, and the job board.
        </p>

        {errorMessage && (
          <p role="alert" className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p role="status" className="mt-4 rounded-md border border-border bg-brand-50 p-3 text-sm">
            {successMessage}
          </p>
        )}

        <form action={signInWithCredentials} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
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

          <div className="flex gap-2 items-center justify-center text-sm text-muted">
            <div className="h-px bg-border w-full"></div>
            <div>or</div>
            <div className="h-px bg-border w-full"></div>
          </div>
          <button
            formAction={signInWithGoogle}
            type="submit"
            formNoValidate
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-background text-sm font-semibold text-foreground hover:bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG icon */}
            <span className="h-5 w-5 mr-1"><img src="/google.svg" alt="" className="w-full" /></span>Sign in with Google
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
