"use client";

// import { Button } from "../ui/button";
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
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AffiliateLight, SocialMediaType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

export default function CreateLinkCard({
  affiliate,
}: {
  affiliate: AffiliateLight;
}) {
  const [linksInfo, setLinksInfo] = useState({
    name: "",
    socialMedia: "",
  });
  const t = useTranslations("Dashboard.createLink");

  const socialMediaList = [
    {
      value: SocialMediaType.X,
      label: "X/Twitter",
      image: "/x.webp",
    },
    {
      value: SocialMediaType.TIKTOK,
      label: "TikTok",
      image: "/tiktok.webp",
    },
    {
      value: SocialMediaType.INSTAGRAM,
      label: "Instagram",
      image: "/instagram.webp",
    },
    {
      value: SocialMediaType.SNAPCHAT,
      label: "Snapchat",
      image: "/snapchat.webp",
    },
    {
      value: SocialMediaType.TELEGRAM,
      label: "Telegram",
      image: "/telegram.webp",
    },
    {
      value: SocialMediaType.YOUTUBE,
      label: "YouTube",
      image: "/youtube.webp",
    },
    {
      value: SocialMediaType.OTHER,
      label: "Autre",
      image: "/other.webp",
    },
  ];
  return (
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
        <Button>{t("createLink")}</Button>
      </CardFooter>
    </Card>
  );
}
