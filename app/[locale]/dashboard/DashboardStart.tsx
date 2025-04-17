// import { Button } from "@/components/ui/button";
import { AffiliateLight } from "@/types";
import { useTranslations } from "next-intl";
import CreateLinkCard from "@/components/forms/CreateLinkCard";

export default function DashboardStart({
  affiliate,
}: {
  affiliate: AffiliateLight;
}) {
  const title = useTranslations("Dashboard");
  return (
    <div className="flex flex-col justify-center items-start space-y-10">
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">{title("title")}</h1>
        {affiliate?.affiliateName && (
          <p>
            {title("welcome", {
              name: affiliate?.affiliateName,
            })}
          </p>
        )}
      </div>

      <CreateLinkCard affiliate={affiliate} />
    </div>
  );
}
