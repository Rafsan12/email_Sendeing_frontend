import Image from "next/image";
import HeroSVG from "../GSAP/HeroSVG";

export default function HeroWarm() {
  return (
    <section className="bg-[#FFFBF5] text-stone-900 py-24 relative overflow-hidden">
      {/* =========================================
          1. BACKGROUND PATTERN
      ========================================= */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#d6d3d1 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* =========================================
          2. DECORATIVE SVGS (The 4 corners)
      ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* TOP LEFT - Large, slightly rotated */}
        <div className="absolute top-10 -left-10 w-64 h-64 text-orange-400/30 rotate-12">
          <HeroSVG />
        </div>
        {/* TOP RIGHT - Smaller, tilted opposite way */}
        <div className="absolute top-20 -right-5 w-48 h-48 text-orange-500/40 -rotate-12">
          <HeroSVG />
        </div>
      </div>

      {/* =========================================
          3. MAIN CONTENT
      ========================================= */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-stone-900 mb-6">
            Make your emails <br />
            <span className="italic text-orange-600 relative inline-block">
              unforgettable.
              {/* Optional: Tiny SVG directly under the word "unforgettable" */}
              <div className="absolute -bottom-6 left-0 w-full h-12 opacity-80 pointer-events-none">
                <HeroSVG />
              </div>
            </span>
          </h1>

          <p className="mt-6 text-xl text-stone-600 leading-relaxed">
            Beautifully designed templates, powerful analytics, and smarter
            sending. All the tools you need to grow your audience.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-stone-900 text-[#FFFBF5] font-semibold hover:bg-orange-600 hover:shadow-lg transition-all duration-300">
              Get Started for Free
            </button>
            <button className="px-8 py-4 rounded-full border border-stone-300 bg-white text-stone-700 font-medium hover:border-orange-300 transition-colors">
              Watch Video
            </button>
          </div>
        </div>

        {/* =========================================
            4. HERO IMAGE AREA
        ========================================= */}
        <div className="mt-20 relative mx-auto max-w-5xl perspective-1000">
          <div className="relative z-10 transform rotate-x-12 rounded-xl border-8 border-white shadow-2xl bg-white overflow-hidden">
            <Image
              src="/image/Container.png"
              alt="Hero Image"
              width={1000}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
