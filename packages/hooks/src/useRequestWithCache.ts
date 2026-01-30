import {useLocalStorageState, useRequest} from "ahooks";
import {useEffect} from "react";

// ahooks useRequest cacheKey不生效
function useRequestWithCache(service: any, cacheKey: string, options?: any) {
    const [cacheData, setCacheData] = useLocalStorageState(cacheKey);

    const {data, ...rest} = useRequest(service, options);

    useEffect(() => {
        // @ts-ignore
        if (data) setCacheData(data);
    }, [data]);

    return {
        data: cacheData as any,
        ...rest
    };
};

export default useRequestWithCache
