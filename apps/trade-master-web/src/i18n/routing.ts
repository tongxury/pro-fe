import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import {useTranslations} from "next-intl";

export const localeLabels: { [key: string]: string } = {
    // 'ar': 'العربية',
    en: "English",
    // es: "español", // 西班牙语
    // fr: "En français", // 法语
    // pt: "português", // 葡语
    // py: "Русский", // 俄语
    // ko: "한국어",
    // jp: "日本語",
    // 'tr': 'Türkçe',
    // 'vi': 'Việt nam',
    // zh: "中文",
    // 'zh-TW': '中文（繁体）'
};

export const locales = Object.keys(localeLabels);


export const routing = defineRouting({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: 'en',
    localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);


export const useTranslation = () => useTranslations("Default");
