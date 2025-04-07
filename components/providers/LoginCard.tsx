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
import { useActionState, useEffect, useState } from "react";
import { login, createAffiliate } from "@/app/[locale]/actions";
import { initialState } from "@/types";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function LoginCard() {
  const [serverErrorsLogin, formActionLogin, isLoginPending] = useActionState(
    login,
    initialState
  );

  const [serverErrorsRegister, formActionRegister, isRegisterPending] =
    useActionState(createAffiliate, initialState);
  console.log("serverErrorsRegister", serverErrorsRegister);
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const t = useTranslations("Login");
  const { toast } = useToast();

  useEffect(() => {
    if (serverErrorsLogin?.errors?.server === "Invalid credentials") {
      toast({
        title: t("wrongCredentials"),
        description: t("wrongCredentialsDescription"),
        duration: 4000,
      });
    } else if (serverErrorsLogin?.errors?.email) {
      toast({
        title: serverErrorsLogin?.errors?.email,
        duration: 4000,
      });
    } else if (serverErrorsLogin?.errors?.password) {
      toast({
        title: serverErrorsLogin?.errors?.password,
        duration: 4000,
      });
    } else if (serverErrorsLogin?.errors?.server) {
      toast({
        title: t("serverError"),
        description: t("serverErrorDescription"),
        duration: 4000,
      });
    }
    console.log("serverErrorsLogin", serverErrorsLogin);
  }, [serverErrorsLogin, toast, t]);
  return (
    <Tabs defaultValue="login" className="max-w-[400px] text-left px">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">{t("login")}</TabsTrigger>
        <TabsTrigger value="register">{t("register")}</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form action={formActionLogin}>
          <Card>
            <CardHeader>
              <CardTitle>{t("login")}</CardTitle>
              <CardDescription>{t("loginDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  type="email"
                  name="mail"
                  id="email"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder={t("passwordPlaceholder")}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoginPending && true}>
                {isLoginPending && <Loader2 className="animate-spin" />}
                {t("loginButton")}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="register">
        <form action={formActionRegister}>
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
                  name="affiliateName"
                  id="affiliateName"
                  placeholder={t("affiliateNamePlaceholder")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  type="email"
                  id="email"
                  name="mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder={t("passwordPlaceholder")}
                  type="password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t("confirmPasswordPlaceholder")}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isRegisterPending && true}>
                {isRegisterPending && <Loader2 className="animate-spin" />}
                {t("registerNow")}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}
