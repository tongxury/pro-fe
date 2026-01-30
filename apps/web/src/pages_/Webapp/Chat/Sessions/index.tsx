import { fetchSessions } from "@/api/chat";
import { XIcon } from "@pro/icons";
import { useXTheme, XFlex, xFont, XImage, XList, XTag, XText } from "@pro/ui";
import { QuestionAnswer } from "@pro/ui-pro";
import { useRequest } from "ahooks";
import { Drawer, List, theme, Typography } from "antd";
import moment from "moment";
import { useTranslations } from "next-intl";
import React, { useEffect, useState, type ReactNode } from "react";

// import deleteHistory from 'data-base64:~assets/svg/deleteHistory.svg';
// import editHistory from 'data-base64:~assets/svg/editHistory.svg';
// import Loading from 'data-base64:~assets/loading-icon.gif';
// import {useGlobalState} from "~app/providers/global";

const Sessions = ({
    children,
    current,
    onItemClick
}: {
    children: ReactNode;
    current: string;
    onItemClick?: (sessionId: string) => void;
}) => {
    const t = useTranslations("Default");

    // const {options} = useGlobalState()

    // const [historyDrawer, setHistoryDrawer] = useState(false)

    const onHisDrawerMackClick = () => {
        // setHistoryDrawer(false)
        setOpen(false);
    };

    const [open, setOpen] = useState(false);

    const { data, loading, run } = useRequest<any, any>((params) => fetchSessions(), { manual: true });
    useEffect(() => {
        if (open) {
            run({});
        }
    }, [open]);

    const onSelect = (sessionId: string) => {
        setOpen(false);
        // setHistoryDrawer(false)
        onItemClick?.(sessionId);
    };

    const { token } = useXTheme();
    const [curHoverId, setCurHoverId] = useState();
    const onMouseEnter = (x: any) => {
        console.log(x);
        setCurHoverId(x.session_id);
    };
    const onMouseLeave = () => {
        setCurHoverId(undefined);
    };
    const onHistoryEdit = () => {};
    const onHistoryDelete = () => {};

    return (
        <div>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Drawer
                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                styles={{ body: { padding: 10 } }}
                placement={"right"}
                width={"30%"}
                closable={false}
                onClose={() => setOpen(false)}
                open={open}
            >
                <XFlex vertical align={"center"} style={{ paddingTop: 20 }} gap={20}>
                    <XText size={20} bold>
                        {t("chat_history")}
                    </XText>
                    <List
                        dataSource={data?.sessions || []}
                        loading={loading}
                        split={true}
                        renderItem={(x: any) => {
                            // if (x.title?.length > 30) {
                            //     x.title = x.title.slice(0, 30) + '...'
                            // }

                            let title = x.title;
                            if (!title && x.promptKey) {
                                title = t(x.promptKey);
                            }

                            return (
                                <XFlex
                                    vertical
                                    gap={5}
                                    onMouseEnter={() => onMouseEnter(x)}
                                    onMouseLeave={() => onMouseLeave()}
                                    style={{
                                        borderRadius: "15px",
                                        paddingTop: "13px",
                                        paddingBottom: "13px",
                                        paddingInline: 15,
                                        marginBottom: "24px",
                                        background:
                                            curHoverId == x.session_id ? token.colorPrimary : token.colorBgPrimary
                                    }}
                                >
                                    {/* {x.sessionId === current && <XTag>{$t({id: 'current'})}</XTag>} */}
                                    {x.sessionId === current && (
                                        <XFlex>
                                            <XTag
                                                style={{
                                                    color: token.colorBgPrimary,
                                                    background: token.colorBgL1,
                                                    paddingTop: "2px",
                                                    paddingBottom: "2px",
                                                    fontSize: "11px",
                                                    fontWeight: "700"
                                                }}
                                            >
                                                {t("current")}
                                            </XTag>
                                        </XFlex>
                                    )}
                                    <XFlex align={"center"}>
                                        <XText bold ellipsis={{ maxWidth: 300 }}>
                                            {title}
                                        </XText>
                                    </XFlex>
                                    <Typography.Paragraph style={{ color: token.colorTextL1 }} ellipsis={{ rows: 2 }}>
                                        {x.summary}
                                    </Typography.Paragraph>
                                    <XFlex justify="space-between">
                                        <XText color={token.colorTextL1}>
                                            {moment((x.createdAt || 0) * 1000).format("MMM DD, YYYY")}
                                        </XText>
                                        {curHoverId == x.session_id && (
                                            <div>
                                                <XIcon name={"SendFilled"} size={14} onClick={onHistoryEdit} />
                                                <XIcon name={"SendFilled"} size={14} onClick={onHistoryDelete} />
                                            </div>
                                        )}
                                    </XFlex>
                                </XFlex>
                            );
                        }}
                    />
                </XFlex>
            </Drawer>
        </div>
    );
};

export default Sessions;
