import { Upload, UploadFile } from "antd";
import { UploadChangeParam, UploadProps } from "antd/es/upload/interface";

interface UploaderProps extends UploadProps {
    onFileChange?: (files: UploadFile[]) => void;
    onUploadedFileChange?: (files: UploadFile[]) => void;
}

export const Uploader = ({ fileList, onUploadedFileChange, onFileChange, ...rest }: UploaderProps) => {
    const onChange = (info: UploadChangeParam) => {
        onUploadedFileChange?.(info.fileList.filter((x) => x.status === "done"));
        onFileChange?.(info.fileList);
    };

    return <Upload.Dragger fileList={fileList} onChange={onChange} {...rest} />;
};
