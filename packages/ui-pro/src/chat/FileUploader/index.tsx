import { Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import React, { CSSProperties, type ReactNode } from "react";

// import {fileToBase64} from "~app/utils/file";
// import {mapFileCategory} from "~constants";
// import uploadBg_img from 'data-base64:~assets/imgs/uploadBg.png';
// import UploadfSvg from 'react:~assets/svg/upload.svg';
// import UploadPdfSvg from 'react:~assets/svg/uploadPdf.svg';
// import DocIconSvg from 'react:~assets/svg/docIcon.svg';
// import CloseSvg from 'react:~assets/svg/close_new.svg';
// import ReloadSvg from 'react:~assets/svg/reload.svg';
// import UploadFailedSvg from 'react:~assets/svg/uploadFailed.svg';
import { Attachment, AttachmentCategory } from "../../types";

// todo 删掉
export const getDocumentType = (file: any) => {
    if (file.type === "application/pdf") {
        return "pdf";
    } else if (
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return "doc";
    } else {
        return "unknown";
    }
};

// todo 删掉
const mapFileCategory = (name: string): string => {
    if (!name) return "";

    const parts = name.split(".");

    if (parts.length < 2) {
        return "";
    }

    const suffix = parts[parts.length - 1];

    return (
        {
            pdf: "pdf",
            doc: "doc",
            docx: "doc"
        }[suffix!] || "txt"
    );
};

// const onUpload = async ({file, onSuccess, onError, onProgress}) => {
//     onProgress(20)
//     // setUploadProgress(20)
//     const formData = new FormData();
//     formData.append("files", file);
//     upload(formData).then(result => {
//         if (result.data?.files?.length > 0) {
//             onSuccess(result, result.data?.files?.[0])
//             // onUploaded?.(newFile)
//             // setUploadProgress(100)
//         } else {
//             onError(result.message, file)
//         }
//     })
//         .catch(e => {
//             onError(e, file)
//         })
// }
//

const FileUploader = ({
    onUploadedFileChange,
    onbeforeUpload,
    onFileChange,
    onUpload,
    accept = "file",
    drag,
    children,
    style
}: {
    onFileChange?: (fileList: Attachment[]) => void;
    onUploadedFileChange?: (fileList: Attachment[]) => boolean;
    onUpload: (file: File) => Promise<any>;
    onbeforeUpload?: (file: File) => any;
    accept?: "image" | "file" | string;
    drag?: boolean;
    style?: CSSProperties;
    children: ReactNode;
}) => {
    const parseAccept = (accept: string) => {
        if (accept === "image") {
            return ".png,.jpg,.jpeg,.gif";
        }
        if (accept === "docx") {
            return ".pdf,.docx,.doc";
        }
        return accept;
    };

    const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
        if (onbeforeUpload) onbeforeUpload(file);
        if (file?.size > maxFileSize * 1024 * 1024) {
            return Upload.LIST_IGNORE;
        }

        return true;
    };
    const upload = async (options: any) => {
        const { file, onSuccess, onError, onProgress } = options;

        onProgress(20);

        onUpload(file)
            .then((result) => {
                if (result.data?.files?.length > 0) {
                    onSuccess(result, result.data?.files?.[0]);
                } else {
                    onError(result.message, file);
                }
            })
            .catch((e) => {
                onError(e, file);
            });
    };

    const change = (info: any) => {
        const mapToAttachmentCategory = (file: any): AttachmentCategory => {
            if (file.type?.startsWith("image")) {
                return "image";
            }
            return "text";
        };

        const files =
            info.fileList?.map((x: any) => ({
                category: mapToAttachmentCategory(x),
                content: x.xhr?.content,
                url: x.xhr?.url,
                name: x.xhr?.name,
                size: x.size,
                status: x.status,
                file: x.file
            })) || [];

        const uploadedFiles = files.filter((x: any) => x.status === "done");
        if (uploadedFiles?.length > 0) {
            if (onUploadedFileChange?.(uploadedFiles)) {
            }
        }

        onFileChange?.(files);
    };

    const maxFileSize = 10;

    return drag ? (
        <Upload.Dragger
            accept={parseAccept(accept)}
            customRequest={upload}
            beforeUpload={beforeUpload}
            showUploadList={false}
            onChange={change}
            style={style}
        >
            {children}
        </Upload.Dragger>
    ) : (
        <Upload
            accept={parseAccept(accept)}
            // @ts-ignore
            customRequest={onUpload}
            beforeUpload={beforeUpload}
            showUploadList={false}
            onChange={change}
        >
            {children}
        </Upload>
    );
};

export default FileUploader;
