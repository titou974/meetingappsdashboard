import { auth } from "@/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { DashboardRoutes, ApiV1Routes } from "@/types";
import { redirect } from "@/i18n/routing";
import DashboardStart from "../DashboardStart";
import LinksDashboard from "./Links";

export default async function Page() {
  const session = await auth();
  const locale = await getLocale();

  const t = await getTranslations("Dashboard.links");

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
      return (
        <DashboardStart
          affiliate={affiliateData}
          title={t("title")}
          description={t("description")}
        />
      );
    } else {
      return <LinksDashboard links={linksData} affiliate={affiliateData} />;
    }
  }
}
