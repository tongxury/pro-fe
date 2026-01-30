import {IntlProvider} from "react-intl";
import type {ReactNode} from "react";
import zh from "./zh"
import type {PropsWithChildren} from "react";


const I18nProvider = ({children}: PropsWithChildren) => {

    // @ts-ignore:
    return <IntlProvider messages={zh} locale="zh" defaultLocale="zh">
        {children}
    </IntlProvider>
}

export default I18nProvider
