import PageContainer from "@/components/PageContainer";
import { MailOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Typography, Collapse, Space } from "antd";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const SupportPage = () => {
    const faqItems = [
        {
            key: '1',
            label: '如何联系支持？',
            children: <p>您可以通过发送邮件至 <a href="mailto:support@yoozyai.com">support@yoozyai.com</a> 联系我们。我们通常会在24小时内回复所有咨询。</p>,
        },
        {
            key: '2',
            label: '如何删除我的账号？',
            children: <p>如果您希望删除您的账号及所有相关数据，请发送主题为“账号删除请求”的邮件至 <a href="mailto:support@yoozyai.com">support@yoozyai.com</a>。请在邮件正文中包含您的注册邮箱地址。</p>,
        },
        {
            key: '3',
            label: '哪里可以查看隐私政策？',
            children: <p>您可以在我们的网站和应用内的设置中查看隐私政策。其中详细说明了我们要如何收集、使用和保护您的数据。</p>,
        },
        {
            key: '4',
            label: '遇到问题或Bug怎么办？',
            children: <p>请详细描述您遇到的问题，包括重现步骤，如果可能，请附上截图并发送到我们的支持邮箱。</p>,
        },
    ];

    return (
        <PageContainer title="应用支持">
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-8">

                    {/* Header Section */}
                    <div className="text-center">
                        <Title level={2}>我们能为您做什么？</Title>
                        <Paragraph className="text-lg text-gray-600">
                            查找常见问题的解答或联系我们的团队。
                        </Paragraph>
                    </div>

                    {/* Contact Card */}
                    <Card className="shadow-sm border-gray-100">
                        <Space direction="vertical" size="middle" className="w-full">
                            <div className="flex items-center space-x-3">
                                <MailOutlined className="text-2xl text-primary" />
                                <Title level={4} style={{ margin: 0 }}>联系我们</Title>
                            </div>
                            <Paragraph>
                                如有任何问题、技术支持或反馈，请通过邮件直接联系我们。
                            </Paragraph>
                            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-center">
                                <Text strong className="text-lg text-blue-600">
                                    support@yoozyai.com
                                </Text>
                            </div>
                        </Space>
                    </Card>

                    {/* FAQ Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <QuestionCircleOutlined className="text-xl" />
                            <Title level={3} style={{ margin: 0 }}>常见问题</Title>
                        </div>
                        <Collapse accordion defaultActiveKey={['1']} items={faqItems} className="bg-white" />
                    </div>

                    {/* Footer Info */}
                    <div className="text-center text-gray-400 mt-12">
                        <p>© {new Date().getFullYear()} Yoozy AI. 保留所有权利。</p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SupportPage;
