"use server";

import { DashboardRoutes, FormErrors, RegisterPayload } from "@/types";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { RegisterResponse } from "@/types"; // Import your new type
import { signIn } from "@/auth";
import { redirect } from "@/i18n/routing";
import { AuthError } from "next-auth";
import { getLocale } from "next-intl/server";
import { validateTurnstileToken } from "next-turnstile";
import { v4 } from "uuid";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createAffiliate = async (
  state: { errors?: FormErrors; response?: RegisterResponse } | undefined,
  formData: FormData
): Promise<
  { errors?: FormErrors; response?: RegisterResponse } | undefined
> => {
  const t = await getTranslations("Register&LoginActions");

  const RegisterFormSchema = z.object({
    age: z.string().min(2).max(2),
    mail: z.string().email(t("emailErrorInvalid")),
    password: z
      .string()
      .min(4, t("passwordErrorLengthMin"))
      .max(50, t("passwordErrorLengthMax")),
    cguAccepted: z
      .union([z.string(), z.undefined()]) // Handle the case when it's undefined (not checked)
      .transform((val) => val !== undefined) // Convert to boolean, true if exists, false otherwise
      .refine((val) => val === true),
    linkName: z.string().optional(),
  });
  const data = Object.fromEntries(formData.entries());
  const validated = RegisterFormSchema.safeParse(data);
  const cguAccepted = data.cguAccepted === undefined ? false : true;

  if (!validated.success) {
    const errors = validated.error.errors.reduce((acc: FormErrors, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {} as FormErrors);
    return { errors }; // Return errors if validation fails
  }

  const turnstile = formData.get("cf-turnstile-response");
  if (!turnstile) {
    return {
      errors: {
        server: "Captcha validation required",
      },
    };
  }
  const validationResponse = await validateTurnstileToken({
    token: turnstile as string,
    secretKey: process.env.TURNSTILE_SECRET_KEY!,
    // Optional: Add an idempotency key to prevent token reuse
    idempotencyKey: v4(),
    sandbox: process.env.NODE_ENV === "development",
  });

  if (!validationResponse.success) {
    return {
      errors: {
        server: "Captcha validation failed",
      },
    };
  }
  try {
    const payload: RegisterPayload = {
      email: data.mail as string, // Explicitly cast to string
      password: data.password as string, // Explicitly cast to string
      affiliateName: data.affiliateName as string, // Explicitly cast to string
      cguAccepted: cguAccepted,
    };

    if (data.linkName) {
      payload.linkName = data.linkName as string; // Explicitly cast to string
    }

    const response = await fetch(`${apiUrl}/v1/auth/user/register`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const result = await response.json();
      if (response.status === 409) {
        const signInData = await signIn("credentials", {
          email: data.mail,
          password: data.password,
          appId: parseInt(process.env.APP_ID as string),
          redirect: false,
          redirectTo: DashboardRoutes.DASHBOARD,
        });
        if (signInData) {
          return {
            errors: {
              server: "User have already an account",
            },
          };
        }
      }

      return {
        errors: {
          server:
            result.message || "Une erreur est survenue lors de l'inscription.",
        },
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {
              server: "User already exists",
            },
          };
        default:
          return {
            errors: {
              server: "Une erreur est survenue, veuillez réessayer plus tard.",
            },
          };
      }
    }
    return {
      errors: {
        server: "Une erreur est survenue, veuillez réessayer plus tard.",
      },
    };
  }
  await signIn("credentials", {
    email: data.mail,
    password: data.password,
    redirect: false,
    appId: parseInt(process.env.APP_ID as string),
  });
  const locale = await getLocale();

  redirect({ href: DashboardRoutes.DASHBOARD, locale: locale });
};

export const login = async (
  state: { errors?: FormErrors; response?: RegisterResponse } | undefined,
  formData: FormData
): Promise<
  { errors?: FormErrors; response?: RegisterResponse } | undefined
> => {
  const t = await getTranslations("Register&LoginActions");
  const data = Object.fromEntries(formData.entries());
  const LoginFormSchema = z.object({
    mail: z.string().email(t("emailErrorInvalid")),
    password: z
      .string()
      .min(4, t("passwordErrorLengthMin"))
      .max(50, t("passwordErrorLengthMax")),
  });

  const validated = LoginFormSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.errors.reduce((acc: FormErrors, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {} as FormErrors);
    return { errors };
  }

  try {
    const affiliate = await signIn("credentials", {
      email: data.mail,
      password: data.password,
      redirect: false,
      redirectTo: DashboardRoutes.DASHBOARD,
    });
    console.log("affiliate", affiliate);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log("Invalid credentials");
          return { errors: { server: "Invalid credentials" } };
        default:
          console.log("Something went wrong");
          return { errors: { server: "Something went wrong" } };
      }
    }
    return {
      errors: {
        server: "Une erreur est survenue, veuillez réessayer plus tard",
      },
    };
  }
  const locale = await getLocale();

  redirect({ href: DashboardRoutes.DASHBOARD, locale: locale });
};
