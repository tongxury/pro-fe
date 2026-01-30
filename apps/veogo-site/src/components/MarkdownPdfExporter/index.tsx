import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useReactToPrint } from 'react-to-print';
import DOMPurify from 'dompurify';

interface PdfExporterProps {
    markdown: string;
    fileName?: string;
}

const PdfExporter: React.FC<PdfExporterProps> = ({
                                                     markdown,
                                                     fileName = 'document.pdf'
                                                 }) => {
    const [exporting, setExporting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle: fileName,
        onBeforePrint: () => {
            setExporting(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setExporting(false);
        }
    });

    return (
        <div>
            <button
                onClick={handlePrint}
                disabled={exporting}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    opacity: exporting ? 0.7 : 1,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.15)',
                }}
            >
                {exporting ? '正在导出...' : '导出 PDF'}
            </button>

            <div style={{ display: 'none' }}>
                <div ref={contentRef} className="markdown-content">
                    <ReactMarkdown>
                        {DOMPurify.sanitize(markdown)}
                    </ReactMarkdown>
                </div>
            </div>
            // ... 其他代码保持不变 ...

            <style>
                {`
    // ... 其他样式保持不变 ...

    .markdown-content p {
        margin: 1.2em 0;
        line-height: 2;
        color: #4b5563;
        text-align: justify;
        text-justify: inter-ideograph;
        font-size: 16px;
        text-indent: 0; /* 移除段落缩进 */
    }

    .markdown-content ul,
    .markdown-content ol {
        padding-left: 0; /* 移除默认的左内边距 */
        margin: 1.2em 0;
        color: #4b5563;
        list-style: none; /* 移除默认的列表样式 */
    }

    .markdown-content li {
        margin: 0.5em 0;
        line-height: 2;
        position: relative;
        padding-left: 2.5em; /* 增加左内边距，为序号留出空间 */
    }

    .markdown-content ul li::before {
        content: '•'; /* 使用实心圆点 */
        position: absolute;
        left: 1em; /* 调整圆点位置 */
        color: #2563eb;
        font-weight: bold;
    }

    .markdown-content ol {
        counter-reset: item;
    }

    .markdown-content ol li {
        counter-increment: item;
    }

    .markdown-content ol li::before {
        content: counter(item) ".";
        position: absolute;
        left: 1em; /* 调整序号位置 */
        color: #2563eb;
        font-weight: 600;
    }

    /* 嵌套列表的样式 */
    .markdown-content ul ul,
    .markdown-content ol ul,
    .markdown-content ul ol,
    .markdown-content ol ol {
        margin: 0.5em 0;
    }

    .markdown-content ul ul li,
    .markdown-content ol ul li {
        padding-left: 3em; /* 嵌套列表的缩进 */
    }

    .markdown-content ul ul li::before,
    .markdown-content ol ul li::before {
        content: '◦'; /* 嵌套列表使用空心圆点 */
        left: 2em;
    }

    .markdown-content ul ol li,
    .markdown-content ol ol li {
        padding-left: 3.5em;
    }

    .markdown-content ul ol li::before,
    .markdown-content ol ol li::before {
        left: 2em;
    }

    /* 调整引用块内的段落样式 */
    .markdown-content blockquote p {
        text-indent: 0;
    }

    /* 调整列表项内的段落样式 */
    .markdown-content li p {
        text-indent: 0;
        margin: 0.5em 0;
    }

    /* 确保表格单元格内容左对齐且无缩进 */
    .markdown-content td,
    .markdown-content th {
        text-indent: 0;
    }
`}
            </style>

            // ... 其他代码保持不变 ...
        </div>
    );
};

export default PdfExporter;
