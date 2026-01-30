import { request } from ".";


export const listOngoingIssues = async (params: { page?: number, [key: string]: any }) => {
    return request({
        url: `/api/proj/v1/ongoing-issues`,
        params: params
    });
};


