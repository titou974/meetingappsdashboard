import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ApiV1Routes } from "@/types";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const responseCurrentAffiliate = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.currentAffiliate}`,
    {
      method: "GET",
      headers: {
        Authorization: `${session?.accessToken}`,
      },
    }
  );

  const affiliateData = await responseCurrentAffiliate.json();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar isAdmin={affiliateData.isAdmin} />
      <div className="fixed left-2 top-0 z-30 bg-background/80 backdrop-blur-lg w-full py-2 shadow-md md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex flex-col justify-start text-left w-full px-4 md:px-6 py-[72px] min-h-[calc(100vh-64px)] max-w-screen-lg mx-auto">
        {children}
      </div>
    </SidebarProvider>
  );
}
