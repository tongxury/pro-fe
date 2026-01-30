import {request} from "@/providers/request";

export function transferOut({id, address, amount}: { id: string, address: string, amount: number }) {
    return request({
        url: `/api/tgbot/users/me/wallets/${id}/transferOut`,
        method: 'PATCH',
        data: {
            address,
            amount
        },
        raw: true,
    });
}


export function exportPrivateKey(params: { wallet: string, password: string }) {
    return request({
        url: `/api/tgbot/users/me/wallets/${params.wallet}/pk`,
        params,
        raw: true,
    });
}


