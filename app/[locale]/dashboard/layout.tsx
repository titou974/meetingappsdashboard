import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div className="flex flex-col justify-start text-left w-full px-4 md:px-6 py-[72px] min-h-[calc(100vh-64px)]">
        {children}
      </div>
    </SidebarProvider>
  );
}
