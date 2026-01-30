import { marked } from "marked";

interface Section {
    title: string;
    level: number;
    content: Array<{
        type: "paragraph" | "list-item";
        content: string;
        indent?: number;
        isOrdered?: boolean;
    }>;
    startLine: number;
}

interface Heading {
    level: number;
    text: string;
    id: string;
    line: number;
}

interface List {
    type: "ordered" | "unordered";
    items: Array<{
        content: string;
        indent: number;
        line: number;
    }>;
    startLine: number;
}

interface Paragraph {
    content: string;
    line: number;
}

interface Image {
    alt: string;
    src: string;
    line: number;
}

interface Link {
    text: string;
    url: string;
    line: number;
}

interface CodeBlock {
    type: "code";
    content: string;
    language: string;
    startLine: number;
    endLine: number;
}

interface ParsedMarkdown {
    sections: Section[];
    headings: Heading[];
    lists: List[];
    paragraphs: Paragraph[];
    images: Image[];
    links: Link[];
    codeBlocks: CodeBlock[];
}

class MarkdownParser {
    /**
     * 解析markdown文本，提取结构化信息
     * @param {string} markdown - markdown文本
     * @returns {ParsedMarkdown} 解析后的文档结构
     */
    static parseMarkdown(markdown: string): ParsedMarkdown {
        if (!markdown || typeof markdown !== "string") {
            return {
                sections: [],
                headings: [],
                lists: [],
                paragraphs: [],
                images: [],
                links: [],
                codeBlocks: []
            };
        }

        const lines = markdown.split("\n");
        const sections: Section[] = [];
        const headings: Heading[] = [];
        const lists: List[] = [];
        const paragraphs: Paragraph[] = [];
        const images: Image[] = [];
        const links: Link[] = [];
        const codeBlocks: CodeBlock[] = [];

        let currentSection: Section | null = null;
        let inCodeBlock = false;
        let codeBlockContent: string[] = [];
        let inList = false;
        let currentList: List | null = null;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            // 处理代码块
            if (trimmedLine.startsWith("```")) {
                if (inCodeBlock) {
                    // 结束代码块
                    codeBlocks.push({
                        type: "code",
                        content: codeBlockContent.join("\n"),
                        language: codeBlockContent[0] || "",
                        startLine: index - codeBlockContent.length,
                        endLine: index
                    });
                    codeBlockContent = [];
                    inCodeBlock = false;
                } else {
                    // 开始代码块
                    inCodeBlock = true;
                    const language = trimmedLine.substring(3).trim();
                    codeBlockContent = [language];
                }
                return;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }

            // 处理标题
            const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const text = headingMatch[2];
                const heading = {
                    level,
                    text,
                    id: this.generateId(text),
                    line: index
                };
                headings.push(heading);

                // 如果是一级或二级标题，创建新节
                if (level <= 2) {
                    currentSection = {
                        title: text,
                        level,
                        content: [],
                        startLine: index
                    };
                    sections.push(currentSection);
                }
                return;
            }

            // 处理列表
            const listMatch = trimmedLine.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
            if (listMatch) {
                const indent = listMatch[1].length;
                const marker = listMatch[2];
                const content = listMatch[3];
                const isOrdered = /^\d+\.$/.test(marker);

                if (!inList) {
                    inList = true;
                    currentList = {
                        type: isOrdered ? "ordered" : "unordered",
                        items: [],
                        startLine: index
                    };
                }

                currentList!.items.push({
                    content,
                    indent,
                    line: index
                });

                if (currentSection) {
                    currentSection.content.push({
                        type: "list-item",
                        content,
                        indent,
                        isOrdered
                    });
                }
                return;
            } else if (inList) {
                // 结束列表
                if (currentList) {
                    lists.push(currentList);
                }
                currentList = null;
                inList = false;
            }

            // 处理图片
            const imageMatch = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
            if (imageMatch) {
                imageMatch.forEach((match) => {
                    const parts = match.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                    images.push({
                        alt: parts[1],
                        src: parts[2],
                        line: index
                    });
                });
            }

