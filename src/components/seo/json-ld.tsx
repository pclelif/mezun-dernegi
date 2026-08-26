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
    "@type": ["EducationalOrganization", "NGO"],
    "@id": `${siteUrl}/#organization`,
    name: "KAAFL Mezunlar Derneği",
    legalName: associationName,
    alternateName: [
      "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği",
      associationShortName,
      "KAAFL Dernek",
      "KAAFL Mezun",
    ],
    url: siteUrl,
    logo: logoUrl.startsWith("http") ? logoUrl : `${siteUrl}${logoUrl}`,
    image: [
      `${siteUrl}/logo-dernek.png`,
      `${siteUrl}/images/og-image.jpg?v=15`,
    ],
    thumbnailUrl: `${siteUrl}/logo-dernek.png`,
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
    name: "KAAFL Mezunlar Derneği",
    alternateName: associationName,
    url: siteUrl,
    inLanguage: "tr-TR",
    thumbnailUrl: `${siteUrl}/logo-dernek.png`,
    image: `${siteUrl}/logo-dernek.png`,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    hasPart: [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/uyelik/dernek-uyeligi#webpage`,
        name: "Dernek Üyeliği",
        url: `${siteUrl}/uyelik/dernek-uyeligi`,
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/iletisim#webpage`,
        name: "İletişim",
        url: `${siteUrl}/iletisim`,
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/duyurular-ve-etkinlikler/duyurular#webpage`,
        name: "Duyurular",
        url: `${siteUrl}/duyurular-ve-etkinlikler/duyurular`,
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/duyurular-ve-etkinlikler/etkinlikler#webpage`,
        name: "Etkinlikler",
        url: `${siteUrl}/duyurular-ve-etkinlikler/etkinlikler`,
      },
    ],
  };

  const navSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Dernek Üyeliği",
        url: `${siteUrl}/uyelik/dernek-uyeligi`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "İletişim",
        url: `${siteUrl}/iletisim`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Duyurular",
        url: `${siteUrl}/duyurular-ve-etkinlikler/duyurular`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Etkinlikler",
        url: `${siteUrl}/duyurular-ve-etkinlikler/etkinlikler`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }}
      />
    </>
  );
}

export function ContactPageJsonLd({
  title = "İletişim - KAAFL Mezunlar Derneği",
  description = "KAAFL Mezunlar Derneği iletişim bilgileri, dernek adresi, e-posta, harita konumu ve iletişim formu.",
}: {
  title?: string;
  description?: string;
} = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/iletisim#webpage`,
    url: `${siteUrl}/iletisim`,
    name: title,
    description: description,
    inLanguage: "tr-TR",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
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

export function WebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const fullUrl = path.startsWith("http") ? path : `${siteUrl}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${fullUrl}#webpage`,
    url: fullUrl,
    name: title,
    description: description,
    inLanguage: "tr-TR",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
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

export function CollectionPageJsonLd({
  title,
  description,
  path,
  items = [],
}: {
  title: string;
  description: string;
  path: string;
  items?: Array<{ name: string; url: string }>;
}) {
  const fullUrl = path.startsWith("http") ? path : `${siteUrl}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${fullUrl}#webpage`,
    url: fullUrl,
    name: title,
    description: description,
    inLanguage: "tr-TR",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
    ...(items.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              url: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
            })),
          },
        }
      : {}),
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
    image: imageUrl ? (imageUrl.startsWith("http") ? imageUrl : `${siteUrl}${imageUrl}`) : `${siteUrl}/images/og-image.jpg?v=15`,
    author: {
      "@type": "Organization",
      name: "KAAFL Mezunlar Derneği",
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
    image: imageUrl ? (imageUrl.startsWith("http") ? imageUrl : `${siteUrl}${imageUrl}`) : `${siteUrl}/images/og-image.jpg?v=15`,
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
