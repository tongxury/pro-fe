import { useRequest } from "ahooks";
import { Options, Service } from "ahooks/lib/useRequest/src/types";

export function useRequestData<TData extends { data?: any }, TParams extends any[]>(
    service: Service<TData, TParams>,
    options?: Options<TData, TParams>
) {
    const result = useRequest<TData, TParams>(service, options);

    return {
        ...result,
        data: result.data?.data,
    };
}
