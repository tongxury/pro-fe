import { request } from ".";



export const listTemplates = async (params: any) => {
    return request({
        url: `/api/am/v2/templates`,
        params
    });
};
