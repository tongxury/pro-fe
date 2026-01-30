import React, {CSSProperties, useState} from 'react';
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useTranslations} from '@/hooks/useTranslation';

const FAQAccordion = ({isSmall}: { isSmall: boolean }) => {
    const [openPanel, setOpenPanel] = useState(null);

    const {themeVars} = useXTheme()

    const t = useTranslations("Default")


    // FAQ 数据
    const faqData = [1, 2, 3, 4, 5].map((x, index) => ({
        id: index,
        question: t(`faq${x}q`),
        answer: t(`faq${x}a`),
    }));

    // 切换面板开关状态
    const togglePanel = (id: any) => {
        setOpenPanel(openPanel === id ? null : id);
    };

    // 样式定义
    const styles = {

        panel: {
            borderRadius: '20px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
        },
        button: {
            width: '100%',
            textAlign: 'left',
            background: 'transparent',
            padding: '25px 30px',
            color: themeVars.colorTextPrimary,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: isSmall ? 16 : 22,
            fontWeight: 'normal',
            outline: 'none',
        } as CSSProperties,
        icon: {
            transition: 'transform 0.3s ease',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        iconOpen: {
            transform: 'rotate(180deg)',
        },
        content: {
            padding: '0 30px',
            maxHeight: 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease, padding 0.3s ease',
        },
        contentOpen: {
            padding: '0 30px 25px 30px',
            maxHeight: '300px', // 调整为足够大的值以容纳内容
        },
        contentText: {
            margin: 0,
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
        }
    };

    return (
        <XFlex vertical align={'center'} gap={20}>
            <XText size={isSmall ? 20 : 35}>{t('faq')}</XText>
            <XFlex vertical gap={20} style={{maxWidth: 800, width: '100%'}}>
                {faqData.map((item) => (
                    <div key={item.id} style={styles.panel}>
                        <button
                            style={styles.button}
                            onClick={() => togglePanel(item.id)}
                            aria-expanded={openPanel === item.id}
                        >
                            {item.question}
                            <span
                                style={openPanel === item.id ?
                                    {...styles.icon, ...styles.iconOpen} :
                                    styles.icon
                                }
                            >
                            </span>
                        </button>
                        <div
                            style={openPanel === item.id ?
                                {...styles.content, ...styles.contentOpen} :
                                styles.content
                            }
                        >
                            <p style={styles.contentText}>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </XFlex>
        </XFlex>
    );
};

export default FAQAccordion;
