import {CreateOrderParams, Order, OrderCategory, OrderSettings, Side, UserTokenRelationName} from "@/types";
import {request} from "@/providers/request";

export function createOrder(params: {
    token: string,
    amount?: number,
    // amountRate?: number,
    side: Side,
    category: OrderCategory,
    following?: Order
    settings?: OrderSettings
}) {
    return request({
        url: "/api/tgbot/users/me/orders",
        method: "POST",
        data: params,
        raw: true
    })
}

export function cancelOrder({id}: { id: string }) {
    return request({
        url: "/api/tgbot/users/me/limit-orders/" + id,
        method: "DELETE",
        raw: true,
    })
}

export function createLimitOrder(params: {
    token: string,
    amount?: number,
    amountRate?: number,
    side: Side,
    priceUSD: number,
    settings?: OrderSettings
}) {
    return request({
        url: "/api/tgbot/users/me/limit-orders",
        method: "POST",
        data: params,
        raw: true
    })
}


export function queryOrders(params: { category: string, [key: string]: any }) {

    return request({
        url: "/api/tgbot/users/me/orders",
        params,
    });
}

export function queryOrderSettings() {

    return request({
        url: "/api/dex/wallets/me/trade-settings",
        headers: {
            "Authorization-Type": "tma_wallet",
        },
    });
}

export function queryOrderSummary() {

    return request({
        url: "/api/tgbot/users/me/order-summary",
    });
}

export function updateOrderSettings(params: OrderSettings) {

    return request({
        url: "/api/dex/wallets/me/trade-settings",
        method: "PUT",
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        data: {
            settings: params,
        },
        raw: true
    });
}
