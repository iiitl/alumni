import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata = { title: "Check your email" };

export default function CheckEmailPage() {
  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <h1 className="font-serif text-3xl font-semibold">Check your email</h1>
        <p className="mt-2 text-sm text-muted">
          If that address belongs to a registered member, a sign-in link is on its way.
          The link expires in 24 hours.
        </p>
        <p className="mt-4 text-sm text-muted">
          Not a member yet?{" "}
          <Link href="/register" className="font-medium text-brand">
            Create an account
          </Link>
        </p>
      </div>
    </Section>
  );
}
