import { useRequest } from "ahooks";
import { taskStatusConfig } from "@/consts";
import { listTasks } from "@/api/task.ts";
import { useXTheme } from "@pro/ui";
import { Skeleton, Typography } from "antd";
import { useParams } from "react-router";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useEffect } from "react";
import { useGlobalState } from "@/providers/GlobalData";

const TaskList = () => {
    const { themeVars } = useXTheme();
    const { taskId } = useParams();

    const router = useRouter();
    const { setRefreshTaskList } = useGlobalState();

    const { data, loading, run } = useRequest(() => listTasks({
        size: 20,
        returnFields: 'commodity.title,status'
    }), {});

    // 注册刷新方法到全局状态
    useEffect(() => {
        setRefreshTaskList(() => run);

        // 清理函数
        return () => {
            setRefreshTaskList(null);
        };
    }, [run, setRefreshTaskList]);

    if (loading) {
        return (
            <div className="space-y-3 p-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <Skeleton active paragraph={{ rows: 0 }} title={{ width: '80%' }} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-2 space-y-3">
            {data?.data?.list?.map((item: any) => {
                const isSelected = taskId === item._id;
                return (
                    <div
                        key={item._id}
                        onClick={() => router.push("/create/smart-video/tasks/" + item._id)}
                        className={`
                            group relative p-4 rounded-xl cursor-pointer transition-all duration-300
                            border hover:shadow-md
                            ${isSelected
                                ? 'bg-[#7150ff]/5 border-[#7150ff] shadow-sm'
                                : 'bg-white border-gray-100 hover:border-[#7150ff]/30 hover:-translate-y-0.5'
                            }
                        `}
                    >
                        <div className="flex justify-between items-center">
                            <Typography.Text
                                className={`font-bold text-base line-clamp-1 ${isSelected ? 'text-[#7150ff]' : 'text-gray-800'}`}
                                ellipsis={{ tooltip: item.commodity?.title }}
                            >
                                {item.commodity?.title || '无标题任务'}
                            </Typography.Text>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            {(() => {
                                const config = taskStatusConfig[item.status as keyof typeof taskStatusConfig];
                                const statusName = config?.name || item.status;
                                const statusColor = config?.color || 'text-gray-400';
                                const statusBg = config?.bg || 'bg-gray-50';

                                return (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor} ${statusBg} flex items-center gap-1`}>
                                        <span className={`w-1 h-1 rounded-full ${statusColor.replace('text-', 'bg-')} opacity-60`} />
                                        {statusName}
                                    </span>
                                );
                            })()}
                        </div>

                        {isSelected && (
                            <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#7150ff] rounded-r-full" />
                        )}
                    </div>
                );
            })}
            {!data?.data?.list?.length && (
                <div className="text-center text-gray-400 py-10">
                    暂无任务
                </div>
            )}
        </div>
    );
};

export default TaskList;
