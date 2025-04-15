import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DashboardRoutes, ApiV1Routes } from "./types";
import { JWT } from "next-auth/jwt";
import { getIsTokenValid } from "./utils/token";

// Define the auth options for NextAuth
export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Define your mock user
        try {
          const parsedCredentials = {
            ...credentials,
          };
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}${ApiV1Routes.login}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(parsedCredentials),
            }
          );

          const data = await res.json();
          console.log("data", data);
          const isTokenValid = getIsTokenValid(data.accessToken);
          console.log("isTokenValid", isTokenValid);
          // Check if the response contains a user and token
          if (isTokenValid) {
            // Return only the user, NextAuth will handle the session management
            return data; // This must match the User type expected by NextAuth
          }
          return null;
        } catch (error) {
          console.error("Error during sign-in:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    // Properly typed jwt callback
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // On sign-in, add accessToken and user to the token
      if (user) {
        console.log("user", user);
        token.accessToken = user.accessToken || "";
        token.user = {
          id: user.affiliate.id, // Replace with the actual user ID
          affiliateName: user.affiliate.affiliateName || "",
          email: user.affiliate.email || "",
        };
        console.log("token", token);
      }
      return token;
    },

    // Properly typed session callback
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add accessToken and user info to session
      const isTokenValid = getIsTokenValid(token.accessToken);
      console.log("session", session);
      console.log("tokenAfter", token);
      if (!isTokenValid) {
        return { user: null } as Session & { user: null };
      }
      session.accessToken = token.accessToken;
      session.user = token.user as Session["user"];
      return session;
    },
  },
  pages: {
    signIn: DashboardRoutes.HOME,
  },
};

export const { signIn, auth, unstable_update, signOut } = NextAuth(authOptions);
