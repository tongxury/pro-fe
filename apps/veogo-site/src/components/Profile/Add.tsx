import {useXTheme, XCardSelector, XFlex, XText} from "@pro/ui";
import {Button, Input, message, Typography} from "antd";
import IconFont from "@/components/Iconfont";
import {useMemo, useState} from "react";
import {addOrPutAccount} from "@/api/api";
import {useGlobalState} from "@/hooks/global";
import {useTranslation} from "@/hooks/useTranslation";
import {FOLLOWER_RANGES, INTERACTION_RANGES, POST_RANGES} from "./constants";
import DomainSelector from "@/components/Profile/DomainSelector.tsx";

const Add = ({platforms, onComplete, data}: { platforms?: string[]; onComplete: () => void; data?: any }) => {
    const {themeVars} = useXTheme();
    const [form, setForm] = useState({
        followers: data?.followers || "",
        mainDomain: data?.domain[0] || "",
        subdomain: data?.domain[1] || "",
        interacts: data?.interacts || "",
        posts: data?.posts || "",
        nickname: data?.nickname || "",
        sign: data?.sign || ""
    });

    const t = useTranslation();
    const {selectedProfile, setSelectedProfile, setSelectedXhsProfile} = useGlobalState();

    const options = [
        {value: "douyin", label: t("douyin")},
        {value: "tiktok", label: t("tiktok")},
        {value: "xiaohongshu", label: t("xiaohongshu")}
    ].filter((x) => (platforms?.length ? platforms?.includes(x.value) : true));

    const [platform, setPlatform] = useState(options[0].value);
    const [loading, setLoading] = useState(false);

    const keyword = useMemo(() => {
        return form.nickname && form.mainDomain && form.followers && form.posts && form.interacts && form.subdomain;
    }, [form]);

    const onLinkAdded = (e: any) => {
        if (!keyword) return;
        setLoading(true);

        const params: any = {
            platform: platform,
            nickname: form.nickname,
            sign: form.sign,
            domain: [form.mainDomain, form.subdomain],
            followers: form.followers,
            posts: form.posts,
            interacts: form.interacts,
            _id: data?._id,
        };

        addOrPutAccount(params).then((res) => {
            if (!res.code) {
                message.success({content: t("added")});
                // setAdding(false);
                setSelectedProfile(res.data);

                if (platform === "xiaohongshu") {
                    setSelectedXhsProfile(res.data);
                }

                onComplete?.();
            } else {
                message.error({content: t(res.code)});
                setLoading(false);
            }
        });
    };

    return (
        <XFlex vertical gap={8}>
            <XFlex align={"center"} gap={10}>
                <XCardSelector
                    options={options}
                    value={platform}
                    onChange={(x) => setPlatform(x.value)}
                    renderItem={(x, selected) => {
                        return (
                            <XFlex
                                key={x.value}
                                style={{
                                    padding: 8,
                                    borderRadius: 10,
                                    border: selected ? "1px solid " + themeVars.colorPrimary : undefined
                                }}
                                align={"center"}
                                gap={10}
                            >
                                <IconFont size={25} name={x.value as any}/>
                                <XText>{x.label}</XText>
                            </XFlex>
                        );
                    }}
                />
            </XFlex>

            <XFlex vertical gap={20}>
                {/* 基本信息 */}
                <XFlex vertical gap={10}>
                    <XText size={16}>基本信息</XText>
                    <Typography.Text style={{color: themeVars.colorTextL2}}>完善你的账号基础资料</Typography.Text>
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>
                        账号名称 <span style={{color: "#f00"}}>*</span>
                    </XText>
                    <Input
                        placeholder="请输入账号名称"
                        value={form.nickname}
                        onChange={(e) => setForm({...form, nickname: e.target.value})}
                    />
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>账号简介</XText>
                    <Input.TextArea
                        placeholder="请输入账号简介"
                        value={form.sign}
                        onChange={(e) => setForm({...form, sign: e.target.value})}
                    />
                </XFlex>
                <XFlex vertical gap={10} style={{marginTop: 10}}>
                    <XText size={16}>领域定位</XText>
                    <Typography.Text style={{color: themeVars.colorTextL2}}>
                        精准定位你的内容方向和目标受众
                    </Typography.Text>
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>
                        主要领域 <span style={{color: "#f00"}}>*</span>
                    </XText>
                    <DomainSelector value={form.mainDomain} onChange={value => {
                        // v.stopPropagation();
                        setForm({...form, mainDomain: value})
                    }}/>
                    {/*<XFlex gap={7} style={{flexWrap: "wrap"}}>*/}
                    {/*    {DOMAINS.map((e) => (*/}
                    {/*        <XText*/}
                    {/*            key={e}*/}
                    {/*            style={{*/}
                    {/*                padding: "7px 13px",*/}
                    {/*                borderRadius: 10,*/}
                    {/*                cursor: "pointer",*/}
                    {/*                background: form.mainDomain === e ? themeVars.colorPrimary : "rgba(23, 24, 26, 0.7)"*/}
                    {/*            }}*/}
                    {/*            size={12}*/}
                    {/*            onClick={(v) => {*/}
                    {/*                v.stopPropagation();*/}
                    {/*                setForm({...form, mainDomain: e});*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            {e}*/}
                    {/*        </XText>*/}
                    {/*    ))}*/}

                    {/*</XFlex>*/}
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>
                        细分领域 <span style={{color: "#f00"}}>*</span>
                    </XText>
                    <XFlex gap={7} style={{flexWrap: "wrap"}}>
                        <Input
                            placeholder="请输入细分领域"
                            maxLength={20}
                            value={form.subdomain}
                            onChange={(e) => setForm({...form, subdomain: e.target.value})}
                        />
                    </XFlex>
                </XFlex>
                <XFlex vertical gap={10} style={{marginTop: 10}}>
                    <XText size={16}>账号数据</XText>
                    <Typography.Text style={{color: themeVars.colorTextL2}}>
                        选择符合你当前情况的数据范围
                    </Typography.Text>
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>
                        粉丝数量 <span style={{color: "#f00"}}>*</span>
                    </XText>
                    <XFlex gap={7} style={{flexWrap: "wrap"}}>
                        {FOLLOWER_RANGES.map((e) => (
                            <XText
                                key={e.value}
                                style={{
                                    padding: "7px 13px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    background:
                                        form.followers === e.value ? themeVars.colorPrimary : "rgba(23, 24, 26, 0.7)"
                                }}
                                size={12}
                                onClick={(v) => {
                                    v.stopPropagation();
                                    setForm({...form, followers: e.value});
                                }}
                            >
                                {t(e.label)}
                            </XText>
                        ))}
                    </XFlex>
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>
                        发布数量 <span style={{color: "#f00"}}>*</span>
                    </XText>
                    <XFlex gap={7} style={{flexWrap: "wrap"}}>
                        {POST_RANGES.map((e) => (
                            <XText
                                key={e.value}
                                style={{
                                    padding: "7px 13px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    background:
                                        form.posts === e.value ? themeVars.colorPrimary : "rgba(23, 24, 26, 0.7)"
                                }}
                                onClick={(v) => {
                                    v.stopPropagation();
                                    setForm({...form, posts: e.value});
                                }}
                                size={12}
                            >
                                {t(e.label)}
                            </XText>
                        ))}
                    </XFlex>
                </XFlex>
                <XFlex vertical gap={10}>
                    <XText size={13}>
                        平均互动率 <span style={{color: "#f00"}}>*</span>
                    </XText>
                    <XFlex gap={7} style={{flexWrap: "wrap"}}>
                        {INTERACTION_RANGES.map((e) => (
                            <XText
                                key={e.value}
                                style={{
                                    padding: "7px 13px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    background:
                                        form.interacts === e.value ? themeVars.colorPrimary : "rgba(23, 24, 26, 0.7)"
                                }}
                                size={12}
                                onClick={(v) => {
                                    v.stopPropagation();
                                    setForm({...form, interacts: e.value});
                                }}
                            >
                                {t(e.display)}
                            </XText>
                        ))}
                    </XFlex>
                </XFlex>
            </XFlex>

            <Button
                loading={loading}
                disabled={!keyword}
                block
                type={"primary"}
                onClick={(e) => {
                    e.stopPropagation();
                    onLinkAdded(e);
                }}
            >
                确认
            </Button>
        </XFlex>
    );
};

export default Add;
