export default function AboutUs() {

    return (
        <div dangerouslySetInnerHTML={{__html:
                `
        <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VeoGo AI Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        body {
            background-color: #121212;
            color: #ffffff;
            line-height: 1.6;
            padding: 2rem;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 4rem;
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
        }
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #888);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .header p {
            font-size: 1.2rem;
            color: #888;
        }
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .card h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: #fff;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.5rem;
        }
        .card-content {
            color: #bbb;
        }
        .feature-list {
            list-style: none;
            margin-top: 1rem;
        }
        .feature-list li {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
            position: relative;
        }
        .feature-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #666;
        }
        .mission {
            margin-top: 4rem;
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 15px;
            opacity: 0;
            animation: fadeIn 1s ease-out forwards 0.5s;
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            .header h1 {
                font-size: 2rem;
            }
            .card {
                margin-bottom: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>VeoGo AI</h1>
            <p>赋能创作者，预见每一帧的爆款潜力</p>
        </header>
        <div class="card-grid">
            <div class="card">
                <h2>关于我们</h2>
                <div class="card-content">
                    <p>VeoGo AI 是专为短视频创作者打造的智能决策引擎，通过前沿的深度学习算法与多模态AI技术，助您在视频发布前精准预测流量表现，优化内容细节，让每一秒创作都指向"爆款"。</p>
                </div>
            </div>
            <div class="card">
                <h2>精准预测</h2>
                <div class="card-content">
                    <ul class="feature-list">
                        <li>限流预警：提前识别内容风险，规避平台规则限制</li>
                        <li>流量预测：基于历史数据与平台算法模型，量化预测视频曝光量、完播率等核心指标</li>
                        <li>A/B测试智能化：封面、标题、文案一键对比，AI预测点击率差异</li>
                    </ul>
                </div>
            </div>
            <div class="card">
                <h2>秒级优化</h2>
                <div class="card-content">
                    <ul class="feature-list">
                        <li>逐帧分析：AI解析视频每一秒的画面构图、剪辑节奏、BGM情绪</li>
                        <li>全维度提升：覆盖画面质量、音乐匹配度、话术设计等20+维度</li>
                    </ul>
                </div>
            </div>
            <div class="card">
                <h2>技术基因</h2>
                <div class="card-content">
                    <p>融合计算机视觉（CV）、自然语言处理（NLP）与强化学习技术，核心算法借鉴Google Veo等顶尖视觉模型的语义理解能力，并结合社交平台实时数据迭代训练。</p>
                </div>
            </div>
        </div>
        <div class="mission">
            <h2>我们的使命</h2>
            <p>让创作回归创意，让流量有迹可循</p>
            <p style="margin-top: 1rem; color: #888;">在短视频竞争白热化的时代，VeoGo AI 致力于用技术打破"玄学运营"的困局。我们相信，数据与创意从来不是对立面——通过AI的理性洞察，放大创作者感性的表达，让优质内容无需被算法埋没。</p>
       
             <p> Tutorduck Limited.Copyright </p>
        </div>
        
       
    </div>
</body>
</html>
        `

        }}>

        </div>
    );
}
