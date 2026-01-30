import { request } from "@/api/index.ts";

export const fetchCreditState = async (params: any) => {
    return request({
        url: `/api/crd/credit-states`,
        params
    });
};
