"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
export default function LoginCard() {
  const t = useTranslations("Login");

  return (
    <Tabs defaultValue="account" className="max-w-[400px] text-left px">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">{t("login")}</TabsTrigger>
        <TabsTrigger value="password">{t("register")}</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>{t("login")}</CardTitle>
            <CardDescription>{t("loginDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                type="email"
                id="email"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                placeholder={t("passwordPlaceholder")}
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t("loginButton")}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>{t("register")}</CardTitle>
            <CardDescription>{t("registerDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="affiliateName">{t("affiliateName")}</Label>
              <Input
                type="text"
                id="affiliateName"
                placeholder={t("affiliateNamePlaceholder")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                type="email"
                id="email"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                placeholder={t("passwordPlaceholder")}
                type="password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                placeholder={t("confirmPasswordPlaceholder")}
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t("registerNow")}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
