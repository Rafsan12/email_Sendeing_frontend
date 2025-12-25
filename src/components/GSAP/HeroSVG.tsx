"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export default function HeroSVG_DataStream() {
  const pathRef = useRef(null);
  // Need multiple refs for multiple balls
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const ball3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const balls = [ball1Ref.current, ball2Ref.current, ball3Ref.current];

      // Initially hide them so they don't appear before moving
      gsap.set(balls, { opacity: 0 });

      gsap.to(balls, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
        },
        duration: 4, // Takes 4 seconds for one ball to cross
        ease: "none", // Constant speed flow
        repeat: -1,
        opacity: 1, // Make visible as they start moving
        stagger: {
          each: 1.3, // Wait 1.3 seconds between each ball starting
          repeat: -1, // Loop the stagger endlessly
        },
      });
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
        {/* Track */}
        <path
          ref={pathRef}
          d="M10,50 C40,10 60,90 90,50 C120,10 140,90 170,50"
          stroke="#ea580c"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-20"
        />

        {/* THREE BALLS of varying sizes for organic feel */}
        <circle ref={ball1Ref} r="6" fill="#ea580c" />
        <circle ref={ball2Ref} r="4" fill="#ea580c" className="opacity-80" />
        <circle ref={ball3Ref} r="5" fill="#ea580c" className="opacity-90" />
      </svg>
    </div>
  );
}
