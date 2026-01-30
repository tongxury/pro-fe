import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Slider,
  Upload,
} from 'antd';
interface Option {
  value: string;
  label: string;
}

interface Field {
  type:
    | 'input'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'datePicker'
    | 'upload'
    | 'slider';
  name: string;
  label: string;
  options?: Option[];
  rules?: any[];
  onChange?: (val: any) => void;
}

interface DynamicFormProps {
  fields: Field[];
  onFinish: (val: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onFinish }) => {
  const [form] = Form.useForm();
  // 定义每个表单项应该占据的栅格数，24栅格系统中每个表单项占8（24 / 3 = 8）
  const formItemLayout = {
    xs: { span: 24 }, // 小屏幕占满一行
    sm: { span: 12 }, // 中等屏幕占半行
    lg: { span: 8 }, // 大屏幕每行三个
  };
  // 添加重置表单的函数
  const handleReset = () => {
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        {' '}
        {/* gutter 属性可以添加列间距 */}
        {fields.map((field) => {
          const { type, name, label, options, rules, onChange } = field;

          let fieldComponent: React.ReactNode = null;

          switch (type) {
            case 'input':
              fieldComponent = <Input />;
              break;
            case 'select':
              fieldComponent = (
                <Select onChange={onChange}>
                  {options?.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              );
              break;
            case 'checkbox':
              fieldComponent = <Checkbox.Group options={options} />;
              break;
            case 'radio':
              fieldComponent = (
                <Radio.Group>
                  {options?.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              );
              break;
            case 'datePicker':
              fieldComponent = <DatePicker />;
              break;
            case 'upload':
              fieldComponent = <Upload />;
              break;
            case 'slider':
              fieldComponent = <Slider />;
              break;
            default:
              break;
          }

          return (
            <Col {...formItemLayout} key={name}>
              <Form.Item key={name} name={name} label={label} rules={rules}>
                {fieldComponent}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button style={{ margin: '0 8px' }} onClick={handleReset}>
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DynamicForm;
