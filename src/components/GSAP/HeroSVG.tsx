"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useEffect } from "react";
gsap.registerPlugin(DrawSVGPlugin);
export default function HeroSVG() {
  useEffect(() => {
    gsap.fromTo(
      "#line",
      { drawSVG: "50% 50%" },
      { drawSVG: "100%", duration: 2, ease: "power2.out", repeat: -1 }
    );
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <svg width="400" height="150" className="mx-auto">
          <path
            id="line"
            d="M10 100 Q150 10 300 100"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />

          <text
            x="150"
            y="120"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill="#4F46E5"
          >
            Precision-Built Email Delivery
          </text>
        </svg>
      </div>
    </>
  );
}
