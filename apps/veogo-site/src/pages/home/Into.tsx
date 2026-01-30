import {useXTheme, XFlex, XText} from "@pro/ui";
import {Card, Col, Row} from "antd";


const Into = ({title, desc, comment, commentUser}: {
    title: string,
    desc: string,
    comment: string,
    commentUser: string
}) => {

    const {themeVars} = useXTheme()

    return (
        <Row gutter={[16, 16]} style={{width: '100%'}}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <XFlex vertical gap={40}>
                    <XText size={28} weight={500} color={themeVars.colorTextPrimary}>{title}</XText>
                    <XText size={15} style={{lineHeight: 2}} color={themeVars.colorTextL2}>{desc}</XText>
                    <Card>
                        <XFlex vertical gap={20}>
                            <XText size={15} style={{lineHeight: 2}} color={themeVars.colorTextL2}>{comment}</XText>

                            <XFlex justify={'end'}>
                                <XText size={15} color={themeVars.colorTextL2}>-- {commentUser}</XText>
                            </XFlex>
                        </XFlex>
                    </Card>
                </XFlex>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Card>fasdfsd</Card>
            </Col>
        </Row>
    )
}

export default Into;
