import {useXTheme, XFlex, XText} from "@pro/ui";
import {Button, Dropdown, MenuProps, Space, Typography} from "antd";
import IconFont from "@/components/Iconfont";
import {getPrompt} from "@/constants/prompt.tsx";
import {ArrowRightOutlined} from "@ant-design/icons";
import {getCostV2} from "@/constants/quota.ts";

const QuickPrompt = ({prompts, onSubmit, hide}: {
    prompts?: any[],
    onSubmit: (prompt: any) => void,
    hide?: boolean
}) => {


    const {themeVars} = useXTheme()

    const onMenuClick = (item: any) => {
        onSubmit(getPrompt(item.key))
    }

    if (!prompts?.length || hide) {
        return <></>
    }

    return (
        <XFlex style={{}}>
            <Dropdown
                disabled={hide}
                menu={{
                    items: prompts?.map(x => ({
                        key: x.id,
                        label: <Typography.Text>
                            {x.text}
                            <Typography.Text style={{color: themeVars.colorTextL2}}>   {getCostV2(x.id)}积分 </Typography.Text>
                        </Typography.Text>
                    })),
                    onClick: onMenuClick
                }}>
                {/*<Space size={5} style={{border: '1px solid ' + themeVars.colorPrimary, padding: 5, borderRadius: 8}}>*/}
                {/*    <XText>继续追问</XText>*/}
                {/*    <IconFont name={'arrow-up-s-line'} size={18} color={themeVars.colorTextPrimary}/>*/}
                {/*</Space>*/}

                <Button type={'dashed'} iconPosition={'end'} icon={<ArrowRightOutlined/>}>
                    继续追问
                </Button>
            </Dropdown>
        </XFlex>
    )
}

export default QuickPrompt
