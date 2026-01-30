import React, { useEffect, useState } from "react";
import {
    Button,
    Card as FilterCard,
    Col,
    DatePicker,
    Input,
    List,
    Pagination,
    Row,
    Select,
    Skeleton,
    Space,
    Tooltip,
    Typography,
} from "antd";
import { FilterOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { addResourceSegments, listResourceSegments } from "@/api/resource.ts";
import Detail from "./Detail.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import UploadTriggerButton from "./UploadTriggerButton.tsx";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import { useRequest } from "ahooks";
import { useMediaCacheFn } from "@/hooks/useMediaCache";

export default function InspirationList() {
    const [params, setParams] = useUrlState<any>({ page: 1, size: 15 });
    const cached = useMediaCacheFn();
    const [keywordInput, setKeywordInput] = useState(params?.keyword ?? "");
    const [isComposing, setIsComposing] = useState(false);


    const { list, total, reload, initialLoading } = useQueryListWithPolling<any, any>({
        service: listResourceSegments,
        params: {
            page: 1, size: 15, status: 'completed', ...params,
            // returnFields: [
            //     "highlightFrames",
            //     "status",
            //     "typedTags.text",
            //     "typedTags.picture",
            //     "typedTags.scene",
            // ].join(","),
        },
        key: item => item._id,
        pollingFilter: (item) => item.extra?.polling,
    })

    const [pollingInterval, setPollingInterval] = useState<number | undefined>(2000);

    const { data: pd, run: runPolling } = useRequest(
        () => listResourceSegments({ status: 'processing' }),
        {
            pollingInterval,
            onSuccess: (res) => {
                if (!res?.data?.list?.length) {
                    setPollingInterval(undefined);
                    reload()
                }
            }
        });

    useEffect(() => {
        setKeywordInput(params?.keyword ?? "");
    }, [params?.keyword]);

    useEffect(() => {
        reload();
    }, [params]);

    const handleFilterChange = (key: string, value: any) => {
        setParams((prev) => ({ ...prev, [key]: value }));
    };

    const handleKeywordCommit = (value: string) => {
        setParams((prev) => ({ ...prev, keyword: value, page: 1 }));
    };

    const handleKeywordChange = (value: string) => {
        if (!isComposing) {
            handleKeywordCommit(value);
        }
    };

    const onAdd = (results: any[]) => {
        const itemsToAdd: any[] = [];
        results?.forEach(res => {
            if (res.segments && res.segments.length > 0) {
                res.segments.forEach((seg: any) => {
                    itemsToAdd.push({
                        url: res.videoUrl,
                        coverUrl: res.coverUrl,
                        timeStart: seg.start,
                        timeEnd: seg.end
                    });
                });
            } else {
                itemsToAdd.push({
                    url: res.videoUrl,
                    coverUrl: res.coverUrl
                });
            }
        })

        addResourceSegments(itemsToAdd).then(() => {
            reload();
            setPollingInterval(2000);
            runPolling();
        });
        console.log(itemsToAdd);
    };

    const handleSearch = () => {
        handleKeywordCommit(keywordInput);
        reload();
    };

    const onPageChange = (page: number, size: number) => {
        setParams((prev) => ({ ...prev, page, size }));
        // load({page, size});
    };

    const reset = () => {
        setParams(prev => {
            return Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: undefined }), {})
        });
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold m-0 text-gray-800">灵感库</h1>
                        <div className="h-6 w-[1px] bg-gray-200"></div>
                        <span className="text-gray-500">发现和管理您的创意视频</span>
                    </div>
                    <UploadTriggerButton onUploaded={(results) => {
                        onAdd(results)
                    }} />
                </div>

                {/* Main Content Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">

                        <Space size="large">
                            <div className="flex items-center gap-2">
                                <FilterOutlined className="text-gray-400" />
                                <span className="font-medium text-gray-700">筛选</span>
                            </div>
                            <Space.Compact>
                                <Select
                                    defaultValue="commodity"
                                    onChange={(value, option) =>
                                        handleFilterChange("searchBy", value)
                                    }
                                    options={[
                                        { label: "按商品", value: "commodity" },
                                        { label: "按画面", value: "video" },
                                    ]}
                                />
                                <Input
                                    placeholder="输入关键词..."
                                    value={keywordInput}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        setKeywordInput(value);
                                        handleKeywordChange(value);
                                    }}
                                    onCompositionStart={() => setIsComposing(true)}
                                    onCompositionEnd={(e) => {
                                        setIsComposing(false);
                                        const value = e.currentTarget.value;
                                        setKeywordInput(value);
                                        handleKeywordCommit(value);
                                    }}
                                    allowClear
                                    style={{ width: "100%" }}
                                    onPressEnter={handleSearch}
                                />

                            </Space.Compact>
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={reset}
                                loading={initialLoading}
                                shape="circle"
                                type="text"
                            />
                        </Space>

                    </div>

                    {/* Processing Section */}
                    {pd?.data?.list && pd.data.list.length > 0 && (
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <h3 className="text-base font-semibold m-0 text-gray-800">生成中...</h3>
                                <span className="text-bg-primary text-sm font-medium">({pd.data.list.length})</span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {pd.data.list.map((x: any, i: number) => (
                                    <div key={i} className="flex-shrink-0 w-[160px] group">
                                        <div
                                            className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white mb-2 border border-gray-200 shadow-sm">
                                            <img
                                                src={cached(x.highlightFrames?.[0]?.url || x.root?.coverUrl)}
                                                alt=""
                                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div
                                                className="absolute inset-0 flex items-center justify-center bg-black/5">
                                                <div
                                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        </div>
                                        <Tooltip title={x.description}>
                                            <div className="text-xs font-medium text-gray-600 line-clamp-1 px-1">
                                                {x.description || "正在处理视频..."}
                                            </div>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Video Grid */}
                    {initialLoading ? (
                        <List
                            grid={{
                                gutter: 24,
                                xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6,
                            }}
                            dataSource={Array.from({ length: 12 }).map((_, index) => index)}
                            renderItem={() => (
                                <List.Item>
                                    <Skeleton.Button active block
                                        style={{ width: '100%', height: '100%', aspectRatio: '9/16' }} />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <List
                            grid={{
                                gutter: 24,
                                xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6,
                            }}
                            dataSource={list || []}
                            renderItem={(x: any) => (
                                <List.Item>
                                    <Detail data={x} onRefresh={reload}>
                                        <div className="group relative cursor-pointer">
                                            <div
                                                className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-sm hover:shadow-md transition-all duration-300">
                                                <img
                                                    src={cached(x.highlightFrames?.[0]?.url || x.root?.coverUrl)}
                                                    alt=""
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Tags Overlay */}
                                                <div
                                                    className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                                                    {[
                                                        ...(x.typedTags?.text || []),
                                                        ...(x.typedTags?.picture || []),
                                                        ...(x.typedTags?.scene || []),
                                                    ]?.map((t, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs border border-white/10"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Detail>
                                </List.Item>
                            )}
                        />
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <Pagination
                            defaultPageSize={15}
                            onChange={onPageChange}
                            showSizeChanger
                            pageSizeOptions={[15, 30, 50, 100]}
                            current={params?.page}
                            size={params?.size}
                            total={total}
                            showTotal={(total) => `共 ${total} 个视频`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
