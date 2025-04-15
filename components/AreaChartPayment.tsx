"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { DailyIncome } from "@/types";
import { useTranslations } from "next-intl";
export default function AreaChartPayment({
  dailyIncomes,
}: {
  dailyIncomes: DailyIncome[];
}) {
  const [timeRange, setTimeRange] = useState("30d");
  const t = useTranslations("Dashboard.Income");

  const chartConfig = {
    dailyIncomes: {
      label: "Sales",
    },
    affiliateIncome: {
      label: "Affilié",
      color: "hsl(var(--chart-1))",
    },
    totalIncome: {
      label: "Total",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const filteredData = dailyIncomes.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-04-11");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  console.log("filteredData", filteredData);

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label={t("lastThirtyDays")}
          >
            <SelectValue placeholder="Les 30 derniers jours" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              {t("lastThreeMonths")}
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              {t("lastThirtyDays")}
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              {t("lastSevenDays")}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillaffiliateIncome"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-affiliateIncome)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-affiliateIncome)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filltotalIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalIncome)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalIncome)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="totalIncome"
              type="natural"
              fill="url(#filltotalIncome)"
              stroke="var(--color-totalIncome)"
              stackId="a"
            />
            <Area
              dataKey="affiliateIncome"
              type="natural"
              fill="url(#fillaffiliateIncome)"
              stroke="var(--color-affiliateIncome)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
