import { useXTheme, XFlex, XText } from "@pro/ui";
import { formatTime } from "@pro/hooks";
import AnswerView from "@/components/Question/V2/AnswerView";
import React, { CSSProperties } from "react";
import DocumentExporter from "@/utils/DocumentExporter";
import { Button } from "antd";
import { FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";

const QuestionView = ({ data }: { data: any }) => {
    const { themeVars } = useXTheme();

    const styles = {
        container: {
            padding: 5,
            backgroundColor: themeVars.colorBgL2,
            borderRadius: "8px",
            marginBottom: "24px",
            border: `1px solid ${themeVars.colorBorder}`,
            display: "flex",
            flexDirection: "column"
        } as CSSProperties,
        questionHeader: {
            marginBottom: "16px"
        } as CSSProperties,
        questionId: {
            fontSize: "16px",
            color: themeVars.colorTextPrimary,
            marginBottom: "8px"
        } as CSSProperties,
        questionTitle: {
            color: themeVars.colorTextPrimary,
            fontSize: "18px",
            fontWeight: 600
        } as CSSProperties,
        questionText: {
            color: themeVars.colorTextL1,
            marginTop: "8px"
        } as CSSProperties
    };

    let title = data?.session?.resources[0].title;
    if (!title) {
        title = (data?.session?.resources ?? []).find((e) => e.category === "title")?.content;
    }

    const documentData = {
        author: "Veogo AI",
        content: data?.answer?.text,
        fileName: title,
        fontFamily: "SimSun",
        // fontSize: 14,
        includeToc: false,
        title: title,
        includeDate: formatTime(data?.createdAt)
    };
    return (
        <XFlex vertical style={styles.container}>
            <XFlex align={"center"} justify={"space-between"} style={{ padding: 10 }}>
                {/* <XText size={20} color={themeVars.colorPrimary}> */}
                {/* {data?.prompt?.id ? getPrompt(data?.prompt?.id)?.text : data?.prompt?.content} */}
                {/* </XText> */}

                <XText style={styles.questionId}>{formatTime(data?.createdAt)}</XText>
                <XFlex gap={10}>
                    <Button
                        type={"primary"}
                        iconPosition={"end"}
                        icon={<FilePdfOutlined />}
                        onClick={async () => {
                            await DocumentExporter.exportToPDF(documentData);
                        }}
                    >
                        导出PDF
                    </Button>
                    <Button
                        type={"primary"}
                        iconPosition={"end"}
                        icon={<FileWordOutlined />}
                        onClick={async () => {
                            await DocumentExporter.exportToWord(documentData);
                        }}
                    >
                        导出Word
                    </Button>
                </XFlex>
            </XFlex>

            <AnswerView data={data?.answer} />
            {/*<XFlex style={{padding: 10}}>*/}
            {/*    <PdfExporter*/}
            {/*        markdown={data?.answer?.text}*/}
            {/*        // fileName="example.docx"*/}
            {/*    />*/}
            {/*</XFlex>*/}
        </XFlex>
    );
};

export default QuestionView;
