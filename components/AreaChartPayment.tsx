"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  const t = useTranslations("Dashboard.income");

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
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="affiliateIncome"
              type="monotone"
              stroke={`var(--color-affiliateIncome)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
