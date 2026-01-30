import {useRequest} from "ahooks";
import {queryUserWallets} from "@/api/api.ts";
import {state} from "@/providers/state.ts";
import {cached} from "@/providers/request.ts";
import {useSnapshot} from "valtio";
import {Wallet} from "@/types";
import {DEFAULT_WALLET_CACHE_KEY} from "@/contants.ts";
import {useEffect} from "react";


const useDefaultWallet = (fetch?: boolean) => {

    const snap = useSnapshot(state)

    useEffect(() => {
        state.wallet = JSON.parse(localStorage.getItem(DEFAULT_WALLET_CACHE_KEY) || '{}')
    }, [])

    const {data, run, loading} = useRequest<any, any>(() => queryUserWallets({
            default: true,
        }),
        {
            manual: !fetch,
            onSuccess: (data: any, params: any) => {
                if (data?.list?.[0]) {
                    state.wallet = data?.list?.[0]

                    localStorage.setItem(DEFAULT_WALLET_CACHE_KEY, JSON.stringify(data?.list?.[0] || {}))
                }
            },
            // ...cached(DEFAULT_WALLET_CACHE_KEY),
        } as any)

    return {
        fetch: run,
        wallet: (snap.wallet || data?.list?.[0]) as Wallet,
        loading: !snap.wallet && loading
    }
}

export default useDefaultWallet;
