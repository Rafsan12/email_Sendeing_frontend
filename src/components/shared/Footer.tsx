import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Logo, Links, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* 1. Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold font-serif">
                A
              </div>
              <span className="text-2xl font-serif font-bold text-stone-100 tracking-tight">
                AmplyMail
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Beautiful emails, made simple. The platform for modern marketing
              teams.
            </p>
          </div>

          {/* 2. Product Links */}
          <div>
            <h4 className="font-semibold text-stone-100 mb-6">Product</h4>
            <ul className="space-y-3 text-sm">
              {["Features", "Pricing", "Templates", "Integrations"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-orange-500 transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 3. Company Links */}
          <div>
            <h4 className="font-semibold text-stone-100 mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter (New Addition) */}
          <div>
            <h4 className="font-semibold text-stone-100 mb-6">Stay Updated</h4>
            <p className="text-xs text-stone-500 mb-4">
              Get the latest templates and marketing tips.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-stone-900 border border-stone-800 rounded-lg px-4 py-2 text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-stone-600"
              />
              <button className="bg-stone-100 text-stone-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 hover:text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-600">
            © 2025 AmplyMail Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
