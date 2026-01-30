import React, { useEffect } from "react";
import { Input, Space, Button, Tag, Select, Spin, Pagination, Empty, Typography, Skeleton, List } from 'antd';
import { SearchOutlined, ReloadOutlined, CheckCircleFilled, ExclamationCircleOutlined, LoadingOutlined, StarFilled, HourglassOutlined } from '@ant-design/icons';
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import PageContainer from "@/components/PageContainer";
import { listAdminAssets } from "@/api/asset";
import { listUsers } from "@/api/user";
import dayjs from "dayjs";

const { Text } = Typography;

const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const UserPhoneSelect = ({ value, onChange, className }: any) => {
    const [options, setOptions] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = async (val: string) => {
        if (val.length >= 3) {
            setLoading(true);
            try {
                const res = await listUsers({ keyword: val, page: 1, size: 10 });
                const list = res?.data?.list || [];
                setOptions(list.map((u: any) => ({
                    label: `${u.name || '用户'} (${u.phone})`,
                    value: u.phone
                })));
            } finally {
                setLoading(false);
            }
        } else {
            setOptions([]);
        }
    }

    return (
        <Select
            showSearch
            value={value}
            placeholder="用户手机号"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={onChange}
            notFoundContent={null}
            options={options}
            loading={loading}
            className={className}
            allowClear
        />
    );
};

