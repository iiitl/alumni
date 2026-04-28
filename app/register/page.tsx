import Link from "next/link";
import { Section } from "@/components/Section";
import RegisterForm from "@/app/register/RegistrationForm";

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
        
        <RegisterForm />

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
