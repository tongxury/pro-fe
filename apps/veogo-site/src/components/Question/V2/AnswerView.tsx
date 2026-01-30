import {useXTheme, XFlex} from "@pro/ui";
import {Marked} from "marked";
import {CSSProperties, useMemo} from "react";
import MinimalLoading from "@/components/Loading";

const AnswerView = ({data, generating}: { data: any, generating?: boolean }) => {
    const {themeVars} = useXTheme();
    const md = useMemo(() => new Marked(), []);

    // 使用主题变量定义样式
    const styles = {
        container: {
            padding: 10,
            backgroundColor: themeVars.colorBgL2,
            borderRadius: '8px',
            border: `1px solid ${themeVars.colorBorder}`,
            display: 'flex',
            flexDirection: 'column',
        } as CSSProperties,
        questionHeader: {
            marginBottom: '16px',
        } as CSSProperties,
        questionId: {
            fontSize: '16px',
            color: themeVars.colorTextPrimary,
            marginBottom: '8px',
        } as CSSProperties,
        questionTitle: {
            color: themeVars.colorTextPrimary,
            fontSize: '18px',
            fontWeight: 600,
        } as CSSProperties,
        questionText: {
            color: themeVars.colorTextL1,
            marginTop: '8px',
        } as CSSProperties,
        answersHeader: {
            borderTop: `1px solid ${themeVars.colorDivider}`,
            paddingTop: '16px',
            marginBottom: '16px',
            color: themeVars.colorTextL1,
            fontSize: '16px',
            fontWeight: 600,
        } as CSSProperties,
        answersContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        } as CSSProperties,
        answerItem: {
            backgroundColor: themeVars.colorBgL1,
            padding: 10,
            borderRadius: '6px',
            borderLeft: `3px solid ${themeVars.colorPrimary}`,
        } as CSSProperties,
        answerHeader: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
        } as CSSProperties,
        answerNumber: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeVars.colorPrimary,
            color: themeVars.colorBgPrimary,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            fontSize: '12px',
            marginRight: '8px',
        } as CSSProperties,
        answerText: {
            color: themeVars.colorTextL2,
            fontSize: '14px',
        } as CSSProperties,
        markdownWrapper: {
            color: themeVars.colorTextPrimary,
            overflowX: 'hidden',
            maxWidth: '100%',
        } as CSSProperties,
        noAnswers: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            color: themeVars.colorTextL3,
            backgroundColor: themeVars.colorBgL1,
            borderRadius: '6px',
            marginTop: '8px',
        } as CSSProperties,
    };

    const markdownStyle = `
    /* 基础文本样式 */
    * {
        line-height: 1.75;
        letter-spacing: 0.2px;
    }
    
    /* 标题样式优化 */
    h1, h2, h3, h4, h5, h6 { 
        color: ${themeVars.colorTextPrimary}; 
        margin-top: 32px; 
        margin-bottom: 16px; 
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: -0.2px;
    }
    
    h1 { 
        font-size: 26px; 
        border-bottom: 1px solid ${themeVars.colorBorder}; 
        padding-bottom: 12px; 
    }
    
    h2 { 
        font-size: 22px;
        padding-bottom: 8px;
        border-bottom: 1px solid ${themeVars.colorBorder}40;
    }
    
    h3 { 
        font-size: 18px;
        color: ${themeVars.colorTextL1};
    }
    
    /* 段落样式优化 */
    p { 
        margin: 16px 0; 
        line-height: 1.8; 
        color: ${themeVars.colorTextL1};
        font-size: 15px;
    }
    
    /* 链接样式 */
    a { 
        color: ${themeVars.colorTextL1}; 
        text-decoration: none;
        border-bottom: 1px solid ${themeVars.colorBorder};
        transition: all 0.2s ease;
    }
    
    a:hover { 
        border-bottom: 1px solid ${themeVars.colorTextL1};
    }
    
    /* 强调文本 */
    strong { 
        color: ${themeVars.colorTextPrimary}; 
        font-weight: 600;
        padding: 0 2px;
    }
    
    em { 
        color: ${themeVars.colorTextL2};
        font-style: italic;
    }
    
    /* 代码样式 */
    code { 
        background-color: ${themeVars.colorBgL1}; 
        color: ${themeVars.colorTextL1}; 
        padding: 2px 6px; 
        border-radius: 4px; 
        font-family: 'SF Mono', Menlo, Consolas, Monaco, monospace;
        font-size: 0.9em; 
    }
    
    pre { 
        background-color: ${themeVars.colorBgL1}; 
        padding: 16px; 
        border-radius: 8px; 
        overflow-x: auto; 
        margin: 20px 0; 
    }
    
    pre code { 
        background-color: transparent; 
        padding: 0; 
        border: none;
        color: ${themeVars.colorTextL1};
        font-size: 14px;
    }
    
    /* 引用样式 */
    blockquote { 
        border-left: 3px solid ${themeVars.colorBorder}; 
        margin: 20px 0; 
        padding: 12px 20px; 
        background-color: ${themeVars.colorBgL1}; 
        color: ${themeVars.colorTextL2}; 
        border-radius: 4px;
        font-style: italic;
    }
    
    /* 列表样式 */
    ul, ol { 
        padding-left: 24px; 
        margin: 16px 0; 
        color: ${themeVars.colorTextL1};
    }
    
    li { 
        margin: 8px 0;
        line-height: 1.7;
    }
    
    /* 表格样式 */
    .table-container {
        width: 100%;
        overflow-x: auto;
        margin: 24px 0;
        background-color: ${themeVars.colorBgL1};
        border-radius: 8px;
        border: 1px solid ${themeVars.colorBorder};
    }
    
    table { 
        border-collapse: collapse; 
        width: 100%;
        font-size: 14px;
        line-height: 1.5;
    }
    
    table th { 
        background-color: ${themeVars.colorBgL1}; 
        color: ${themeVars.colorTextPrimary}; 
        font-weight: 500;
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid ${themeVars.colorBorder};
    }
    
    table td { 
        padding: 12px 16px; 
        border-bottom: 1px solid ${themeVars.colorBorder}40;
        color: ${themeVars.colorTextL1};
    }
    
    table tr:hover {
        background-color: ${themeVars.colorBgL1};
    }
    
    /* 分割线 */
    hr { 
        border: none; 
        height: 1px; 
        background-color: ${themeVars.colorBorder}; 
        margin: 32px 0; 
    }
    
    /* 图片样式 */
    img { 
        max-width: 100%; 
        height: auto;
        border-radius: 8px; 
        margin: 24px 0;
    }

    /* 代码块语言标识 */
    pre::before {
        content: attr(data-language);
        display: block;
        background-color: ${themeVars.colorBgL1};
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        color: ${themeVars.colorTextL2};
        margin-bottom: 12px;
    }

    /* 移动端优化 */
    @media (max-width: 480px) {
        h1 { font-size: 22px; }
        h2 { font-size: 20px; }
        h3 { font-size: 18px; }
        p { 
            font-size: 15px;
            line-height: 1.7;
        }
        pre { 
            padding: 12px;
            font-size: 13px;
        }
        blockquote { 
            padding: 8px 16px;
            font-size: 14px;
        }
        .table-container {
            margin: 16px -8px;
            width: calc(100% + 16px);
            border-radius: 0;
        }
    }
`;

    // 修改 Markdown 输出，为表格添加容器
    const enhanceMarkdown = (html: string) => {
        return html.replace(
            /<table>/g,
            '<div class="table-containers"><table>'
        ).replace(
            /<\/table>/g,
            '</table></div>'
        );
    };

    if (!data) return <></>

    // 渲染并增强 Markdown
    const parsedHtml = md.parse(data?.text || "") as string;
    const enhancedHtml = enhanceMarkdown(parsedHtml);

    return (
        <XFlex vertical style={styles.container}>
            <div style={styles.answersContainer}>
                <div style={styles.answerItem}>
                    <div style={styles.markdownWrapper}
                         dangerouslySetInnerHTML={{
                             __html: `<style>${markdownStyle}</style>${enhancedHtml}`
                         }}
                    />
                    {generating && <MinimalLoading/>}
                </div>
            </div>
        </XFlex>
    );
};

export default AnswerView;
