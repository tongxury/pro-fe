import { request } from "@/api/index.ts";

export const addFeedback = (params: {
    category: string,
    url: string,
    targetId: string,
    issues: string[],
    content: any
}) => {
    return request({
        url: '/api/proj/v1/feedbacks',
        method: 'POST',
        data: params
    });
}


export const listFeedbacks = async (params: { targetId?: string }) => {
    return request({
        url: `/api/proj/v1/feedbacks`,
        params: params
    });
};
