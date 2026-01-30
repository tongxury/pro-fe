import {Button, Form, Input, message, Modal, notification} from "antd";
import {useState} from "react";
import {approveWithdrawal} from "@/services";


function Approve({userId, token, action}: {userId: string, token: string, action?: any}) {

    const [open, setOpen] = useState(false);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        approveWithdrawal({userId, token,...values}).then((res) => {
            if (res.code) {
                notification.error({
                    message: res.msg,
                });
            } else {
                notification.success({
                    message: "审核成功",
                });

                setOpen(false);
                action?.reload();
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <Modal
            title="审核通过"
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
                    label="交易Hash"
                    name="txHash"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input.TextArea placeholder="输入提现转账成功的Hash"/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
        <Button onClick={() => setOpen(true)} type="primary">审核通过</Button>
    </>
}

export default Approve;
