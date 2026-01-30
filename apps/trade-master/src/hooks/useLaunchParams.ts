import {useLaunchParams} from "@telegram-apps/sdk-react";


const useLaunchValues = () => {

    const params = useLaunchParams()

    return {
        locale: params?.initData?.user?.languageCode || 'en',
    }
}

export default useLaunchValues;