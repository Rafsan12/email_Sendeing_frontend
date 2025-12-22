"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, BarChart3, MousePointer2, Zap } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: MousePointer2,
    title: "Drag & Drop Builder",
    badge: "Powered by GrapesJS",
    description:
      "Build pixel-perfect, responsive emails in minutes. Drag images, buttons, and text freely to create stunning campaigns.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description:
      "Automate your entire email flow: welcome sequences, abandoned carts, and win-back campaigns based on real user behavior.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Track opens, clicks, and conversions in real-time. Beautiful dashboards help you optimize and win, every single time.",
    color: "bg-stone-100 text-stone-700",
  },
];

export default function FeatureTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the Central Line (Draws down)
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top", // Grow from top to bottom
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Start when section is near middle of screen
            end: "bottom 80%",
            scrub: 1, // Links animation directly to scroll bar (smooth)
          },
        }
      );

      // 2. Animate the Cards (Slide in from Left/Right)
      const cards = gsap.utils.toArray(".timeline-card");

      cards.forEach((card: any, i) => {
        // Even index (0, 2) comes from Left (-100px)
        // Odd index (1) comes from Right (100px)
        const isLeft = i % 2 === 0;
        const xStart = isLeft ? -100 : 100;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: xStart,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // Triggers when card is 80% into viewport
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 px-6 relative bg-[#FFFBF5] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1 border-stone-300 text-stone-500 tracking-widest uppercase text-xs"
          >
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight mb-6">
            Designed for <span className="italic text-orange-600">growth.</span>
          </h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* THE CENTRAL LINE (Only visible on Desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-stone-200">
            {/* The Animated Overlay Line (Orange) */}
            <div
              ref={lineRef}
              className="w-full h-full bg-orange-400 origin-top"
            ></div>
          </div>

          {/* Cards Loop */}
          <div className="flex flex-col gap-12 md:gap-24">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={cn(
                    "timeline-card flex items-center justify-between md:w-full",
                    // Mobile: Stack normally
                    // Desktop: Row or Row-Reverse based on index
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* EMPTY SPACER (Takes up 50% width on desktop to push card to side) */}
                  <div className="hidden md:block w-5/12" />

                  {/* CENTER DOT (The connector on the line) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-[#FFFBF5] border-2 border-orange-400 z-10">
                    <div className="w-3 h-3 bg-orange-400 rounded-full" />
                  </div>

                  {/* THE CARD (Takes up 5/12 width ~ 42%) */}
                  <div className="w-full md:w-5/12 group relative p-8 rounded-3xl bg-white border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-xl",
                        feature.color
                      )}
                    >
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </div>

                    <h3 className="text-2xl font-bold text-stone-900 mb-3 font-serif">
                      {feature.title}
                    </h3>

                    <p className="text-stone-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-stone-900 group-hover:text-orange-600 transition-colors">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>

                    {/* Small Arrow pointing to center line */}
                    <div
                      className={cn(
                        "hidden md:block absolute top-10 w-4 h-4 bg-white border-t border-stone-100 border-l rotate-45",
                        isEven
                          ? "-right-2 border-r-0 border-b-0"
                          : "-left-2 border-r border-b border-t-0 border-l-0" // Flip arrow based on side
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
