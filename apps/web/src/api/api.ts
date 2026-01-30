import useSWR from "swr";
import { request } from "@/api/index";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useUser() {
    const { data, mutate, isLoading } = useSWR("/api/user", fetcher);
    // if data is not defined, the query has not completed
    const loading = isLoading || !data;
    const user = data?.user;
    return [user, { mutate, loading }];
}

export function addEventLog(params: { id: string; channel?: string | ""; params?: {}; version?: string }) {
    return request({
        url: "/api/bi/events",
        method: "POST",
        data: { ...params, ...(params || {}) }
    });
}

export function addFeedback(params: { category: string; content: string }) {
    return request({
        url: "/api/v1/feedbacks",
        method: "POST",
        data: { ...params, ...(params || {}) }
    });
}

export async function loginByEmail(params?: { [key: string]: any }, options?: { [key: string]: any }) {
    return request({
        url: "/api/v1/auth-tokens",
        method: "GET",
        params: {
            ...params
        },
        ...(options || {})
    });
}

// 发送邮箱验证码
export const sendVerifyCode = async (params: any) => {
    return request({
        url: "/api/v1/verification-codes",
        method: "GET",
        params
    });
};

//验证邮箱验证码
export const verifyEmailCode = async (data: any) => {
    return request({
        url: "/api/v1/verification-codes",
        method: "POST",
        data
    });
};

// 通过邮箱重置密码
export const resetPasswordByEmail = async (data: any) => {
    return request({
        url: "/api/v1/auth-passwords",
        method: "PATCH",
        data
    });
};

//通过邮箱注册
export const registerByEmail = async (data: any) => {
    return request({
        url: "/api/v1/auth-users",
        method: "POST",
        data
    });
};

export const fetchUserDetail = async (params?: { [key: string]: any }, options?: { [key: string]: any }) => {
    return request({
        url: "/api/v1/users/myself",
        method: "GET",
        params: {
            ...params
        },
        ...(options || {})
    });
};

export const fetchMemberMetadatas = async (params?: { [key: string]: any }, options?: { [key: string]: any }) => {
    return request({
        url: "/api/v1/member-metadatas",
        method: "GET",
        params: {
            ...params
        },
        ...(options || {})
    });
};

export const uploadFileV2 = (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    return request({
        url: "/api/databank/files",
        method: "POST",
        data: formData
    });
};

export const fetchQuestionAnswers = async (params: { session_id: string }) => {
    return request({
        url: "/gpt-tool/api/list_question_answer_pairs",
        params
    });
};

export const fetchSettings = async () => {
    return request({
        url: "/api/app-settings",
        params: {
            client: "web"
        }
    });
};
