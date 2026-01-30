import { request } from ".";



export const listUsers = async (params: any) => {
    return request({
        url: `/api/am/v1/users`,
        params
    });
};

export const getUser = async (params: { id: string }) => {
    return request({
        url: `/api/am/v1/users/${params.id}`,
    });
};

export const recharge = async (data: { id: string, amount: number }) => {
    return request({
        url: `/api/am/v1/users/${data.id}`,
        method: 'PATCH',
        data: {
            action: 'recharge',
            params: {
                amount: data.amount?.toString()
            }
        }
    });
};
