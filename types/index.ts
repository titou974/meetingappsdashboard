export enum DashboardRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
}
export enum ApiV1Routes {
  login = "/v1/auth/affiliate/login",
  register = "/v1/auth/affiliate/register",
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

export const initialState = {
  errors: undefined as FormErrors | undefined,
  response: undefined as RegisterResponse | undefined,
};
