import {useRequest} from "ahooks";
import {getAppSettings, queryUserWallets} from "@/api/api.ts";
import {state} from "@/providers/state.ts";
import {cached} from "@/providers/request.ts";
import {useSnapshot} from "valtio/index";


const useAppSettings = (fetch?: boolean) => {
    const snap = useSnapshot(state)

    const cacheKey = 'appSettings'
    const {data, run} = useRequest<any, any>(getAppSettings,
        {
            manual: !fetch,
            onSuccess: (data: any, params) => {
                if (data) {
                    state.appSettings = data
                }
            },
            ...cached(cacheKey),
        } as any)

    return {
        fetch: run,
        settings: snap.appSettings || data
    }
}

export default useAppSettings;
