// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold tracking-tight">AmplyMail</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Beautiful emails, made simple.
            </p>

            <p className="mt-10 text-sm text-muted-foreground">
              © 2025 YourApp. All rights reserved.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3  text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
            </ul>

            {/* Optional Social Icons (uncomment if you want them) */}
            {/* <div className="flex justify-center md:justify-start gap-4 mt-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                <Mail className="w-5 h-5" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
