import { Env } from "@/config/env";
import axios, { AxiosRequestConfig } from "axios";

export const http = axios.create({
  baseURL: Env().PUBLIC.API.BASE_URL,
});

export function useHttp<T = any, TError = any>(
  url: string,
  options?: AxiosRequestConfig
) {
  const fetcher = async () => {
    const { data } = await http.request<T>({
      url: url,
      ...options,
    });

    return data;
  };

  return useSWR<T, TError>(url, fetcher);
}

export async function HttpServer<T = any, TError = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<{
  data: T | undefined;
  isError: boolean;
  error: TError | undefined;
}> {
  try {
    const { data } = await http.request<T>({
      url: url,
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
