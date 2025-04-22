import PaginationComponent from "@/components/PaginationComponent";
import { Button } from "@/components/ui/button";
import { getPaymentsFromLink } from "@/hooks/getPaymentsFromLink";
import { Link } from "@/i18n/routing";
import { DashboardRoutes } from "@/types";
import { getTranslations } from "next-intl/server";
import { ArrowBigLeft } from "lucide-react";
import PaymentsTable from "./PaymentsTable";
export default async function LinkDashboard({
  linkId,
  accessToken,
  currentPage,
}: {
  linkId: number;
  accessToken: string;
  currentPage: number;
}) {
  const { payments, totalPages, link } = await getPaymentsFromLink(
    linkId,
    currentPage || 1,
    accessToken
  );
  const t = await getTranslations("Dashboard.linkWithPayments");
  return (
    <div className="flex flex-col justify-center items-start space-y-10">
      <Button variant="outline" asChild>
        <Link href={DashboardRoutes.LINKS}>
          {" "}
          <ArrowBigLeft size={16} />
          {t("back")}
        </Link>
      </Button>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">
          {t("title", {
            name: link.name,
          })}
        </h1>
        <p>{t("description")}</p>
      </div>
      {payments && payments.length > 0 ? (
        <PaymentsTable payments={payments} />
      ) : (
        <p>{t("noPayments")}</p>
      )}
      <PaginationComponent pageCount={totalPages} />
    </div>
  );
}
