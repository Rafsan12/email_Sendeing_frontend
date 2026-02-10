export type SidebarItem = {
  title: string;
  url: string;
  icon?: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export const adminSidebarItems: SidebarSection[] = [
  {
    title: "Campaigns Management",
    items: [
      {
        title: "Campaigns",
        url: "/admin/campaign",
        icon: "mail",
      },
      {
        title: "Create Campaign",
        url: "/admin/create-campaign",
        icon: "plus",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "User",
        url: "/admin/all-users",
      },
    ],
  },
];
export const ORGAdminSidebarItems: SidebarSection[] = [
  {
    title: "Campaigns Management",
    items: [
      {
        title: "Campaigns",
        url: "/orgadmin/campaigns",
      },
      {
        title: "Create Campaign",
        url: "/orgadmin/campaigns/create",
      },
      {
        title: "Single Campaign",
        url: "/orgadmin/campaigns/single",
      },
      {
        title: "Delete Campaign",
        url: "/orgadmin/campaigns/delete",
      },
    ],
  },
];
