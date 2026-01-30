import {Button, Form, FormProps, Input, message, Modal} from "antd";
import {useTranslation} from "react-i18next";
import {cloneElement, ReactElement, ReactNode, useState} from "react";
import {XFlex} from "@pro/ui";
import {addFollowingWallet} from "@/api/api.ts";


function Create({onCreated, children}: {
    onCreated?: () => void,
    children: ReactElement
}) {

    const {t} = useTranslation()

    const [open, setOpen] = useState(false)

    const onFinish = (values: any) => {
        addFollowingWallet(values).then(result => {
            if (result.code) {
                message.error({
                    content: t(result.message),
                })
            } else {
                onCreated?.()
                setOpen(false)
            }
        })
    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return <>
        <Modal
            footer={null}
            closable={false}
            maskClosable={true}
            styles={{
                content: {padding: 10}
            }}
            open={open}
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label={t('address')}
                    name="wallet"
                    rules={[{required: true, message: t('addressIsRequired')}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('remark')}
                    name="remark"
                    rules={[{required: false}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item label={null}>

                    <XFlex align={'center'} gap={10}>
                        <Button block onClick={() => setOpen(false)}>{t('cancel')}</Button>
                        <Button block type="primary" htmlType="submit">
                            {t('ok')}
                        </Button>
                    </XFlex>

                </Form.Item>
            </Form>
        </Modal>
        {cloneElement(children, {
            ...children.props,
            onClick: () => setOpen(true),
        })}
    </>
}

export default Create;
