export type UserRoles = "ADMIN" | "ORG_ADMIN" | "COMMON";

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const authRoutes = ["/login", "/register"];

export const adminRoutes: RouteConfig = {
  exact: ["/admin", "/admin/users", "/admin/settings"],
  pattern: [/^\/admin/],
};
export const orgAdminRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/ORGADMIN/],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const isRouteMAtched = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string,
): "ADMIN" | "ORG_ADMIN" | null => {
  if (isRouteMAtched(pathname, adminRoutes)) {
    return "ADMIN";
  }
  if (isRouteMAtched(pathname, orgAdminRoutes)) {
    return "ORG_ADMIN";
  }
  return null;
};

export const getDefaultRoute = (role: UserRoles): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "ORG_ADMIN") {
    return "/ORGADMIN/dashboard";
  }
  return "/login";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRoles,
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null) {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
