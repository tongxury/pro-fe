export function useUrlParams(paramPairs: string) {
    const parse = () => {
        const searchParams = paramPairs;

        const params: { [key: string]: string } = {};
        searchParams
            ?.split("&")
            ?.map((pair) => pair.split("="))
            .forEach((pair) => {
                if (pair.length === 2) {
                    params[pair[0]!] = decodeURIComponent(pair[1]!);
                }
            });

        return params;
    };

    return parse();
}
