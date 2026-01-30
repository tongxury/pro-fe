import {request} from "@/providers/request.ts";


export function queryWalletPosition(params: { wallet: string, token: string }) {
    return request({
        url: `/api/dex/wallets/${params.wallet}/positions/${params.token}`,
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        params
    });
}

export function queryWalletPositions(params: { id: string, [key: string]: any }) {
    return request({
        url: `/api/dex/wallets/${params.id}/positions`,
        params
    });
}
