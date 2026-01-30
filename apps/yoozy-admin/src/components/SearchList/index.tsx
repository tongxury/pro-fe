import React, {useEffect, useState} from "react";
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
import {FilterOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import {addResourceSegments, listResourceSegments} from "@/api/resource.ts";
import Detail from "@/pages/inspiration/Detail.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import UploadTriggerButton from "@/pages/templates/UploadTriggerButton.tsx";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import {useRequest} from "ahooks";
import CompositionInput from "@/components/CompositionInput.tsx";


export default function InspirationList() {
    const [params, setParams] = useUrlState<any>({});

    const {list, total, reload, initialLoading} = useQueryListWithPolling<any, any>({
        service: listResourceSegments,
        params: {page: 1, size: 24, ...params},
        key: item => item._id,
        pollingFilter: (item) => item.extra?.polling,
    })

    const {data: pd} = useRequest(() => listResourceSegments({status: 'created'}), {pollingInterval: 2000});

    const handleFilterChange = (key: string, value: any) => {
        setParams((prev) => ({...prev, [key]: value}));
    };

    const handleKeywordCommit = (value: string) => {
        setParams((prev) => ({...prev, keyword: value, page: 1}));
    };


    const onAdd = (results: any[]) => {
        addResourceSegments(results?.map(x => ({url: x.videoUrl, coverUrl: x.coverUrl}))).then(() => {
            reload();
        });
    };

    const onPageChange = (page: number, size: number) => {
        setParams((prev) => ({...prev, page, size}));
    };

    const reset = () => {
        setParams(prev => {
            return Object.keys(prev).reduce((acc, key) => ({...acc, [key]: undefined}), {})
        });
    }

    useEffect(() => {
        reload();
    }, [params]);

    return (
        <div style={{padding: "24px"}}>
            <div style={{maxWidth: "1400px", margin: "0 auto"}}>
                <FilterCard style={{marginBottom: "24px"}}>
                    <div style={{marginBottom: "16px"}}>
                        <Space>
                            <FilterOutlined/>
                            <span style={{fontWeight: "500"}}>筛选条件</span>
                        </Space>
                    </div>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Space.Compact>
                                <Select
                                    defaultValue="commodity"
                                    onChange={(value, option) =>
                                        handleFilterChange("searchBy", value)
                                    }
                                    options={[
                                        {label: "按商品", value: "commodity"},
                                        {label: "按画面", value: "video"},
                                    ]}
                                />
                                <CompositionInput value={params?.keyword}
                                                  onChangeText={text => setParams(prevState => ({
                                                      ...prevState,
                                                      keyword: text
                                                  }))}/>
                            </Space.Compact>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<SearchOutlined/>}
                                    onClick={() => reload()}
                                    loading={initialLoading}
                                >
                                    搜索
                                </Button>
                                <Button
                                    icon={<ReloadOutlined/>}
                                    onClick={reset}
                                    loading={initialLoading}
                                >
                                    重置
                                </Button>
                                <UploadTriggerButton onUploaded={(results) => {
                                    onAdd(results)
                                }}/>
                            </Space>
                        </Col>

                    </Row>
                </FilterCard>
                {
                    pd?.data?.list &&
                    <div className={'overflow-x-auto flex flex-row items-center gap-2'}>
                        {
                            pd?.data?.list?.map((x, i) => {
                                return (
                                    <div key={i} className={'flex flex-col gap-1'}>
                                        <div className={'relative cursor-pointer'}>
                                            <img src={x.highlightFrames?.[0]?.url || x.root?.coverUrl} alt=""
                                                 className="aspect-[4/3] w-[120px] object-cover rounded-lg"/>
                                        </div>
                                        <Tooltip title={x.description}>
                                            {/*<Typography.Text ellipsis={{}}>{x.description}</Typography.Text>*/}
                                            <div className="text-sm font-medium text-gray-400 line-clamp-1">
                                                {x.description}
                                            </div>

                                        </Tooltip>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {initialLoading ? (
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 6,
                            xxl: 6,
                        }}
                        dataSource={Array.from({length: 18}).map((_, index) => index)}
                        renderItem={(x: any) => (
                            <List.Item>
                                <div className="aspect-[9/16] w-full object-cover rounded-lg bg-gray-100"/>
                            </List.Item>
                        )}
                    />
                ) : (
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 6,
                            xxl: 6,
                        }}
                        dataSource={list || []}
                        renderItem={(x: any) => (
                            <List.Item>
                                <Detail data={x} onRefresh={reload}>
                                    <div className={"flex flex-col gap-1"}>
                                        <div className={"relative cursor-pointer"}>
                                            <img
                                                src={x.highlightFrames?.[0]?.url || x.root?.coverUrl}
                                                alt=""
                                                className="aspect-[9/16] w-full object-cover rounded-lg"
                                            />
                                            {/*<div*/}
                                            {/*    className="absolute left-2 bottom-2 ">*/}
                                            {/*    {formatDuration(x?.timeEnd - (x?.timeStart || 0))}*/}
                                            {/*</div>*/}
                                            <div
                                                className={
                                                    "absolute bottom-2 left-2 right-2 flex flex-wrap gap-1"
                                                }
                                            >
                                                {[
                                                    ...(x.typedTags?.text || []),
                                                    ...(x.typedTags?.picture || []),
                                                    ...(x.typedTags?.scene || []),
                                                ]?.map((t, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className={
                                                                "px-2 py-1 rounded-md bg-black/50 text-white text-xs"
                                                            }
                                                        >
                                                            {t}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Detail>
                            </List.Item>
                        )}
                    />
                )}

                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Pagination
                        defaultPageSize={24}
                        onChange={onPageChange}
                        showSizeChanger
                        pageSizeOptions={[24, 42, 60]}
                        current={params?.page}
                        size={params?.size}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}
