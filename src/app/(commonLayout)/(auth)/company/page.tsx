import { OrgRegisterForm } from "@/components/auth/org-register";
import { Globe, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CompanyRegisterPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      {/* =========================================================
          LEFT COLUMN: The "Growth Engine" (Dark Mode)
          - Instead of a quote, we show STATS to prove authority.
      ========================================================= */}
      <div className="relative hidden lg:flex flex-col justify-between bg-stone-950 p-12 text-stone-100 overflow-hidden">
        {/* Background: Rising Graph Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-orange-900/20 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#44403c 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

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

        {/* 2. Big Stats / Social Proof */}
        <div className="relative z-10 max-w-lg space-y-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              Built for <br />
              <span className="text-orange-500 italic">high volume.</span>
            </h2>
            <p className="text-stone-400 text-lg">
              Join the platform sending over 1 billion emails every month with
              99.9% uptime.
            </p>
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 gap-8 border-t border-stone-800 pt-8">
            <div>
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Avg Open Rate
                </span>
              </div>
              <p className="text-3xl font-bold text-white">42%</p>
              <p className="text-xs text-stone-500 mt-1">vs 21% industry avg</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Deliverability
                </span>
              </div>
              <p className="text-3xl font-bold text-white">99.9%</p>
              <p className="text-xs text-stone-500 mt-1">Inbox, not spam</p>
            </div>
          </div>
        </div>

        {/* 3. Global Reach */}
        <div className="relative z-10 flex items-center gap-3 text-xs text-stone-500">
          <Globe className="w-4 h-4 text-stone-600" />
          <p>Servers available in US, EU, and Asia Pacific.</p>
        </div>
      </div>

      {/* =========================================================
          RIGHT COLUMN: The Form (Light Mode)
      ========================================================= */}
      <div className="flex items-center justify-center bg-[#FFFBF5] p-8 md:p-12 relative">
        {/* Top Right Login Link (Desktop) */}

        <div className="mx-auto w-full max-w-100 space-y-8">
          {/* Mobile-only Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold font-serif text-xl">
              A
            </div>
          </div>

          {/* The Form */}
          {/* A clean white card to lift the form off the cream background */}
          <div className="bg-white">
            <OrgRegisterForm />
          </div>

          {/* Mobile Login Link */}
          <p className="lg:hidden text-center text-xs text-stone-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              Log in
            </Link>
          </p>

          <div className="text-center lg:text-left">
            <p className="text-[10px] text-stone-400 leading-relaxed">
              By creating an account, you agree to receive updates about our
              products. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
