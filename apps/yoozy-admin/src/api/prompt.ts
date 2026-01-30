import {request} from "@/api/index.ts";

export interface PromptItem {
    id: string;
    name: string;
    description?: string;
    content: string;
    type: 'videoTemplate' | 'videoHighlight';
    model?: string;
    updatedAt?: string;
}

// Mock storage for singleton prompts
const mockPrompts: Record<string, { content: string; model: string }> = {
    'videoTemplate': {
        content: 'Create a video with a modern style...',
        model: 'gpt-4o'
    },
    'videoHighlight': {
        content: 'Identify the most exciting moments...',
        model: 'claude-3-5-sonnet'
    },
};

export const getPromptKeys = async () => {
    return request({
        url: "/api/am/v1/settings/all",
        params: {
            fields: "prompts"
        }
    });
};


export const getPrompt = async (type: string) => {
    return request({
        url: "/api/am/v1/settings/all",
        params: {
            fields: 'prompts.' + type
        }
    });
};

export const savePrompt = async (params: {[key: string]: any }) => {
    return request({
        url: `/api/am/v1/settings/all`,
        method: 'PATCH',
        data: params
    });
};
