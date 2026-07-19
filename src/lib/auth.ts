import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = AuthToken & {
  user: {
    id: number;
    email: string;
    name: string;
    image: string | null;
  };
};

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(ACCESS_TOKEN_KEY) ?? null;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(REFRESH_TOKEN_KEY) ?? null;
}

export function setAuthTokens({ accessToken, refreshToken }: AuthToken): void {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken);
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearAuthTokens(): void {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("로그인에 실패했습니다.");
  }

  const data = (await res.json()) as LoginResponse;
  setAuthTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return data;
}

export async function ensureAuth(): Promise<void> {
  if (getAccessToken()) return;

  const email = process.env.NEXT_PUBLIC_AUTH_EMAIL;
  const password = process.env.NEXT_PUBLIC_AUTH_PASSWORD;
  if (!email || !password) {
    throw new Error("로그인 정보가 없습니다.");
  }

  await login({ email, password });
}

export type { LoginResponse };
