import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuthTokens,
} from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearAuthTokens();
    throw new Error("토큰이 만료되었습니다.");
  }

  const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshRes.ok) {
    clearAuthTokens();
    throw new Error("토큰 갱신에 실패했습니다.");
  }

  const data = await refreshRes.json();
  setAuthTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return data.accessToken as string;
}

export async function api(
  path: string,
  options: RequestOptions = {},
): Promise<Response> {
  const { body, headers, ...rest } = options;
  const token = getAccessToken();

  const makeRequest = (accessToken: string | null) =>
    fetch(`${BASE_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let res = await makeRequest(token);

  if (res.status === 401) {
    const newAccessToken = await refreshAccessToken();
    res = await makeRequest(newAccessToken);
  }

  return res;
}

export const get = (path: string) => api(path, { method: "GET" });

export const post = (path: string, body?: unknown) =>
  api(path, { method: "POST", body });

export const put = (path: string, body?: unknown) =>
  api(path, { method: "PUT", body });

export const patch = (path: string, body?: unknown) =>
  api(path, { method: "PATCH", body });

export const del = (path: string) => api(path, { method: "DELETE" });
