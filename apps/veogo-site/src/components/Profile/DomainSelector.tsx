import React, {useState} from 'react';
import {useXTheme, XFlex, XText} from "@pro/ui";
import {Input} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {DOMAINS} from '@/constants/domain';

const DomainSelector = ({value, onChange}: { value: string, onChange: (value: string) => void }) => {

    const {themeVars} = useXTheme()

    const [domains, setDomains] = useState<any[]>(DOMAINS);

    return (
        <XFlex vertical gap={10}>
            <Input placeholder="选择或输入您的主要领域" value={value} onChange={(e) => onChange(e.target.value)}/>
            <XFlex gap={7} style={{flexWrap: "wrap"}}>
                {domains.map((e) => (
                    <XText
                        key={e.value}
                        style={{
                            padding: "7px 13px",
                            borderRadius: 10,
                            cursor: "pointer",
                            background: value === e.value ? themeVars.colorPrimary : "rgba(23, 24, 26, 0.7)"
                        }}
                        size={12}
                        onClick={(v) => {
                            onChange(e.value);
                            // v.stopPropagation();
                            // setForm({...form, mainDomain: e});
                        }}
                    >
                        {e.label}
                    </XText>
                ))}
            </XFlex>
        </XFlex>

    );
};

export default DomainSelector;
