import { UserRoles } from "@/lib/auth-utlis";
import { getCookie } from "@/service/auth/tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const accessToken = await getCookie("accessToken");
  let role: UserRoles;
  if (accessToken) {
    const decode = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;
    if (typeof decode.role === "string") {
      role = decode.role.toLowerCase() as UserRoles;
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#FFFBF5]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* 1. LOGO: Serif font to match the brand vibe */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Optional: Simple circle logo mark */}
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg font-serif group-hover:bg-stone-900 transition-colors">
            A
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            AmplyMail
          </span>
        </Link>

        {/* 2. DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-stone-600 hover:text-orange-600 transition-colors relative group"
            >
              {link.label}
              {/* Subtle underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full" />
            </Link>
          ))}
          {accessToken && <Link href={`/${role}/dashboard`}>Dashboard</Link>}
        </nav>

        {/* 3. ACTIONS (Login/Logout) */}
        <div className="hidden md:flex items-center space-x-4">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button
                variant="default"
                className="rounded-full bg-stone-900 text-[#FFFBF5] hover:bg-orange-600 px-6"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* 4. MOBILE MENU */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-stone-900 hover:text-orange-600"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            {/* Custom Background Color for Sheet */}
            <SheetContent
              side="right"
              className="w-75 sm:w-100 p-6 bg-[#FFFBF5] border-stone-200"
            >
              <SheetTitle className="text-left font-serif text-2xl mb-8">
                Navigation
              </SheetTitle>

              <nav className="flex flex-col space-y-6">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xl font-medium text-stone-700 hover:text-orange-600 transition-colors border-b border-stone-100 pb-2"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-8 flex flex-col space-y-4">
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login" className="w-full">
                      <Button className="w-full rounded-full bg-stone-900 text-[#FFFBF5] hover:bg-orange-600 h-12 text-lg">
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
