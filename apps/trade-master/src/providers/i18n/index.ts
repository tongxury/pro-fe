import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./messages/en.ts";
import zh_hans from "./messages/zh_hans.ts";
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: en
    },
    zh: {
        translation: zh_hans
    },

};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: import.meta.env.MODE === 'development' ? 'zh' : (retrieveLaunchParams().initData?.user?.languageCode || 'en'), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
