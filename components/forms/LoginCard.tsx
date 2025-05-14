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
import { Turnstile } from "next-turnstile";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginCard() {
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");

  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [cguAccepted, setCguAccepted] = useState<boolean>(false);
  const [affiliateName, setAffiliateName] = useState<string>("");

  const t = useTranslations("Login");

  const { toast } = useToast();
  const [serverErrorsLogin, formActionLogin, isLoginPending] = useActionState(
    login,
    initialState
  );

  const [serverErrorsRegister, formActionRegister, isRegisterPending] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useActionState(async (state: any, formData: any) => {
      if (turnstileStatus !== "success") {
        toast({
          title: t("captchaRequired"),
          duration: 4000,
        });
        return;
      }
      const response = await createAffiliate(state, formData);
      return response;
    }, initialState);

  useEffect(() => {
    console.log("serverErrorsLogin", serverErrorsLogin);
    if (serverErrorsLogin?.errors?.server === "Invalid credentials") {
      toast({
        title: t("wrongCredentials"),
        duration: 4000,
      });
    } else if (serverErrorsLogin?.errors?.mail) {
      toast({
        title: serverErrorsLogin?.errors?.mail,
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
  }, [serverErrorsLogin, toast, t]);

  useEffect(() => {
    console.log("serverErrorsRegister", serverErrorsRegister);
    if (serverErrorsRegister?.errors?.mail) {
      toast({
        title: serverErrorsRegister?.errors?.mail,
        duration: 4000,
      });
    } else if (serverErrorsRegister?.errors?.password) {
      toast({
        title: serverErrorsRegister?.errors?.password,
        duration: 4000,
      });
    } else if (serverErrorsRegister?.errors?.confirmPassword) {
      toast({
        title: serverErrorsRegister?.errors?.confirmPassword,
        duration: 4000,
      });
    } else if (
      serverErrorsRegister?.errors?.server === "Affiliate already exists"
    ) {
      toast({
        title: t("affiliateAlreadyExists"),
        duration: 4000,
      });
    } else if (serverErrorsRegister?.errors?.server) {
      toast({
        title: t("serverError"),
        description: t("serverErrorDescription"),
        duration: 4000,
      });
    }
  }, [serverErrorsRegister, toast, t]);

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
                  required
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
                  required
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
                  required
                  name="affiliateName"
                  id="affiliateName"
                  placeholder={t("affiliateNamePlaceholder")}
                  value={affiliateName}
                  onChange={(e) => setAffiliateName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  required
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
                  required
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
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t("confirmPasswordPlaceholder")}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 !mt-6">
                <Checkbox
                  required
                  name="cguAccepted"
                  checked={cguAccepted}
                  onCheckedChange={(checked) => {
                    setCguAccepted(!!checked);
                  }}
                />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accepter les conditions générales d&apos;utilisation
                </label>
              </div>
              <Turnstile
                className="!mt-4"
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                retry="auto"
                refreshExpired="auto"
                sandbox={process.env.NODE_ENV === "development"}
                onError={() => {
                  setTurnstileStatus("error");
                  toast({
                    title: "La vérification de sécurité a échoué",
                    duration: 4000,
                  });
                }}
                onExpire={() => {
                  setTurnstileStatus("expired");
                  toast({
                    title: "La vérification de sécurité a échoué",
                    duration: 4000,
                  });
                }}
                onLoad={() => {
                  setTurnstileStatus("required");
                }}
                onVerify={() => {
                  setTurnstileStatus("success");
                }}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={isRegisterPending}>
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
