import Head from "next/head";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, any>[];
}

const defaultSEO = {
  title: "Maranatha Christian Church - A Place of Hope & Worship",
  description: "Join Maranatha Christian Church for inspiring worship, meaningful community, and spiritual growth. Experience God's love through our services, ministries, and outreach programs.",
  keywords: "Christian church, worship, Bible study, community, faith, Maranatha, church services, prayer, ministry",
  ogImage: "/og-image.jpg",
  ogType: "website" as const,
  siteName: "Maranatha Christian Church",
  url: "https://maranatha.church",
};

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  jsonLd = [],
}: SEOHeadProps) {
  const pageTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title;
  const pageDescription = description || defaultSEO.description;
  const pageKeywords = keywords || defaultSEO.keywords;
  const pageImage = ogImage || defaultSEO.ogImage;
  const canonicalUrl = canonical || defaultSEO.url;

  // Generate JSON-LD structured data
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: defaultSEO.siteName,
    description: "A Christian church dedicated to worship, community, and spiritual growth",
    url: defaultSEO.url,
    logo: `${defaultSEO.url}/logo.svg`,
    image: `${defaultSEO.url}${pageImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Church Street",
      addressLocality: "Your City",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "general",
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://www.facebook.com/maranathachurch",
      "https://www.youtube.com/maranathachurch",
      "https://www.instagram.com/maranathachurch",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultSEO.siteName,
    description: defaultSEO.description,
    url: defaultSEO.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${defaultSEO.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const allJsonLd = [organizationJsonLd, websiteJsonLd, ...jsonLd];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={defaultSEO.siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`${defaultSEO.url}${pageImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${defaultSEO.siteName} - ${pageDescription}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${defaultSEO.url}${pageImage}`} />
      <meta name="twitter:image:alt" content={`${defaultSEO.siteName} - ${pageDescription}`} />
      <meta name="twitter:site" content="@maranatha_church" />
      <meta name="twitter:creator" content="@maranatha_church" />
      
      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US-STATE" />
      <meta name="geo.placename" content="Your City" />
      <meta name="ICBM" content="latitude,longitude" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      {allJsonLd.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
    </Head>
  );
}

// Helper function for page-specific JSON-LD
export function createServiceJsonLd(service: {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: service.name,
    description: service.description,
    startDate: service.startTime,
    endDate: service.endTime,
    location: {
      "@type": "Place",
      name: "Maranatha Christian Church",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Church Street",
        addressLocality: "Your City",
        addressRegion: "State",
        postalCode: "12345",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Maranatha Christian Church",
      url: "https://maranatha.church",
    },
  };
}

export function createArticleJsonLd(article: {
  title: string;
  description: string;
  publishDate: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author || "Maranatha Christian Church",
    },
    publisher: {
      "@type": "Organization",
      name: "Maranatha Christian Church",
      logo: {
        "@type": "ImageObject",
        url: "https://maranatha.church/logo.svg",
      },
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
  };
}
