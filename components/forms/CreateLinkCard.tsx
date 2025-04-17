"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AffiliateLight,
  initialState,
  SocialMediaType,
  socialMediaList,
} from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Info, Loader2 } from "lucide-react";
import { useActionState } from "react";
import {
  createLinkAndRedirect,
  createLink,
} from "@/app/[locale]/dashboard/actions";
import { toast } from "@/hooks/use-toast";

export default function CreateLinkCard({
  affiliate,
  isOnLinkPage = false,
}: {
  affiliate: AffiliateLight;
  isOnLinkPage?: boolean;
}) {
  const [linksInfo, setLinksInfo] = useState({
    name: "",
    socialMedia: "",
  });
  const t = useTranslations("Dashboard.createLink");

  const [serverErrors, formAction, isPending] = useActionState(
    isOnLinkPage ? createLink : createLinkAndRedirect,
    initialState
  );

  useEffect(() => {
    if (serverErrors?.errors?.linkName) {
      toast({
        title: serverErrors?.errors?.linkName,
      });
    } else if (serverErrors?.errors?.socialMedia) {
      toast({
        title: serverErrors?.errors?.socialMedia,
      });
    } else if (serverErrors?.errors?.server) {
      toast({
        title: serverErrors?.errors?.server,
      });
    }
  }, [serverErrors]);

  return (
    <form action={formAction}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="linkName">{t("linkName")}</Label>
            <Input
              type="text"
              required
              name="linkName"
              placeholder={t("linkNamePlaceholder")}
              value={linksInfo.name}
              onChange={(e) =>
                setLinksInfo({ ...linksInfo, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">{t("linkSocialMedia")}</Label>
            <Select
              name="socialMedia"
              onValueChange={(e) =>
                setLinksInfo({ ...linksInfo, socialMedia: e })
              }
              defaultValue={SocialMediaType.X}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("linkSocialMediaPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {socialMediaList.map((socialMedia) => (
                  <SelectItem key={socialMedia.value} value={socialMedia.value}>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={socialMedia.image} />
                        <AvatarFallback>{socialMedia.label}</AvatarFallback>
                      </Avatar>
                      <p>{socialMedia.label}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">
              Créer un lien pour chaque réseau vous permettra de mieux optimiser
              vos campagnes
            </p>
          </div>
          <div className="!mt-6 flex items-center gap-1 text-muted-foreground text-sm">
            <Info size={16} />
            <p>
              Votre part de revenu pour ce lien sera fixé à{" "}
              {affiliate.share * 100}%
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t("createLink")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
