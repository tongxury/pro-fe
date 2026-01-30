import { CheckCard, PageContainer } from '@ant-design/pro-components';
import { Button, Card, Flex, Image, Input, message } from 'antd';
import { useState } from 'react';
import { sendEmail } from '@/services';
import { val } from '@umijs/utils/compiled/cheerio/lib/api/attributes';

const EmailSender = () => {
  const [values, setValues] = useState<{ [key: string]: string }>(
    { templateId: '1' },
  );

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    setSubmitting(true);


    sendEmail({
      recipients: values?.recipients?.split('\n')
        .filter(x => x.trim())
        .map(x => ({
          email: x,
          templateId: values.templateId,
          subject: values.subject,
          args: {
            content: values.content,
          },
        })),
    }).then(result => {
      if (result?.code && result.code > 0) {
        message.error('发送失败');
      } else {
        message.success('发送成功');
      }
      setSubmitting(false);
    });
  };

  return <PageContainer ghost>
    <Card>
      <Flex vertical gap={20}>
        <CheckCard.Group
          onChange={(value) => {
            console.log('value', value);
          }}
          value={'1'}
        >
          <CheckCard
            title="模板 1"
            bodyStyle={{ paddingBlock: 10 }}
            // description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
            // cover={<Image style={{width: 100, height: 200, objectFit: 'scale-down'}} src={"https://studygpt-pub.s3.amazonaws.com/email_template_1.png"}/>}
            value="1"
          >
            <Flex justify={'center'}>
              <Image style={{ width: 150, height: 300, objectFit: 'contain' }}
                     src={'https://studygpt-pub.s3.amazonaws.com/email_template_1.png'} />
            </Flex>
          </CheckCard>
        </CheckCard.Group>
        <Input.TextArea placeholder={'subject'} value={values?.subject}
                        onChange={e => setValues({ ...values, subject: e.target.value })} />
        <Input.TextArea placeholder={'content'} value={values?.content}
                        onChange={e => setValues({ ...values, content: e.target.value })} />
        <Input.TextArea placeholder={'recipients, 每行一个邮箱'} value={values?.recipients}
                        onChange={e => setValues({ ...values, recipients: e.target.value })} />

        <Button loading={submitting} type={'primary'} onClick={onSubmit}
                disabled={!values?.recipients}>Send</Button>
      </Flex>
    </Card>
  </PageContainer>;
};

export default EmailSender;
