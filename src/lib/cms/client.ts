import { getCMSConfig } from "@/lib/cms/config";

function buildHeaders(token?: string): HeadersInit {
  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}

export async function fetchCMSJson<T>(path: string): Promise<T> {
  const config = getCMSConfig();

  if (!config.baseUrl) {
    throw new Error("CMS_BASE_URL is not set.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${config.baseUrl}${normalizedPath}`;

  const response = await fetch(url, {
    headers: buildHeaders(config.apiToken),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
