"use client";
import { useTranslations } from "next-intl";
import {
  AffiliateLight,
  DashboardRoutes,
  Links,
  socialMediaList,
} from "@/types";
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
import { useRouter } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard({
  accessToken,
  affiliate,
  links,
}: {
  accessToken: string;
  affiliate: AffiliateLight;
  links: Links;
}) {
  const title = useTranslations("Dashboard");
  const t = useTranslations("Dashboard.income");
  const {
    data: totalStats,
    refetch: refetchTotalStatics,
    isLoading: isTotalStatsLoading,
    isFetching: isTotalStatsFetching,
  } = useTotalStatistics(accessToken);
  const {
    data: dailyIncomes,
    refetch: refetchDailyIncome,
    isLoading: isDailyIncomeLoading,
    isFetching: isDailyIncomeFetching,
  } = useDailyIncome(accessToken);

  const now = new Date();

  const monthYear = now.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
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
            <CardDescription className="text-base">
              {" "}
              {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
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
            <CardDescription className="text-base">
              {" "}
              {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
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
            <CardDescription className="text-base">
              {" "}
              {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
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
              {t("affiliateLinkCardTitle")}
            </CardTitle>
            <CardDescription className="text-base">
              {" "}
              {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
            </CardDescription>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute right-4 top-2"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm font-bold space-y-2">
            <Table className="w-full">
              {links.totalLinks > 3 && (
                <TableCaption className="text-left">
                  {3 - links.totalLinks} liens d&apos;affiliations
                </TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nom du lien</TableHead>
                  <TableHead>Réseau social</TableHead>
                  <TableHead className="text-right">
                    Revenu de l&apos;affilié ({affiliate?.share * 100}%)
                  </TableHead>
                  <TableHead className="text-right">Nouveaux abonnés</TableHead>
                  <TableHead className="text-right">
                    Nombre de visites
                  </TableHead>
                  <TableHead className="text-right">
                    Taux de conversion
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.name}</TableCell>
                    <TableCell>
                      {socialMediaList.map((socialMedia) => {
                        if (link.socialMedia === socialMedia.value) {
                          return (
                            <Avatar className="h-6 w-6" key={socialMedia.value}>
                              <AvatarImage src={socialMedia.image} />
                              <AvatarFallback>
                                {socialMedia.label}
                              </AvatarFallback>
                            </Avatar>
                          );
                        }
                        return null;
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {link.affiliateTotalIncome}€
                    </TableCell>
                    <TableCell className="text-right">
                      {link.totalActiveSubscribersCount}
                    </TableCell>
                    <TableCell className="text-right">
                      {link.totalVisitsCount}
                    </TableCell>
                    <TableCell className="text-right">
                      {link.conversionRate && link.conversionRate.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card
          onClick={() => router.push(DashboardRoutes.LINKS)}
          className={`h-full w-full rounded-2xl ${!isTotalStatsLoading && "hover:bg-primary/80 hover:scale-95 cursor-pointer"} transition-all`}
        >
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              {t("conversionCardTitle")}
            </CardTitle>
            <CardDescription className="text-base">
              {" "}
              {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
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
