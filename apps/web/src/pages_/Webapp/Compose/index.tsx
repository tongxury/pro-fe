"use client";

import PageContainer from "@/layouts/Webapp/PageContainer";
import { useXTheme, XFlex } from "@pro/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Doc from "./Doc";
import Editor from "./Editor";
import Lib from "./Lib";
import { Composition } from "@pro/ui-pro";

function Compose() {
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const [libOpen, setLibOpen] = useState<boolean>(false);

    const [curComposition, setCurComposition] = useState<Composition>();

    // 处理文档重命名
    const onRename = (composition: Composition) => {
        if (composition.id === curComposition?.id) {
            setCurComposition({ ...composition });
        }
    };

    return (
        <PageContainer headerLeft={null}>
            <XFlex style={{ height: "100%" }} justify={"space-between"}>
                <Doc
                    style={{ borderRight: `1px solid ${token.colorBorder}`, height: "100%" }}
                    curComposition={curComposition}
                    onChangeCurComposition={(composition) => setCurComposition(composition)}
                />
                <Editor
                    style={{ flex: 1, height: "100%" }}
                    onOpenLib={() => setLibOpen(true)}
                    curComposition={curComposition}
                    onRename={onRename}
                />
                {/* <Guide style={{ flex: 1, height: "100%" }}></Guide> */}
                {/*<Lib open={libOpen} onClose={() => setLibOpen(false)}/>*/}
            </XFlex>
        </PageContainer>
    );
}

export default Compose;
