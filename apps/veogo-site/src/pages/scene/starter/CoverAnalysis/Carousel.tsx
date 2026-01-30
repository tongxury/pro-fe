import {useXTheme, XFlex, XImage, XText} from '@pro/ui';
import React, {useState, useRef} from 'react';
import ReactSeamlessScroll from 'react-seamless-scroll';
import GradientOverlay from "@/components/GradientOverlay";

// 视频数据
const VIDEO_DATA = [
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover01.png',
        title: '你的下一支 Apple Watch，何必是手表？'
    },
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover02.png',
        title: '中国富豪大换血，十大富豪，你还认识谁？'
    },
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover03.png',
        title: 'DeepSeek 成功背后，最大助力是....'
    },
    {url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover04.png', title: '拆解 如何做一个爆款短视频选题！'},
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover05.png',
        title: '如果苹果做了相机.....___如果苹果出一台相机，那么它大概率长这样？'
    },
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover06.png',
        title: '已花几十！建议把保险纳入大学生必修课！！'
    },
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover07.png',
        title: '渡人是格局，睡前原谅一切，醒来便是重生___把垃圾扔掉才能空出手拥抱幸福'
    },
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover08.png',
        title: '当你情绪内耗时，一定要看这支视频！！'
    },
    {url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover09.png', title: '我爸问我斯里兰卡...'},
    {
        url: 'https://oscar-res.oss-cn-hongkong.aliyuncs.com/cases/cover10.png',
        title: '把deepseek用成精！ai 王炸组合第一期！'
    },
];

const Carousel = () => {

    const {themeVars} = useXTheme()

    return (
        // <XFlex vertical style={{marginInline: 'center'}} gap={20} align={'center'} block>
        //     <XText color={themeVars.colorTextL2} style={{marginInline: 'center'}}>案例分析</XText>
        <GradientOverlay>
            <ReactSeamlessScroll speed={20} mode={'horizontal'}
                                 style={{height: 300}}>
                <XFlex align={'center'}>
                    {VIDEO_DATA.map((x, i) =>
                        <XFlex key={i} vertical align={'center'} style={{
                            // border: '1px solid ' + themeVars.colorTextPrimary,
                            marginInline: 20,
                            width: 180, height: 260, borderRadius: 10,
                            backgroundColor: themeVars.colorBgContainerPrimary,
                            position: 'relative'
                        }}
                               gap={10}>
                            {/*<Typography.Paragraph style={{position: 'absolute', bottom: 0, width: 130}}>*/}
                            {/*    <Typography.Text style={{*/}
                            {/*        color: 'white',*/}
                            {/*        fontSize: 10,*/}
                            {/*        // width: 130,*/}
                            {/*        // maxLines: 2,*/}
                            {/*        // maxWidth: 130,*/}
                            {/*        // lineHeight: '1.3',  // 设置合适的行高*/}
                            {/*        // display: '-webkit-box',  // 确保多行省略正常工作*/}

                            {/*    }}>{x.title}*/}
                            {/*    </Typography.Text>*/}
                            {/*</Typography.Paragraph>*/}

                            {/*<video autoPlay loop*/}
                            {/*       style={{width: 150, borderRadius: 10, objectFit: 'contain'}}*/}
                            {/*       src={x.url}>*/}
                            {/*    <source*/}
                            {/*        src={x.url}/>*/}
                            {/*</video>*/}
                            <XImage src={x.url}
                                    style={{width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover'}}/>

                            {/*<Typography.Paragraph style={{position: 'absolute', bottom: 0, width: 130}}>*/}
                            {/*    <Typography.Text*/}
                            {/*        // @ts-ignore*/}
                            {/*        ellipsis={{rows: 2}}*/}
                            {/*        style={{*/}
                            {/*            fontSize: 10,*/}
                            {/*            width: 130,*/}

                            {/*            // maxLines: 2,*/}
                            {/*            // maxWidth: 130,*/}
                            {/*            // lineHeight: '1.3',  // 设置合适的行高*/}
                            {/*            // display: '-webkit-box',  // 确保多行省略正常工作*/}

                            {/*        }}>{x.title}*/}
                            {/*    </Typography.Text>*/}
                            {/*</Typography.Paragraph>*/}
                        </XFlex>
                    )}
                </XFlex>
            </ReactSeamlessScroll>
        </GradientOverlay>
        // </XFlex>

    )
};

export default Carousel;
