import createMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "@/config";

export default createMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: "en",
    localePrefix,
    pathnames
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
