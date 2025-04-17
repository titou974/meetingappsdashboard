// import { Button } from "@/components/ui/button";
import { AffiliateLight } from "@/types";
import CreateLinkCard from "@/components/forms/CreateLinkCard";

export default function DashboardStart({
  affiliate,
  title,
  description,
}: {
  affiliate: AffiliateLight;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col justify-center items-start space-y-10">
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
        <p>{description}</p>
      </div>

      <CreateLinkCard affiliate={affiliate} />
    </div>
  );
}
