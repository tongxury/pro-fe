import {UserTokenRelationName, UserWalletRelationName} from "@/types";
import {request} from "@/providers/request";

export function updateUserToken({tokenId, relation}: { tokenId: string, relation: UserTokenRelationName }) {
    return request({
        url: "/api/tgbot/users/me/tokens/" + tokenId,
        method: "PATCH",
        data: {
            relation
        }
    });
}

export function updateWalletToken({tokenId, action = "follow"}: { tokenId: string, action?: UserWalletRelationName }) {
    return request({
        url: "/api/dex/wallets/me/tokens/" + tokenId,
        method: "PATCH",
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        data: {
            action
        }
    });
}


export function queryTokens(params: { [key: string]: any }) {

    return request({
        url: "/api/dex/tokens",
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        params,
    });
}

// export function queryTokenMarkets(params: { [key: string]: any }) {
//
//     return request({
//         url: "/api/tgbot/token-markets",
//         params,
//     });
// }

export function queryTokenPool({id}: { id: string }) {

    return request({
        url: `/api/tgbot/tokens/${id}/market`,
    });
}

// queryTokenMarkets()


export function queryToken({id, ohlcStateDurations = '24h', tradeStateDurations = ''}: {
    id: string,
    ohlcStateDurations?: string,
    tradeStateDurations?: string
}) {
    return request({
        url: "/api/dex/tokens/" + id,
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        params: {
            ohlcStateDurations,
            tradeStateDurations
        }
    });
}

