"use client";
import { AffiliateLight, Links, websiteUrl, socialMediaList } from "@/types";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, Check, PlusCircle } from "lucide-react";
import { truncateString } from "@/utils/truncate";
import { useState } from "react";

export default function LinksDashboard({
  links,
  affiliate,
}: {
  links: Links;
  affiliate: AffiliateLight;
}) {
  const t = useTranslations("Dashboard.links");
  const [copiedLink, setCopiedLink] = useState<number | null>(null);
  return (
    <div className="flex flex-col justify-center items-start space-y-10">
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
      <Table>
        <TableCaption>Vos liens d&apos;affiliations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom du lien</TableHead>
            <TableHead>Url</TableHead>
            <TableHead>Réseau social</TableHead>
            <TableHead className="text-right">
              Revenu de l&apos;affilié ({affiliate?.share * 100}%)
            </TableHead>
            <TableHead className="text-right">Revenu total</TableHead>
            <TableHead className="text-right">Nombre d&apos;abonnés</TableHead>
            <TableHead className="text-right">Nombre de visites</TableHead>
            <TableHead className="text-right">Taux de conversion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.links.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">{link.name}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <p>{truncateString(websiteUrl + "?a=" + link.query, 50)}</p>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      websiteUrl + "?a=" + link.query
                    );
                    setCopiedLink(link.id);
                    setTimeout(() => setCopiedLink(null), 1500);
                  }}
                >
                  Copier
                  {copiedLink === link.id ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                {socialMediaList.map((socialMedia) => {
                  if (link.socialMedia === socialMedia.value) {
                    return (
                      <div
                        key={socialMedia.value}
                        className="flex items-center space-x-2"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={socialMedia.image} />
                          <AvatarFallback>{socialMedia.label}</AvatarFallback>
                        </Avatar>
                        <p>{socialMedia.label}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </TableCell>
              <TableCell className="text-right">
                {link.affiliateTotalIncome}€
              </TableCell>
              <TableCell className="text-right">{link.totalIncome}€</TableCell>
              <TableCell className="text-right">
                {link.totalActiveSubscribersCount}
              </TableCell>
              <TableCell className="text-right">
                {link.totalVisitsCount}
              </TableCell>
              <TableCell className="text-right">
                {link.conversionRate && link.conversionRate.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="secondary">
        {t("addLink")} <PlusCircle size={16} />
      </Button>
    </div>
  );
}
