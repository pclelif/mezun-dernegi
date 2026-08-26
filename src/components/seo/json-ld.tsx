import { associationDescription, associationName, associationShortName, siteConfig, siteUrl } from "@/config/site";

export function OrganizationJsonLd({
  logoUrl = siteConfig.logoUrl,
  address = siteConfig.address.streetAddress,
  email = siteConfig.contact.email,
  instagramUrl = siteConfig.contact.instagram,
  linkedinUrl = siteConfig.contact.linkedin,
}: {
  logoUrl?: string;
  address?: string;
  email?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}) {
  const sameAs = [instagramUrl, linkedinUrl].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name: associationName,
    alternateName: associationShortName,
    url: siteUrl,
    logo: logoUrl.startsWith("http") ? logoUrl : `${siteUrl}${logoUrl}`,
    image: `${siteUrl}/images/og-image.png`,
    description: associationDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: address || siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: email || siteConfig.contact.email,
      contactType: "customer service",
      availableLanguage: ["Turkish"],
    },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: associationName,
    alternateName: associationShortName,
    url: siteUrl,
    inLanguage: "tr-TR",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; href: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.href.startsWith("http") ? item.href : `${siteUrl}${item.href}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  url,
  imageUrl,
}: {
  title: string;
  description: string;
  datePublished?: string | null;
  url: string;
  imageUrl?: string | null;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    datePublished: datePublished || undefined,
    url: url.startsWith("http") ? url : `${siteUrl}${url}`,
    image: imageUrl ? (imageUrl.startsWith("http") ? imageUrl : `${siteUrl}${imageUrl}`) : `${siteUrl}/images/og-image.png`,
    author: {
      "@type": "Organization",
      name: associationName,
      url: siteUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "tr-TR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventJsonLd({
  title,
  description,
  startDate,
  endDate,
  location,
  url,
  imageUrl,
}: {
  title: string;
  description: string;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  url: string;
  imageUrl?: string | null;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description: description,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: location || "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ankara",
        addressCountry: "TR",
      },
    },
    image: imageUrl ? (imageUrl.startsWith("http") ? imageUrl : `${siteUrl}${imageUrl}`) : `${siteUrl}/images/og-image.png`,
    organizer: {
      "@id": `${siteUrl}/#organization`,
    },
    url: url.startsWith("http") ? url : `${siteUrl}${url}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
