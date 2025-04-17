export enum DashboardRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
}
export enum ApiV1Routes {
  login = "/v1/auth/affiliate/login",
  register = "/v1/auth/affiliate/register",
  currentAffiliate = "/v1/affiliate/current",
  dailyIncome = "/v1/income/daily",
  totalStats = "/v1/affiliate/total-stats",
  links = "/v1/links",
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
}

export interface Links {
  currentPage: number;
  totalPages: number;
  totalLinks: number;
  links: Link[];
}
