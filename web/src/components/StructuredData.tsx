import React from 'react';

export default function StructuredData() {
  const macSoftwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DiskWarren for Mac',
    operatingSystem: 'macOS 14.0 or later (Sonoma, Sequoia)',
    applicationCategory: 'UtilitiesApplication',
    description: 'Native macOS storage intelligence and safe cleanup application. Analyzes APFS storage, squarified treemaps, Xcode DerivedData, Docker, Node modules, and local AI models.',
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

  const windowsSoftwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DiskWarren for Windows',
    operatingSystem: 'Windows 10 (20H2+) & Windows 11',
    applicationCategory: 'UtilitiesApplication',
    description: 'Native Windows storage analyzer and disk cleaner. Instant NTFS Master File Table traversal, Visual Studio .vs, NuGet, WSL2 compaction, and Recycle Bin-first safety.',
    offers: [
      {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
        name: 'Free Community Edition',
        description: 'Free NTFS partition exploration and drive treemap scanner.'
      },
      {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'USD',
        name: 'DiskWarren Windows Pro Lifetime',
        description: 'Perpetual Single PC license for developer cleanup and deep duplicate detection.'
      }
    ],
    softwareRequirements: 'Windows 10 20H2+ or Windows 11 (x64 and ARM64 Copilot+ PCs).',
    downloadUrl: 'https://windows.diskwarren.com/download',
  };

  const androidSoftwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DiskWarren for Android',
    operatingSystem: 'Android 10.0 to Android 15.0',
    applicationCategory: 'UtilitiesApplication',
    description: 'Smart Android storage cleanup and duplicate photo cleaner. Root-free, Google Play Scoped Storage compliant, and 30-day native OS Gallery Trash recovery.',
    offers: [
      {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
        name: 'Free Edition',
        description: 'Storage categorization and large file finder.'
      },
      {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        name: 'Pro Lifetime',
        description: 'One-time in-app purchase with Google Play Family Library support.'
      }
    ],
    softwareRequirements: 'Android 10.0 (API 29) or higher.',
    downloadUrl: 'https://android.diskwarren.com/download',
  };

  const iosSoftwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DiskWarren for iPhone',
    operatingSystem: 'iOS 17.0+ & iPadOS 17.0+',
    applicationCategory: 'UtilitiesApplication',
    description: 'Private iPhone storage intelligence. On-device Apple Neural Engine photo duplicate clustering, burst photo picker, 4K ProRes video inspector, and iCloud optimization.',
    offers: [
      {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
        name: 'Free Edition',
        description: 'PhotoKit storage breakdown and large media analysis.'
      },
      {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        name: 'Pro Lifetime',
        description: 'One-time StoreKit 2 in-app purchase with Apple Family Sharing.'
      }
    ],
    softwareRequirements: 'iOS 17.0+ or iPadOS 17.0+ (Apple Silicon A12 through M4).',
    downloadUrl: 'https://ios.diskwarren.com/download',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DiskWarren',
    url: 'https://diskwarren.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://diskwarren.com/support?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(macSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(windowsSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(androidSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(iosSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
