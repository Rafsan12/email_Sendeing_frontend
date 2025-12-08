"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BarChart3, MousePointer2, Zap } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MousePointer2,
    title: "Drag & Drop Email Builder",
    badge: "Powered by GrapesJS",
    description:
      "Build pixel-perfect, responsive emails in minutes — no code needed. Drag images, buttons, text, and advanced blocks freely to create stunning campaigns that look amazing on every device.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Campaign Automation",
    description:
      "Automate your entire email flow: welcome sequences, abandoned carts, win-back campaigns, and more. Trigger smart, personalized emails based on real user behavior — all on autopilot.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Delivery & Open Rate Tracking",
    description:
      "See exactly how your emails perform with real-time analytics. Track opens, clicks, bounces, and conversions in beautiful dashboards — then optimize and win, every time.",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function FeatureHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".feature-card");

      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -200 : 200;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#ffffff" },
        {
          backgroundColor: "#f0f4ff",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 text-sm tracking-wider">
            CORE FEATURES
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            Built for modern email marketing
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Three powerful tools. One seamless experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className={cn(
                  "relative group cursor-pointer feature-card",
                  "transition-all duration-700 hover:scale-[1.02]"
                )}
              >
                <div
                  className={cn(
                    "absolute -inset-4 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-1000",
                    `bg-linear-to-br ${feature.color}`
                  )}
                />

                <Card className="relative h-full border-0 shadow-xl bg-card/70 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
                  <div className="relative p-10 lg:p-12 text-center">
                    <div
                      className={cn(
                        "w-20 h-20 mx-auto mb-8 rounded-3xl flex items-center justify-center",
                        "shadow-2xl ring-8 ring-white/10",
                        `bg-linear-to-br ${feature.color} text-white`
                      )}
                    >
                      <Icon className="w-10 h-10" strokeWidth={2} />
                    </div>
                    <h3 className="text-3xl font-bold mt-8 mb-4">
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <Badge variant="secondary" className="mb-6 text-sm">
                        {feature.badge}
                      </Badge>
                    )}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </Card>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
