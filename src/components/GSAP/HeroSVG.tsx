"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useEffect, useRef } from "react";

// Register the plugin (Make sure you have a Club GSAP license for DrawSVG in production)
if (typeof window !== "undefined") {
  gsap.registerPlugin(DrawSVGPlugin);
}

export default function HeroSVG() {
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        {
          drawSVG: "0%",
        },
        {
          drawSVG: "100%",
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5,
          repeat: -1,
          yoyo: true,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 200 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M10,50 C40,10 60,90 90,50 C120,10 140,90 170,50"
          stroke="#ea580c"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        />
      </svg>
    </div>
  );
}
