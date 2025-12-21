import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./campaign/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <div className="flex">
          <AppSidebar />
          <main className="flex-1 p-6">
            <header className="flex h-8 mb-3 shrink-0 items-center gap-2 border-b-4 border-gray-900 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </header>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
