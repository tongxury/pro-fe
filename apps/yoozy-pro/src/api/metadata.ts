import {request} from "@/api/index.ts";

export const getServerMetadata = async () => {
    return request({
        url: `/api/v1/metadata`,
    });
};
