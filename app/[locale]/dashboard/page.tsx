import { auth } from "@/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { DashboardRoutes, ApiV1Routes } from "@/types";
import { redirect } from "@/i18n/routing";
import Dashboard from "./Dashboard";
import DashboardStart from "./DashboardStart";

export default async function Page() {
  const session = await auth();
  const locale = await getLocale();
  const t = await getTranslations("Dashboard");

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

    const affiliateData = await responseCurrentAffiliate.json();

    const responseLinks = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.links}?limit=3&isPaymentOrdered=true`,
      {
        method: "GET",
        headers: {
          Authorization: `${session?.accessToken}`,
        },
      }
    );

    const linksData = await responseLinks.json();
    if (linksData.totalLinks === 0) {
      return (
        <DashboardStart
          affiliate={affiliateData}
          title={t("title")}
          description={t("welcome", {
            name: affiliateData.name,
          })}
        />
      );
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
