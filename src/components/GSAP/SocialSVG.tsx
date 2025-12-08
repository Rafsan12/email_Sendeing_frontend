"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

export default function SocialSVG() {
  useEffect(() => {
    gsap.from(".logo-item", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center px-4">
      <div className="logo-item flex items-center justify-center h-12 w-32 bg-gray-500">
        <svg className="h-8 w-auto" viewBox="0 0 120 40">
          <rect x="10" y="8" width="8" height="24" rx="2" fill="white" />
          <rect x="24" y="12" width="8" height="20" rx="2" fill="white" />
          <rect x="38" y="4" width="8" height="28" rx="2" fill="white" />
          <text x="52" y="26" fontSize="12" fontWeight="700" fill="white">
            ACME
          </text>
        </svg>
      </div>
      <div className="logo-item flex items-center justify-center h-12 w-32 bg-gray-500">
        <svg className="h-8 w-auto" viewBox="0 0 120 40">
          <rect x="10" y="8" width="8" height="24" rx="2" fill="white" />
          <rect x="24" y="12" width="8" height="20" rx="2" fill="white" />
          <rect x="38" y="4" width="8" height="28" rx="2" fill="white" />
          <text x="52" y="26" fontSize="12" fontWeight="700" fill="white">
            ACME
          </text>
        </svg>
      </div>
      <div className="logo-item flex items-center justify-center h-12 w-32 bg-gray-500">
        <svg className="h-8 w-auto" viewBox="0 0 120 40">
          <rect x="10" y="8" width="8" height="24" rx="2" fill="white" />
          <rect x="24" y="12" width="8" height="20" rx="2" fill="white" />
          <rect x="38" y="4" width="8" height="28" rx="2" fill="white" />
          <text x="52" y="26" fontSize="12" fontWeight="700" fill="white">
            ACME
          </text>
        </svg>
      </div>
      <div className="logo-item flex items-center justify-center h-12 w-32 bg-gray-500">
        <svg className="h-8 w-auto" viewBox="0 0 120 40">
          <rect x="10" y="8" width="8" height="24" rx="2" fill="white" />
          <rect x="24" y="12" width="8" height="20" rx="2" fill="white" />
          <rect x="38" y="4" width="8" height="28" rx="2" fill="white" />
          <text x="52" y="26" fontSize="12" fontWeight="700" fill="white">
            ACME
          </text>
        </svg>
      </div>
      <div className="logo-item flex items-center justify-center h-12 w-32 bg-gray-500">
        <svg className="h-8 w-auto" viewBox="0 0 120 40">
          <rect x="10" y="8" width="8" height="24" rx="2" fill="white" />
          <rect x="24" y="12" width="8" height="20" rx="2" fill="white" />
          <rect x="38" y="4" width="8" height="28" rx="2" fill="white" />
          <text x="52" y="26" fontSize="12" fontWeight="700" fill="white">
            ACME
          </text>
        </svg>
      </div>
      <div className="logo-item flex items-center justify-center h-12 w-32 bg-gray-500">
        <svg className="h-8 w-auto" viewBox="0 0 120 40">
          <rect x="10" y="8" width="8" height="24" rx="2" fill="white" />
          <rect x="24" y="12" width="8" height="20" rx="2" fill="white" />
          <rect x="38" y="4" width="8" height="28" rx="2" fill="white" />
          <text x="52" y="26" fontSize="12" fontWeight="700" fill="white">
            ACME
          </text>
        </svg>
      </div>
    </div>
  );
}
