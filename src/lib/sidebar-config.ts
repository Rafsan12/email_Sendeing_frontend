export type SidebarItem = {
  title: string;
  url: string;
  icon?: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

const commonSideBarItem: SidebarSection[] = [
  {
    title: "Campaigns Management",
    items: [
      {
        title: "Campaigns",
        url: "/campaign",
        icon: "mail",
      },
      {
        title: "Create Campaign",
        url: "/create-campaign",
        icon: "plus",
      },
    ],
  },
];

export const adminSidebarItems: SidebarSection[] = [
  ...commonSideBarItem,
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
export const ORGAdminSidebarItems: SidebarSection[] = [...commonSideBarItem];
