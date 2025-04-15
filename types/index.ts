export enum DashboardRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
}
export enum ApiV1Routes {
  login = "/v1/auth/affiliate/login",
  register = "/v1/auth/affiliate/register",
  currentAffiliate = "/v1/affiliate/current",
  affiliate = "/v1/affiliate",
  incomeTotals = "/v1/income/totals",
  income = "/v1/income",
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
