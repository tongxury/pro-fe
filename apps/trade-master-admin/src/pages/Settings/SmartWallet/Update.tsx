import {Button, Form, Input, message, Modal, notification} from "antd";
import {useState} from "react";
import {approveWithdrawal, updateHotTokens} from "@/services";


function UpdateHotTokens({onComplete}: {onComplete: () => void}) {

    const [open, setOpen] = useState(false);

    const onFinish = ({tokenIds}: {tokenIds: string}) => {
        updateHotTokens({tokenIds: tokenIds.split('\n').filter(x => x)}).then((res) => {
            if (res.code) {
                notification.error({
                    message: res.msg,
                });
            } else {
                notification.success({
                    message: "修改成功",
                });

                setOpen(false);
                onComplete()
                // action?.reload();
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <Modal
            title="修改热门币种"
            open={open}
            destroyOnClose
            onClose={() =>
                setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            centered>

            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="币种地址"
                    name="tokenIds"
                    rules={[{required: true, message: '请输入币种地址'}]}
                >
                    <Input.TextArea  rows={10} placeholder="请输入币种地址, 每行输入1个"/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
        <Button block  onClick={() => setOpen(true)} type="primary">更新</Button>
    </>
}

export default UpdateHotTokens;
