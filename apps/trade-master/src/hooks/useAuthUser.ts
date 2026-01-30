import {useRequest} from "ahooks";
import {getUserDetail} from "@/api/api.ts";
import {state} from "@/providers/state.ts";
import {cached} from "@/providers/request.ts";
import {useSnapshot} from "valtio/index";
import {User} from "@/types";


const useAuthUser = (fetch?: boolean) => {
    const snap = useSnapshot(state)

    const cacheKey = 'authUser'
    // const urlParams = getUrlParams()
    const {data, run} = useRequest(() => getUserDetail(),
        {
            manual: !fetch,
            onSuccess: (data: any, params) => {
                if (data) {
                    state.user = data
                }
            },
            ...cached(cacheKey),
        } as any)

    return {
        fetch: run,
        user: snap.user || data as User
    }
}

export default useAuthUser;
