import {useIntl} from 'react-intl'

export const useTranslation = () => {

    const intl = useIntl()

    return (key?: string, params?: any) => key ? intl.formatMessage({id: key,}, params) : ""
}

export const useTranslations = (namespace?: string) => {

    const intl = useIntl()

    return (key?: string) => key ? intl.formatMessage({id: key}) : ""
}
