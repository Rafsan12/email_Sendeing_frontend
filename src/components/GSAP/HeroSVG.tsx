"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(MotionPathPlugin);

export default function HeroSVG_DataStream() {
  const pathRef = useRef<SVGPathElement | null>(null);

  const ball1Ref = useRef<SVGCircleElement | null>(null);
  const ball2Ref = useRef<SVGCircleElement | null>(null);
  const ball3Ref = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (
      !pathRef.current ||
      !ball1Ref.current ||
      !ball2Ref.current ||
      !ball3Ref.current
    ) {
      return;
    }

    const balls = [ball1Ref.current, ball2Ref.current, ball3Ref.current];

    gsap.set(balls, { opacity: 0 });

    gsap.to(balls, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
      },
      duration: 4,
      ease: "none",
      repeat: -1,
      opacity: 1,
      stagger: {
        each: 1.3,
        repeat: -1,
      },
    });
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
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-20"
        />

        <circle ref={ball1Ref} r="6" fill="#ea580c" />
        <circle ref={ball2Ref} r="4" fill="#ea580c" opacity={0.8} />
        <circle ref={ball3Ref} r="5" fill="#ea580c" opacity={0.9} />
      </svg>
    </div>
  );
}
