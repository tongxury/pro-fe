import { Button, Flex, InputNumber, Modal, Radio } from 'antd';
import { useState } from 'react';

export default ({ onSubmit }: { onSubmit: (level: string, cycle: string) => void }) => {

  const [open, setOpen] = useState(false);

  const [level, setLevel] = useState('pro');
  const [cycle, setCycle] = useState('tried3_monthly');

  return <>
    <Button type={'primary'} onClick={() => setOpen(true)}>开通会员</Button>
    <Modal
      title="开通会员"
      open={open}
      onOk={() => {
        setOpen(false);
        onSubmit(level, cycle);
      }}
      onCancel={() => setOpen(false)}
      okText="Ok"
      cancelText="Cancel"
    >

      <Flex vertical gap={5}>
        <>会员等级</>
        <Radio.Group value={level} buttonStyle="solid" onChange={e => setLevel(e.target.value)}>
          <Radio.Button value="starter">Basic</Radio.Button>
          <Radio.Button value="pro">Standard</Radio.Button>
          <Radio.Button value="pro_plus">Premium</Radio.Button>
        </Radio.Group>
        <></>
        <>支付周期</>
        <Radio.Group value={cycle} buttonStyle="solid" onChange={e => setCycle(e.target.value)}>
          <Radio.Button value="tried3_monthly">Trial 3</Radio.Button>
          <Radio.Button value="tried7_monthly">Trial 7</Radio.Button>
          <Radio.Button value="tried14_monthly">Trial 14</Radio.Button>
          <Radio.Button value="annually">Annually</Radio.Button>
          <Radio.Button value="quarterly">Quarterly</Radio.Button>
          <Radio.Button value="monthly">Monthly</Radio.Button>
        </Radio.Group>
      </Flex>


    </Modal>
  </>;

}