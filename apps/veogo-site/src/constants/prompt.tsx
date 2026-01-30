import {SearchOutlined} from "@ant-design/icons";

export const prompts = [

    {
        id: 'analysis',
        text: "爆款分析(视频)",
        icon: <SearchOutlined/>,
        subPrompts: [
            {text: "帮我提取视频文本", id: 'analysis_extractText', icon: <SearchOutlined/>, quick: true},
            {text: "帮我分析剪辑手法", id: 'analysis_editingTechAnalysis', icon: <SearchOutlined/>, quick: true},
            {text: "帮我分析特效", id: 'analysis_effectAnalysis', icon: <SearchOutlined/>, quick: true},
            {text: "帮我分析音效", id: 'analysis_soundAnalysis', icon: <SearchOutlined/>, quick: true},
            // {text: "爆款复刻评估", id: 'duplicateAnalysis', needProfile: true, icon: <SearchOutlined/>, quick: true},
            // {text: "秒变我的拍摄稿", id: 'changeToMyScript', needProfile: true, icon: <SearchOutlined/>, quick: true},
            // {text: "爆款逐帧分析", id: 'improveSuggestion', icon: <SearchOutlined/>, quick: true},
        ]
    },
    {text: "爆款分析(图文)", id: 'analysisImages', icon: <SearchOutlined/>},
    {text: "封面预测(图文)", id: 'coverAnalysisImages', icon: <SearchOutlined/>},
    {text: "限流预测(视频)", id: 'limitAnalysis', icon: <SearchOutlined/>},
    {text: "限流预测(图文)", id: 'limitAnalysisImages', icon: <SearchOutlined/>},
    {text: "爆款预测(视频)", id: 'preAnalysis', icon: <SearchOutlined/>},
    {text: "爆款预测(图文)", id: 'preAnalysisImages', icon: <SearchOutlined/>},
    {text: "脚本复刻(视频)", id: 'duplicateScript', icon: <SearchOutlined/>},
    // {text: "总结视频要点", icon: <FileTextOutlined/>},
    // {text: "关键信息提取", icon: <InfoCircleOutlined/>},
];

export const getSubPrompts = (id: string) => {

    for (const x of prompts) {
        if (x.id === id) {
            return x.subPrompts || [];
        }
    }
    return [];
}


export const getPrompt = (id: string) => {

    for (const x of prompts) {
        if (x.id === id) {
            return x;
        }

        if (x.subPrompts) {
            for (const xx of x.subPrompts) {
                if (xx.id === id) {
                    return xx;
                }
            }
        }
    }

    return undefined;
}



