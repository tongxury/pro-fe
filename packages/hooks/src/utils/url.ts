export const getUrlParams = () => {

    const params: { [key: string]: string } = {};
    window.location.search.substring(1)
        ?.split("&")
        ?.map((pair) => pair.split("="))
        .forEach((pair) => {
            if (pair.length === 2) {
                params[pair[0]!] = decodeURIComponent(pair[1]!);
            }
        });

    return params;
};


export const parseURLParams = (urlParamsPairs: string) => {

    const params: { [key: string]: string } = {};
    urlParamsPairs
        ?.split("&")
        ?.map((pair) => pair.split("="))
        .forEach((pair) => {
            if (pair.length === 2) {
                params[pair[0]!] = decodeURIComponent(pair[1]!);
            }
        });

    return params;

}