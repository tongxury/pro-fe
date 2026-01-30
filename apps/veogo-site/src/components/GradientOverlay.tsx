import React, {CSSProperties} from 'react';
import {useXTheme} from "@pro/ui";

// 透明中间+渐变边缘的覆盖层组件
const GradientOverlay = ({widthRateLeft, widthRateRight, children}: {
    widthRateLeft?: number,
    widthRateRight?: number,
    children: any
}) => {

    const {themeVars} = useXTheme()
    // 容器样式 - 相对定位作为定位上下文
    const containerStyle = {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    } as CSSProperties;

    // 内容样式
    const contentStyle = {
        width: '100%',
        position: 'relative',
        zIndex: 1,
    } as CSSProperties;

    // 覆盖层样式 - 绝对定位
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        // 使用多个渐变创建透明中间+黑色边缘的效果
        background: `
      linear-gradient(to right, ${themeVars.colorBgPrimary} 0%, rgba(0, 0, 0, 0) ${widthRateLeft || 40}%, rgba(0, 0, 0, 0) ${widthRateRight ? (100 - widthRateRight) : 60}%, ${themeVars.colorBgPrimary}  100%)
    `,
        pointerEvents: 'none', // 允许点击下方的内容
    } as CSSProperties;

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                {children}
            </div>
            <div style={overlayStyle}></div>
        </div>
    );
};

export default GradientOverlay;

// // 使用示例
// const ExampleComponent = () => {
//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>带渐变边缘的组件示例</h2>
//
//             <GradientOverlay>
//                 <div style={{
//                     padding: '20px',
//                     backgroundColor: '#f0f0f0',
//                     border: '1px solid #ddd',
//                     borderRadius: '8px'
//                 }}>
//                     <h3>这是被覆盖的内容</h3>
//                     <p>这个组件上方有一个透明的覆盖层，左右两侧有从透明渐变到黑色的效果。</p>
//                     <p>你仍然可以与此内容交互，因为覆盖层设置了 pointerEvents: 'none'。</p>
//                     <button onClick={() => alert('按钮仍然可以点击!')}>点击我</button>
//                 </div>
//             </GradientOverlay>
//
//             {/* 演示另一个用例 - 图片上的渐变效果 */}
//             <div style={{ marginTop: '30px' }}>
//                 <h3>图片上的渐变边缘效果</h3>
//                 <GradientOverlay>
//                     <img
//                         src="https://via.placeholder.com/800x400"
//                         alt="示例图片"
//                         style={{ width: '100%', display: 'block' }}
//                     />
//                 </GradientOverlay>
//             </div>
//
//             {/* 演示滚动内容上的渐变效果 */}
//             <div style={{ marginTop: '30px' }}>
//                 <h3>滚动内容上的渐变边缘</h3>
//                 <GradientOverlay>
//                     <div style={{
//                         height: '200px',
//                         overflowY: 'auto',
//                         padding: '10px',
//                         backgroundColor: '#eef',
//                         border: '1px solid #ccd',
//                         borderRadius: '8px'
//                     }}>
//                         {Array(20).fill().map((_, i) => (
//                             <p key={i}>这是第 {i+1} 行滚动内容，用于演示渐变效果。</p>
//                         ))}
//                     </div>
//                 </GradientOverlay>
//             </div>
//         </div>
//     );
// };
//
// export default ExampleComponent;
