import React, {ReactElement, useRef, useState} from 'react';
import {message} from 'antd';
import {useXTheme} from "@pro/ui";
import {useTranslation} from "@/i18n/routing";
import {performMultipartUpload, performSingleUpload, UPLOAD_CONFIG, UPLOAD_CONSTANTS} from '@/utils/upload';
import {validateFileType} from "@pro/hooks";
import eventBus, {eventTypes} from "@/utils/eventBus.ts";
import {useGlobalState} from "@/hooks/global.tsx";

export interface VideoUploaderProps {
    onUploaded: ({fileUrl, mimeType, filename}: any) => void;
    renderBody: (progress: number) => ReactElement;
}

export const ACCEPTED_VIDEO_TYPES = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/x-flv',
    'video/x-matroska',
    'video/webm',
    'video/3gpp',
    'video/ogg'
];

function VideoUploader({onUploaded, renderBody}: VideoUploaderProps) {
    const {themeVars} = useXTheme();
    const t = useTranslation();
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorLog, setErrorLog] = useState<string[]>([]);
    const {user} = useGlobalState()

    const logError = (message: string, error?: any) => {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] ${message}`;
        console.error(errorMessage, error);
        setErrorLog(prev => [...prev, errorMessage]);
    };

    const validateFile = (file: File): boolean => {
        if (file.size > UPLOAD_CONSTANTS.MAX_FILE_SIZE) {
            message.error("文件过大，请上传1000M以内的视频");
            return false;
        }

        if (file.size === 0) {
            message.error("无法读取文件，请检查文件是否损坏或有访问权限");
            return false;
        }

        if (!validateFileType(file, ACCEPTED_VIDEO_TYPES)) {
            message.error("请上传视频文件");
            return false;
        }

        return true;
    };

    const uploadFile = async (file: File): Promise<string> => {
        return await performSingleUpload(file, setProgress);
        // if (file.size < UPLOAD_CONFIG.MIN_MULTIPART_SIZE) {
        //     return await performSingleUpload(file, setProgress);
        // } else {
        //     return await performMultipartUpload(file, setProgress);
        // }
    };

    const handleUpload = async (file: File) => {

        if (!user) {
            eventBus.emit(eventTypes.OpenLoginModal)
            return
        }

        try {
            if (!validateFile(file)) return;

            setIsUploading(true);
            setProgress(0);

            const fileUrl = await uploadFile(file);

            onUploaded({fileUrl, mimeType: file.type, filename: file.name});

            message.success('上传成功');
        } catch (e) {
            logError("上传失败", e);
            message.error("上传失败，请重试");
        } finally {
            setIsUploading(false);
        }
    };

    const handleClick = () => {
        if (isUploading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            handleUpload(file);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (e) {
            logError("处理文件选择事件失败", e);
            message.error("处理文件选择失败，请刷新页面重试");
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        try {
            e.preventDefault();
            e.stopPropagation();

            if (isUploading) return;

            const file = e.dataTransfer.files?.[0];
            if (!file) return;

            handleUpload(file);
        } catch (e) {
            logError("处理文件拖放事件失败", e);
            message.error("处理拖放文件失败，请尝试点击上传");
        }
    };

    const handleDragEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            style={{
                width: '100%',
                display: 'block',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                opacity: isUploading ? 0.7 : 1,
                position: 'relative',
            }}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragEvent}
            onDragEnter={handleDragEvent}
            onDragLeave={handleDragEvent}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
                accept={ACCEPTED_VIDEO_TYPES.join(',')}
                disabled={isUploading}
            />

            <div style={{width: '100%', display: 'block'}}>
                {renderBody(progress)}
            </div>

        </div>
    );
}

export default VideoUploader;
