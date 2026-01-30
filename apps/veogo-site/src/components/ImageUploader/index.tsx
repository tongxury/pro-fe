import React, {useState} from 'react';
import {Upload, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import type {UploadFile, RcFile} from 'antd/es/upload/interface';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import update from 'immutability-helper';

interface DragableUploadListItemProps {
    originNode: React.ReactElement;
    file: UploadFile;
    fileList: UploadFile[];
    moveFile: (dragIndex: number, hoverIndex: number) => void;
    index: number;
}

// 拖拽项组件
const DragableUploadListItem = ({
                                    originNode,
                                    file,
                                    fileList,
                                    moveFile,
                                    index,
                                }: DragableUploadListItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [{isDragging}, drag] = useDrag({
        type: 'UploadFile',
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'UploadFile',
        hover: (item: { index: number }, monitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            moveFile(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{opacity: isDragging ? 0.3 : 1}}
            className="ant-upload-draggable-list-item"
        >
            {originNode}
        </div>
    );
};

const ImageUpload = ({max, fileList, onFileListChange}: {
    max?: number,
    fileList: UploadFile[],
    onFileListChange: (fileList: UploadFile[]) => void
}) => {
    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange = ({fileList: newFileList}: { fileList: UploadFile[] }) => {
        onFileListChange(newFileList);
    };

    const moveFile = (dragIndex: number, hoverIndex: number) => {
        const newFileList = update(fileList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, fileList[dragIndex]],
            ],
        });
        onFileListChange(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>添加</div>
        </div>
    );

    const upload = async (options: any) => {
        const {file, onSuccess, onError, onProgress} = options;

        // onProgress(20);

        onSuccess(file)


        // onUpload(file)
        //     .then((result) => {
        //         if (result.data?.files?.length > 0) {
        //             onSuccess(result, result.data?.files?.[0]);
        //         } else {
        //             onError(result.message, file);
        //         }
        //     })
        //     .catch((e) => {
        //         onError(e, file);
        //     });
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <Upload
                listType="picture-card"
                fileList={fileList}
                customRequest={upload}
                onPreview={handlePreview}
                accept={'.jpg,.jpeg,.png'}
                multiple
                maxCount={max}
                onChange={handleChange}
                itemRender={(originNode, file, currFileList) => (
                    <DragableUploadListItem
                        originNode={originNode}
                        file={file}
                        fileList={currFileList}
                        moveFile={moveFile}
                        index={currFileList.indexOf(file)}
                    />
                )}
            >
                {(max && fileList.length >= max) ? null : uploadButton}
            </Upload>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="preview" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </DndProvider>
    );
};

// 将文件转换为 base64
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default ImageUpload;
