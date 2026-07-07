import { SEOHead } from "./seo-head";
import type { SEOHeadProps } from "./seo-head";

interface SEOLayoutProps {
  children: React.ReactNode;
  seoProps?: SEOHeadProps;
}

export function SEOLayout({ children, seoProps }: SEOLayoutProps) {
  return (
    <>
      <SEOHead {...seoProps} />
      {children}
    </>
  );
}
