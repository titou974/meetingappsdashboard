"use server";

import { ApiV1Routes, DashboardRoutes, FormErrors } from "@/types";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { RegisterResponse } from "@/types";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createLinkAndRedirect = async (
  state: { errors?: FormErrors; response?: RegisterResponse } | undefined,
  formData: FormData
): Promise<
  { errors?: FormErrors; response?: RegisterResponse } | undefined
> => {
  const t = await getTranslations("Dashboard.createLink");
  const session = await auth();

  const RegisterFormSchema = z.object({
    linkName: z.string().min(2, t("linkNameErrorLengthMin")),
    socialMedia: z.string({
      required_error: t("socialMediaErrorRequired"),
    }),
  });

  const data = Object.fromEntries(formData.entries());
  const validated = RegisterFormSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.errors.reduce((acc: FormErrors, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {} as FormErrors);
    return { errors }; // Return errors if validation fails
  }
  try {
    const response = await fetch(`${apiUrl}${ApiV1Routes.link}`, {
      method: "POST",
      body: JSON.stringify({
        name: data.linkName,
        socialMedia: data.socialMedia,
        appId: parseInt(process.env.APP_ID as string),
      }),
      headers: {
        Authorization: `${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);
    if (!response.ok) {
      const result = await response.json();

      return {
        errors: {
          server:
            result.message ||
            "Une erreur est survenue lors de la création du lien.",
        },
      };
    }
  } catch (error) {
    console.error("Error during link creation:", error);
    return {
      errors: {
        server: "Une erreur est survenue, veuillez réessayer plus tard.",
      },
    };
  }

  const locale = await getLocale();

  redirect({ href: DashboardRoutes.LINKS, locale: locale });
};

export const createLink = async (
  state: { errors?: FormErrors; response?: RegisterResponse } | undefined,
  formData: FormData
): Promise<
  { errors?: FormErrors; response?: RegisterResponse } | undefined
> => {
  const t = await getTranslations("Dashboard.createLink");
  const session = await auth();

  const RegisterFormSchema = z.object({
    linkName: z.string().min(2, t("linkNameErrorLengthMin")),
    socialMedia: z.string({
      required_error: t("socialMediaErrorRequired"),
    }),
  });

  const data = Object.fromEntries(formData.entries());
  const validated = RegisterFormSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.errors.reduce((acc: FormErrors, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {} as FormErrors);
    return { errors }; // Return errors if validation fails
  }
  try {
    const response = await fetch(`${apiUrl}${ApiV1Routes.link}`, {
      method: "POST",
      body: JSON.stringify({
        name: data.linkName,
        socialMedia: data.socialMedia,
        appId: parseInt(process.env.APP_ID as string),
      }),
      headers: {
        Authorization: `${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const result = await response.json();

      return {
        errors: {
          server:
            result.message ||
            "Une erreur est survenue lors de la création du lien.",
        },
      };
    }
  } catch (error) {
    console.error("Error during link creation:", error);
    return {
      errors: {
        server: "Une erreur est survenue, veuillez réessayer plus tard.",
      },
    };
  }

  revalidatePath(DashboardRoutes.LINKS);
};
