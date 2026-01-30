import {request} from "@/providers/request.ts";


export function withdraw(params:{token: string}) {
    return request({
        url: "/api/tgbot/users/me/withdrawals",
        method: 'POST',
        data: params,
        raw: true
    });
}



export function queryWithdrawals(params:{}) {
    return request({
        url: "/api/tgbot/users/me/withdrawals",
        params: params,
    });
}


