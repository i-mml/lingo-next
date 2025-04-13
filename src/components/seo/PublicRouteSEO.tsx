import React from "react";
import { getPublicRouteMetadata } from "@/utils/seo";

interface PublicRouteSEOProps {
  route: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  canonicalUrl?: string;
  type?: "website" | "article" | "video" | "audio" | "product" | "catalog";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  // Catalog specific props
  banners?: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  catalogs?: Array<{
    movies: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  }>;
}

export const PublicRouteSEO: React.FC<PublicRouteSEOProps> = ({
  route,
  title,
  description,
  image,
  keywords = [],
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  banners,
  catalogs,
}) => {
  const metadata = getPublicRouteMetadata(route);
  const fullTitle = `${title || ""} | ${metadata.siteName}`;
  const fullImage = image || metadata.defaultImage;
  const fullCanonicalUrl = canonicalUrl || `${metadata.siteUrl}${route}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={[...keywords, ...metadata.defaultKeywords].join(", ")}
      />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={metadata.siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article Specific Meta Tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "Article" : "WebPage",
            name: "یادگیری زبان با فیلم و سریال و انیمیشن",
            headline: fullTitle,
            description: description,
            image: fullImage,
            url: fullCanonicalUrl,
            ...(type === "article" && {
              datePublished: publishedTime,
              dateModified: modifiedTime,
              author: {
                "@type": "Person",
                name: author,
              },
              articleSection: section,
              keywords: tags.join(", "),
            }),
            publisher: {
              "@type": "Organization",
              name: metadata.siteName,
              logo: {
                "@type": "ImageObject",
                url: metadata.logo,
              },
            },
          }),
        }}
      />

      {/* Catalog Specific Structured Data */}
      {type === "catalog" && banners && catalogs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: title,
              description: description,
              mainEntity: [
                ...banners.map((banner) => ({
                  "@type": "CreativeWork",
                  name: banner.title,
                  description: banner.description,
                  image: banner.image,
                })),
                ...catalogs.flatMap((catalog) =>
                  catalog.movies.map((movie) => ({
                    "@type": "CreativeWork",
                    name: movie.title,
                    description: movie.description,
                    image: movie.image,
                  }))
                ),
              ],
            }),
          }}
        />
      )}

      {/* Additional Structured Data based on route type */}
      {route.includes("video") && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: fullTitle,
              description: description,
              thumbnailUrl: fullImage,
              uploadDate: publishedTime,
              contentUrl: fullCanonicalUrl,
            }),
          }}
        />
      )}

      {route.includes("audio") && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AudioObject",
              name: fullTitle,
              description: description,
              contentUrl: fullCanonicalUrl,
            }),
          }}
        />
      )}
    </>
  );
};
