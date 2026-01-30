import { getSession, mergeSessionVideo, startRemix } from "@/api/session";
import { useRequestData } from "@/hooks/useRequestData";
import { useState } from "react";
import { Button, Skeleton, message, Modal } from "antd";
import { ThunderboltFilled, PlayCircleFilled } from "@ant-design/icons";
import { useParams } from "react-router";
import SegmentItem from "./SegmentItem";
import PageContainer from "@/components/PageContainer";


const SessionDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [showVideo, setShowVideo] = useState(false);

    const { data: session, loading, run } = useRequestData(
        () => getSession({ id }),
        {
            ready: !!id,
            pollingInterval: 5000,
        }
    );

    if (loading && !session) {
        return (
            <div className="p-6 flex flex-col gap-6">
                {[1, 2].map(i => (
                    <div key={i} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 relative flex gap-6 items-start">
                        {/* Left Skeleton */}
                        <div className="shrink-0 flex flex-col gap-4 border-r border-gray-100 pr-8 w-[220px]">
                            <Skeleton.Button active style={{ width: 120, height: 20, marginBottom: 12 }} />
                            <Skeleton.Image active style={{ width: 192, height: 340 }} />
                        </div>

                        {/* Middle Skeleton */}
                        <div className="flex-1 flex flex-col gap-6 border-r border-gray-100 pr-6">
                            {/* Script */}
                            <div>
                                <Skeleton.Button active style={{ width: 120, height: 20, marginBottom: 12 }} />
                                <Skeleton active paragraph={{ rows: 3 }} title={false} />
                            </div>
                            {/* Keyframes */}
                            <div>
                                <Skeleton.Button active style={{ width: 120, height: 20, marginBottom: 12 }} />
                                <div className="flex gap-4">
                                    <Skeleton.Image active style={{ width: 120, height: 213 }} />
                                    <Skeleton.Image active style={{ width: 120, height: 213 }} />
                                    <Skeleton.Image active style={{ width: 120, height: 213 }} />
                                </div>
                            </div>
                        </div>

                        {/* Right Skeleton */}
                        <div className="w-[240px] shrink-0 flex flex-col gap-4">
                            <Skeleton.Button active style={{ width: 120, height: 20 }} />
                            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden">
                                <Skeleton.Button active block style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const allSegmentsReady = session?.segments?.every((s: any) => s.asset) && session?.segments?.length > 0;
    const hasSegments = session?.segments?.length > 0;
    const completedCount = session?.segments?.filter((s: any) => s.asset).length || 0;
    const totalCount = session?.segments?.length || 0;

    const handleMerge = async () => {
        try {
            if (!id || !allSegmentsReady) return;
            await startRemix({ id });
            message.success("视频生成中(预计5分钟)");
        } catch (error) {
            console.error(error);
            message.error("视频生成失败");
        }
    };

    return (
        <PageContainer title={'创作详情'}>
            <div className="p-6 flex flex-col gap-6 flex-1">
                {session?.segments?.map((segment, index) => (
                    <SegmentItem key={index}
                        sessionSegment={segment}
                        commodity={session?.commodity}
                        index={index}
                        refresh={run}
                        editable={session?.status === 'created'}
                    />
                ))}
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className={`sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 transition-transform duration-500 z-50 ${hasSegments ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-bold text-gray-700">
                            已完成 {completedCount} / 共有 {totalCount} 个
                        </div>
                        {/* <div className="text-xs text-gray-400">
                            {allSegmentsReady ? "现在可以将它们合并成一个完整的视频" : "请完成所有片段后再进行混剪"}
                        </div> */}
                    </div>

                    <Button
                        onClick={() => {
                            if (session?.status === 'completed') {
                                setShowVideo(true);
                            } else {
                                handleMerge();
                            }
                        }}
                        disabled={(!allSegmentsReady && session?.status !== 'completed') || session?.status === 'remixing'}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg flex items-center gap-2 ${allSegmentsReady || session?.status === 'completed'
                            ? "bg-black text-white hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                            }`}
                    >
                        {session?.status === 'completed' ? <PlayCircleFilled className="text-yellow-400" /> : <ThunderboltFilled className={allSegmentsReady ? "text-yellow-400" : "text-gray-300"} />}
                        {session?.status === 'remixing' ? '视频生成中(预计5分钟)' : session?.status === 'completed' ? '查看成片' : '一键成片'}
                    </Button>
                </div>
            </div>

            <Modal
                open={showVideo}
                onCancel={() => setShowVideo(false)}
                footer={null}
                width={800}
                centered
                destroyOnClose
                className="p-0 bg-transparent"
                // styles={{ content: { padding: 0, background: 'transparent', boxShadow: 'none' } }}
                modalRender={(modal) => (
                    <div className="bg-transparent shadow-none" onClick={(e) => e.stopPropagation()}>
                        {modal}
                    </div>
                )}
            >
                <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-[80vh] mx-auto w-auto">
                    <video
                        src={session?.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                    />
                </div>
            </Modal>
        </PageContainer>
    );
};

export default SessionDetail;