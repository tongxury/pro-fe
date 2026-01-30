import { InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { GiftOutlined } from '@ant-design/icons';

export default ({ onSubmit }: { onSubmit: (amount: number) => void }) => {

  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState(30);

  return <>
    <a onClick={() => setOpen(true)}>
      <GiftOutlined />
    </a>
    <Modal
      title="Add Bonus"
      open={open}
      onOk={() => {
        setOpen(false);
        onSubmit(amount);
      }}
      onCancel={() => setOpen(false)}
      okText="Ok"
      cancelText="Cancel"
    >
      {/* @ts-ignore*/}
      <InputNumber value={amount} onChange={value => setAmount(value)} />
    </Modal>
  </>;

}