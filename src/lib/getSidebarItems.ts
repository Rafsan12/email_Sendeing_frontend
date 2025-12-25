import { UserRoles } from "./auth-utlis";
import { adminSidebarItems, ORGAdminSidebarItems } from "./sidebar-config";

export const getSidebarItems = (role: UserRoles) => {
  switch (role) {
    case "ADMIN":
      return adminSidebarItems;

    case "ORG_ADMIN":
      return ORGAdminSidebarItems;

    default:
      return [];
  }
};
