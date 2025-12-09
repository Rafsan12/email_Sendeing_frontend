"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Building Your Application",
      url: "#",
      items: [
        { title: "Create-Campaign", url: "/dashboard/create-campaign" },
        { title: "Send-Email", url: "/dashboard/send-email" },
        { title: "Rendering", url: "/dashboard/rendering" },
        { title: "Caching", url: "/dashboard/caching" },
        { title: "Styling", url: "/dashboard/styling" },
        { title: "Optimizing", url: "/dashboard/optimizing" },
      ],
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton asChild isActive={pathname === link.url}>
                      <Link href={link.url}>{link.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
