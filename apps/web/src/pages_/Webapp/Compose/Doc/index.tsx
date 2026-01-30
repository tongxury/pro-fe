import { LoadingOutlined, PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useXTheme, XFlex, XHoverable, XText } from "@pro/ui";
import { useRequest } from "ahooks";
import { Input, Skeleton } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties, useEffect, useState } from "react";

import DocItem from "./DocItem";
import { Composition } from "@pro/ui-pro";

function Doc({
    curComposition,
    style,
    onChangeCurComposition
}: {
    curComposition?: Composition;
    style?: CSSProperties;
    onChangeCurComposition: (composition: Composition) => void;
}) {
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const [creating, setCreating] = useState<boolean>(false);

    const { data, loading, mutate, run: runSearch } = useRequest(listDocuments);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        runSearch({ keyword: e.target.value });
    };

    const onCreate = () => {
        if (creating) return;
        setCreating(true);
        createComposition({ title: t("Untitled") })
            .then((rsp) => {
                if (!rsp.code) {
                    // @ts-ignore
                    mutate({
                        ...data,
                        data: {
                            ...data?.data,
                            list: [rsp.data].concat(...data?.data?.list)
                        }
                    });
                }
                setCreating(false);
            })
            .catch(() => setCreating(false));
    };

    const onDeleted = (current: any) => {
        // @ts-ignore
        mutate({
            ...data,
            data: {
                ...data?.data,
                list: data?.data?.list?.filter((x: any) => x.id !== current.id)
            }
        });
    };

    const onUpdateTitle = (current: any) => {
        const newItem = data?.data?.list?.find((x: any) => x.id === current.id);
        newItem.title = current.title;
        // @ts-ignore
        mutate({
            ...data,
            data: {
                ...data?.data,
                list: data?.data?.list?.slice()
            }
        });
    };

    useEffect(() => {
        if (curComposition) {
            // 更改标题
            onUpdateTitle(curComposition);
        }
    }, [curComposition]);

    return (
        <XFlex vertical gap={10} style={{ width: 200, padding: 10, ...style }}>
            <Input allowClear addonBefore={<SearchOutlined />} onChange={onSearchChange} placeholder={t("search")} />
            <XHoverable
                onClick={onCreate}
                color={token.colorHover}
                style={{ padding: 8, borderRadius: 8, cursor: "pointer" }}
            >
                <XFlex gap={8} align={"center"}>
                    {creating ? <LoadingOutlined /> : <PlusCircleFilled style={{ color: token.colorPrimary }} />}
                    <XText>{t("new document")}</XText>
                </XFlex>
            </XHoverable>

            <XFlex vertical gap={2} style={{ flex: 1, overflowY: "scroll", scrollbarWidth: "none" }}>
                {loading && !data
                    ? [...Array(10).keys()].map((x, i) => (
                          <Skeleton.Button
                              key={i}
                              style={{
                                  height: 25,
                                  marginBlock: 5,
                                  width: "100%"
                              }}
                              active
                          />
                      ))
                    : data?.data?.list?.map((x: any, i: number) => {
                          return (
                              <DocItem
                                  itemSize={35}
                                  data={x}
                                  onDeleted={() => onDeleted(x)}
                                  key={i}
                                  curComposition={curComposition}
                                  onClick={onChangeCurComposition}
                              />
                          );
                      })}
            </XFlex>
        </XFlex>
    );
}

export default Doc;
