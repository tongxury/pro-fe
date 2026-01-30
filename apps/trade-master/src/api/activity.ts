import {request} from "@/providers/request";

export function queryActivities(params: { category?: string }) {
    return request({
        url: "/api/dex/following-trades",
        params
    });
}


export function queryTokenActivities(params: { token?: string }) {
    return request({
        url: `/api/dex/tokens/${params.token}/trades`,
        params
    });
}


//
// export function queryPoolActivities(params: { id?: string }) {
//     return request({
//         url: `/api/tgbot/pools/${params.id}/activities`,
//         params
//     });
// }
//
