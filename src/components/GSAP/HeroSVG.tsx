"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin"; // Standard free plugin
import { useEffect, useRef } from "react";

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export default function HeroSVG() {
  const pathRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the Ball along the Path
      if (pathRef.current && ballRef.current) {
        gsap.to(ballRef.current, {
          motionPath: {
            path: pathRef.current, // The path to follow
            align: pathRef.current, // Align the ball to the path
            alignOrigin: [0.5, 0.5], // Center the ball on the line
            autoRotate: true, // Optional: Rotates if the shape isn't a circle
          },
          duration: 4, // Slower duration feels more "organic"
          ease: "power1.inOut",
          repeat: -1, // Loop forever
          yoyo: true, // Go back and forth (remove this if you want it to loop start-to-end)
        });
      }
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
        {/* 1. THE TRACK (Faint Line) */}
        <path
          ref={pathRef}
          d="M10,50 C40,10 60,90 90,50 C120,10 140,90 170,50"
          stroke="#ea580c"
          strokeWidth="2" // Thinner track
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-20" // Faint background
        />

        {/* 2. THE BALL (Moving Circle) */}
        {/* We initially hide it off-screen; GSAP will snap it to the path instantly */}
        <circle
          ref={ballRef}
          r="6" // Size of the ball
          fill="#ea580c" // Orange ball
          className="shadow-lg" // Optional: You can add a shadow via CSS class if desired
        >
          {/* Optional: Add a glow/blur effect to the ball */}
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
