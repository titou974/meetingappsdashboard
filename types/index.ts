export enum DashboardRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  DASHBOARD_ADMIN = "/dashboard/admin",
  LINKS = "/dashboard/links",
  LINK = "/dashboard/links/:id",
  PAYMENTS = "/dashboard/payments",
}
export enum ApiV1Routes {
  login = "/v1/auth/affiliate/login",
  register = "/v1/auth/affiliate/register",
  currentAffiliate = "/v1/affiliate/current",
  dailyIncome = "/v1/income/daily",
  adminDailyIncome = "/v1/admin-income/daily",
  totalStats = "/v1/affiliate/total-stats",
  adminTotalStats = "/v1/admin/total-stats",
  links = "/v1/links",
  link = "/v1/link",
}

export enum SocialMediaType {
  X = "X",
  TIKTOK = "TIKTOK",
  INSTAGRAM = "INSTAGRAM",
  SNAPCHAT = "SNAPCHAT",
  TELEGRAM = "TELEGRAM",
  YOUTUBE = "YOUTUBE",
  OTHER = "OTHER",
}

export enum PaymentType {
  PAYPAL = "PAYPAL",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export interface FormErrors {
  [key: string]: string | undefined | null;
}

export interface RegisterResponse {
  message: string;
  id: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
  affiliateName: string;
  cguAccepted: boolean;
  linkName?: string; // Optional field
}

export interface AffiliateLight {
  id: string;
  affiliateName: string;
  email: string;
  iban: string;
  share: number;
  createdAt: Date;
}

export const initialState = {
  errors: undefined as FormErrors | undefined,
  response: undefined as RegisterResponse | undefined,
};

export interface DailyIncome {
  date: string;
  totalIncome: number;
  affiliateIncome: number;
}

export interface DailyIncomeResponse {
  dailyIncome: DailyIncome[];
}

export interface TotalStatsResponse {
  conversionRate: string;
  totalIncome: number;
  incomeForAffiliate: number;
  totalActiveSubscribersCount: number;
  totalNewSubscribersCount: number;
  totalVisitsCount: number;
}

export interface Link {
  id: number;
  name: string;
  appId: number;
  createdAt: Date;
  totalIncome: number;
  affiliateTotalIncome: number;
  totalVisitsCount: number;
  totalActiveSubscribersCount: number;
  conversionRate: number;
  socialMedia: SocialMediaType;
  query: string;
}

export interface Links {
  currentPage: number;
  totalPages: number;
  totalLinks: number;
  links: Link[];
}

export const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

export const socialMediaList = [
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

export interface Payment {
  id: number;
  amount: number;
  affiliateRevenue: number;
  createdAt: Date;
  affiliatePaid: boolean;
  paymentFailed: boolean;
}

export interface LinkWithPaymentsResponse {
  currentPage: number;
  totalPages: number;
  link: Link;
  payments: Payment[];
}
