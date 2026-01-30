import en_US from "./en_US";
import es_ES from "./es_ES";
import fr_FR from "./fr_FR";
import ja_JP from "./ja_JP";
import kr_KR from "./kr_KR";
import pt_PT from "./pt_PT";
import ru_RU from "./ru_RU";
import zh_CN from "./zh_CN";

export const locales = {
    en_US: { value: "en_US", messages: en_US, label: "English", locale: "en" },
    fr_FR: {
        value: "fr_FR",
        messages: fr_FR,
        label: "En français",
        locale: "fr"
    },
    pt_PT: {
        value: "pt_PT",
        messages: pt_PT,
        label: "português",
        locale: "pt"
    },
    ru_RU: { value: "ru_RU", messages: ru_RU, label: "Русский", locale: "ru" },
    es_ES: { value: "es_ES", messages: es_ES, label: "español", locale: "es" },
    zh_CN: {
        value: "zh_CN",
        messages: zh_CN,
        label: "中文(简体)",
        locale: "zh"
    },
    ja_JP: { value: "ja_JP", messages: ja_JP, label: "日本語", locale: "ja" },
    kr_KR: { value: "kr_KR", messages: kr_KR, label: "한국어", locale: "kr" }
};
