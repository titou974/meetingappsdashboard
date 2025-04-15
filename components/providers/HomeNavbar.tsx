"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function HomeNavbar() {
  const t = useTranslations("App");
  return (
    <nav className="w-full h-16 bg-background shadow-md p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="flex gap-2 items-center">
        <Image src="/logo.png" alt="Logo" width={35} height={35} />
        <p className="font-bold text-inherit text-base md:text-xl">
          {t("name")}
        </p>
      </div>
    </nav>
  );
}
