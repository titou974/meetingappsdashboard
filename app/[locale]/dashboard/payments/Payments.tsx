"use client";
import { AffiliateLight } from "@/types";
import PaymentsInfoForm from "@/components/forms/PaymentsInfoForm";
import { useTranslations } from "next-intl";
export default function Payments({ affiliate }: { affiliate: AffiliateLight }) {
  const t = useTranslations("Dashboard.payments");
  return (
    <div className="flex flex-col justify-center items-start space-y-10">
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
      <PaymentsInfoForm affiliate={affiliate} />
    </div>
  );
}
