import { LoginForm } from "@/components/auth/login-form";
import { Star } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = (await searchParams) || {};

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      {/* =========================================================
          LEFT COLUMN: The "Brand Experience" (Dark Mode)
          - Replaces the generic image with Typography & Social Proof
      ========================================================= */}
      <div className="relative hidden lg:flex flex-col justify-between bg-stone-950 p-12 text-stone-100 overflow-hidden">
        {/* Abstract Background Decoration (Subtle Glows) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Logo */}
        <Link href="/">
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold font-serif shadow-lg shadow-orange-900/20">
              A
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">
              AmplyMail
            </span>
          </div>
        </Link>

        {/* 2. Big Editorial Quote / Value Prop */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-6 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-orange-500 text-orange-500"
              />
            ))}
          </div>
          <blockquote className="font-serif text-3xl leading-tight md:text-4xl text-stone-200">
            "The only platform that made our email campaigns feel{" "}
            <span className="text-orange-500 italic">human</span> again."
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            {/* Fake User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 border border-stone-600"></div>
            <div>
              <p className="font-semibold text-sm">Elena R.</p>
              <p className="text-stone-500 text-xs uppercase tracking-wider">
                Product Lead @ Acme Inc.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Footer / Copyright */}
        <div className="relative z-10 text-xs text-stone-600">
          © 2025 AmplyMail Inc.
        </div>
      </div>

      {/* =========================================================
          RIGHT COLUMN: The "Utility" (Light Form)
          - Clean, focused, warm background
      ========================================================= */}
      <div className="flex items-center justify-center bg-[#FFFBF5] p-8 md:p-12">
        <div className="mx-auto w-full max-w-[380px] space-y-8">
          {/* Mobile-only Logo (Visible when Left Column is hidden) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold font-serif text-xl">
              A
            </div>
          </div>

          {/* The Form */}
          <div className="bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
            <LoginForm redirect={redirect} />
          </div>
        </div>
      </div>
    </div>
  );
}
