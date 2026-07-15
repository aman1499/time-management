import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { authOptions } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="grid min-h-screen bg-white text-[#111827] lg:grid-cols-2">
      <section className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-[575px]">
          <h1 className="text-xl font-bold tracking-normal text-[#111827]">Welcome back</h1>
          <LoginForm />
        </div>
      </section>

      <section className="hidden min-h-screen items-center bg-[#2563eb] px-16 text-white lg:flex">
        <div className="max-w-[560px]">
          <h2 className="text-[40px] font-bold leading-none tracking-normal">ticktock</h2>
          <p className="mt-6 max-w-[520px] text-base leading-6 text-white/90">
            Introducing ticktock, our cutting-edge timesheet web application designed
            to revolutionize how you manage employee work hours. With ticktock, you
            can effortlessly track and monitor employee attendance and productivity
            from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </section>
    </main>
  );
}
