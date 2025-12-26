"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { SidebarSection } from "@/lib/sidebar-config";
import { sidebarIconMap } from "@/lib/sidebar-icon-map";
import { cn } from "@/lib/utils"; // standard shadcn utility
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.title} className="py-4">
          {/* 1. Styled Section Label */}
          <SidebarGroupLabel className="px-4 text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">
            {section.title}
          </SidebarGroupLabel>

          <SidebarMenu>
            {section.items.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(item.url + "/");

              const Icon = item.icon ? sidebarIconMap[item.icon] : null;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "group relative h-10 px-4 py-2 transition-all duration-200 ease-in-out rounded-lg",
                      // 2. Active State Styling
                      isActive
                        ? "bg-orange-50 text-orange-700 font-medium shadow-sm shadow-orange-100 ring-1 ring-orange-200/50"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 hover:translate-x-1"
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      {/* Optional: Render Icon if it exists */}
                      {Icon && <Icon className="size-4" />}

                      <span className="text-sm">{item.title}</span>

                      {/* 3. Optional 'Active Dot' indicator on the right */}
                      {isActive && (
                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
