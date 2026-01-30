import { request } from "@/api/index.ts";

export interface RemixOptions {
    flowers: {
        downloadUrl: string;
        mediaId: string;
    }[];
    fonts: {
        downloadUrl: string;
        mediaId: string;
    }[];
    tones: {
        id: string;
        name: string;
        description: string;
        downloadUrl: string;
    }[];
}

export const listRemixOptions = async (params: { fields?: string }) => {
    return request({
        url: "/api/proj/v1/remix-options",
        method: "GET",
        params
    });
};
