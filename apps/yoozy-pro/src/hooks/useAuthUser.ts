import { useGlobalState } from "@/providers/GlobalData"
import { getUser } from "@/api/api"
import { useRequest } from "ahooks"
import { useEffect } from "react"

const useAuthUser = (options?: { fetch: boolean }) => {

    const { user, setUser, userLoading, setUserLoading } = useGlobalState()

    const { run: refreshUser, loading } = useRequest(getUser, {
        manual: !options?.fetch,
        onSuccess: (res) => {
            setUser(res.data)
        }
    })

    useEffect(() => {
        setUserLoading(loading)
    }, [loading, setUserLoading])

    return {
        user,
        initialLoading: loading && (user === null || user === undefined),
        refreshUser
    }
}

export default useAuthUser