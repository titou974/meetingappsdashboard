"use client";
import { useTranslations } from "next-intl";
import { AffiliateLight, DashboardRoutes } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import useDailyIncome from "@/hooks/useDailyIncome";
import AreaChartPayment from "@/components/AreaChartPayment";
import useAdminTotalStatistics from "@/hooks/useAdminTotalStatistics";
import { useRouter } from "@/i18n/routing";

export default function DashboardAdmin({
  accessToken,
  affiliate,
}: {
  accessToken: string;
  affiliate: AffiliateLight;
}) {
  const title = useTranslations("Dashboard.admin");
  const t = useTranslations("Dashboard.income");
  const {
    data: totalStats,
    refetch: refetchTotalStatics,
    isLoading: isTotalStatsLoading,
    isFetching: isTotalStatsFetching,
  } = useAdminTotalStatistics(accessToken);
  const {
    data: dailyIncomes,
    refetch: refetchDailyIncome,
    isLoading: isDailyIncomeLoading,
    isFetching: isDailyIncomeFetching,
  } = useDailyIncome(accessToken);
  const router = useRouter();
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-6 md:flex-row justify-between">
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl md:text-4xl font-bold">{title("title")}</h1>
          {affiliate?.affiliateName && (
            <p>
              {title("description", {
                name: affiliate?.affiliateName,
              })}
            </p>
          )}
        </div>
        <Button
          variant="secondary"
          className="rounded-full"
          disabled={
            isDailyIncomeFetching ||
            isDailyIncomeLoading ||
            isTotalStatsFetching ||
            isTotalStatsLoading
          }
          onClick={() => {
            refetchTotalStatics();
            refetchDailyIncome();
          }}
        >
          <RefreshCcw
            className={`${(isDailyIncomeFetching || isDailyIncomeLoading || isTotalStatsFetching || isTotalStatsLoading) && "animate-spin"}`}
          />
          {t("refresh")}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className={`h-full w-full rounded-2xl ${!isTotalStatsLoading && "hover:bg-primary/80 hover:scale-95 cursor-pointer"} transition-all`}
          onClick={() => router.push(DashboardRoutes.LINKS)}
        >
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              {t("revenuCardTitle")}
            </CardTitle>
            <CardDescription className="text-base">Avril 2025</CardDescription>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute right-4 top-2"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-2xl font-bold space-y-2">
            {isTotalStatsLoading ? (
              <>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </>
            ) : (
              <>
                <p>
                  {t("revenu", {
                    income: totalStats?.incomeForAffiliate || 0,
                  })}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("onTotalRevenu", {
                    totalIncome: totalStats?.totalIncome || 0,
                  })}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card
          className={`h-full w-full rounded-2xl ${!isTotalStatsLoading && "hover:bg-primary/80 hover:scale-95 cursor-pointer"} transition-all`}
          onClick={() => router.push(DashboardRoutes.LINKS)}
        >
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              {t("subscriptionCardTitle")}
            </CardTitle>
            <CardDescription className="text-base">Avril 2025</CardDescription>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute right-4 top-2"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-2xl font-bold space-y-2">
            {isTotalStatsLoading ? (
              <>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </>
            ) : (
              <>
                <p>
                  {t("subscriptionNumber", {
                    subscriptions: totalStats?.totalNewSubscribersCount || 0,
                  })}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("onSubscription", {
                    totalSubscriptions:
                      totalStats?.totalActiveSubscribersCount || 0,
                  })}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card
          className={`h-full w-full rounded-2xl ${!isTotalStatsLoading && "hover:bg-primary/80 hover:scale-95 cursor-pointer"}  transition-all`}
          onClick={() => router.push(DashboardRoutes.LINKS)}
        >
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              {t("visitCardTitle")}
            </CardTitle>
            <CardDescription className="text-base">Avril 2025</CardDescription>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute right-4 top-2"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-2xl font-bold space-y-2">
            {isTotalStatsLoading ? (
              <>
                <Skeleton className="h-8 w-1/2" />
              </>
            ) : (
              <p>
                {t("visitNumber", {
                  visits: totalStats?.totalVisitsCount || 0,
                })}
              </p>
            )}
          </CardContent>
        </Card>
        {!isDailyIncomeLoading && dailyIncomes !== undefined ? (
          <AreaChartPayment dailyIncomes={dailyIncomes?.dailyIncome} />
        ) : (
          <Skeleton className="col-span-1 md:col-span-2 h-full w-full" />
        )}
        <Card
          onClick={() => router.push(DashboardRoutes.LINKS)}
          className={`h-full w-full rounded-2xl ${!isTotalStatsLoading && "hover:bg-primary/80 hover:scale-95 cursor-pointer"} transition-all`}
        >
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              {t("conversionCardTitle")}
            </CardTitle>
            <CardDescription className="text-base">Avril 2025</CardDescription>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute right-4 top-2"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-2xl font-bold space-y-2">
            {isTotalStatsLoading ? (
              <>
                <Skeleton className="h-8 w-1/2 rounded-2xl" />
              </>
            ) : (
              <p>
                {t("conversionNumber", {
                  conversions: totalStats?.conversionRate || 0,
                })}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
