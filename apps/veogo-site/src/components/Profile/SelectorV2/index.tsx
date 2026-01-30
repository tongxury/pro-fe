import { useXTheme, XFlex, XText } from "@pro/ui";
import React from "react";
import ProfileList from "@/components/Profile/List";
import ModalOrDrawerTrigger from "@/components/ModalOrDrawerTrigger";
import IconFont from "@/components/Iconfont";
import { useTranslation } from "@/i18n/routing";

const ProfileSelector = ({
    selected,
    onChange,
    platforms
}: {
    selected: any;
    onChange: (profile: any) => void;
    platforms?: string[];
}) => {
    // const {selectedProfile, setSelectedProfile} = useGlobalState()

    // const [selectedProfile, setSelectedProfile] = useLocalStorageState<any>("selectedProfile" + (platforms?.join(",") || ''))

    const { themeVars } = useXTheme();
    const t = useTranslation();

    return (
        <>
            <ModalOrDrawerTrigger
                renderTrigger={(open) => {
                    return selected ? (
                        <XFlex
                            gap={10}
                            align={"center"}
                            onClick={open}
                            style={{
                                cursor: "pointer",
                                padding: "5px 10px",
                                borderRadius: 5,
                                background: themeVars.colorBgL2
                            }}
                        >
                            <IconFont size={20} name={selected?.platform || "xiaohongshu"} />
                            {/*<XImage src={selectedProfile?.avatar} size={20} circle*/}
                            {/*        style={{border: '1px solid ' + themeVars.colorPrimary}}/>*/}
                            <XText>{selected?.nickname}</XText>
                        </XFlex>
                    ) : (
                        <XFlex style={{ cursor: "pointer" }} onClick={open}>
                            <XText color={themeVars.colorPrimary}>{t("bind")} </XText>
                        </XFlex>
                    );
                }}
                renderBody={(close) => {
                    return (
                        <XFlex vertical style={{ padding: 10 }}>
                            <ProfileList
                                platforms={platforms}
                                selected={selected}
                                onItemClick={(item) => {
                                    onChange(item);
                                    close();
                                }}
                            ></ProfileList>
                        </XFlex>
                    );
                }}
            />
        </>
    );
};

export default ProfileSelector;
