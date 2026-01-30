import {request} from "@/providers/request.ts";


export function resetPassword(params: { oldPassword: string, newPassword: string }) {
    return request({
        url: "/api/tgbot/users/me/password",
        method: 'PATCH',
        data: params,
        raw: true
    });
}
