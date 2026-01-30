import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {Flex, theme} from 'antd';
import {getAuthToken} from '@/services';
import {history} from 'umi';
import {APP_NAME} from "@/constants";

export default () => {
    const {token} = theme.useToken();

    const submit = async (formData: any): Promise<boolean | void> => {
        const result = await getAuthToken({...formData});

        if (!(result?.code > 0)) {
            localStorage.setItem("_mgmt_auth_token", result?.data?.token)
            history.push('/');
        }
        return true;
    };

    return (
        <Flex style={{paddingTop: 50}}>
            <LoginForm
                onFinish={submit}
                // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title={APP_NAME}
                subTitle=" "
            >
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'}/>,
                    }}
                    placeholder={'username'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'}/>,
                        strengthText:
                            'Password should contain numbers, letters and special characters, at least 8 characters long.',
                        statusRender: (value) => {
                            const getStatus = () => {
                                if (value && value.length > 12) {
                                    return 'ok';
                                }
                                if (value && value.length > 6) {
                                    return 'pass';
                                }
                                return 'poor';
                            };
                            const status = getStatus();
                            if (status === 'pass') {
                                return (
                                    <div style={{color: token.colorWarning}}>
                                        强度：中
                                    </div>
                                );
                            }
                            if (status === 'ok') {
                                return (
                                    <div style={{color: token.colorSuccess}}>
                                        强度：强
                                    </div>
                                );
                            }
                            return (
                                <div style={{color: token.colorError}}>强度：弱</div>
                            );
                        },
                    }}
                    placeholder={'password'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
            </LoginForm>
        </Flex>

    );
};