            // 处理链接
            const linkMatch = trimmedLine.match(/\[([^\]]+)\]\(([^)]+)\)/g);
            if (linkMatch) {
                linkMatch.forEach((match) => {
                    const parts = match.match(/\[([^\]]+)\]\(([^)]+)\)/);
                    links.push({
                        text: parts[1],
                        url: parts[2],
                        line: index
                    });
                });
            }

            // 处理普通段落
            if (trimmedLine && !headingMatch && !listMatch) {
                const paragraph = {
                    content: trimmedLine,
                    line: index
                };
                paragraphs.push(paragraph);

                if (currentSection) {
                    currentSection.content.push({
                        type: "paragraph",
                        content: trimmedLine
                    });
                }
            }
        });

        // 处理最后的列表
        if (inList && currentList && currentList.items.length > 0) {
            lists.push(currentList);
        }

        return {
            sections,
            headings,
            lists,
            paragraphs,
            images,
            links,
            codeBlocks
        };
    }

    /**
     * 将markdown转换为HTML
     * @param {string} markdown - markdown文本
     * @returns {string} HTML字符串
     */
    static markdownToHtml(markdown: string): string {
        if (!markdown) return "";

        // 配置marked选项
        marked.setOptions({
            gfm: true, // GitHub Flavored Markdown
            breaks: true // 单个换行符转换为<br>
        });

        return marked.parse(markdown) as string;
    }

    /**
     * 将markdown转换为纯文本
     * @param {string} markdown - markdown文本
     * @returns {string} 纯文本
     */
    static markdownToPlainText(markdown: string): string {
        if (!markdown) return "";

        return (
            markdown
                // 移除代码块
                .replace(/```[\s\S]*?```/g, "")
                // 移除内联代码
                .replace(/`[^`]+`/g, "")
                // 移除图片
                .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
                // 移除链接，保留文本
                .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                // 移除标题标记
                .replace(/^#{1,6}\s+/gm, "")
                // 移除列表标记
                .replace(/^\s*[-*+]\s+/gm, "• ")
                .replace(/^\s*\d+\.\s+/gm, "")
                // 移除强调标记
                .replace(/\*\*([^*]+)\*\*/g, "$1")
                .replace(/\*([^*]+)\*/g, "$1")
                .replace(/__([^_]+)__/g, "$1")
                .replace(/_([^_]+)_/g, "$1")
                // 移除删除线
                .replace(/~~([^~]+)~~/g, "$1")
                // 清理多余的空行
                .replace(/\n\s*\n\s*\n/g, "\n\n")
                .trim()
        );
    }

    /**
     * 生成标题ID
     * @param {string} text - 标题文本
     * @returns {string} ID
     */
    static generateId(text: string): string {
        return text
            .toLowerCase()
            .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    /**
     * 提取文档目录
     * @param {string} markdown - markdown文本
     * @returns {Array} 目录结构
     */
    static extractToc(markdown: string): Array<{ level: number; text: string; id: string; line: number }> {
        const parsed = this.parseMarkdown(markdown);
        return parsed.headings.map((heading) => ({
            level: heading.level,
            text: heading.text,
            id: heading.id,
            line: heading.line
        }));
    }

    /**
     * 检查是否为markdown格式
     * @param {string} text - 文本内容
     * @returns {boolean} 是否为markdown
     */
    static isMarkdown(text: string): boolean {
        if (!text || typeof text !== "string") return false;

        // 检查markdown特征
        const markdownPatterns = [
            /^#{1,6}\s+/m, // 标题
            /^\s*[-*+]\s+/m, // 无序列表
            /^\s*\d+\.\s+/m, // 有序列表
            /\*\*[^*]+\*\*/, // 粗体
            /\*[^*]+\*/, // 斜体
            /`[^`]+`/, // 内联代码
            /```[\s\S]*?```/, // 代码块
            /\[([^\]]+)\]\([^)]+\)/, // 链接
            /!\[([^\]]*)\]\([^)]+\)/ // 图片
        ];

        return markdownPatterns.some((pattern) => pattern.test(text));
    }
}

export default MarkdownParser;
