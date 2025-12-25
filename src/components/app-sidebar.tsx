"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRoles } from "@/lib/auth-utlis";
import { getSidebarItems } from "@/lib/getSidebarItems";

export function AppSidebar({ role }: { role: UserRoles }) {
  const sidebarItems = getSidebarItems(role);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavMain sections={sidebarItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "Admin",
            email: "admin@example.com",
            avatar: "/avatars/admin.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
