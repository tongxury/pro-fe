import { Pathnames } from "next-intl/routing";

export const localeLabels: { [key: string]: string } = {
    // 'ar': 'العربية',
    en: "English",
    es: "español", // 西班牙语
    fr: "En français", // 法语
    pt: "português", // 葡语
    py: "Русский", // 俄语
    ko: "한국어",
    jp: "日本語",
    // 'tr': 'Türkçe',
    // 'vi': 'Việt nam',
    zh: "中文"
    // 'zh-TW': '中文（繁体）'
};

export const locales = Object.keys(localeLabels);

export const pathnames = {
    // If all locales use the same pathname, a
    // single external path can be provided.
    // '/': '/home',
    // '/blog': '/blog',
    // // If locales use different paths, you can
    // // specify each external path per locale.
    // '/about': {
    //     en: '/about',
    //     de: '/ueber-uns'
    // },
    //
    // // Dynamic params are supported via square brackets
    // '/news/[articleSlug]-[articleId]': {
    //     en: '/news/[articleSlug]-[articleId]',
    //     de: '/neuigkeiten/[articleSlug]-[articleId]'
    // },
    //
    // // Also (optional) catch-all segments are supported
    // '/categories/[...slug]': {
    //     en: '/categories/[...slug]',
    //     de: '/kategorien/[...slug]'
    // }
} satisfies Pathnames<typeof locales>;

export const localePrefix = "as-needed";
