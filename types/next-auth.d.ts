import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    affiliate: {
      id: string;
      affiliateName: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface Affiliate {
    affiliate: {
      id: string;
      affiliateName: string;
      email: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    affiliate: {
      id: string;
      affiliateName: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth" {
  interface Callbacks {
    session: (session: Session | null, token: JWT) => Promise<Session | null>;
  }
}
