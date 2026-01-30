import { useGlobalState } from "@/providers/GlobalData"
import { fetchCreditState } from "@/api/credit"
import { useRequest } from "ahooks"
import { useEffect } from "react"

const useCreditState = (options?: { fetch: boolean }) => {

    const { creditState, setCreditState, creditStateLoading, setCreditStateLoading } = useGlobalState()

    const { run: refreshCreditState, loading } = useRequest(fetchCreditState, {
        manual: !options?.fetch,
        onSuccess: (res) => {
            setCreditState(res.data)
        }
    })

    useEffect(() => {
        setCreditStateLoading(loading)
    }, [loading, setCreditStateLoading])

    return {
        creditState,
        initialLoading: loading && !creditState,
        refreshCreditState
    }
}

export default useCreditState