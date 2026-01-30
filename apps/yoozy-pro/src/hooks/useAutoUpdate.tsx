import { useEffect } from 'react';
import { Modal } from 'antd';

export const useAutoUpdate = () => {
    // Current build version
    const localVersion = import.meta.env.PACKAGE_VERSION;

    useEffect(() => {
        if (import.meta.env.MODE === 'development') return;

        const checkVer = async () => {
            try {
                const res = await fetch(`/package.json?t=${Date.now()}`);
                const { version: serverVersion } = await res.json();

                if (localVersion && serverVersion && localVersion !== serverVersion) {
                    // Modal.info({
                    //     title: '系统更新',
                    //     content: `新版本 ${serverVersion} 已发版，请刷新页面。`,
                    //     okText: '刷新',
                    //     onOk: () => window.location.reload(),
                    // });
                    window.location.reload()
                }
            } catch (e) {
                // Ignore errors
            }
        };

        // Check every 30s
        const timer = setInterval(checkVer, 30000);
        return () => clearInterval(timer);
    }, [localVersion]);
};
