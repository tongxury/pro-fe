import {deleteAccount, useListAccounts} from "@/api/api";
import {Button, Modal, Skeleton, Typography} from "antd";
import {useXTheme, XFlex, XList, XText} from "@pro/ui";
import {useState} from "react";
import Add from "@/components/Profile/Add";
import {useTranslation} from "@/i18n/routing";
import IconFont from "@/components/Iconfont";
import {useGlobalState} from "@/hooks/global";
import {DOMAIN_TRANSLATIONS, FOLLOWER_RANGES, INTERACTION_RANGES, POST_RANGES} from "../constants";
import ModalOrDrawerTrigger from "@/components/ModalOrDrawerTrigger";

const ProfileList = ({
                         selected,
                         onItemClick,
                         platforms
                     }: {
    selected: any;
    onItemClick: (item: any) => void;
    platforms?: string[];
}) => {
    const [profiles, {loading, mutate}] = useListAccounts();
    const {themeVars} = useXTheme();
    const [editData, setEditData] = useState(undefined);

    // const [adding, setAdding] = useState(false);
    const t = useTranslation();

    const {selectedProfile, setSelectedProfile, selectedXhsProfile, setSelectedXhsProfile} = useGlobalState();

    const onDelete = (item: any) => {
        deleteAccount({id: item._id}).then((res) => {
            if (!res.code) {
                if (item._id === selectedProfile._id) {
                    setSelectedProfile(undefined);
                }

                if (item._id === selectedXhsProfile._id) {
                    setSelectedXhsProfile(undefined);
                }

                mutate();
            }
        });
    };

    return (
        <XFlex vertical gap={10}>
            <XList
                dataSource={profiles?.list}
                skeleton={{
                    count: 1,
                    view: <Skeleton.Button style={{height: 80}} block active/>
                }}
                gap={10}
                loading={loading}
                renderItem={(x, i) => {
                    const disabled = platforms?.length && !platforms?.includes(x.platform);
                    if (disabled) {
                        return <></>;
                    }

                    return (
                        <XFlex
                            onClick={() => onItemClick(x)}
                            key={i}
                            gap={20}
                            align={"center"}
                            style={{
                                cursor: disabled ? "not-allowed" : "pointer",
                                padding: "5px 10px",
                                borderRadius: 10,
                                border:
                                    selected?._id === x._id
                                        ? "1.5px solid " + themeVars.colorPrimary
                                        : "1.5px solid " + themeVars.colorBorder
                            }}
                        >
                            <IconFont size={50} name={x.platform || "xiaohongshu"}/>
                            {/*<XImage circle size={50} src={x.avatar}/>*/}
                            <XFlex vertical gap={10} justify={"space-between"} style={{cursor: "pointer"}}>
                                <XFlex align={"center"} gap={10}>
                                    <XText size={15}>
                                        {x.nickname}

                                        <Typography.Text
                                            style={{color: themeVars.colorTextL2, fontSize: 12, marginLeft: 10}}
                                        >
                                            {x.sign}
                                        </Typography.Text>
                                    </XText>
                                    <IconFont
                                        style={{cursor: "pointer"}}
                                        size={14}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(x);
                                        }}
                                        name={"delete-bin-6-line"}
                                        color={themeVars.colorTextL2}
                                    />

                                    {/*<ModalOrDrawerTrigger*/}
                                    {/*    // defaultOpen={adding}*/}
                                    {/*    // setAdding={setAdding}*/}
                                    {/*    onOpen={() => {*/}
                                    {/*        setEditData(x);*/}
                                    {/*    }}*/}
                                    {/*    renderTrigger={(open) => {*/}
                                    {/*        return (*/}
                                    {/*            <IconFont*/}
                                    {/*                onClick={(e) => {*/}
                                    {/*                    open();*/}
                                    {/*                    e.stopPropagation()*/}
                                    {/*                }}*/}
                                    {/*                style={{cursor: "pointer"}}*/}
                                    {/*                size={14}*/}
                                    {/*                name={"edit-line"}*/}
                                    {/*                color={themeVars.colorTextL2}*/}
                                    {/*            />*/}
                                    {/*        );*/}
                                    {/*    }}*/}
                                    {/*    renderBody={(close) => {*/}
                                    {/*        return (*/}
                                    {/*            <div style={{*/}
                                    {/*                background: themeVars.colorBgL2,*/}
                                    {/*                padding: 10,*/}
                                    {/*                borderRadius: 10*/}
                                    {/*            }}>*/}
                                    {/*                <Add*/}
                                    {/*                    platforms={platforms}*/}
                                    {/*                    onComplete={() => {*/}
                                    {/*                        mutate();*/}
                                    {/*                        // setAdding(false);*/}
                                    {/*                        close();*/}
                                    {/*                    }}*/}
                                    {/*                    data={editData}*/}
                                    {/*                />*/}
                                    {/*            </div>*/}
                                    {/*        );*/}
                                    {/*    }}*/}
                                    {/*/>*/}


                                </XFlex>
                                <XFlex gap={10}>
                                    {x.domain && x.domain.length > 0 && (
                                        <>
                                            {x.domain.slice(0, 3).map((domain, index) => (
                                                <div key={index}>
                                                    <XText
                                                        size={12}
                                                        style={{
                                                            padding: "5px 10px",
                                                            borderRadius: 10,
                                                            cursor: "pointer",
                                                            background: "rgba(23, 24, 26, 0.7)"
                                                        }}
                                                    >
                                                        {domain}
                                                    </XText>
                                                </div>
                                            ))}
                                            {x.domain.length > 3 && <XText>+{x.domain.length - 3}</XText>}
                                        </>
                                    )}
                                </XFlex>
                                <XFlex align={"center"} gap={10}>
                                    <Typography.Text style={{color: themeVars.colorTextL2}}>
                                        粉丝: {t(FOLLOWER_RANGES.find((e) => e.value === x.followers)?.label)}
                                    </Typography.Text>
                                    <Typography.Text style={{color: themeVars.colorTextL2}}>
                                        发布: {t(POST_RANGES.find((e) => e.value === x.posts)?.label)}
                                    </Typography.Text>
                                    <Typography.Text style={{color: themeVars.colorTextL2}}>
                                        互动率: {t(INTERACTION_RANGES.find((e) => e.value === x.interacts)?.display)}
                                    </Typography.Text>
                                </XFlex>
                            </XFlex>
                        </XFlex>
                    );
                }}
            ></XList>
            {/* {adding && (
                <div style={{ background: themeVars.colorBgL2, padding: 10, borderRadius: 10 }}>
                    <Add
                        platforms={platforms}
                        onComplete={() => {
                            mutate();
                            setAdding(false);
                        }}
                    />
                </div>
            )} */}

            <ModalOrDrawerTrigger
                // defaultOpen={adding}
                // setAdding={setAdding}
                renderTrigger={(open) => {
                    return (
                        <Button
                            type={"dashed"}
                            onClick={() => {
                                setEditData(undefined);
                                open();
                            }}
                        >
                            {t("addProfile")}
                        </Button>
                    );
                }}
                renderBody={(close) => {
                    return (
                        <div style={{background: themeVars.colorBgL2, padding: 10, borderRadius: 10}}>
                            <Add
                                platforms={platforms}
                                onComplete={() => {
                                    mutate();
                                    // setAdding(false);
                                    close();
                                }}
                                // data={editData}
                            />
                        </div>
                    );
                }}
            />
        </XFlex>
    );
};

export default ProfileList;
