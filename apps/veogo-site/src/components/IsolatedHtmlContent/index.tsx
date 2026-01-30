import { useEffect, useRef } from 'react';

const IsolatedHtmlContent = ({ html }: {html: string}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            // 创建 shadow DOM
            // @ts-ignore
            const shadowRoot = containerRef.current.attachShadow({ mode: 'open' });

            // 创建包含内容的元素
            const wrapper = document.createElement('div');
            wrapper.style.maxWidth = '1100px';
            wrapper.style.marginInline = 'auto';
            wrapper.innerHTML = html;

            // 将内容添加到 shadow DOM
            shadowRoot.appendChild(wrapper);
        }
    }, [html]);

    return <div style={{marginInline: 'auto'}} ref={containerRef}></div>;
};

export default IsolatedHtmlContent;
