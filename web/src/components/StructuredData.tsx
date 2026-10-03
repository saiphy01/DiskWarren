import React from 'react';

export default function StructuredData() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DiskWarren',
    operatingSystem: 'macOS 14.0 or later (Sonoma, Sequoia)',
    applicationCategory: 'UtilitiesApplication',
    description: 'Native macOS storage intelligence and safe cleanup application. Analyzes storage, finds hidden space hogs, and reclaims space safely across developer files, Xcode data, Docker, Node modules, local AI models, duplicates, and application leftovers.',
    offers: [
      {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
        name: 'Free Community Edition',
        description: 'Complete disk exploration, squarified treemaps, partition rings, and large file inspection.'
      },
      {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'USD',
        name: 'DiskWarren Pro Lifetime',
        description: 'Perpetual single-Mac license with one-click safe batch cleanup, uninstaller, and duplicate finder.'
      }
    ],
    softwareRequirements: 'macOS 14.0 or higher. Compatible with Apple Silicon (M1/M2/M3/M4) and 64-bit Intel processors.',
    downloadUrl: 'https://diskwarren.com/download',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DiskWarren',
    url: 'https://diskwarren.com',
    logo: 'https://diskwarren.com/icon.svg',
    sameAs: [
      'https://github.com/saiphy01/DiskWarren'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@diskwarren.com',
      contactType: 'customer support'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does DiskWarren request Full Disk Access?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Full Disk Access may be granted so DiskWarren can index protected system directories like Xcode build products in ~/Library/Developer, local application support caches, and Time Machine snapshots. The user retains complete control over this permission in macOS System Settings.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can DiskWarren delete important system files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DiskWarren is engineered to prevent accidental deletion. Critical system locations (/System, /usr, /bin, keychains, and sealed APFS system snapshots) are permanently protected by hardcoded safety barriers. Furthermore, all user-approved cleanups route through the native macOS Trash where supported.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which Macs and macOS versions are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DiskWarren is built for macOS 14.0 Sonoma and macOS 15.0+ Sequoia. It runs natively on all Apple Silicon chips (M1, M2, M3, M4) and supported 64-bit Intel Macs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does DiskWarren upload my files or telemetry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never. DiskWarren operates on a strict zero-knowledge architecture. All scanning, metadata parsing, size calculation, and duplicate matching run 100% locally on your Mac. No filenames, folder paths, or file contents are ever sent to any remote server.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is DiskWarren a subscription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. DiskWarren is sold as a perpetual one-time purchase. Pay once ($9.99 for a single Mac or $14.99 for up to 3 Macs), own it forever, with free v1.x updates.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
