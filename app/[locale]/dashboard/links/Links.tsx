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
import { PlusCircle, Ellipsis, Trash, Eye, Loader2 } from "lucide-react";
import { truncateString } from "@/utils/truncate";
import { useState } from "react";
import CreateLinkCard from "@/components/forms/CreateLinkCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CopyButton from "@/components/buttons/CopyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteLink } from "../actions";
import { useToast } from "@/hooks/use-toast";

export default function LinksDashboard({
  links,
  affiliate,
}: {
  links: Links;
  affiliate: AffiliateLight;
}) {
  const t = useTranslations("Dashboard.links");
  const [copiedLink, setCopiedLink] = useState<number | null>(null);
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteLink = async (linkId: number) => {
    setIsLoading(true);
    toast({
      title: t("linkIsDeleting"),
      description: t("linkIsDeletingDescription"),
      open: isLoading,
      onOpenChange: () => {
        setIsLoading(false);
      },
    });
    await deleteLink(linkId);
    setIsLoading(false);
  };

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
                <CopyButton
                  textToCopy={websiteUrl + "?a=" + link.query}
                  copied={copiedLink === link.id}
                  onCopied={() => {
                    setCopiedLink(link.id);
                    setTimeout(() => setCopiedLink(null), 1500);
                  }}
                />
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
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsCreateLinkOpen(true);
                      }}
                      size="icon"
                    >
                      <Ellipsis size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      Voir les transactions <Eye />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-primary"
                      onClick={() => {
                        handleDeleteLink(link.id);
                      }}
                    >
                      Supprimer
                      {isLoading && <Loader2 className="animate-spin" />}
                      <Trash />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isCreateLinkOpen} onOpenChange={setIsCreateLinkOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" onClick={() => setIsCreateLinkOpen(true)}>
            {t("addLink")} <PlusCircle size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CreateLinkCard
            affiliate={affiliate}
            setIsCreateLinkOpen={setIsCreateLinkOpen}
            isOnLinkPage
            isTransparent
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
