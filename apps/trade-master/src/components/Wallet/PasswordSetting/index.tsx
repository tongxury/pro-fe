import {XFlex} from "@pro/ui";
import {Button, Form, Input, message, Space} from "antd";
import {useTranslation} from "react-i18next";
import {resetPassword} from "@/api/user.ts";
import useAppRouter from "@/hooks/useAppRouter.ts";

function PasswordSetting() {
    const [form] = Form.useForm();

    const {goBack} = useAppRouter()

    const {t} = useTranslation()
    const onSubmit = () => {
        form.validateFields({})
            .then((values) => {
                if (values.newPassword != values.confirmNewPassword) {
                    message.error(t('The passwords you entered do not match')).then()
                } else {
                    resetPassword({...values}).then(result => {
                        if (result.code) {
                            message.error({
                                content: t(result.code),
                            }).then()
                        } else {
                            message.success({
                                content: t('resetPasswordSuccess')
                            }).then()

                            goBack()
                        }
                    })

                }

            })
            .catch(err => {
                message.error(t('pleaseCheckYourInput')).then()
            });
    }


    return <XFlex vertical padding={15} style={{height: '100vh'}}>
        <Form form={form} name={t('oldPassword')} layout="vertical">
            <Form.Item name="oldPassword" label={`${t('oldPassword')} (${t('noOldPassword')})`}
                       rules={[{required: false, len: 6}]}>
                <Input.OTP mask="*" style={{width: 200, marginInline: 'auto'}}/>
            </Form.Item>
            <Form.Item name="newPassword" label={t('newPassword')} rules={[{required: true, len: 6}]}>
                <Input.OTP mask="*" style={{width: 200, marginInline: 'auto'}}/>
            </Form.Item>
            <Form.Item name="confirmNewPassword" label={t('confirmNewPassword')} rules={[{required: true, len: 6}]}>
                <Input.OTP mask="*" style={{width: 200, marginInline: 'auto'}}/>
            </Form.Item>
            <Form.Item>
                {/*<SubmitButton form={form}>{t('confirm')}</SubmitButton>*/}

                <Button onClick={onSubmit} block type={'primary'} size={'large'}
                        htmlType="reset">{t('confirm')}</Button>
            </Form.Item>
        </Form>

    </XFlex>
}

export default PasswordSetting;
