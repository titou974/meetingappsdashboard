import { auth } from "@/auth";
import { getLocale } from "next-intl/server";
import { DashboardRoutes, ApiV1Routes } from "@/types";
import { redirect } from "@/i18n/routing";
import Dashboard from "./Dashboard";

export default async function Page() {
  const session = await auth();
  const locale = await getLocale();

  if (!session || !session.accessToken) {
    redirect({ href: DashboardRoutes.HOME, locale: locale });
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.currentAffiliate}`,
      {
        method: "GET",
        headers: {
          Authorization: `${session?.accessToken}`,
        },
      }
    );

    console.log("response", response);
    const affiliateData = await response.json();

    return (
      <Dashboard accessToken={session?.accessToken} affiliate={affiliateData} />
    );
  }
}
