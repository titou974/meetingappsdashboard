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
import { AffiliateLight, initialState, PaymentType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { createLink } from "@/app/[locale]/dashboard/actions";
import { toast } from "@/hooks/use-toast";

export default function PaymentsInfoForm({
  affiliate,
}: {
  affiliate: AffiliateLight;
}) {
  const t = useTranslations("Dashboard.payments.paymentInfoForm");
  console.log("affiliate", affiliate);
  const [paymentTypeSelected, setPaymentTypeSelected] = useState<string>(
    PaymentType.PAYPAL
  );
  const [serverErrors, formAction, isPending] = useActionState(
    createLink,
    initialState
  );

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!hasSubmitted) return;
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
  }, [serverErrors, hasSubmitted]);

  const paymentTypes = [
    {
      value: PaymentType.PAYPAL,
      label: t("paypal"),
      image: "/paypal.png",
    },
    {
      value: PaymentType.BANK_TRANSFER,
      label: t("bankTransfer"),
      image: "/bank.png",
    },
  ];

  return (
    <form
      action={async (formData) => {
        setHasSubmitted(true);
        await formAction(formData);
      }}
    >
      <Card className={`w-full max-w-md`}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="linkName">{t("choosePaymentMethod")}</Label>
            <Select
              name="paymentType"
              onValueChange={(e) => setPaymentTypeSelected(e)}
              defaultValue={PaymentType.PAYPAL}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={t("choosePaymentMethodPlaceholder")}
                />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map((paymentType) => (
                  <SelectItem key={paymentType.value} value={paymentType.value}>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={paymentType.image} />
                        <AvatarFallback>{paymentType.label}</AvatarFallback>
                      </Avatar>
                      <p>{paymentType.label}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {paymentTypeSelected === PaymentType.PAYPAL && (
            <div className="space-y-1">
              <Label htmlFor="paypalEmail">{t("paypalEmail")}</Label>
              <Input
                type="email"
                required
                name="paypalEmail"
                id="paypalEmail"
                placeholder={t("paypalEmailPlaceholder")}
              />
            </div>
          )}
          {paymentTypeSelected === PaymentType.BANK_TRANSFER && (
            <>
              <div className="space-y-1">
                <Label htmlFor="iban">{t("iban")}</Label>
                <Input
                  type="text"
                  required
                  name="iban"
                  id="iban"
                  placeholder={t("ibanPlaceholder")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="bic">{t("bic")}</Label>
                <Input
                  type="text"
                  required
                  name="bic"
                  id="bic"
                  placeholder={t("bicPlaceholder")}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t("savePaymentInfo")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
