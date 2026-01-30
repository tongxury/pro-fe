import {request} from "@/providers/request";

export function getUserDetail() {
    return request({
        url: "/api/tgbot/users/me",
    });
}

export function queryInvitedUsers() {
    return request({
        url: "/api/tgbot/users/me/invited-users",
    });
}


export function addFollowingWallet(params: { wallet: string }) {
    return request({
        url: "/api/dex/wallets/me/following-wallets",
        method: "POST",
        data: params,
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        raw: true
    });
}

export function replaceFollowingWallet(params: { wallet: string, remark: string }) {
    return request({
        url: "/api/tgbot/users/me/following-wallets",
        method: "PUT",
        data: params,
        raw: true
    });
}

export function queryFollowingWallets(params: {}) {

    return request({
        url: "/api/dex/wallets/me/following-wallets",
        params,
    });
}

export function updateFollowingWalletRemark(params: { id: string, remark: string }) {

    return request({
        url: "/api/dex/wallets/me/following-wallets/" + params.id,
        method: "PATCH",
        headers: {
            "Authorization-Type": "tma_wallet",
        },
        data: {
            action: 'updateRemark',
            value: params.remark
        },
        raw: true
    });
}


export function updateFollowingWalletAutoFollow(params: { id: string }) {

    return request({
        url: "/api/tgbot/users/me/following-wallets/" + params.id,
        method: "PATCH",
        data: {
            action: 'autoFollow',
        }
    });
}


export function deleteFollowingWallets(params: { id: string }) {

    return request({
        url: "/api/tgbot/users/me/following-wallets/" + params.id,
        method: "DELETE",
    });
}


export function queryUserWallets(params: { default: boolean, chains?: string[] }) {
    return request({
        url: "/api/tgbot/users/me/wallets",
        params
    });
}

export function getUserWallet({id}: { id: string }) {
    return request({
        url: "/api/tgbot/users/me/wallets/" + id,
    });
}


export function getAppSettings() {
    return request({
        url: "/api/tgbot/app-settings",
    });
}
