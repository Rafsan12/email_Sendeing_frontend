import SocialSVG from "../GSAP/SocialSVG";

export default function Social() {
  return (
    <section className="w-full bg-[#FFFBF5] py-16 border-b border-stone-200">
      <div className="container mx-auto px-6">
        {/* 1. Header: Changed from a loud H2 to a sophisticated label */}
        <p className="text-center text-stone-500 font-medium tracking-[0.2em] uppercase text-sm mb-10">
          Trusted by over 4,000 innovative teams
        </p>

        {/* 2. Logo Container with Fade Effect */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#FFFBF5] to-transparent z-10 pointer-events-none"></div>

          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#FFFBF5] to-transparent z-10 pointer-events-none"></div>

          {/* 3. The SVG Wrapper */}
          {/* We lower the opacity and make it grayscale for a clean look. 
              On hover, we bring the color back. */}
          <div className="flex justify-center items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out">
            <SocialSVG />
          </div>
        </div>
      </div>
    </section>
  );
}
