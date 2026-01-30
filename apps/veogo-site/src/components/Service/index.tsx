import {Dropdown, FloatButton, Button, message, Card, Typography, Divider} from "antd";
import {useXTheme, XFlex, XImage, XText} from "@pro/ui";
import serviceImage from "@/assets/service.png";
import {CustomerServiceOutlined, CopyOutlined, InfoCircleOutlined} from "@ant-design/icons";
import React, {useState, useEffect, useRef} from "react";

const {Paragraph, Title} = Typography;

const Service = () => {
    const {themeVars} = useXTheme();
    const [loading, setLoading] = useState(false);
    const errorLogsRef = useRef<string[]>([]);
    const maxErrorLogs = 50; // 最多保存最近的50条错误记录

    useEffect(() => {
        // 保存原始的console方法
        const originalConsole = {
            error: console.error,
            warn: console.warn,
        };

        // 重写console.error
        console.error = (...args) => {
            const errorMessage = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');

            errorLogsRef.current = [
                `[ERROR] ${new Date().toISOString()} - ${errorMessage}`,
                ...errorLogsRef.current.slice(0, maxErrorLogs - 1)
            ];

            originalConsole.error.apply(console, args);
        };

        // 重写console.warn
        console.warn = (...args) => {
            const warnMessage = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');

            errorLogsRef.current = [
                `[WARN] ${new Date().toISOString()} - ${warnMessage}`,
                ...errorLogsRef.current.slice(0, maxErrorLogs - 1)
            ];

            originalConsole.warn.apply(console, args);
        };

        // 监听全局错误
        const handleError = (event: ErrorEvent) => {
            const errorMessage = `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`;
            errorLogsRef.current = [
                `[GLOBAL ERROR] ${new Date().toISOString()} - ${errorMessage}`,
                ...errorLogsRef.current.slice(0, maxErrorLogs - 1)
            ];
        };

        // 监听未捕获的Promise错误
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const errorMessage = event.reason?.stack || event.reason || 'Unknown Promise Error';
            errorLogsRef.current = [
                `[UNHANDLED PROMISE] ${new Date().toISOString()} - ${errorMessage}`,
                ...errorLogsRef.current.slice(0, maxErrorLogs - 1)
            ];
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            // 清理事件监听和恢复原始console方法
            console.error = originalConsole.error;
            console.warn = originalConsole.warn;
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    const collectSystemInfo = () => {
        // 收集设备信息
        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            colorDepth: window.screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString(),
        };

        // 收集网络信息
        const connection = (navigator as any).connection;
        const networkInfo = connection ? {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData,
        } : {};

        // 收集性能信息
        const performance = window.performance;
        const performanceInfo = performance ? {
            memory: (performance as any).memory ? {
                jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
                totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
                usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            } : 'Not available',
            navigation: performance.getEntriesByType('navigation').length > 0 ?
                performance.getEntriesByType('navigation')[0] : 'Not available',
        } : {};

        // 合并所有信息
        const systemInfo = {
            deviceInfo,
            networkInfo,
            performanceInfo,
            windowSize: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
            },
            // 添加错误日志
            errorLogs: errorLogsRef.current,
            // 添加浏览器特性支持情况
            browserFeatures: {
                localStorage: !!window.localStorage,
                sessionStorage: !!window.sessionStorage,
                webGL: (() => {
                    try {
                        const canvas = document.createElement('canvas');
                        return !!window.WebGLRenderingContext &&
                            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
                    } catch (e) {
                        return false;
                    }
                })(),
                webWorkers: !!window.Worker,
                serviceWorkers: 'serviceWorker' in navigator,
            }
        };

        return JSON.stringify(systemInfo, null, 2);
    };

    const copySystemInfo = async () => {
        setLoading(true);
        try {
            const info = collectSystemInfo();
            await navigator.clipboard.writeText(info);
            message.success({
                content: '系统信息已复制到剪贴板',
                icon: <InfoCircleOutlined style={{color: themeVars.colorPrimary}} />
            });
        } catch (err) {
            message.error('复制失败，请手动复制');
        } finally {
            setLoading(false);
        }
    };

    return <Dropdown
        placement={'topLeft'}
        trigger={['click']}
        popupRender={() => {
            return (
                <Card
                    style={{
                        width: 400,
                        background: themeVars.colorBgLayout,
                        border: `1px solid ${themeVars.colorBorder}`,
                        borderRadius: 12,
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                    }}
                    bodyStyle={{padding: 0}}
                >
                    <XFlex vertical align={'center'}>
                        {/* 顶部图片区域 */}
                        <XFlex
                            style={{
                                width: '100%',
                                background: themeVars.colorBgPrimary,
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                padding: '24px 0'
                            }}
                            justify={'center'}
                        >
                            <XImage
                                src={serviceImage}
                                style={{
                                    width: 180,
                                    height: 180,
                                    objectFit: 'contain'
                                }}
                            />
                        </XFlex>

                        {/* 内容区域 */}
                        <XFlex
                            vertical
                            gap={16}
                            style={{
                                padding: '24px',
                                width: '100%'
                            }}
                        >
                            <Title level={4} style={{margin: 0, textAlign: 'center'}}>
                                客服支持
                            </Title>

                            <Paragraph
                                style={{
                                    color: themeVars.colorTextL2,
                                    textAlign: 'center',
                                    margin: 0
                                }}
                            >
                                需要帮助？请点击下方按钮收集系统信息，以便我们的客服会尽快为您解决问题。
                            </Paragraph>

                            {/* 信息收集按钮 */}
                            <Button
                                type="primary"
                                icon={<CopyOutlined />}
                                onClick={copySystemInfo}
                                loading={loading}
                                style={{
                                    height: 40,
                                    borderRadius: 8,
                                    width: '100%'
                                }}
                            >
                                一键收集系统信息
                            </Button>

                        </XFlex>
                    </XFlex>
                </Card>
            )
        }}
    >
        <FloatButton
            shape="square"
            type="primary"
            style={{
                insetInlineEnd: 24,
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
            }}
            icon={<CustomerServiceOutlined />}
            tooltip="联系客服"
        />
    </Dropdown>
}

export default Service
