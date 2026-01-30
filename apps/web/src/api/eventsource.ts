import { getAuthToken } from "@/utils";
import { fetchEventSource, type EventSourceMessage } from "@microsoft/fetch-event-source";
import { Question, tokenName } from "@pro/ui-pro";
import { getCookie } from "cookies-next";

interface ChatEventParams {
    params: Question;
    onOpen?: () => void;
    onStart?: () => void;
    onEvent?: (content: string, code?: number) => void;
    onComplete?: (summary: any) => void;
    onError?: (code?: number, message?: any) => void;
}

export const createChatEvent = async ({ params, onStart, onOpen, onEvent, onComplete, onError }: ChatEventParams) => {
    const authToken = await getAuthToken();

    // const appLang = (await getAppSettings_AppLang()) || 'English'

    // const translateLang = (await getAppSettings_TranslateLang()) || 'Chinese'

    const url = `${process.env.NEXT_PUBLIC_API_URL}/gpt-tool/api/chat_completion`;
    const ctrl = new AbortController();

    onStart?.();

    const questionParams: Question = {
        ...params,
        // prompts: [{
        //     ...(params.prompt || {}),
        //     params: {
        //         lang: translateLang,
        //         ...(params.prompt?.params || {}),
        //         respondInLang: appLang,
        //     }
        // }],
        settings: {
            ...params.settings
            // lang: appLang
        }
    };

    await fetchEventSource(`${url}?token=${authToken || ""}`, {
        method: "POST",
        body: JSON.stringify(questionParams),
        // mode: 'no-cors',
        headers: {
            "Content-Type": "application/json"
            // Authorization: authToken?.value || '',
            // "Access-Control-Request-Method": "POST",
            // "Access-Control-Allow-Origin": process.env.PLASMO_PUBLIC_API_BASE_URL,
            // "Access-Control-Allow-Origin": "https://app.apifox.com",
            // "Origin": process.env.PLASMO_PUBLIC_API_BASE_URL,
            // Token: authToken?.value || '',
            // Location: await getLocation()
        },
        onopen: async (response) => {
            if (!response.ok) {
                ctrl.abort();
                onError?.(500, response.text());
            } else {
                onOpen?.();
            }
        },
        onmessage: (ev: EventSourceMessage) => {
            const obj = JSON.parse(ev.data);
            if (obj) {
                /** 800 - attachment; 1000 - 终止 */
                if (obj.code && obj.code >= 1000) {
                    ctrl.abort();
                    if (obj.code === 1000) {
                        onComplete?.(obj.data);
                    }
                    if (obj.code === 1001) {
                        onError?.(obj.code, obj.message);
                    }
                } else {
                    onEvent?.(obj.data || "", obj.code);
                }
            }
        },
        onerror: (err) => {
            console.error("eventSource onerror", err);
            onError?.();
            ctrl.abort();
        },
        onclose: () => {
            ctrl.abort();
        },
        openWhenHidden: true,
        signal: ctrl.signal
    });

    return {
        close: () => {
            ctrl.abort();
        }
    };
};
