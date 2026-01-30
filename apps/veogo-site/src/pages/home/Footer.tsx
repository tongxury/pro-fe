import React, {CSSProperties} from 'react';
import {useRouter} from "@/i18n/routing";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const router = useRouter()

    // 主容器样式
    const footerContainerStyle = {
        width: '100%',
        backgroundColor: 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(10px)',
        // borderTop: '1px solid rgba(80, 255, 170, 0.1)',
        padding: '40px 0 30px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
    } as CSSProperties;

    // 内容区域样式
    const contentContainerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    } as CSSProperties;

    // 顶部区域样式
    const topSectionStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '40px',
    } as CSSProperties;

    // Logo区域样式
    const logoSectionStyle = {
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    } as CSSProperties;

    // Logo样式
    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: '28px',
        letterSpacing: '-0.5px',
        marginBottom: '5px',
    } as CSSProperties;

    // Logo V部分样式
    const logoVStyle = {
        fontSize: '32px',
        marginRight: '2px',
        background: 'linear-gradient(135deg, #0cebeb, #20e3b2, #29ffc6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
    } as CSSProperties;

    // Logo Go部分样式
    const logoGoStyle = {
        background: 'linear-gradient(135deg, #20e3b2, #29ffc6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
    } as CSSProperties;

    // 公司描述样式
    const companyDescStyle = {
        fontSize: '14px',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.6)',
    } as CSSProperties;

    // 链接区域样式
    const linkSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '160px',
    } as CSSProperties;

    // 链接区域标题样式
    const linkTitleStyle = {
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 600,
        fontSize: '16px',
        marginBottom: '8px',
        position: 'relative',
        paddingBottom: '8px',
    } as CSSProperties;

    // 标题下划线样式
    const titleUnderlineStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '30px',
        height: '2px',
        background: 'linear-gradient(to right, #20e3b2, transparent)',
        borderRadius: '1px',
    } as CSSProperties;

    // 链接列表样式
    const linkListStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    } as CSSProperties;

    // 链接项样式
    const linkItemStyle = {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.6)',
        textDecoration: 'none',
        transition: 'color 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
        display: 'inline-block',
    } as CSSProperties;

    // 联系区域样式
    const contactSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        minWidth: '240px',
    } as CSSProperties;

    // 联系项样式
    const contactItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.6)',
    } as CSSProperties;

    // 图标容器样式
    const iconContainerStyle = {
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties;

    // 社交媒体区域样式
    const socialMediaStyle = {
        display: 'flex',
        gap: '12px',
        marginTop: '5px',
    } as CSSProperties;

    // 社交媒体图标样式
    const socialIconStyle = {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    } as CSSProperties;

    // 底部区域样式
    const bottomSectionStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        flexWrap: 'wrap',
        gap: '10px',
    } as CSSProperties;

    // 版权信息样式
    const copyrightStyle = {
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.5)',
    } as CSSProperties;

    // 政策链接区域样式
    const policyLinksStyle = {
        display: 'flex',
        gap: '20px',
    } as CSSProperties;

    // 政策链接项样式
    const policyLinkStyle = {
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.5)',
        textDecoration: 'none',
        cursor: 'pointer',
    } as CSSProperties;

    // 装饰背景样式
    const decorBgStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: -1,
    } as CSSProperties;

    // 光效装饰
    const glowEffectStyle = {
        position: 'absolute',
        top: '-50%',
        left: '30%',
        width: '40%',
        height: '200%',
        background: 'radial-gradient(ellipse at center, rgba(80, 255, 170, 0.05) 0%, transparent 70%)',
        zIndex: -1,
    } as CSSProperties;

    return (
        <footer style={footerContainerStyle}>
            {/* 装饰背景 */}
            <div style={decorBgStyle}></div>
            <div style={glowEffectStyle}></div>

            <div style={contentContainerStyle}>
                {/* 顶部区域 */}
                <div style={topSectionStyle}>
                    {/* Logo与公司简介 */}
                    <div style={logoSectionStyle}>
                        <div style={logoStyle}>
                            <span style={logoVStyle}>V</span>
                            <span>eo</span>
                            <span style={logoGoStyle}>go</span>
                        </div>
                        <p style={companyDescStyle}>
                            VeoGo AI 是专为短视频创作者打造的智能决策引擎，通过前沿的深度学习算法与多模态AI技术，助您在视频发布前精准预测流量表现，优化内容细节，让每一秒创作都指向“爆款”。
                        </p>
                        {/*<div style={socialMediaStyle}>*/}
                        {/*    <div style={socialIconStyle}*/}
                        {/*         onMouseOver={(e) => e.currentTarget.style.background = 'rgba(80, 255, 170, 0.2)'}*/}
                        {/*         onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>*/}
                        {/*        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                        {/*            <path*/}
                        {/*                d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*    <div style={socialIconStyle}*/}
                        {/*         onMouseOver={(e) => e.currentTarget.style.background = 'rgba(80, 255, 170, 0.2)'}*/}
                        {/*         onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>*/}
                        {/*        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                        {/*            <path*/}
                        {/*                d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*    <div style={socialIconStyle}*/}
                        {/*         onMouseOver={(e) => e.currentTarget.style.background = 'rgba(80, 255, 170, 0.2)'}*/}
                        {/*         onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>*/}
                        {/*        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                        {/*            <path*/}
                        {/*                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*    <div style={socialIconStyle}*/}
                        {/*         onMouseOver={(e) => e.currentTarget.style.background = 'rgba(80, 255, 170, 0.2)'}*/}
                        {/*         onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>*/}
                        {/*        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                        {/*            <path*/}
                        {/*                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    {/* 产品链接 */}
                    <div style={linkSectionStyle}>
                        <h3 style={linkTitleStyle}>
                            产品
                            <span style={titleUnderlineStyle}></span>
                        </h3>
                        <div style={linkListStyle}>
                            <a style={linkItemStyle}
                               onMouseOver={(e) => {
                                   e.currentTarget.style.color = '#20e3b2';
                                   e.currentTarget.style.transform = 'translateX(3px)';
                               }}
                               onMouseOut={(e) => {
                                   e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                                   e.currentTarget.style.transform = 'translateX(0)';
                               }}
                               onClick={() => {
                                   router.push('/scenes/leaderboard')
                               }}
                            >深度分析爆款短视频</a>
                            <a style={linkItemStyle}
                               onMouseOver={(e) => {
                                   e.currentTarget.style.color = '#20e3b2';
                                   e.currentTarget.style.transform = 'translateX(3px)';
                               }}
                               onMouseOut={(e) => {
                                   e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                                   e.currentTarget.style.transform = 'translateX(0)';
                               }}
                               onClick={() => {
                                   router.push('/scenes/leaderboard')
                               }}
                            >社媒短视频限流预测</a>
                            {/*<a style={linkItemStyle} onMouseOver={(e) => {e.currentTarget.style.color = '#20e3b2'; e.currentTarget.style.transform = 'translateX(3px)';}} onMouseOut={(e) => {e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; e.currentTarget.style.transform = 'translateX(0)';}}>AI 优化</a>*/}
                            {/*<a style={linkItemStyle} onMouseOver={(e) => {e.currentTarget.style.color = '#20e3b2'; e.currentTarget.style.transform = 'translateX(3px)';}} onMouseOut={(e) => {e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; e.currentTarget.style.transform = 'translateX(0)';}}>企业解决方案</a>*/}
                        </div>
                    </div>

                    {/* 公司链接 */}
                    <div style={linkSectionStyle}>
                        <h3 style={linkTitleStyle}>
                            公司
                            <span style={titleUnderlineStyle}></span>
                        </h3>
                        <div style={linkListStyle}>
                            <a style={linkItemStyle} onMouseOver={(e) => {
                                e.currentTarget.style.color = '#20e3b2';
                                e.currentTarget.style.transform = 'translateX(3px)';
                            }} onMouseOut={(e) => {
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }} onClick={() => router.push('/aboutUs')}>关于我们: 唯构科技（深圳）有限公司</a>
                            <a style={linkItemStyle} onMouseOver={(e) => {
                                e.currentTarget.style.color = '#20e3b2';
                                e.currentTarget.style.transform = 'translateX(3px)';
                            }} onMouseOut={(e) => {
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}>联系我们: support@veogo.ai</a>
                            {/*<a style={linkItemStyle} onMouseOver={(e) => {e.currentTarget.style.color = '#20e3b2'; e.currentTarget.style.transform = 'translateX(3px)';}} onMouseOut={(e) => {e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; e.currentTarget.style.transform = 'translateX(0)';}}>新闻中心</a>*/}
                            {/*<a style={linkItemStyle} onMouseOver={(e) => {e.currentTarget.style.color = '#20e3b2'; e.currentTarget.style.transform = 'translateX(3px)';}} onMouseOut={(e) => {e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; e.currentTarget.style.transform = 'translateX(0)';}}>合作伙伴</a>*/}
                        </div>
                    </div>

                    <div></div>

                    {/*/!* 联系信息 *!/*/}
                    {/*<div style={contactSectionStyle}>*/}
                    {/*    <h3 style={linkTitleStyle}>*/}
                    {/*        联系我们*/}
                    {/*        <span style={titleUnderlineStyle}></span>*/}
                    {/*    </h3>*/}
                    {/*    <div style={contactItemStyle}>*/}
                    {/*        <div style={iconContainerStyle}>*/}
                    {/*            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                    {/*                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*        北京市朝阳区建国路88号SOHO现代城*/}
                    {/*    </div>*/}
                    {/*    <div style={contactItemStyle}>*/}
                    {/*        <div style={iconContainerStyle}>*/}
                    {/*            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                    {/*                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*        contact@veogo.com*/}
                    {/*    </div>*/}
                    {/*    <div style={contactItemStyle}>*/}
                    {/*        <div style={iconContainerStyle}>*/}
                    {/*            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)">*/}
                    {/*                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*        400-888-8888*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* 底部区域 */}
                <div style={bottomSectionStyle}>
                    <div style={copyrightStyle}>
                        © {currentYear} VeoGo AI. 保留所有权利. ICP备案号: 津ICP备2025033241号-1
                    </div>
                    <div style={policyLinksStyle}>
                        <a style={policyLinkStyle}
                           onMouseOver={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                           onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                           onClick={() => router.push('/privacy')}>隐私政策</a>
                        <a style={policyLinkStyle}
                           onMouseOver={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                           onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                           onClick={() => router.push('/terms')}>服务条款</a>
                        {/*<a style={policyLinkStyle} onMouseOver={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}>Cookie 设置</a>*/}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
