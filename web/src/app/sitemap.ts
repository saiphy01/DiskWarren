import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://diskwarren.com';

  const routes = [
    // Core Mac Navigation & Conversion
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/download', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/safety', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/features', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.85, changeFrequency: 'weekly' as const },

    // Windows Standalone Website
    { path: '/windows', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/windows/download', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/windows/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/windows/safety', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/windows/features', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/windows/faq', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/windows/privacy', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/windows/system-requirements', priority: 0.75, changeFrequency: 'monthly' as const },

    // Android Standalone Website
    { path: '/android', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/android/download', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/android/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/android/safety', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/android/features', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/android/faq', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/android/privacy', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/android/system-requirements', priority: 0.75, changeFrequency: 'monthly' as const },

    // iOS Standalone Website
    { path: '/ios', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/ios/download', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/ios/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/ios/safety', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/ios/features', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/ios/faq', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/ios/privacy', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/ios/system-requirements', priority: 0.75, changeFrequency: 'monthly' as const },

    // Primary SEO Capabilities (Mac)
    { path: '/mac-storage-analyzer', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mac-disk-space-analyzer', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mac-large-files', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mac-cleaner', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mac-app-uninstaller', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mac-duplicate-finder', priority: 0.9, changeFrequency: 'weekly' as const },

    // Developer & AI Storage Hubs
    { path: '/developer-cleanup-mac', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/xcode-storage', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/docker-storage-mac', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/node-modules-disk-space', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/ollama-storage', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/lm-studio-storage', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/huggingface-cache-mac', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/comfyui-storage', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mac-cleaner-for-developers', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/mac-ai-storage-cleaner', priority: 0.85, changeFrequency: 'weekly' as const },

    // Competitor Alternatives
    { path: '/cleanmymac-alternative', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/daisydisk-alternative', priority: 0.85, changeFrequency: 'monthly' as const },

    // Educational Guides & How-Tos
    { path: '/how-to-clear-system-data-mac', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/how-to-delete-ollama-models', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/blog/how-to-delete-xcode-deriveddata', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog/delete-node-modules-recursively', priority: 0.8, changeFrequency: 'monthly' as const },

    // Trust, Security, Hardware & Legal
    { path: '/security', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/system-requirements', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/release-notes', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/refund-policy', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/support', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
