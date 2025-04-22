"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "@/types";
import { useTranslations } from "next-intl";
import { CircleCheck, CircleX } from "lucide-react";

export default function PaymentsTable({ payments }: { payments: Payment[] }) {
  const t = useTranslations("Dashboard.linkWithPayments.table");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{t("amount")}</TableHead>
          <TableHead className="w-[100px]">{t("date")}</TableHead>
          <TableHead className="w-[100px] ">{t("status")}</TableHead>
          <TableHead className="w-[100px] ">{t("affiliateRevenue")}</TableHead>
          <TableHead className="w-[100px] ">{t("affiliatePaid")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments &&
          payments.length > 0 &&
          payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {t("revenu", {
                  income: payment.amount,
                })}
              </TableCell>
              <TableCell>
                <p>
                  {(() => {
                    const date = new Date(payment.createdAt);
                    return `${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")} le ${date.toLocaleDateString("fr-FR")}`;
                  })()}
                </p>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                {payment.paymentFailed ? (
                  <>
                    <p>{t("failed")}</p>
                    <CircleX className="text-red-500" />
                  </>
                ) : (
                  <>
                    <p>{t("success")}</p>
                    <CircleCheck className="text-green-500" />
                  </>
                )}
              </TableCell>
              <TableCell className="font-medium">
                {t("revenu", {
                  income: payment.affiliateRevenue,
                })}
              </TableCell>
              <TableCell>
                {payment.affiliatePaid ? t("yes") : t("no")}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
