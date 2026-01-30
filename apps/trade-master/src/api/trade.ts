import {OrderCategory, OrderSettings, Side} from "@/types";
import {request} from "@/providers/request.ts";


export function sendTrade(params: {
    token: string,
    amount?: number,
    side: Side,
    category: OrderCategory,
    settings?: OrderSettings
}) {
    return request({
        url: "/api/tgbot/users/me/trades",
        // url: "/api/dex/trades",
        method: "POST",
        data: params,
        raw: true
    })
}


export function queryTrades(params: {wallet: string, [key: string]: any }) {
    return request({
        url: `/api/dex/wallets/${params.wallet}/trades`,
        params
    });
}
