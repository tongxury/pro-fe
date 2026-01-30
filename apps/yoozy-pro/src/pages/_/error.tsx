// src/error-page.jsx or .tsx
import { CSSProperties, useState } from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    // 在控制台打印完整错误，方便开发者调试
    console.error("Router Error:", error);

    // --- 提取错误信息 ---
    let status = "Error";
    let statusText = "发生了一个意外错误";
    let message = "";

    if (isRouteErrorResponse(error)) {
        status = error.statusText;
        statusText = error.statusText;
        if (error.status === 404) {
            statusText = "页面不存在";
        } else if (error.status >= 500) {
            statusText = "服务器发生错误";
        }
        message = error.data?.message || error.data;
    } else if (error instanceof Error) {
        message = error.message;
    }

    // --- 为用户反馈准备的调试信息 ---
    const [isCopied, setIsCopied] = useState(false);
    // 生成唯一的错误ID和时间戳
    const errorId = `client-${Date.now()}`;
    const timestamp = new Date().toISOString();
    // 获取当前URL（做SSR兼容性检查）
    const pageUrl = typeof window !== 'undefined' ? window.location.href : 'N/A';

    const debugInfoText = `
-----------------------------
Error ID:  ${errorId}
Timestamp: ${timestamp}
URL:       ${pageUrl}
Status:    ${status}
Message:   ${message || statusText}
-----------------------------`;

    const handleCopy = () => {
        navigator.clipboard.writeText(debugInfoText.trim()).then(() => {
            setIsCopied(true);
            // 2秒后恢复按钮状态
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    // --- 设计精致的暗色主题样式 (包含新增样式) ---
    const pageStyle = { /* ... 样式与之前相同 ... */
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#121212', color: '#e0e0e0', padding: '2rem', boxSizing: 'border-box',
    } as CSSProperties;
    const containerStyle = { /* ... 样式与之前相同 ... */
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem',
    } as CSSProperties;
    const statusStyle = { /* ... 样式与之前相同 ... */
        fontSize: 'clamp(6rem, 25vw, 10rem)', fontWeight: '900', margin: 0, lineHeight: 1,
        color: 'rgba(255, 255, 255, 0.2)',
    } as CSSProperties;
    const statusTextStyle = { /* ... 样式与之前相同 ... */
        fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '500', margin: '-1rem 0 0.5rem 0',
        color: '#f5f5f5',
    } as CSSProperties;
    const messageStyle = { /* ... 样式与之前相同 ... */
        fontFamily: 'monospace', color: '#888888', maxWidth: '600px',
    } as CSSProperties;
    const linkStyle = { /* ... 样式与之前相同 ... */
        display: 'inline-block', marginTop: '1.5rem', padding: '12px 28px', backgroundColor: '#7150ff',
        color: '#ffffff', textDecoration: 'none', borderRadius: '12px', fontWeight: '600',
        boxShadow: '0 4px 15px rgba(113, 80, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    } as CSSProperties;

    // --- 新增: 调试信息区域的样式 ---
    const feedbackContainerStyle = {
        marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '600px', width: '100%', textAlign: 'left',
    } as CSSProperties;
    const feedbackHeaderStyle = { color: '#a0a0a0', fontSize: '0.875rem', marginBottom: '1rem' } as CSSProperties;
    const preStyle = { position: 'relative', margin: 0 } as CSSProperties;
    const codeStyle = {
        fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordWrap: 'break-word',
        color: '#c0c0c0', backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '1rem', paddingRight: '5rem', borderRadius: '6px', display: 'block',
    } as CSSProperties;
    const copyButtonStyle = {
        position: 'absolute', top: '0.75rem', right: '0.75rem',
        background: isCopied ? '#28a745' : '#333333',
        color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '6px',
        padding: '6px 10px', cursor: 'pointer', fontSize: '0.8rem',
        transition: 'background-color 0.2s ease',
    } as CSSProperties;

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={statusStyle}>{status}</h1>
                <p style={statusTextStyle}>{statusText}</p>
                {message && <p style={messageStyle}>{message}</p>}

                {/* --- 新增的调试信息区域 --- */}
                <div style={feedbackContainerStyle}>
                    <p style={feedbackHeaderStyle}>如果问题持续存在，请截图此页面并联系技术支持。提供以下信息将帮助我们更快地解决问题。</p>
                    <div style={preStyle}>
                        <code style={codeStyle}>{debugInfoText.trim()}</code>
                        <button onClick={handleCopy} style={copyButtonStyle}>
                            {isCopied ? '已复制!' : '复制'}
                        </button>
                    </div>
                </div>

                <Link to="/" style={linkStyle}>
                    返回首页
                </Link>
            </div>
        </div>
    );
}
