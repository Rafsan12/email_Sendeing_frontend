"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function SocialSVG() {
  const containerRef = useRef(null);

  // Optional: Auto-scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // This assumes your SVG is very wide.
      // We simply move it to the left infinitely.
      gsap.to(containerRef.current, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Container wraps TWO copies of the SVG for seamless looping */}
      <div ref={containerRef} className="flex gap-20 w-fit">
        {/* COPY 1 */}
        <svg
          width="800"
          height="60"
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... PASTE YOUR LOGO PATHS HERE ... */}
          <circle cx="50" cy="30" r="20" fill="currentColor" />
          <rect x="150" y="10" width="40" height="40" fill="currentColor" />
          <circle cx="300" cy="30" r="20" fill="currentColor" />
          <rect x="450" y="10" width="40" height="40" fill="currentColor" />
          <circle cx="600" cy="30" r="20" fill="currentColor" />
        </svg>

        {/* COPY 2 (Duplicate for seamless loop) */}
        <svg
          width="800"
          height="60"
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... PASTE EXACT SAME LOGO PATHS HERE ... */}
          <circle cx="50" cy="30" r="20" fill="currentColor" />
          <rect x="150" y="10" width="40" height="40" fill="currentColor" />
          <circle cx="300" cy="30" r="20" fill="currentColor" />
          <rect x="450" y="10" width="40" height="40" fill="currentColor" />
          <circle cx="600" cy="30" r="20" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
