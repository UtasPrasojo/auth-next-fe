// src/plugin/http.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import useSWR from "swr";
import { Env } from "@/config/env";

// -------------------------------------------------
// 1. Axios Instance
// -------------------------------------------------
export const httpClient = axios.create({
  baseURL: Env().PUBLIC.API.BASE_URL,
  withCredentials: true, // kalau backend pakai cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------------------------------
// 2. Interceptors (Auth + Error Handling)
// -------------------------------------------------
httpClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // contoh: kalau token expired
    if (error.response?.status === 401) {
      // bisa redirect ke login atau refresh token di sini
      console.error("Unauthorized, redirecting...");
    }
    return Promise.reject(error);
  }
);

// -------------------------------------------------
// 3. SWR Hook
// -------------------------------------------------
export function useHttp<T = any, TError = any>(
  url: string | null, // null untuk skip
  options?: AxiosRequestConfig
) {
  const fetcher = async ([url, options]: [string, AxiosRequestConfig?]) => {
    const { data } = await httpClient.request<T>({
      url,
      ...options,
    });
    return data;
  };

  // ✅ key bisa [url, options] atau null
  return useSWR<T, TError>(url ? [url, options] : null, fetcher);
}

// -------------------------------------------------
// 4. Server-side Fetch Helper (tanpa SWR)
// -------------------------------------------------
export async function HttpServer<T = any, TError = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<{
  data: T | undefined;
  isError: boolean;
  error: TError | undefined;
}> {
  try {
    const { data } = await httpClient.request<T>({
      url,
      ...options,
    });
    return { data, isError: false, error: undefined };
  } catch (e: any) {
    return {
      data: undefined,
      isError: true,
      error: e?.response?.data || e?.message,
    };
  }
}

// -------------------------------------------------
// 5. API Services
// -------------------------------------------------
export const api = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    httpClient.post("/auth/login", credentials),

  register: (userData: { name: string; email: string; password: string }) =>
    httpClient.post("/auth/register", userData),

  logout: () => httpClient.post("/auth/logout"),

  // User
  getProfile: () => httpClient.get("/user/profile"),
  updateProfile: (data: any) => httpClient.put("/user/profile", data),
};
