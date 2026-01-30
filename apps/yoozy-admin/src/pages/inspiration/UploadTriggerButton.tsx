import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BatchUploadModal from './BatchUploadModal';
import UploadModal from "./UploadModal.tsx";

interface UploadResult {
    videoUrl: string;
    coverUrl: string;
    fileName: string;
}

const UploadTriggerButton = ({ onUploaded }: { onUploaded: (results: UploadResult[]) => void }) => {


    const [method, setMethod] = useState<number>();

    const handleUploaded = (results: UploadResult[]) => {
        onUploaded(results);
        setMethod(undefined);
    };

    return (
        <>
            <Dropdown menu={{
                items: [
                    {
                        key: '1',
                        label: <div>直接上传视频</div>,
                        onClick: () => {
                            setMethod(1)
                        }
                    },
                    {
                        key: '2',
                        label: <div>通过抖音分享链接</div>,
                        onClick: () => {
                            setMethod(2)
                        }
                    },
                ]
            }} placement="bottom">
                <Button icon={<UploadOutlined />} type={'dashed'}>上传视频</Button>
            </Dropdown>

            <BatchUploadModal
                visible={method === 1}
                onCancel={() => setMethod(undefined)}
                onUploaded={handleUploaded} />

            <UploadModal
                visible={method === 2}
                onCancel={() => setMethod(undefined)}
                onUploaded={handleUploaded}
            />


        </>
    );
};

export default UploadTriggerButton;
