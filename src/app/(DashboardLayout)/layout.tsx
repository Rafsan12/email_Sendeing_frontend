import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRoles } from "@/lib/auth-utlis";
import { getCookie } from "@/service/auth/tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await getCookie("accessToken");
  let role: UserRoles;

  if (accessToken) {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    role = decoded.role as UserRoles;
  }

  // console.log(role);
  return (
    <SidebarProvider>
      <AppSidebar role={role} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
