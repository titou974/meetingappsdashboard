import { auth } from "@/auth";
import { getLocale } from "next-intl/server";
import { DashboardRoutes, ApiV1Routes } from "@/types";
import { redirect } from "@/i18n/routing";
import Dashboard from "./Dashboard";
import DashboardStart from "./DashboardStart";

export default async function Page() {
  const session = await auth();
  const locale = await getLocale();

  if (!session || !session.accessToken) {
    redirect({ href: DashboardRoutes.HOME, locale: locale });
  } else {
    const responseCurrentAffiliate = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.currentAffiliate}`,
      {
        method: "GET",
        headers: {
          Authorization: `${session?.accessToken}`,
        },
      }
    );

    console.log("responseCurrentAffiliate", responseCurrentAffiliate);
    const affiliateData = await responseCurrentAffiliate.json();

    const responseLinks = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.links}`,
      {
        method: "GET",
        headers: {
          Authorization: `${session?.accessToken}`,
        },
      }
    );

    const linksData = await responseLinks.json();

    if (linksData.totalLinks === 0) {
      return <DashboardStart affiliate={affiliateData} />;
    } else {
      return (
        <Dashboard
          accessToken={session?.accessToken}
          affiliate={affiliateData}
          links={linksData}
        />
      );
    }
  }
}
