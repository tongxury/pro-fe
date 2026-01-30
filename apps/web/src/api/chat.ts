import { request } from "@/api/index";
import { questions } from "@/constants";
import { Question, Session, UserAction, UserAttitude } from "@pro/ui-pro";
import useSWR from "swr";

export const fetchPreQuestions = async () => {
    return request({
        url: "/gpt-tool/api/guide_questions"
    });
};

export const extractText = async (file_path: string) => {
    return request({
        url: "/gpt-tool/api/text_from_OCR",
        params: {
            file_path
        }
    });
};

export const saveQuestion = async (question: Question) => {
    return request({
        url: "/gpt-tool/api/add_question",
        data: question,
        method: "POST"
    });
};

export const addTags = async (params: {
    session_id: string;
    question_id: string;
    answer_id: string;
    tags: string[];
}) => {
    return request({
        url: "/gpt-tool/api/add_tags_to_answer",
        params
    });
};

export const addUserAttitude = async ({ answer_id, attitude }: { answer_id: string; attitude: UserAttitude }) => {
    return request({
        url: `/api/v2/chat/chat-answers/${answer_id}/states`,
        method: "patch",
        data: {
            fields: {
                attitude
            }
        }
    });
};

// export const addUser = async ({answer_id, attitude}: {
//     answer_id: string;
//     attitude: UserAttitude;
// }) => {
//     return request({
//         url: `/api/v2/chat/chat-answers/${answer_id}/states`,
//         data: {
//             fields: {
//                 attitude,
//             }
//         }
//     });
// };

export const addSession = async (session: Session) => {
    return request({
        url: "/api/v2/chat/chat-sessions",
        data: session,
        method: "POST"
    });
};

export const fetchSessions = async () => {
    return request({
        url: "/api/v2/chat/chat-sessions"
    });
};

export const fetchSimilarQuestions = async ({
    // sessionId,
    scenario,
    similarWith,
    limit = 15
}: {
    // sessionId: string;
    scenario: string;
    similarWith: string;
    limit?: number;
}) => {
    return request({
        url: "/api/v2/chat/chat-questions",
        params: {
            // sessionId,
            scenario,
            similarWith,
            limit
        }
    });
};

export const fetchUser = async () => {
    return request({
        url: "/api/users/me"
    });
};

export const fetchSettings = async () => {
    return request({
        url: "/api/app-settings",
        params: { client: "web" }
    });
};

export const fetchQuestionAnswers = async (params: { sessionId: string }) => {
    return request({
        url: "/api/v2/chat/chat-qas",
        params
    });
};
