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
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import useDailyIncome from "@/hooks/useDailyIncome";
import AreaChartPayment from "@/components/AreaChartPayment";

export default function Dashboard({
  accessToken,
  affiliate,
}: {
  accessToken: string;
  affiliate: AffiliateLight;
}) {
  const t = useTranslations("Dashboard.Income");
  const { data: dailyIncomes } = useDailyIncome(accessToken);
  console.log("dailyIncomes", dailyIncomes);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div className="space-y-2 md:space-y-4 max-w-md">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p>
            {t("description", {
              affiliateName: affiliate?.affiliateName,
            })}
          </p>
        </div>
        <Button variant="secondary" className="rounded-full">
          <RefreshCcw />
          Rafraichir
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="h-full w-full rounded-2xl">
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              Revenu du mois
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
            <p>1 200 €</p>
            <p className="text-sm font-medium text-muted-foreground">
              + 20% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="h-full w-full rounded-2xl">
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              Nombre de visites
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
            <p>24 385 visites</p>
            <p className="text-sm font-medium text-muted-foreground">
              + 20% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>{" "}
        <Card className="h-full w-full rounded-2xl">
          <CardHeader className="relative space-y-1">
            <CardTitle className="text-base font-bold">
              Taux de conversion{" "}
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
            <p>1%</p>
            <p className="text-sm font-medium text-muted-foreground">
              + 20% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>{" "}
        {dailyIncomes?.dailyIncome ? (
          <AreaChartPayment dailyIncomes={dailyIncomes?.dailyIncome} />
        ) : null}
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
      </div>
    </div>
  );
}
