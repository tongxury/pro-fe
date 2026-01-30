import {request} from "@/providers/request.ts";


export function queryCommissionSummary() {
    return request({
        url: "/api/tgbot/users/me/commission-summary",
    });
}


export function queryCommissionSettlementSummary() {
    return request({
        url: "/api/tgbot/users/me/commission-settlement-summary",
    });
}

