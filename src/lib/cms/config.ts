import type { CMSProvider } from "@/lib/cms/models";

export type CMSConfig = {
  provider: CMSProvider;
  baseUrl?: string;
  apiToken?: string;
};

export function getCMSConfig(): CMSConfig {
  const provider = (process.env.CMS_PROVIDER ?? "strapi") as CMSProvider;
  const baseUrl = process.env.CMS_BASE_URL;
  const apiToken = process.env.CMS_API_TOKEN;

  return {
    provider: provider === "wordpress" ? "wordpress" : "strapi",
    baseUrl,
    apiToken,
  };
}

export function hasCMSBaseUrl(config: CMSConfig) {
  return Boolean(config.baseUrl && config.baseUrl.trim().length > 0);
}
