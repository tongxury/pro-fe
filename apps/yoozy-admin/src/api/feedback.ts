import { request } from ".";


export const listFeedbacks = async (params: { page: number, size: number, category?: string }) => {
    return request({
        url: `/api/am/v1/feedbacks`,
        params: params
    });
};
