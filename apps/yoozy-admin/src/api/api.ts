import useSWR from "swr";
import {request} from "@/api/index";
import axios, {AxiosProgressEvent} from "axios";

export const fetcher = (url: string, params?: { [key: string]: any }) => request({url: url, params: params});


export function useUser() {
    const {data, mutate, isLoading} = useSWR("/api/v1/users/myself", fetcher);
    // if data is not defined, the query has not completed
    const loading = isLoading || !data;

    const user = data?.data;
    return [user, {mutate, loading}];
}

export function useFetchResources() {
    const {data, mutate, isLoading} = useSWR("/api/ag/v1/resources", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchProfiles() {
    const {data, mutate, isLoading} = useSWR("/api/ag/v1/users/me/profiles", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useListProfiles(params: { platform?: string }) {
    const {data, mutate, isLoading} = useSWR({url: "/api/ag/v1/users/me/profiles", params}, ({url, params}) =>
        fetcher(url, params)
    );
    // const {data, mutate, isLoading} = useSWR("/api/ag/v1/questions", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useListAccounts() {
    const {data, mutate, isLoading} = useSWR("/api/ag/accounts", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchProfile({id}: { id: string }) {
    const {data, mutate, isLoading} = useSWR("/api/ag/v1/users/me/profiles/" + id, fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchQuestions(params: { sessionId: string; status?: string[] }) {
    const {data, mutate, isLoading} = useSWR({url: "/api/ag/v1/questions", params}, ({url, params}) =>
        fetcher(url, params)
    );
    // const {data, mutate, isLoading} = useSWR("/api/ag/v1/questions", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useListQuestionAnswerChunks(params: { questionId: string }) {
    const {data, mutate, isLoading} = useSWR(
        {url: `/api/ag/v1/questions/${params.questionId}/answer-chunks`, params},
        ({url, params}) => fetcher(url, params)
    );
    // const {data, mutate, isLoading} = useSWR("/api/ag/v1/questions", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export const listQuestions = async (params: { sessionId: string; status?: string[] }) => {
    return request({
        url: `/api/ag/v1/questions`,
        params: params
    });
};

export const listQuestionChunks = async ({questionId}: { questionId: string }) => {
    return request({
        url: `/api/ag/v1/questions/${questionId}/answer-chunks`
    });
};

export function useFetchSessions(params: { scene?: string }) {
    const {data, mutate, isLoading} = useSWR({url: "/api/ag/v1/sessions", params}, ({url, params}) =>
        fetcher(url, params)
    );
    // const {data, mutate, isLoading} = useSWR("/api/ag/v1/questions", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useQueryRecords() {
    const {data, mutate, isLoading} = useSWR("/api/ag/v1/records", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useListItems() {
    const {data, mutate, isLoading} = useSWR("/api/ag/v2/items", fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchRecord(params: { id: string }) {
    const {data, mutate, isLoading} = useSWR(`/api/ag/v1/records/${params.id}`, fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchSession(params: { id: string }) {
    const {data, mutate, isLoading} = useSWR(`/api/ag/v1/sessions/${params.id}`, fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchPublicRecord(params: { id: string }) {
    const {data, mutate, isLoading} = useSWR(`/api/ag/v1/pub-records/${params.id}`, fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export function useFetchUserProfile() {
    const {data, mutate, isLoading} = useSWR(`/api/ag/v1/users/me/profiles`, fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export const submitSurvey = async (params: { text: string }) => {
    return request({
        url: `/api/ag/v2/surveys`,
        method: "POST",
        data: params
    });
};

export function useFetchSurvey(params: { id: string }) {
    const {data, mutate, isLoading} = useSWR(`/api/ag/v2/surveys/${params.id}`, fetcher);
    return [data?.data, {mutate, loading: isLoading || !data}];
}

export const createSurveyPayment = async (params: { orderId: string; payMethod: string; returnUrl: string }) => {
    return request({
        url: `/api/v1/users/me/survey-payments`,
        method: "POST",
        data: params
    });
};

export const createPayment = async (params: { planId: string; payMethod: string; returnUrl: string }) => {
    return request({
        url: `/api/pa/v2/payments`,
        method: "POST",
        data: params
    });
};

export const addResource = async (params: { sessionId: string; link: string }) => {
    return request({
        url: `/api/ag/v2/resources`,
        method: "POST",
        data: params
    });
};

export const addResourceV6 = async (params: { sessionId: string; link: string }) => {
    return request({
        url: `/api/ag/v6/resources`,
        method: "POST",
        data: params
    });
};
export const addResourceV7 = async (params: { link: string }) => {
    return request({
        url: `/api/ag/v7/resources`,
        method: "POST",
        data: params
    });
};

export const addOrPutAccount = async (params: {
    platform?: string;
    nickname?: string;
    sign?: string;
    domain?: string[];
    followers?: string;
    posts?: string;
    interacts?: string;
    isDefault?: boolean;
    _id?: string;
}) => {
    return request({
        url: `/api/ag/accounts`,
        method: params?._id ? "PUT" : "POST",
        data: params
    });
};

//
// export const addResourceV5 = async (params: { sessionId: string, mimeType: string, category?: string }) => {
//     return request({
//         url: `/api/ag/v5/resources`,
//         method: 'POST',
//         data: params,
//     })
// }

export const addResourceV5 = (
    value: any,
    mimeType: string,
    sessionId: string,
    category?: string,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
    const formData = new FormData();
    formData.append("value", value);
    formData.append("sessionId", sessionId);
    formData.append("mimeType", mimeType);
    if (category) {
        formData.append("category", category);
    }

    return axios({
        url: "/api/ag/v5/resources",
        baseURL: import.meta.env.VITE_ASSET_API_URL,
        timeout: 5000000,
        method: "POST",
        data: formData,
        onUploadProgress
    });
};

export const addSession = async (params: { resourceId: string; scene: string }) => {
    return request({
        url: `/api/ag/v1/sessions`,
        method: "POST",
        data: params
    });
};

export const addQuestion = async (params: {
    sessionId: string;
    prompt: any;
    profile?: any;
    scene: string;
    retry?: boolean;
}) => {
    return request({
        url: `/api/ag/v1/questions`,
        method: "POST",
        data: params
    });
};

export const retryQuestion = async (params: { questionId: string }) => {
    return request({
        url: `/api/ag/v1/re-questions`,
        method: "POST",
        data: params
    });
};

export const fetchQuestion = async (params: { id: string }) => {
    return request({
        url: `/api/ag/v1/questions/${params.id}`,
        method: "GET"
    });
};

export const addQuickSession = async (params: { itemId: string }) => {
    return request({
        url: `/api/ag/v1/quick-sessions`,
        method: "POST",
        data: params
    });
};

export const addSessionV2 = async (params: { sessionId: string; scene: string; version?: string }) => {
    return request({
        url: `/api/ag/v2/sessions`,
        method: "POST",
        data: params
    });
};

export const addSessionV3 = async (params: {
    sessionId: string;
    scene: string;
    resource?: any;
    resources?: any[];
    version?: string;
}) => {
    return request({
        url: `/api/ag/v3/sessions`,
        method: "POST",
        data: params
    });
};

export const addProfile = async (params: { platform: string; keyword: string; link?: string }) => {
    return request({
        url: "/api/ag/v1/users/me/profiles",
        method: "POST",
        data: params
    });
};

export const deleteProfile = async ({id}: { id: string }) => {
    return request({
        // baseUrl: import.meta.env.VITE_API_URL2,
        url: "/api/ag/v1/users/me/profiles/" + id,
        method: "PATCH",
        data: {}
    });
};

export const deleteAccount = async ({id}: { id: string }) => {
    return request({
        url: "/api/ag/accounts/" + id,
        method: "PATCH",
        data: {
            action: "delete"
        }
    });
};

export const listItems = async (params: { category: string; page: number }) => {
    return request({
        url: `/api/ag/v2/items`,
        params: params
    });
};

// string level = 2 [(validate.rules).string = {}];
// string cycle = 3 [(validate.rules).string = {}];
// string successUrl = 4 [(validate.rules).string = {min_len: 1}];
// string cancelUrl = 5 [(validate.rules).string = {min_len: 1}];
export const getPaymentClientSecret = async (params: {
    level: string;
    cycle: string,
    successUrl: string,
    cancelUrl: string
}) => {
    return request({
        url: `/api/pa/v3/payments`,
        params: params
    });
};

export const getPaymentIntent = async (params: {
    level: string;
    cycle: string,
    successUrl: string,
}) => {
    return request({
        url: `/api/pa/v1/payment-intents`,
        params: params
    });
};


export const listItemsV2 = async (params: { platform: string; keyword?: string; page: number }) => {
    return request({
        url: `/api/ag/v2/items`,
        params: params
    });
};

export const sendVerifyCode = async (params: { phone: string }) => {
    return request({
        url: "/api/v1/phone-auth-codes",
        params
    });
};

export const sendEmailVerifyCode = async (params: { email: string }) => {
    return request({
        url: "/api/v1/email-auth-codes",
        params
    });
};

export const fetchTokenByCredential = async (credential: string, from?: string) => {
    return request({
        url: "/api/v2/google-auth-tokens",
        params: {credential, from}
    });
};

export const getAuthToken = async (params: { phone: string; code: string }) => {
    return request({
        url: "/api/v1/phone-auth-tokens",
        params
    });
};

export const getEmailAuthToken = async (params: { email: string; code: string }) => {
    return request({
        url: "/api/v1/email-auth-tokens",
        params
    });
};

//验证邮箱验证码
export const getUser = async () => {
    return request({
        url: "/api/v1/users/myself"
    });
};


export const uploadFileV3 = (
    file: File,
    sessionId: string,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("sessionId", sessionId);

    return axios({
        url: "/api/ag/v3/resources",
        baseURL: import.meta.env.VITE_ASSET_API_URL,
        timeout: 5000000,
        method: "POST",
        data: formData,
        onUploadProgress
    });
};

export const fetchResources = async () => {
    return request({
        url: "/api/ag/v1/resources"
    });
};

