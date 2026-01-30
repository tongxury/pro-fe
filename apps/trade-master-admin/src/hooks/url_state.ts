import useUrlState from '@ahooksjs/use-url-state';

export const useUrlParams = (initialState?: { [key: string]: string }) => {

    const [params, setParams] = useUrlState(initialState || {})

    const reset = () => {
        if (Object.keys(params || {}).length > 0) {
            setParams(Object.keys(params || {}).reduce((a, v) => ({...a, [v]: undefined}), {}))
        }
    }

    return {
        params, setParams, reset
    }
}

