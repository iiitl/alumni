"use client";

// app/register/RegisterForm.tsx
import { useActionState } from "react";
import { handleRegistration, signUpWithGoogle } from "@/app/register/actions";

export default function RegisterForm() {
  // useActionState takes your action and an initial state object
  const [state, formAction, isPending] = useActionState(handleRegistration, null);

  return (
    <form action={formAction} className="mt-6 grid gap-4 sm:grid-cols-2">
      
      {/* Display the message from the server action here! */}
      {state?.message && (
        <div className={`sm:col-span-2 p-3 rounded-md text-sm ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="name" className="text-sm font-medium">Full name</label>
        <input type="text" id="name" name="name" required className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className="text-sm font-medium">IIITL email or roll no.</label>
        <input type="email" id="email" name="email" required className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input type="password" id="password" name="password" minLength={8} required className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
      </div>
      <div>
        <label htmlFor="branch" className="text-sm font-medium">Branch</label>
        <select id="branch" name="branch" className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm">
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
      </div>
      <div>
        <label htmlFor="graduationYear" className="text-sm font-medium">Graduation year</label>
        <input type="number" id="graduationYear" name="graduationYear" required className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
      </div>
      
      <div className="sm:col-span-2">
        <button type="submit" disabled={isPending} className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
          {isPending ? "Creating..." : "Create account"}
        </button>
      </div>

      <div className="flex gap-2 items-center justify-center w-full sm:col-span-2">
        <div className="h-0.5 bg-background-700 w-full"></div>
        <div>or</div>
        <div className="h-0.5 bg-background-700 w-full"></div>
      </div>
      <div className="sm:col-span-2">
        <button formAction={signUpWithGoogle} formNoValidate type="submit" className="inline-flex h-11 w-full items-center justify-center rounded-md bg-background border border-border text-sm font-semibold text-white hover:bg-background-700">
          <span className="h-5 w-5 mr-1"><img src="/google.svg" alt="" className="w-full" /></span>
          Sign-up with Google
        </button>
      </div>
    </form>
  );
}