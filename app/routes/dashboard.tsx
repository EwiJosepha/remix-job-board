import { json, Outlet, useActionData } from "@remix-run/react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { ActionFunction } from "@remix-run/node";
import DashboardHeader from "~/components/dashboard-header";

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookieStore = new Map();

  if (cookieHeader) {
    const parsedCookies = cookieHeader.split("; ").map(cookie => cookie.split("="));
    parsedCookies.forEach(([key, value]) => cookieStore.set(key, value));
  }

  const defaultOpen = cookieStore.get("sidebar_state") === "true";

  return json({ defaultOpen });
};

export default function DashboardLayout() {
  const actionData = useActionData<{ defaultOpen: boolean }>();
  actionData?.defaultOpen ?? false;
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      } as React.CSSProperties}
      defaultOpen={true}
    >
      <div className="flex w-full bg-gray-100 border-r-8">
        <AppSidebar />
        <main className="flex-1 p-4">
          <DashboardHeader/>
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
