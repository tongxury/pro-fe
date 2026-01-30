import { SearchOutlined } from "@ant-design/icons";
import { useXTheme, XFlex } from "@pro/ui";
import { useInfiniteScroll } from "ahooks";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import AssetList from "./AssetList";

interface Result {
    list: string[];
    nextId: string | undefined;
}

const resultData = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

function getLoadMoreList(nextId: string | undefined, limit: number): Promise<Result> {
    let start = 0;
    if (nextId) {
        start = resultData.findIndex((i) => i === nextId);
    }
    const end = start + limit;
    const list = resultData.slice(start, end);
    const nId = resultData.length >= end ? resultData[end] : undefined;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                list,
                nextId: nId
            });
        }, 1000);
    });
}

function Sources({ height }: { height: number | string }) {
    const ref = useRef<HTMLDivElement>(null);
    const t = useTranslations("Default");
    const { token } = useXTheme();

    const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll<any>(
        (d) => listAssets({ page: (d?.pageMeta?.page || 0) + 1 }),
        {
            target: ref,
            isNoMore: (d) => d?.pageMeta?.noMore
        }
    );

    return (
        <XFlex vertical ref={ref} style={{ height, overflow: "auto" }}>
            <div style={{ paddingInline: 10 }}>
                <Input allowClear addonBefore={<SearchOutlined />} style={{}} placeholder={t("search sources")} />
            </div>

            <AssetList data={data?.data?.list} loading={loading} />
        </XFlex>
    );
}

export default Sources;
