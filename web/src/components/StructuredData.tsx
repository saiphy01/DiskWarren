import React from 'react';

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DiskWarren',
    operatingSystem: 'macOS 14.0 or later',
    applicationCategory: 'UtilitiesApplication',
    description: 'Native macOS disk storage intelligence and safe cleanup application. Deep intelligence for Xcode, Docker, Node.js, and local AI model weights.',
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '184',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
