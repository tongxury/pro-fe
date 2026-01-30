import { useState } from 'react';
import { Button, Drawer, Flex, message, Modal } from 'antd';
import { addUserMemberSubscribe, updateUser } from '@/services';
import { UnorderedListOutlined } from '@ant-design/icons';
import MemberSubscribe from './MemberSubscribe';


const UserProfile = ({ id, action }: { id: string, action: any }) => {
  const [modal, contextHolder] = Modal.useModal();

  const [open, setOpen] = useState(false);

  // const { data: user, loading, run: fetchUser } = useRequest(queryUser, {
  //   formatResult: d => d.data, manual: true,
  // });

  const onOpen = () => {
    setOpen(true);
    // fetchUser({ userID: id });
  };

  const onSubscribe = (level: string, cycle: string) => {
    addUserMemberSubscribe({
      userId: id,
      level, cycle,
    }).then(rsp => {
      if (!(rsp.code > 0)) {
        message.success('success');
        setOpen(false)
      }
      action?.reload();
    });
  };

  const onDelete = () => {


    modal.confirm({
      title: '删除用户',
      onOk: () => {
        updateUser({ id, action: 2 }).then(rsp => {
          if (!(rsp.code > 0)) {
            message.success('success');
            setOpen(false);
          }
          action?.reload();
        });
      }
    })
  };

  const onReset = () => {
    modal.confirm({
      title: '重置会员',
      onOk: () => {
        updateUser({ id, action: 0 }).then(rsp => {
          if (!(rsp.code > 0)) {
            message.success('success');
            setOpen(false);
          }
          action?.reload();
        });
      }
    })
  };

  return <>
    <a onClick={onOpen}>
      <UnorderedListOutlined />
    </a>
    {contextHolder}
    <Drawer
      destroyOnClose
      title={<Flex align={'center'} justify={'space-between'}>
        <div>详情</div>
        <Flex align={'center'} gap={10}>
          <MemberSubscribe onSubmit={onSubscribe} />
          <Button danger type={'primary'} onClick={onReset}>重置会员</Button>
          <Button danger type={'primary'} onClick={onDelete}>删除用户</Button>
        </Flex>
      </Flex>}
      width={'50%'}
      closable={false}
      open={open} onClose={() => setOpen(false)}>

    </Drawer>
  </>;
};

export default UserProfile;