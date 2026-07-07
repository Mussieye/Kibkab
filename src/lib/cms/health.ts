import { getCMSConfig, hasCMSBaseUrl } from "@/lib/cms/config";
import { fetchCMSJson } from "@/lib/cms/client";

type EndpointCheck = {
  label: string;
  path: string;
  ok: boolean;
  message: string;
};

export type CMSHealthReport = {
  provider: string;
  baseUrlConfigured: boolean;
  tokenConfigured: boolean;
  overallOk: boolean;
  checks: EndpointCheck[];
};

async function checkEndpoint(label: string, path: string): Promise<EndpointCheck> {
  try {
    await fetchCMSJson(path);
    return { label, path, ok: true, message: "Reachable" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { label, path, ok: false, message };
  }
}

export async function getCMSHealthReport(): Promise<CMSHealthReport> {
  const config = getCMSConfig();
  const baseUrlConfigured = hasCMSBaseUrl(config);
  const tokenConfigured = Boolean(config.apiToken && config.apiToken.trim());

  if (!baseUrlConfigured) {
    return {
      provider: config.provider,
      baseUrlConfigured,
      tokenConfigured,
      overallOk: false,
      checks: [
        {
          label: "Environment",
          path: "CMS_BASE_URL",
          ok: false,
          message: "Set CMS_BASE_URL in .env.local first.",
        },
      ],
    };
  }

  const endpoints = [
    { label: "Ministries", path: "/api/ministries?pagination[pageSize]=1" },
    { label: "Leaders", path: "/api/leaders?pagination[pageSize]=1" },
    { label: "Sermons", path: "/api/sermons?pagination[pageSize]=1" },
    { label: "Events", path: "/api/events?pagination[pageSize]=1" },
    { label: "Blog Posts", path: "/api/blog-posts?pagination[pageSize]=1" },
    { label: "Gallery Albums", path: "/api/gallery-albums?pagination[pageSize]=1" },
  ];

  const checks = await Promise.all(
    endpoints.map((endpoint) => checkEndpoint(endpoint.label, endpoint.path)),
  );

  return {
    provider: config.provider,
    baseUrlConfigured,
    tokenConfigured,
    overallOk: checks.every((check) => check.ok),
    checks,
  };
}
