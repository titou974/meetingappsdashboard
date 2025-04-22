import { auth } from "@/auth";
import { DashboardRoutes } from "@/types";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";
import LinkDashboard from "./LinkDashboard";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ page: number }>;
}) {
  const p = (await searchParams).page;

  const linkId = (await params).id;

  const session = await auth();
  const locale = await getLocale();

  if (!session || !session.accessToken) {
    redirect({ href: DashboardRoutes.HOME, locale: locale });
  } else {
    return (
      <LinkDashboard
        linkId={linkId}
        accessToken={session?.accessToken}
        currentPage={p}
      />
    );
  }
}
