import React, { useState, useEffect,useRef } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import moment from "moment";
import ComTable from '@/components/ComTable';
import QuillEditor from '../components/Modal'
import { getBlogs, addBlog, deleteBlog } from '@/services/blogs'
import UploadFiles from '@/components/UploadFiles'
import './index.css';
const { TextArea } = Input
const App = () => {

    const columns = [
        { title: '文章标题', dataIndex: 'title', key: 'title' },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
        { title: '文章ID', dataIndex: 'id', key: 'id' },

    ];
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [quill, setQuill] = useState("");
    const [form] = Form.useForm();
    const [images, setImages] = useState<string[]>([])

    const _getBlogs = async ({ page, size }: { page: number, size: number }) => {
        const res = await getBlogs({ page, size })
        const list = (res.data?.list || []).map((item: any) => {
            return {
                ...item,
                createdAt: moment(item.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss')
            }

        })
        setData(list || [])

        setTotal(res.data?.total || 0)
    }
    const handleAdd = () => {
        setModalVisible(true);
    };
    const afterOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            const target = window.localStorage.getItem('restore-blog-info')
            if (target) {
                const targetObj = JSON.parse(target);
                const { title, abstract, html } = targetObj
                form.setFieldValue('title',title)
                form.setFieldValue('abstract', abstract)
                setQuill(html)
                quillRef.current && quillRef.current.setValue(html)
            }
            const fileTarget = uploadFileRef.current.getCache()
            if (fileTarget) {
                const _fileList = JSON.parse(fileTarget)
                if (_fileList && _fileList?.length >= 1) {
                    const imageUrl = _fileList[0]?.response?.data?.files[0]?.url;
                    setImages([imageUrl])
                }
            }
        }
    }
    const currentChange = (params: any) => {
        const { page, size } = params;
        console.log(page, size);
        _getBlogs({ page, size })

    };
    const _changeValue = (value: any) => {
        console.log(value, 'value-888888888888');
        setQuill(value)
        const cacheObj = {
            title: form.getFieldValue('title'),
            abstract: form.getFieldValue('abstract'),
            html:value
        }
        window.localStorage.setItem('restore-blog-info',JSON.stringify(cacheObj))
    }
    const confirmQuill = async () => {

        console.log(quill, 'quill')
        try {
            const row = await form.validateFields();
            console.log(row, 'row', images);
            const _html = `<div>${quill}</div>`
            const res = await addBlog({ body: _html, ...row, images })
            console.log("res--新增的", res)
            setModalVisible(false);
            form.resetFields();
            quillRef.current.resetValue()
            setQuill('')
            message.success('新增blog成功');
            //新增成功之后清除缓存
            window.localStorage.removeItem('restore-blog-info')
            uploadFileRef.current.clearCache()
            setImages([])
            _getBlogs({ page: 1, size: 10 })
        } catch (error) {
            console.log('Validate Failed:', error);
        }


    }
    const onSuccess = (val: any) => {
        const imgs = val.map((item: any) => {
            return item.url
        })
        setImages(imgs)

    }
    const onFileChange = (fileList: any) => {
        if (fileList.length >= 1) {
            const imageUrl = fileList[0]?.response?.data?.files[0]?.url
                setImages([imageUrl])
        } else {
            setImages([])
        }
    }
    const _deleteBlog = async (id: string) => {
        await deleteBlog(id)
        _getBlogs({ page: 1, size: 10 })
    }
    const _deleteItem = (record: any) => {
        _deleteBlog(record.id)

    }
    useEffect(() => {
        _getBlogs({ page: 1, size: 10 })
    }, [])
    const _onCancel = () => {
        setModalVisible(false);
        //form.resetFields();
    }
    const quillRef = useRef<any>()

    const onValuesChange = () => {
        const cacheObj = {
            title: form.getFieldValue('title'),
            abstract: form.getFieldValue('abstract'),
            html:quill
        }
        window.localStorage.setItem('restore-blog-info',JSON.stringify(cacheObj))
    }
    const uploadFileRef = useRef<any>()
    return (
        <div className='blog-box'>
            <div className='search'>
                {/* <PromptInput.Search placeholder="Search" onSearch={onSearch} /> */}
                <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
                    Add Blog
                </Button>
            </div>

            <Modal
                title='Add Blog'
                open={modalVisible}
                width={1000}
                onOk={confirmQuill}
                onCancel={_onCancel}
                afterOpenChange={afterOpenChange}
            >
                <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
                    <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入文章标题' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="abstract" label="摘要" rules={[{ required: false, message: '请输入文章摘要' }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="images" label="封面">
                        <UploadFiles onFileChange={onFileChange} ref={uploadFileRef} uploadSuccess={onSuccess}></UploadFiles>
                    </Form.Item>

                </Form>
                <QuillEditor ref={quillRef} readOnly={false} changeValue={_changeValue}></QuillEditor>
            </Modal>
            <div className="custom-table">
                <ComTable
                    columns={columns}
                    selectable={false}
                    exportable={false}
                    pageSize={10}
                    total={total}
                    bordered
                    pageChange={currentChange}
                    dataSource={data}
                >
                    {(text, record) => (
                        <div className="table-columns">

                            &nbsp; &nbsp;
                            <Button onClick={() => _deleteItem(record)}>
                                删除
                            </Button>
                            &nbsp; &nbsp;
                        </div>
                    )}
                </ComTable>
            </div>

        </div>
    );
};

export default App;