export default function AssetList() {
    const [params, setParams] = useUrlState<any>({ page: 1, size: 20 });

    const { list, total, reload, initialLoading } = useQueryListWithPolling<any, any>({
        service: listAdminAssets,
        params: {
            ...params,
            returnFields: [
                // 'url',
                'status',
                "coverUrl",
                "commodity.medias",
                // "createdAt",
                "favorite",
                "extra.context.status"
                // "commodity.name",
                // "duration",
                // "commodity.images"
            ].join(",")
        },
        key: item => item._id,
        pollingFilter: () => false,
    });

    const onPageChange = (page: number, size: number) => {
        setParams(prev => ({ ...prev, page, size }));
    }

    const reset = () => {
        setParams({});
    }

    return (
        <PageContainer title={'资产管理'}>
            <div className="p-6 min-h-screen bg-gray-50 flex flex-col gap-6">
                {/* Header / Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between gap-4 flex-wrap">
                        <Space size="middle" wrap>
                            <Input
                                placeholder="资产ID"
                                value={params?.id}
                                onChange={e => setParams(prev => ({ ...prev, id: e.target.value }))}
                                allowClear
                                className="w-48"
                            />
                            <UserPhoneSelect
                                value={params?.userPhone}
                                onChange={(val: string) => setParams((prev: any) => ({ ...prev, userPhone: val }))}
                                className="w-48"
                            />
                            <Select
                                placeholder="状态"
                                allowClear
                                options={[
                                    { label: '已完成', value: 'completed' },
                                    { label: '失败', value: 'failed' },
                                ]}
                                value={params?.status}
                                onChange={val => setParams(prev => ({ ...prev, status: val }))}
                                className="w-48"
                            />

                            <Button
                                icon={<ReloadOutlined />}
                                onClick={reset}
                                loading={initialLoading}
                            >
                                重置
                            </Button>
                        </Space>
                    </div>
                </div>

                {/* Content Grid */}
                {initialLoading ? (
                    <List
                        grid={{
                            gutter: 15,
                            xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6,
                        }}
                        dataSource={Array.from({ length: 25 }).map((_, index) => (index))}
                        renderItem={(x: any) => (
                            <List.Item>
                                {/*<div className="aspect-[1/1] w-full object-cover rounded-xl bg-gray-100 animate-pulse" />*/}
                                <Skeleton.Button active block
                                    style={{ width: '100%', height: '100%', aspectRatio: '1/1' }} />
                            </List.Item>
                        )}
                    />
                ) : list && list.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                        {list.map((item: any) => {
                            const status = item?.status;
                            const isPromptGenerating = status === 'promptGenerating';
                            const isPromptGenerated = status === 'promptGenerated';
                            const isGenerating = status === 'generating' || status === 'created';
                            const isCompleted = status === 'completed';
                            const isFailed = status === 'failed';

                            const coverUrl = item.coverUrl || item?.commodity?.medias?.[0]?.url || item?.params?.commodity?.medias?.[0]?.url || item?.params?.commodity?.images?.[0];
                            const name = item?.params?.commodity?.name || '未命名资产';

                            return (
                                <a
                                    key={item._id}
                                    href={`/user-assets/${item._id}`}
                                    className="block group relative cursor-pointer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="aspect-[9/9] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                                        {/* 图片 */}
                                        {coverUrl ? (
                                            <img
                                                src={coverUrl}
                                                alt={name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                                No Image
                                            </div>
                                        )}

                                        {/* 渐变遮罩 */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* 生成中遮罩 */}
                                        {isGenerating && (
                                            <div className="absolute inset-0 bg-black/40 z-10 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center">
                                                <div className="flex flex-col items-center animate-fade-in mx-4">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-2 shadow-inner border border-white/10">
                                                        <HourglassOutlined className="text-white text-base animate-pulse" />
                                                    </div>
                                                    <div className="text-white text-xs font-bold tracking-wide">
                                                        AI 正在极速生成中
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* 收藏角标 */}
                                        {item?.favorite && (
                                            <div className="absolute top-2 right-2 px-1.5 py-1 rounded-md z-10 bg-black/20 backdrop-blur-[2px]">
                                                <StarFilled style={{ color: '#faad14', fontSize: 16 }} />
                                            </div>
                                        )}

                                        {/* 状态标签 (Tags) */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                                            {/* 文案生成中 */}
                                            {isPromptGenerating && (
                                                <div className="px-2.5 py-1 rounded-lg bg-[#7150ff]/90 backdrop-blur-md border border-[#7150ff]/30 shadow-lg shadow-[#7150ff]/20 flex items-center gap-1.5">
                                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 12, color: '#fff' }} spin />} />
                                                    <span className="text-white text-xs font-medium">文案生成中</span>
                                                </div>
                                            )}

                                            {/* 文案已生成 */}
                                            {isPromptGenerated && (
                                                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-md border border-emerald-400/30 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5">
                                                    <CheckCircleFilled className="text-white text-xs" />
                                                    <span className="text-white text-xs font-medium">文案已生成</span>
                                                </div>
                                            )}

                                            {/* 视频生成中 */}
                                            {isGenerating && (
                                                <div className="px-2.5 py-1 rounded-lg bg-[#7150ff]/90 backdrop-blur-md border border-[#7150ff]/30 shadow-lg shadow-[#7150ff]/20 flex items-center gap-1.5">
                                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 12, color: '#fff' }} spin />} />
                                                    <span className="text-white text-xs font-medium">视频生成中</span>
                                                </div>
                                            )}

                                            {/* 生成失败 */}
                                            {isFailed && (
                                                <div className="px-2.5 py-1 rounded-lg bg-red-500/90 backdrop-blur-md border border-red-400/30 shadow-lg shadow-red-500/20 flex items-center gap-1.5">
                                                    <ExclamationCircleOutlined className="text-white text-xs" />
                                                    <span className="text-white text-xs font-medium">生成失败</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* 创建时间 - 仅在 hover 时显示 */}
                                        {item?.createdAt && (
                                            <div className="absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
                                                    {dayjs(item.createdAt * 1000).format('YYYY-MM-DD HH:mm')}
                                                </div>
                                            </div>
                                        )}

                                        {/* 时长标签 - 仅处理完成时显示 */}
                                        {isCompleted && item?.duration && (
                                            <div className="absolute right-2 bottom-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                                                {formatDuration(item.duration)}
                                            </div>
                                        )}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center py-20 bg-white rounded-xl">
                        <Empty description="暂无数据" />
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-end bg-white p-4 rounded-xl shadow-sm">
                    <Pagination
                        current={Number(params?.page) || 1}
                        pageSize={Number(params?.size) || 20}
                        total={total}
                        showSizeChanger
                        showTotal={(total) => `共 ${total} 个资产`}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </PageContainer>
    );
}
