"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("name@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <label className="block space-y-2">
        <span className="text-[11px] font-semibold text-[#344054]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-xs text-[#1f2937] outline-none transition placeholder:text-[#98a2b3] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
          required
          suppressHydrationWarning
        />
      </label>

      <label className="block space-y-2">
        <span className="text-[11px] font-semibold text-[#344054]">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-xs text-[#1f2937] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
          required
          suppressHydrationWarning
        />
      </label>

      <label className="flex items-center gap-2 text-[11px] text-[#667085]">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded border-[#d0d5dd] text-[#2563eb]"
          suppressHydrationWarning
        />
        Remember me
      </label>

      {error ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full cursor-pointer rounded-md bg-[#2563eb] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-[#93b4f6]"
        suppressHydrationWarning
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
