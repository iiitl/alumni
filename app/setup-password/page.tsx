import { completeGoogleSignup } from "@/app/setup-password/actions";
import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Complete Sign Up",
  // The URL carries a one-time signup token: keep it out of search results and referrers.
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function SetupPasswordPage(
  props: { searchParams: Promise<{ token?: string; error?: string }> }
) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;
  const passwordError =
    searchParams.error === "PasswordTooShort"
      ? "Password must be at least 8 characters long."
      : null;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-red-500">Invalid or missing session token.</p>
      </div>
    );
  }

  // Bind the token to the server action so it can't be tampered with by the user
  const actionWithToken = completeGoogleSignup.bind(null, token);

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <h1 className="font-serif text-3xl font-semibold">Almost there!</h1>
        <p className="mt-2 text-sm text-muted">
          Your Google account was verified successfully. Please set a password to
          complete your registration.
        </p>

        {passwordError && (
          <p role="alert" className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
            {passwordError}
          </p>
        )}

        <form action={actionWithToken} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium">New Password</label>
            <input
              id="password"
              autoComplete="new-password"
              type="password"
              name="password"
              required
              minLength={8}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700"
          >
            Save Password & Log In
          </button>
        </form>
      </div>
    </Section>
  );
}
