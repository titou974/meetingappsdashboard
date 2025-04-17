"use client";
import {
  HandCoins,
  BanknoteArrowUp,
  MessageCircle,
  DoorOpen,
  Cable,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
// Menu items.
const items = [
  {
    title: "Paiements",
    url: "/dashboard",
    icon: BanknoteArrowUp,
  },
  {
    title: "Liens d'affiliations",
    url: "/links",
    icon: Cable,
  },
  {
    title: "Vos paiements",
    url: "/payments",
    icon: HandCoins,
  },
];

const footerItems = [
  {
    title: "Contacte-nous",
    url: "/contact",
    icon: MessageCircle,
  },
  {
    title: "Déconnexion",
    url: "#",
    icon: DoorOpen,
    className: "text-primary",
  },
];

export function AppSidebar() {
  const t = useTranslations("App");
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-16">
            {" "}
            <div className="flex gap-2 items-center">
              <Image src="/logo.png" alt="Logo" width={35} height={35} />
              <p className="font-bold text-foreground text-base">{t("name")}</p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={item.className}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
}
