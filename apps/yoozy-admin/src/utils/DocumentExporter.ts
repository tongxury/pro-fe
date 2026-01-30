import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    PageBreak,
    TableOfContents,
    Header,
    Footer,
    PageNumber,
    Table,
    TableRow,
    TableCell,
    WidthType
} from "docx";
import { saveAs } from "file-saver";
import MarkdownParser from "../utils/MarkdownParser";

class DocumentExporter {
    /**
     * 导出PDF文档
     * @param {Object} documentData - 文档数据
     * @param {HTMLElement} previewElement - 预览元素（用于基于DOM的导出）
     * @param {boolean} advanced - 是否使用高级模式
     */
    static async exportToPDF(documentData, previewElement = undefined, advanced = false) {
        try {
            if (advanced && previewElement) {
                // 高级模式：基于DOM截图生成PDF
                return await this.exportPDFFromDOM(documentData, previewElement);
            } else {
                // 基础模式：基于文本生成PDF
                return await this.exportBasicPDF(documentData);
            }
        } catch (error) {
            throw new Error(`PDF导出失败: ${error.message}`);
        }
    }

    /**
     * 基础PDF导出
     */
    static async exportBasicPDF(documentData) {
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true
        });

        // 检测是否包含中文字符
        const hasChinese = this.containsChinese(documentData.title + documentData.content + documentData.author);

        if (hasChinese) {
            // 如果包含中文，使用高级模式的DOM渲染方式
            console.warn("检测到中文字符，基础模式可能显示不正确，建议使用高级模式");

            // 创建临时预览元素用于渲染
            const tempDiv = document.createElement("div");
            tempDiv.style.cssText = `
                position: absolute;
                left: -9999px;
                top: -9999px;
                width: 800px;
                padding: 40px;
                font-family: "SimSun", "宋体", "Songti SC", "宋体-简", "NSimSun", serif;
                font-size: 14px;
                line-height: 1.8;
                color: #000;
                background: white;
            `;

            // 构建HTML内容
            const isMarkdown = MarkdownParser.isMarkdown(documentData.content);
            let htmlContent = "";

            if (isMarkdown) {
                htmlContent = MarkdownParser.markdownToHtml(documentData.content);
                // 手动处理粗体，确保显示，设置为黑色、宋体，字号与内容一致
                htmlContent = htmlContent.replace(
                    /<strong>(.*?)<\/strong>/g,
                    "<span style=\"font-weight: bold; color: #000; font-family: 'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif; font-size: 14px;\">$1</span>"
                );
                htmlContent = htmlContent.replace(
                    /<b>(.*?)<\/b>/g,
                    "<span style=\"font-weight: bold; color: #000; font-family: 'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif; font-size: 14px;\">$1</span>"
                );
            } else {
                htmlContent = documentData.content.replace(/\n/g, "<br>");
            }

            // 修复SVG属性问题 - 移除所有SVG元素或修复其属性
            htmlContent = htmlContent.replace(/<svg[^>]*>/g, function (match) {
                return match.replace(/width="[^"]*"/g, 'width="100"').replace(/height="[^"]*"/g, 'height="100"');
            });

            // 移除可能导致问题的SVG元素
            htmlContent = htmlContent.replace(/<svg[\s\S]*?<\/svg>/g, "");

            tempDiv.innerHTML = `
                <h1 style="font-size: 24px; margin-bottom: 10px; color: #000; font-weight: bold; font-family: 'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif;">${documentData.title}</h1>
                ${documentData.includeDate ? `<p style="font-size: 12px; color: #666; margin-bottom: 5px; font-family: 'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif;">创建日期: ${documentData.includeDate}</p>` : ""}
                <p style="font-size: 14px; color: #666; margin-bottom: 20px; font-family: 'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif;">作者: ${documentData.author}</p>
                <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 20px 0;">
                <div style="margin-top: 20px; color: #000; font-family: 'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif;">${htmlContent}</div>
            `;

            document.body.appendChild(tempDiv);

            try {
                // 等待一下让DOM完全加载
                await new Promise((resolve) => setTimeout(resolve, 200));

                // 强制应用样式到所有元素
                const allElements = tempDiv.querySelectorAll("*");

                allElements.forEach((element: any) => {
                    // 为所有元素设置宋体
                    element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";

                    // 强制设置粗体样式、黑色，字号与内容一致
                    if (element.tagName === "STRONG" || element.tagName === "B") {
                        element.style.fontWeight = "bold";
                        element.style.fontSize = "14px"; // 与内容字号一致
                        element.style.color = "#000";
                        element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";
                    }

                    // 处理标题
                    if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(element.tagName)) {
                        element.style.fontWeight = "bold";
                        element.style.marginTop = "1.5em";
                        element.style.marginBottom = "0.8em";
                        element.style.color = "#000";
                        element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";
                        if (element.tagName === "H1") {
                            element.style.textIndent = "0";
                            element.style.fontSize = "20px";
                        } else if (element.tagName === "H2") {
                            element.style.textIndent = "0";
                            element.style.fontSize = "18px";
                        } else {
                            element.style.textIndent = "1em";
                            element.style.fontSize = "16px";
                        }
                    }

                    // 处理段落
                    if (element.tagName === "P") {
                        element.style.marginBottom = "1em";
                        element.style.lineHeight = "1.8";
                        element.style.color = "#000";
                        element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";
                        element.style.textIndent = "2em";
                        element.style.textAlign = "justify";
                    }

                    // 处理列表项
                    if (element.tagName === "LI") {
                        element.style.color = "#000";
                        element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";
                        element.style.marginBottom = "0.8em";
                        element.style.lineHeight = "1.8";
                        element.style.listStyle = "none";
                        element.style.position = "relative";
                        element.style.paddingLeft = "2.5em";
                        element.style.textIndent = "0";

                        // 清除现有圆点
                        const existingBullets = element.querySelectorAll(".custom-bullet");
                        existingBullets.forEach((bullet) => bullet.remove());

                        // 添加自定义圆点
                        const bullet = document.createElement("span");
                        bullet.className = "custom-bullet";
                        bullet.textContent = "●";
                        bullet.style.cssText = `
                            position: absolute;
                            left: 2em;
                            color: #000;
                            font-weight: normal;
                            font-size: 8px;
                            top: 1em;
                        `;
                        element.insertBefore(bullet, element.firstChild);
                    }

                    // 处理列表
                    if (element.tagName === "UL" || element.tagName === "OL") {
                        element.style.paddingLeft = "0";
                        element.style.marginBottom = "1em";
                        element.style.marginLeft = "1em";
                        element.style.listStyle = "none";
                    }

                    // 处理我们手动创建的粗体span
                    if (
                        element.tagName === "SPAN" &&
                        (element.style.fontWeight === "bold" || element.style.fontWeight === "700")
                    ) {
                        element.style.fontWeight = "bold";
                        element.style.color = "#000";
                        element.style.fontSize = "14px"; // 与内容字号一致
                        element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";
                    }

                    // 处理其他元素
                    if (["DIV", "SPAN", "TD", "TH"].includes(element.tagName)) {
                        if (!element.style.color || element.style.color !== "#666") {
                            element.style.color = "#000";
                        }
                        element.style.fontFamily = "'SimSun', '宋体', 'Songti SC', '宋体-简', 'NSimSun', serif";
                    }
                });

                // 再等待一下确保样式完全应用
                await new Promise((resolve) => setTimeout(resolve, 300));

                // 使用html2canvas渲染
                const canvas = await html2canvas(tempDiv, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#ffffff",
                    logging: false,
                    foreignObjectRendering: false,
                    imageTimeout: 15000,
                    removeContainer: false
                });

                // 移除临时元素
                document.body.removeChild(tempDiv);

                // 处理PDF分页
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                const pageHeight = 257;
                const marginTop = 20;

                let currentY = 0;
                let pageIndex = 0;

                while (currentY < imgHeight) {
                    if (pageIndex > 0) {
                        pdf.addPage();
                    }

                    const remainingHeight = imgHeight - currentY;
                    const currentPageHeight = Math.min(pageHeight, remainingHeight);
                    const sourceY = (currentY / imgWidth) * canvas.width;
                    const sourceHeight = (currentPageHeight / imgWidth) * canvas.width;

                    const tempCanvas = document.createElement("canvas");
                    const tempCtx = tempCanvas.getContext("2d");
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = sourceHeight;

                    const img = new Image();
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.src = imgData;
                    });

                    tempCtx.drawImage(img, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);

                    const pageImgData = tempCanvas.toDataURL("image/png");
                    pdf.addImage(pageImgData, "PNG", 10, marginTop, imgWidth, currentPageHeight);

                    currentY += pageHeight;
                    pageIndex++;
                }

                pdf.save(`${documentData.fileName}.pdf`);
                return;
            } catch (error) {
                console.error("自动高级模式渲染失败，继续使用基础模式:", error);
                if (document.body.contains(tempDiv)) {
                    document.body.removeChild(tempDiv);
                }
            }
        }

        // 基础模式：仅适用于英文和简单字符
        let yPosition = 30;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - 2 * margin;

        // 添加标题
        pdf.setFontSize(18);
        pdf.setFont("helvetica", "bold");
        const titleText = this.replaceUnsupportedChars(documentData.title);
        const titleLines = pdf.splitTextToSize(titleText, contentWidth);
        pdf.text(titleLines, margin, yPosition);
        yPosition += titleLines.length * 10 + 10;

        // 添加日期（如果启用）
        if (documentData.includeDate) {
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            const dateText = `Created: ${documentData.includeDate}`;
            pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), yPosition);
            yPosition += 15;
        }

        // 添加作者
        pdf.setFontSize(12);
        const authorText = `Author: ${this.replaceUnsupportedChars(documentData.author)}`;
        pdf.text(authorText, margin, yPosition);
        yPosition += 20;

        // 添加分隔线
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 15;

        // 处理内容
        const isMarkdown = MarkdownParser.isMarkdown(documentData.content);

        if (isMarkdown) {
            const parsed = MarkdownParser.parseMarkdown(documentData.content);
            this.convertParsedMarkdownToPDFContent(parsed, pdf, margin, yPosition, contentWidth);
        } else {
            this.processPlainTextForPDF(documentData.content, pdf, margin, yPosition, contentWidth);
        }

        // 保存PDF
        pdf.save(`${documentData.fileName}.pdf`);
    }

    /**
     * 将解析的markdown转换为PDF内容
     */
    static convertParsedMarkdownToPDFContent(parsed, pdf, margin, startY, contentWidth) {
        let yPosition = startY;
        const pageHeight = pdf.internal.pageSize.getHeight();

        // 处理每个section
        if (parsed.sections.length > 0) {
            parsed.sections.forEach((section) => {
                // 检查是否需要新页面
                if (yPosition > pageHeight - 40) {
                    pdf.addPage();
                    yPosition = 30;
                }

                // 添加section标题
                pdf.setFontSize(16);
                pdf.setFont("helvetica", "bold");
                const processedTitle = this.replaceUnsupportedChars(section.title);
                const titleLines = pdf.splitTextToSize(processedTitle, contentWidth);
                pdf.text(titleLines, margin, yPosition);
                yPosition += titleLines.length * 8 + 10;

                // 添加section内容
                section.content.forEach((item) => {
                    if (yPosition > pageHeight - 20) {
                        pdf.addPage();
                        yPosition = 30;
                    }

                    if (item.type === "paragraph") {
                        pdf.setFontSize(12);
                        pdf.setFont("helvetica", "normal");
                        const processedContent = this.replaceUnsupportedChars(item.content);
                        const lines = pdf.splitTextToSize(processedContent, contentWidth);
                        pdf.text(lines, margin, yPosition);
                        yPosition += lines.length * 7 + 5;
                    } else if (item.type === "list-item") {
                        pdf.setFontSize(12);
                        pdf.setFont("helvetica", "normal");
                        const processedContent = this.replaceUnsupportedChars(item.content);
                        const bulletText = `• ${processedContent}`;
                        const lines = pdf.splitTextToSize(bulletText, contentWidth - 10);
                        pdf.text(lines, margin + 5, yPosition);
                        yPosition += lines.length * 7 + 3;
                    }
                });

                yPosition += 10; // section间距
            });
        } else {
            // 如果没有sections，处理基本内容
            this.processBasicMarkdownContent(parsed, pdf, margin, yPosition, contentWidth);
        }

        return yPosition;
    }

    /**
     * 处理基本markdown内容
     */
    static processBasicMarkdownContent(parsed, pdf, margin, startY, contentWidth) {
        let yPosition = startY;
        const pageHeight = pdf.internal.pageSize.getHeight();

        // 处理标题
        parsed.headings.forEach((heading) => {
            if (yPosition > pageHeight - 20) {
                pdf.addPage();
                yPosition = 30;
            }

            const fontSize = Math.max(12, 18 - heading.level * 2);
            pdf.setFontSize(fontSize);
            pdf.setFont("helvetica", "bold");
            const processedText = this.processInlineMarkdownForPDF(heading.text);
            const lines = pdf.splitTextToSize(processedText, contentWidth);
            pdf.text(lines, margin, yPosition);
            yPosition += lines.length * (fontSize * 0.5) + 8;
        });

        // 处理段落
        parsed.paragraphs.forEach((paragraph) => {
            if (yPosition > pageHeight - 20) {
                pdf.addPage();
                yPosition = 30;
            }

            this.renderMarkdownParagraphToPDF(paragraph.content, pdf, margin, yPosition, contentWidth);
            yPosition += 20; // 段落间距
        });

        // 处理列表
        parsed.lists.forEach((list) => {
            list.items.forEach((item) => {
                if (yPosition > pageHeight - 20) {
                    pdf.addPage();
                    yPosition = 30;
                }

                const bulletPrefix = list.type === "ordered" ? "1. " : "• ";
                this.renderMarkdownTextToPDF(
                    `${bulletPrefix}${item.content}`,
                    pdf,
                    margin + 5,
                    yPosition,
                    contentWidth - 10
                );
                yPosition += 15; // 列表项间距
            });
            yPosition += 5; // 列表间距
        });

        return yPosition;
    }

    /**
     * 渲染包含markdown格式的段落到PDF
     */
    static renderMarkdownParagraphToPDF(text, pdf, margin, yPosition, contentWidth) {
        if (!text) return yPosition;

        // 解析内联格式
        const segments = this.parseInlineMarkdown(text);
        let currentX = margin;
        let currentY = yPosition;

        segments.forEach((segment) => {
            // 设置字体样式
            pdf.setFontSize(12);
            if (segment.bold) {
                pdf.setFont("helvetica", "bold");
            } else if (segment.italic) {
                pdf.setFont("helvetica", "italic");
            } else {
                pdf.setFont("helvetica", "normal");
            }

            // 检查是否需要换行
            const textWidth = pdf.getTextWidth(segment.text);
            if (currentX + textWidth > margin + contentWidth) {
                currentY += 7;
                currentX = margin;
            }

            // 渲染文本
            pdf.text(segment.text, currentX, currentY);
            currentX += textWidth;
        });

        return currentY + 7;
    }

    /**
     * 渲染包含markdown格式的文本到PDF
     */
    static renderMarkdownTextToPDF(text, pdf, x, y, maxWidth) {
        const segments = this.parseInlineMarkdown(text);
        let currentX = x;

        segments.forEach((segment) => {
            pdf.setFontSize(12);
            if (segment.bold) {
                pdf.setFont("helvetica", "bold");
            } else if (segment.italic) {
                pdf.setFont("helvetica", "italic");
            } else {
                pdf.setFont("helvetica", "normal");
            }

            pdf.text(segment.text, currentX, y);
            currentX += pdf.getTextWidth(segment.text);
        });
    }

    /**
     * 解析内联markdown格式
     */
    static parseInlineMarkdown(text) {
        if (!text) return [{ text: "", bold: false, italic: false }];

        const segments = [];
        const patterns = [
            { regex: /\*\*([^*]+)\*\*/g, bold: true }, // 粗体
            { regex: /\*([^*]+)\*/g, italic: true } // 斜体
        ];

        const remaining = text;
        let lastIndex = 0;

        // 处理粗体
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let match;

        while ((match = boldRegex.exec(text)) !== null) {
            // 添加粗体前的普通文本
            if (match.index > lastIndex) {
                const normalText = text.substring(lastIndex, match.index);
                if (normalText) {
                    segments.push({ text: normalText, bold: false, italic: false });
                }
            }

            // 添加粗体文本
            segments.push({ text: match[1], bold: true, italic: false });
            lastIndex = match.index + match[0].length;
        }

        // 添加剩余的普通文本
        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            if (remainingText) {
                // 处理剩余文本中的斜体
                const italicRegex = /\*([^*]+)\*/g;
                let italicLastIndex = 0;
                let italicMatch;

                while ((italicMatch = italicRegex.exec(remainingText)) !== null) {
                    // 添加斜体前的普通文本
                    if (italicMatch.index > italicLastIndex) {
                        const normalText = remainingText.substring(italicLastIndex, italicMatch.index);
                        if (normalText) {
                            segments.push({ text: normalText, bold: false, italic: false });
                        }
                    }

                    // 添加斜体文本
                    segments.push({ text: italicMatch[1], bold: false, italic: true });
                    italicLastIndex = italicMatch.index + italicMatch[0].length;
                }

                // 添加最后剩余的普通文本
                if (italicLastIndex < remainingText.length) {
                    const finalText = remainingText.substring(italicLastIndex);
                    if (finalText) {
                        segments.push({ text: finalText, bold: false, italic: false });
                    }
                }
            }
        }

        return segments.length > 0 ? segments : [{ text: text, bold: false, italic: false }];
    }

    /**
     * 处理内联markdown格式为PDF（简化版本）
     */
    static processInlineMarkdownForPDF(text) {
        if (!text) return "";

        // 对于中文内容，建议使用高级模式
        if (this.containsChinese(text)) {
            return text.replace(/\*\*([^*]+)\*\*/g, "$1"); // 去掉粗体标记但保留文本
        }

        return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
    }

    /**
     * 处理纯文本内容为PDF
     */
    static processPlainTextForPDF(content, pdf, margin, startY, contentWidth) {
        let yPosition = startY;
        const pageHeight = pdf.internal.pageSize.getHeight();

        const paragraphs = content.split("\n");
        for (const paragraph of paragraphs) {
            if (paragraph.trim()) {
                const processedParagraph = this.replaceUnsupportedChars(paragraph.trim());
                const lines = pdf.splitTextToSize(processedParagraph, contentWidth);

                // 检查是否需要新页面
                if (yPosition + lines.length * 7 > pageHeight - 20) {
                    pdf.addPage();
                    yPosition = 30;
                }

                pdf.setFontSize(12);
                pdf.setFont("helvetica", "normal");
                pdf.text(lines, margin, yPosition);
                yPosition += lines.length * 7 + 5;
            } else {
                yPosition += 7;
            }
        }

        return yPosition;
    }

    /**
     * 高级PDF导出（基于DOM截图）
     */
    static async exportPDFFromDOM(documentData, previewElement) {
        const canvas = await html2canvas(previewElement, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // 添加第一页
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 如果内容超过一页，添加更多页面
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`${documentData.fileName}_高级版.pdf`);
    }

    /**
     * 导出Word文档
     * @param {Object} documentData - 文档数据
     * @param {boolean} advanced - 是否使用高级模式
     */
    static async exportToWord(documentData, advanced = false) {
        try {
            if (advanced) {
                return await this.exportAdvancedWord(documentData);
            } else {
                return await this.exportBasicWord(documentData);
            }
        } catch (error) {
            throw new Error(`Word导出失败: ${error.message}`);
        }
    }

    /**
     * 基础Word导出
     */
    static async exportBasicWord(documentData) {
        try {
            // 输入验证
            if (!documentData) {
                throw new Error("文档数据不能为空");
            }

            const children = [];

            // 添加标题
            const title = documentData.title || "未命名文档";
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: title,
                            bold: true,
                            size: 32
                        })
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                })
            );

            // 添加日期（如果启用）
            if (documentData.includeDate) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `创建日期: ${documentData.includeDate}`,
                                italics: true,
                                size: 20
                            })
                        ],
                        alignment: AlignmentType.RIGHT,
                        spacing: { after: 200 }
                    })
                );
            }

            // 添加作者信息
            const author = documentData.author || "未知作者";
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `作者: ${author}`,
                            size: 22
                        })
                    ],
                    spacing: { after: 400 }
                })
            );

            // 处理内容
            const content = documentData.content || "";
            const isMarkdown = MarkdownParser.isMarkdown(content);

            if (isMarkdown && content.trim()) {
                this.convertMarkdownToWordContent(content, children);
            } else if (content.trim()) {
                this.addPlainTextToWordChildren(children, content);
            } else {
                // 如果没有内容，添加占位符
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "此文档暂无内容",
                                size: 24,
                                italics: true,
                                color: "999999"
                            })
                        ],
                        spacing: { after: 200 },
                        alignment: AlignmentType.CENTER
                    })
                );
            }

            // 创建文档
            const doc = new Document({
                creator: author,
                title: title,
                description: "使用React导出工具生成的文档",
                sections: [
                    {
                        properties: {},
                        children: children
                    }
                ]
            });

            // 保存文档
            const fileName = documentData.fileName || "document";
            const blob = await Packer.toBlob(doc);
            saveAs(blob, `${fileName}.docx`);
        } catch (error) {
            console.error("Basic Word export error:", error);
            throw error;
        }
    }

    /**
     * 将markdown内容转换为Word格式
     */
    static convertMarkdownToWordContent(markdownContent, children) {
        // 输入验证
        if (!markdownContent || typeof markdownContent !== "string") {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "内容为空",
                            size: 24
                        })
                    ],
                    spacing: { after: 200 }
                })
            );
            return;
        }

        if (!Array.isArray(children)) {
            console.error("children must be an array");
            return;
        }

        const lines = markdownContent.split("\n");
        let inCodeBlock = false;
        let codeBlockContent = [];
        let inList = false;
        const listItems = [];
        let listType = "unordered";

        // 添加表格处理变量
        let inTable = false;
        let tableRows = [];
        let tableHeaders = [];
        let isHeaderRow = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i] || "";
            const trimmedLine = line.trim();

            // 处理代码块
            if (trimmedLine.startsWith("```")) {
                if (inCodeBlock) {
                    // 结束代码块
                    if (codeBlockContent.length > 0) {
                        children.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: codeBlockContent.join("\n"),
                                        size: 20,
                                        font: "Courier New"
                                    })
                                ],
                                spacing: { before: 200, after: 200 },
                                shading: {
                                    fill: "F8F9FA"
                                }
                            })
                        );
                    }
                    codeBlockContent = [];
                    inCodeBlock = false;
                } else {
                    // 开始代码块
                    inCodeBlock = true;
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                continue;
            }

            // 处理列表
            const listMatch = trimmedLine.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
            if (listMatch) {
                const marker = listMatch[2];
                const content = listMatch[3] || "";
                const isOrdered = /^\d+\.$/.test(marker);

                if (!inList) {
                    inList = true;
                    listType = isOrdered ? "ordered" : "unordered";
                }

                // 处理内联格式
                const processedContent = this.processInlineMarkdown(content);

                if (processedContent && processedContent.length > 0) {
                    children.push(
                        new Paragraph({
                            children: processedContent,
                            bullet: {
                                level: 0
                            },
                            spacing: { after: 100 },
                            // 添加缩进，与PDF保持一致
                            indent: {
                                left: 720, // 左缩进1em (720 twips = 1em)
                                hanging: 360 // 悬挂缩进0.5em
                            }
                        })
                    );
                }
                continue;
            } else if (inList) {
                inList = false;
            }

            // 处理表格
            if (trimmedLine.includes("|") && trimmedLine.match(/^\|.*\|$/)) {
                if (!inTable) {
                    inTable = true;
                    tableRows = [];
                    tableHeaders = [];
                }

                // 解析表格行
                const cells = trimmedLine
                    .split("|")
                    .slice(1, -1)
                    .map((cell) => cell.trim());

                // 检查是否是表头行（下一行是分隔符）
                const nextLine = lines[i + 1] || "";
                const isSeparator = nextLine.trim().match(/^\|[\s\-:|]+\|$/);

                if (isSeparator) {
                    // 这是表头行
                    tableHeaders = cells;
                    isHeaderRow = true;
                    i++; // 跳过分隔符行
                } else if (inTable) {
                    // 这是数据行
                    tableRows.push(cells);
                }

                continue;
            } else if (inTable) {
                // 表格结束，创建Word表格
                if (tableHeaders.length > 0 || tableRows.length > 0) {
                    this.createWordTable(children, tableHeaders, tableRows, isHeaderRow);
                }
                inTable = false;
                tableRows = [];
                tableHeaders = [];
                isHeaderRow = false;
            }

            // 处理标题
            const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
            if (headingMatch) {
                const level = headingMatch[1] ? headingMatch[1].length : 1;
                const text = headingMatch[2] || "";
                const processedText = this.processInlineMarkdown(text);

                const headingLevel =
                    level === 1
                        ? HeadingLevel.HEADING_1
                        : level === 2
                          ? HeadingLevel.HEADING_2
                          : level === 3
                            ? HeadingLevel.HEADING_3
                            : undefined;

                if (processedText && processedText.length > 0) {
                    children.push(
                        new Paragraph({
                            children: processedText,
                            heading: headingLevel,
                            spacing: { before: 300, after: 200 },
                            // 根据标题级别设置缩进，与PDF一致
                            indent: level <= 2 ? { left: 0 } : { left: 720 } // H1,H2不缩进，H3+缩进1em
                        })
                    );
                }
                continue;
            }

            // 处理引用块
            if (trimmedLine.startsWith("> ")) {
                const quoteContent = trimmedLine.substring(2);
                const processedContent = this.processInlineMarkdown(quoteContent);

                if (processedContent && processedContent.length > 0) {
                    children.push(
                        new Paragraph({
                            children: processedContent,
                            spacing: { before: 200, after: 200 },
                            indent: { left: 720 },
                            shading: {
                                fill: "F8F9FA"
                            }
                        })
                    );
                }
                continue;
            }

            // 处理分割线
            if (trimmedLine.match(/^[-*_]{3,}$/)) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "────────────────────────────────────────",
                                size: 20,
                                color: "999999"
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 }
                    })
                );
                continue;
            }

            // 处理普通段落
            if (trimmedLine) {
                const processedContent = this.processInlineMarkdown(trimmedLine);
                if (processedContent && processedContent.length > 0) {
                    children.push(
                        new Paragraph({
                            children: processedContent,
                            spacing: { after: 200 },
                            // 添加首行缩进，与PDF保持一致
                            indent: { firstLine: 420 }, // 首行缩进2个字符 (420 twips ≈ 2em)
                            alignment: AlignmentType.JUSTIFIED // 两端对齐
                        })
                    );
                }
            } else {
                // 空行
                children.push(new Paragraph({}));
            }
        }

        // 处理最后的代码块
        if (inCodeBlock && codeBlockContent.length > 0) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: codeBlockContent.join("\n"),
                            size: 20,
                            font: "Courier New"
                        })
                    ],
                    spacing: { before: 200, after: 200 },
                    shading: {
                        fill: "F8F9FA"
                    }
                })
            );
        }

        // 处理最后的表格
        if (inTable && (tableHeaders.length > 0 || tableRows.length > 0)) {
            this.createWordTable(children, tableHeaders, tableRows, isHeaderRow);
        }
    }

    /**
     * 处理内联markdown格式
     */
    static processInlineMarkdown(text) {
        // 输入验证
        if (!text || typeof text !== "string") {
            return [new TextRun({ text: "", size: 24 })];
        }

        const children = [];
        const currentPos = 0;
        const textRuns = [];

        // 处理各种内联格式
        const patterns = [
            { regex: /\*\*([^*]+)\*\*/g, format: { bold: true } }, // 粗体
            { regex: /\*([^*]+)\*/g, format: { italics: true } }, // 斜体
            { regex: /`([^`]+)`/g, format: { font: "Courier New", shading: { fill: "F4F4F4" } } }, // 内联代码
            { regex: /~~([^~]+)~~/g, format: { strike: true } } // 删除线
        ];

        const processedText = text;
        let segments = [{ text: processedText, format: {} }];

        // 处理每种格式
        patterns.forEach((pattern) => {
            const newSegments = [];

            segments.forEach((segment) => {
                // @ts-ignore
                if (!segment || !segment.text || segment.format.processed) {
                    newSegments.push(segment);
                    return;
                }

                let lastIndex = 0;
                let match;
                const regex = new RegExp(pattern.regex.source, pattern.regex.flags);

                while ((match = regex.exec(segment.text)) !== null) {
                    // 添加匹配前的文本
                    if (match.index > lastIndex) {
                        const beforeText = segment.text.substring(lastIndex, match.index);
                        if (beforeText) {
                            newSegments.push({
                                text: beforeText,
                                format: { ...segment.format }
                            });
                        }
                    }

                    // 添加格式化的文本
                    if (match[1]) {
                        newSegments.push({
                            text: match[1],
                            format: { ...segment.format, ...pattern.format, processed: true }
                        });
                    }

                    lastIndex = match.index + match[0].length;
                }

                // 添加剩余的文本
                if (lastIndex < segment.text.length) {
                    const remainingText = segment.text.substring(lastIndex);
                    if (remainingText) {
                        newSegments.push({
                            text: remainingText,
                            format: { ...segment.format }
                        });
                    }
                }
            });

            segments = newSegments.filter((segment) => segment && segment.text);
        });

        // 转换为TextRun对象
        const validSegments = segments.filter((segment) => segment && segment.text && segment.text.length > 0);

        if (validSegments.length === 0) {
            return [new TextRun({ text: text || "", size: 24 })];
        }

        return validSegments.map((segment) => {
            // @ts-ignore
            const { processed, ...format } = segment.format || {};
            return new TextRun({
                text: segment.text || "",
                size: 24,
                ...format
            });
        });
    }

    /**
     * 将纯文本添加到Word文档子元素
     */
    static addPlainTextToWordChildren(children, content) {
        // 输入验证
        if (!Array.isArray(children)) {
            console.error("children must be an array");
            return;
        }

        if (!content || typeof content !== "string") {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "内容为空",
                            size: 24,
                            italics: true
                        })
                    ],
                    spacing: { after: 200 }
                })
            );
            return;
        }

        const paragraphs = content.split("\n");
        paragraphs.forEach((paragraph) => {
            const trimmedParagraph = paragraph ? paragraph.trim() : "";
            if (trimmedParagraph) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: trimmedParagraph,
                                size: 24
                            })
                        ],
                        spacing: { after: 200 }
                    })
                );
            } else {
                children.push(new Paragraph({}));
            }
        });
    }

    /**
     * 高级Word导出
     */
    static async exportAdvancedWord(documentData) {
        const children = [];

        // 添加标题页
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: documentData.title,
                        bold: true,
                        size: 48,
                        color: "1976d2"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 800 }
            })
        );

        // 添加分隔线
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "─".repeat(50),
                        color: "1976d2"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            })
        );

        // 添加文档信息表格
        children.push(
            new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: "作者", bold: true })]
                                    })
                                ],
                                width: { size: 2000, type: WidthType.DXA }
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [new TextRun({ text: documentData.author })]
                                    })
                                ]
                            })
                        ]
                    }),
                    ...(documentData.includeDate
                        ? [
                              new TableRow({
                                  children: [
                                      new TableCell({
                                          children: [
                                              new Paragraph({
                                                  children: [new TextRun({ text: "创建日期", bold: true })]
                                              })
                                          ]
                                      }),
                                      new TableCell({
                                          children: [
                                              new Paragraph({
                                                  children: [
                                                      new TextRun({
                                                          text: documentData.includeDate
                                                      })
                                                  ]
                                              })
                                          ]
                                      })
                                  ]
                              })
                          ]
                        : [])
                ],
                width: { size: 100, type: WidthType.PERCENTAGE }
            })
        );

        // 添加分页符
        children.push(
            new Paragraph({
                children: [new PageBreak()]
            })
        );

        // 添加目录（如果启用）
        if (documentData.includeToc) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "目录",
                            bold: true,
                            size: 32
                        })
                    ],
                    heading: HeadingLevel.HEADING_1,
                    spacing: { after: 400 }
                })
            );

            children.push(
                new TableOfContents("目录", {
                    hyperlink: true,
                    headingStyleRange: "1-3"
                })
            );

            children.push(
                new Paragraph({
                    children: [new PageBreak()]
                })
            );
        }

        // 添加内容标题
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "正文内容",
                        bold: true,
                        size: 28
                    })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 400 }
            })
        );

        // 处理内容
        const isMarkdown = MarkdownParser.isMarkdown(documentData.content);

        if (isMarkdown) {
            this.convertMarkdownToWordContent(documentData.content, children);
        } else {
            this.addAdvancedPlainTextToWordChildren(children, documentData.content);
        }

        // 创建高级文档
        const doc = new Document({
            creator: documentData.author,
            title: documentData.title,
            description: "使用React导出工具生成的高级文档",
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 1440,
                                right: 1440,
                                bottom: 1440,
                                left: 1440
                            }
                        }
                    },
                    headers: {
                        default: new Header({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: documentData.title,
                                            size: 20
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                })
                            ]
                        })
                    },
                    footers: {
                        default: new Footer({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "第 ",
                                            size: 20
                                        }),
                                        new TextRun({
                                            children: [PageNumber.CURRENT],
                                            size: 20
                                        }),
                                        new TextRun({
                                            text: " 页，共 ",
                                            size: 20
                                        }),
                                        new TextRun({
                                            children: [PageNumber.TOTAL_PAGES],
                                            size: 20
                                        }),
                                        new TextRun({
                                            text: " 页",
                                            size: 20
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                })
                            ]
                        })
                    },
                    children: children
                }
            ]
        });

        // 保存文档
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${documentData.fileName}_高级版.docx`);
    }

    /**
     * 将纯文本添加到高级Word文档
     */
    static addAdvancedPlainTextToWordChildren(children, content) {
        const paragraphs = content.split("\n");
        let listItems = [];

        paragraphs.forEach((paragraph) => {
            const trimmedParagraph = paragraph.trim();

            if (!trimmedParagraph) {
                if (listItems.length > 0) {
                    this.addListToChildren(children, listItems);
                    listItems = [];
                }
                children.push(new Paragraph({}));
                return;
            }

            // 检查是否是列表项
            if (
                trimmedParagraph.startsWith("• ") ||
                trimmedParagraph.startsWith("- ") ||
                trimmedParagraph.startsWith("* ")
            ) {
                listItems.push(trimmedParagraph.substring(2).trim());
                return;
            }

            if (listItems.length > 0) {
                this.addListToChildren(children, listItems);
                listItems = [];
            }

            // 检查是否是标题
            if (trimmedParagraph.startsWith("# ")) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: trimmedParagraph.substring(2),
                                bold: true,
                                size: 28
                            })
                        ],
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 }
                    })
                );
            } else {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: trimmedParagraph,
                                size: 24
                            })
                        ],
                        spacing: { after: 200 },
                        indent: { firstLine: 420 }
                    })
                );
            }
        });

        if (listItems.length > 0) {
            this.addListToChildren(children, listItems);
        }
    }

    /**
     * 添加列表到文档
     */
    static addListToChildren(children, listItems) {
        listItems.forEach((item) => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: item,
                            size: 24
                        })
                    ],
                    bullet: { level: 0 },
                    spacing: { after: 100 }
                })
            );
        });
    }

    /**
     * 创建Word表格
     */
    static createWordTable(children, headers, rows, hasHeader) {
        const tableRows = [];

        // 添加表头行
        if (hasHeader && headers.length > 0) {
            tableRows.push(
                new TableRow({
                    children: headers.map(
                        (header) =>
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: header,
                                                bold: true,
                                                size: 24
                                            })
                                        ]
                                    })
                                ],
                                shading: {
                                    fill: "F2F2F2"
                                }
                            })
                    )
                })
            );
        }

        // 添加数据行
        rows.forEach((row) => {
            tableRows.push(
                new TableRow({
                    children: row.map(
                        (cell) =>
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: cell,
                                                size: 24
                                            })
                                        ]
                                    })
                                ]
                            })
                    )
                })
            );
        });

        // 创建表格
        if (tableRows.length > 0) {
            children.push(
                new Table({
                    rows: tableRows,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    margins: {
                        top: 200,
                        bottom: 200,
                        left: 200,
                        right: 200
                    }
                })
            );

            // 添加表格后的空行
            children.push(new Paragraph({}));
        }
    }

    /**
     * 检测文本是否包含中文字符
     */
    static containsChinese(text) {
        if (!text) return false;
        return /[\u4e00-\u9fff]/.test(text);
    }

    /**
     * 替换不支持的字符（主要是中文）为英文或符号
     * 这是基础模式的临时解决方案，建议使用高级模式处理中文
     */
    static replaceUnsupportedChars(text) {
        if (!text) return "";

        // 如果包含中文，添加提示信息
        if (this.containsChinese(text)) {
            return "[Chinese text - Please use Advanced Mode for proper display]";
        }

        // 替换一些特殊符号
        return text
            .replace(/'/g, "'")
            .replace(/'/g, "'")
            .replace(/"/g, '"')
            .replace(/"/g, '"')
            .replace(/—/g, "-")
            .replace(/–/g, "-")
            .replace(/…/g, "...")
            .replace(/•/g, "*");
    }
}

export default DocumentExporter;
