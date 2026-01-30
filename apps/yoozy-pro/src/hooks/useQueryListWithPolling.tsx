import { useDeepCompareEffect, useInterval, useRequest } from "ahooks";
import type { Options, Service } from "ahooks/lib/useRequest/src/types";
import { useMemo } from "react";

export interface Props<TData, TParams extends any[]> {
    service: Service<TData, TParams>,
    params?: TParams,
    key: (item: TData) => string,
    pollingFilter: (item: TData) => boolean,
    options?: Options<TData, TParams>,
}

export interface R {
    initialLoading: boolean,
    list?: any[],
    total?: number,
    // page?: number,
    // size?: number,
}

const useQueryListWithPolling = <TData, TParams extends any[]>(
    { service, params, key, pollingFilter, options, }: Props<TData, TParams>,
) => {
    const { data: data1, run, loading, ...rest } = useRequest<any, any>(service, { ...options, manual: true });

    useDeepCompareEffect(() => {
        run(params)
    }, [params]);

    const { data: data2, runAsync: runAsyncPolling } = useRequest<any, any>(service, { manual: true });

    const finalData = useMemo<R>(() => {

        const list1 = data1?.data?.list

        // if (!list1) {
        //     return list1;
        // }

        const list2 = data2?.data?.list || []

        const list2Map = new Map(list2.map(item => [key(item), item]));

        const mergedList = list1?.map(item1 => {
            const item2 = list2Map.get(key(item1));
            return item2 || item1;
        });

        return {
            initialLoading: loading,
            list: mergedList,
            total: data1?.data?.total || 0,
            // page: data1?.data?.page || 1,
            // size: data1?.data?.size || 24,
        }

    }, [data1, data2, loading]);

    useInterval(() => {
        const list = finalData?.list
        if (list?.length) {

            const ids = list?.filter((item: any) => key(item)).filter((item: any) => pollingFilter(item))?.map((item: any) => key(item));

            if (ids?.length) {
                runAsyncPolling({ ids: ids, ...params })?.then(res => {

                });
            }
        }

    }, 30000);

    return {
        ...rest,
        ...finalData,
        reload: () => run(params),
        mutate: (newList: any[]) => {
            rest.mutate({
                ...data1,
                data: {
                    ...data1?.data,
                    list: newList
                }
            });
        }
    };
};

export default useQueryListWithPolling;
