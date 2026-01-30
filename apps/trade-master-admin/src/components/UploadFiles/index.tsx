import React, { useEffect, useState,useImperativeHandle,forwardRef } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './index.css'
import { uploadFile } from '@/services/blogs'
const { Dragger } = Upload;
interface Props {
  uploadSuccess: (val: any) => void
  onFileChange?: (val:any) => void;
  accept?: string
}
const FileUploader =forwardRef((props: Props,ref:any) => {
  const { uploadSuccess,accept,onFileChange } = props
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ file, fileList }:{file:any,fileList:any}) => {
    // setFileList([]);
    setFileList(fileList);
    window.localStorage.setItem('restore-file-list',JSON.stringify(fileList))
    onFileChange && onFileChange(fileList)
    // 在这里进行文件上传的逻辑处理
    // 可以使用 fileList 对象来获取上传的文件列表
    // 例如：fileList.map(file => console.log(file));
    // message.success('文件上传成功！');
  };
  useImperativeHandle(ref, () => {
    return {
      clearCache: () => {
        window.localStorage.removeItem('restore-file-list')
      },
      getCache: () => {
        return window.localStorage.getItem('restore-file-list')
      }
    }
  })
  useEffect(() => {
    const target = window.localStorage.getItem('restore-file-list')
    if (target) {
      const _fileList = JSON.parse(target)
      setFileList(_fileList)
    }
  },[])
  function beforeUpload(file: any) {
    const isAllowedSize = file.size / 1024 / 1024 < 10; // 10MB
    if (!isAllowedSize) {
      message.error("File size limit: 10MB / file");
    }

    return isAllowedSize;
  }

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    // 构建自定义的上传请求
    const formData = new FormData();
    formData.append("files", file);
    fetch(`${process.env.API_URL}/api/databank/pub-files`, {
      method: 'POST',
      body:formData
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(res => {
      // 请求成功
      uploadSuccess(res.data.files)
      onSuccess(res, file);
    })
    .catch(error => {
      // 请求失败
      console.error('There was a problem with the fetch operation:', error);
    });
    // 
  }
  return (
    <Dragger
      multiple={false}
      fileList={fileList}
      onChange={handleFileChange}
      customRequest={customRequest}
      beforeUpload={beforeUpload}
      maxCount={1}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      {/* <p className="ant-upload-text supported">Supported files: .doc, .docx, .pdf, .ppt, .xls and many other file types</p> */}
      <p className="limit-size">
        File size limit: 10MB / file
      </p>
    </Dragger>
  );
});

export default FileUploader;
