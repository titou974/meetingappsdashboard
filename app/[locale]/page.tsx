import LoginCard from "@/components/providers/LoginCard";
import { getTranslations } from "next-intl/server";
export default async function Home() {
  const t = await getTranslations("Login");
  return (
    <div className="flex flex-col justify-start md:justify-center items-center w-full min-h-[calc(100vh-192px)] h-full max-w-screen-lg px-6 md:px-16 gap-8 py-10 mx-auto text-center">
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
      <LoginCard />
    </div>
  );
}
