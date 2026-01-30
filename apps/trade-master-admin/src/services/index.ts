import {request} from '@umijs/max';

// 获取用户激励列表
export async function getAssets(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/databank/assets', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function sendEmail(
    params?: { [key: string]: any },
) {
    return request('/api/mgmt/emails', {
        method: 'POST',
        data: {
            ...params,
        },
    });
}


export async function queryChatRecords(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/mgmt/chat-records', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}


export async function queryUsers(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/dex/admin/users', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function queryUser(
    params: { userID: string, [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/mgmt/users/' + params.userID, {
        method: 'GET',
        params,
        ...(options || {}),
    });
}


export async function updateUser(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/mgmt/users', {
        method: 'PATCH',
        data: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function getUsersSummary(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/mgmt/user-summary', {
        method: 'GET',
        params,
        ...(options || {}),
    });
}

export async function addUserMemberSubscribe(
    params: { userId: string, level: string, cycle: string, [key: string]: any },
    options?: { [key: string]: any },
) {
    return request(`/api/mgmt/users/${params.userId}/member-subscribes`, {
        method: 'POST',
        data: params,
        ...(options || {}),
    });
}


export async function getAuthToken(
    params: { username: string, password: string, [key: string]: any },
    options?: { [key: string]: any },
) {
    return request(`/api/dex/admin/tokens`, {
        method: 'GET',
        params,
        ...(options || {}),
    });
}


export async function queryWithdrawals(
    params: { [key: string]: any },
) {
    return request(`/api/dex/admin/withdrawals`, {
        params,
    });
}

export async function approveWithdrawal(
    params: { userId: string, token: string, txHash: string },
) {
    return request(`/api/dex/admin/withdrawals`, {
        method: 'PATCH',
        data: params,
    });
}

export async function queryFollowingWallets(
    params: { [key: string]: any },
) {
    return request(`/api/dex/admin/settings/following-wallet`, {
        params,
    });
}

export async function updateHotTokens(
    params: { tokenIds: string[], },
) {
    return request(`/api/dex/admin/settings/hot-tokens`, {
        data: params,
        method: 'PUT',
    });
}


export async function queryOrders(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request('/api/dex/admin/orders', {
        method: 'GET',
        params,
        ...(options || {}),
    });
}


export async function queryAppSettings(
    params: { [key: string]: any },
) {
    return request(`/api/dex/admin/app-settings`, {
        params,
    });
}

export async function updateAppSettings(
    params: { [key: string]: any },
) {
    return request(`/api/dex/admin/app-settings`, {
        data: params,
        method: 'PUT',
    });
}
