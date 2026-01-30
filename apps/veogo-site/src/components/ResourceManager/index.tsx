import {cloneElement, ReactElement, useState} from "react";
import {Button, Card, Checkbox, Col, Empty, Modal, Row, Skeleton} from "antd";
import {useXTheme, XFlex, XList, XText} from "@pro/ui";
import {useFetchResources} from "@/api/api";
import VideoUploader from "@/components/VideoUploader";
import XhsProfile from "@/components/XhsProfile";

const ResourceManager = ({category, onConfirmed, children}: {
    category: string
    onConfirmed?: (category: string, data: any) => void,
    children: ReactElement
}) => {


    const {themeVars} = useXTheme()

    const [data, {loading, mutate}] = useFetchResources()
    const [open, setOpen] = useState(false);

    // const [category, setCategory] = useState(defaultCategory);

    const [selected, setSelected] = useState<any>()
    const [profileAdded, setProfileAdded] = useState(false)

    const onUploadedSuccess = (data: any) => {

        console.log("data", data, data?.list?.filter((x: any) => x.id === data.id))
        mutate()
        setSelected(data)
        // onConfirmed?.(data)
    }

    return <>
        {cloneElement(children, {
            // @ts-ignore
            ...children.props,
            onClick: () => {
                setOpen(true);
                // child.props.onClick?.()
            },
        })}
        <Modal
            width={1000}
            maskClosable={true}
            closable={false}
            destroyOnHidden={true}
            centered
            footer={null}
            styles={{}}
            open={open}
            onCancel={() => setOpen(false)}
            >
            {/*<VideoSelectionPage />*/}
            <XFlex vertical gap={20}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>

                        <XFlex vertical gap={20}>
                            <XText size={20}>选择视频</XText>
                            <XFlex vertical gap={10} style={{width: '100%'}}>
                                {/*<Button size={'large'} type={'dashed'} icon={<UploadOutlined/>}>上传</Button>*/}
                                {/*<VideoUploader onUploaded={onUploadedSuccess}/>*/}
                                <XList
                                    style={{width: '100%', height: 500, overflowY: 'scroll'}}
                                    dataSource={data?.list || []}
                                    loading={loading}
                                    empty={<Empty/>}
                                    skeleton={{count: 4, view: <Skeleton.Button style={{height: 60}} block/>}}
                                    renderItem={(val, index) => {
                                        return <Card
                                            style={{
                                                border: selected?.id === val.id ? '1px solid ' + themeVars.colorPrimary : ''
                                            }}
                                            key={index} onClick={() => {
                                            setSelected(val)
                                        }}>
                                            <XFlex align={'center'} gap={10}>
                                                <Checkbox checked={selected?.id === val.id}/>
                                                {val.name}
                                            </XFlex>

                                        </Card>
                                    }}
                                    gap={10}>
                                </XList>
                            </XFlex>
                        </XFlex>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <XFlex vertical gap={20}>
                            <XText size={20}>账户信息</XText>
                            {/*<Card>*/}
                            <XhsProfile onConfirmed={() => setProfileAdded(true)}/>
                            {/*</Card>*/}
                        </XFlex>
                    </Col>
                </Row>

                <Button
                    onClick={() => {
                        onConfirmed?.(category, selected)
                    }}
                    disabled={!(selected )}
                    size={'large'}
                    block type={'primary'}>
                    确认选择
                </Button>
            </XFlex>
        </Modal>
    </>
}

export default ResourceManager;
