"use client";
import { useTranslations } from "next-intl";
import { AffiliateLight } from "@/types";
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
import useTotalStatistics from "@/hooks/useTotalStatistics";

export default function Dashboard({
  accessToken,
  affiliate,
}: {
  accessToken: string;
  affiliate: AffiliateLight;
}) {
  const title = useTranslations("Dashboard");
  const t = useTranslations("Dashboard.income");
  const {
    data: totalStats,
    refetch: refetchTotalStatics,
    isLoading: isTotalStatsLoading,
  } = useTotalStatistics(accessToken);
  const {
    data: dailyIncomes,
    refetch: refetchDailyIncome,
    isLoading: isDailyIncomeLoading,
  } = useDailyIncome(accessToken);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
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
          onClick={() => {
            refetchTotalStatics();
            refetchDailyIncome();
          }}
        >
          <RefreshCcw />
          {t("refresh")}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="h-full w-full rounded-2xl">
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
        <Card className="h-full w-full rounded-2xl">
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
        <Card className="h-full w-full rounded-2xl">
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
        <Card className="h-full w-full rounded-2xl">
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">Vos ventes</CardTitle>
            <CardDescription className="text-base">
              Ventes de la journée
            </CardDescription>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute right-4 top-2"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-2xl font-bold space-y-2">
            <p>1 200 €</p>
            <p className="text-sm font-medium text-muted-foreground">
              + 20% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="h-full w-full rounded-2xl">
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
                <Skeleton className="h-8 w-1/2" />
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
