import { IApiResponse } from '@farms/shared-types';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? 'https://the-farms-server.vercel.app/api/v1'
    : 'http://localhost:5000/api/v1');

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<IApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request returned HTTP ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error(`[API Call Failed: ${endpoint}]`, error.message || error);
    throw error;
  }
}
