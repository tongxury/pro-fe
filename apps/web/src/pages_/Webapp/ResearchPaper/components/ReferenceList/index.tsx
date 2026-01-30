import { XFlex, xMargin, XText } from "@pro/ui";
import { Attachment, AttachmentView } from "@pro/ui-pro";
import { Col, Row } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

interface IProps {
    data?: Attachment[];
    style?: CSSProperties;
}

const ReferenceList = (props: IProps) => {
    const { data, style } = props;
    const t = useTranslations();
    return (
        <>
            {!!data?.length && (
                <XFlex vertical style={{ ...style }}>
                    <XText
                        bold
                        size={18}
                        style={{
                            fontFamily: "SFProDisplay-Bold",
                            ...xMargin(30, 0, 14, 0)
                        }}
                    >
                        {t("Reference")}
                    </XText>
                    <Row gutter={[10, 10]}>
                        {data?.map((item, index) => {
                            return (
                                <Col key={index} span={8}>
                                    <AttachmentView data={item}></AttachmentView>
                                </Col>
                            );
                        })}
                    </Row>
                </XFlex>
            )}
        </>
    );
};

export default ReferenceList;
