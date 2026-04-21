export const NODE_ENV: string = process.env.NODE_ENV || "development";

export const NEXT_PUBLIC_BASE_URL_API: string =
  process.env.NEXT_PUBLIC_BASE_URL_API || "/api/v1";

export const COOKIE_TOKEN_KEY: string = "auth_token";

export const COOKIE_USER_ROLE_KEY: string = "auth_user_role";

export const RETURNS_ENDPOINT: string = "/retours";

export const RETURNS_KEY: string = "returns";

export const NON_CONFORMITE_ENDPOINT: string = "/non-conformites";

export const NON_CONFORMITE_KEY: string = "non-conformite";

export const LOGIN_ENDPOINT: string = "/auth/login";

export const USERS_ENDPOINT: string = "/users";

export const USERS_KEY: string = "users";

export const HISTORY_ENDPOINT: string = "/historique-retours";

export const HISTORY_KEY: string = "history";
