import Image from "next/image";
import HeroSVG from "../GSAP/HeroSVG";

export default function Hero() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white md:text-5xl">
            Smarter Email Sending, Better Results.
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Manage campaigns, design templates, and track performance all in one
          </p>
        </div>
        <HeroSVG />
        <div>
          <Image
            src="/image/Container.png"
            alt="Hero Image"
            width={800}
            height={400}
            className="mx-auto"
          />
        </div>
      </section>
    </>
  );
}
