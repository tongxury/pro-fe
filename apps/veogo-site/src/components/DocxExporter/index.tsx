import React, {useState} from 'react';
import {Document, Packer, Paragraph, TextRun, HeadingLevel, TableCell, TableRow, Table} from 'docx';
import {marked} from 'marked';
import DOMPurify from 'dompurify';

interface DocxExporterProps {
    markdown: string;
    fileName?: string;
    styles?: any;
}

const DocxExporter: React.FC<DocxExporterProps> = ({
                                                       markdown,
                                                       fileName = 'document.docx',
                                                       styles = {}
                                                   }) => {
    const [exporting, setExporting] = useState(false);

    // 将Markdown转换为HTML的tokens
    const parseMarkdown = (md: string) => {
        return marked.lexer(md);
    };

    // 将tokens转换为docx元素
    const tokensToDocxElements = (tokens: any[]) => {
        const elements: any[] = [];

        tokens.forEach(token => {
            switch (token.type) {
                case 'heading':
                    elements.push(
                        new Paragraph({
                            text: token.text,
                            heading: `Heading${token.depth}`,
                            ...styles.heading
                        })
                    );
                    break;

                case 'paragraph':
                    elements.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: token.text,
                                    ...styles.paragraph
                                })
                            ]
                        })
                    );
                    break;

                case 'list':
                    token.items.forEach((item: any, index: number) => {
                        elements.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${index + 1}. ${item.text}`,
                                        ...styles.list
                                    })
                                ]
                            })
                        );
                    });
                    break;

                case 'table':
                    const rows = token.rows.map((row: any) =>
                        new TableRow({
                            children: row.map((cell: any) =>
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: cell,
                                                    ...styles.table
                                                })
                                            ]
                                        })
                                    ]
                                })
                            )
                        })
                    );

                    elements.push(
                        new Table({
                            rows: rows
                        })
                    );
                    break;

                case 'code':
                    elements.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: token.text,
                                    font: 'Courier New',
                                    ...styles.code
                                })
                            ]
                        })
                    );
                    break;
            }
        });

        return elements;
    };

    const exportToWord = async () => {
        try {
            setExporting(true);

            // 清理Markdown内容
            const cleanMarkdown = DOMPurify.sanitize(markdown);

            // 解析Markdown
            const tokens = parseMarkdown(cleanMarkdown);

            // 转换为docx元素
            const elements = tokensToDocxElements(tokens);

            // 创建文档
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: elements
                }]
            });

            // 生成blob并下载
            const blob = await Packer.toBlob(doc);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setExporting(false);
        }
    };

    return (
        <button
            onClick={exportToWord}
            disabled={exporting}
            style={{
                padding: '8px 16px',
                borderRadius: 4,
                backgroundColor: exporting ? '#ccc' : '#1890ff',
                color: 'white',
                border: 'none',
                cursor: exporting ? 'not-allowed' : 'pointer'
            }}
        >
            {exporting ? '导出中...' : '导出Word文档'}
        </button>
    );
};

export default DocxExporter;
