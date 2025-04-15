"use client";
import {
  HandCoins,
  BanknoteArrowUp,
  Link,
  MessageCircle,
  DoorOpen,
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
// Menu items.
const items = [
  {
    title: "Paiements",
    url: "#",
    icon: BanknoteArrowUp,
  },
  {
    title: "Liens d'affiliations",
    url: "#",
    icon: Link,
  },
  {
    title: "Vos paiements",
    url: "#",
    icon: HandCoins,
  },
];

const footerItems = [
  {
    title: "Contacte-nous",
    url: "#",
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
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
}
