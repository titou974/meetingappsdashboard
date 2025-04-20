import { auth } from "@/auth";
import { getLocale } from "next-intl/server";
import { DashboardRoutes, ApiV1Routes } from "@/types";
import { redirect } from "@/i18n/routing";
import DashboardAdmin from "./DashboardAdmin";

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

    const affiliateData = await responseCurrentAffiliate.json();

    if (!affiliateData.isAdmin) {
      redirect({ href: DashboardRoutes.DASHBOARD, locale: locale });
    } else {
      return (
        <DashboardAdmin
          accessToken={session?.accessToken}
          affiliate={affiliateData}
        />
      );
    }
  }
}
