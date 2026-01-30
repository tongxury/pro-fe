import React, { useState } from 'react';
import { Button, Checkbox, Drawer, Input, message, Rate, Space, Typography, Skeleton, Tooltip } from 'antd';
import { addFeedback, listFeedbacks } from '@/api/feedback';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

interface FeedbackDrawerProps {
    id: string,
    open: boolean;
    onClose: () => void;
}

const bugOptions = [
    '穿模',
    '商品包装信息识别错误',
    '产品使用方式错误',
    '产品大小比例错误',
    '提示词改写后没针对性优化',
    '无转场',
    '材质质感错误',

];

const FeedbackDrawer: React.FC<FeedbackDrawerProps> = ({ id, open, onClose }) => {
    const [issues, setIssues] = useState<string[]>([]);
    const [customText, setCustomText] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [options, setOptions] = useState<string[]>(bugOptions);
    const [newBug, setNewBug] = useState('');
    const [isAddingBug, setIsAddingBug] = useState(false);

    const handleAddBug = () => {
        if (newBug && !options.includes(newBug)) {
            setOptions([...options, newBug]);
            setIssues([...issues, newBug]);
            setNewBug('');
            setIsAddingBug(false);
        }
    };

    const toggleIssue = (issue: string) => {
        if (issues.includes(issue)) {
            setIssues(issues.filter(i => i !== issue));
        } else {
            setIssues([...issues, issue]);
        }
    };

    const { run: refresh, loading: fetching } = useRequest(
        async () => {
            if (!id || !open) return;
            const res = await listFeedbacks({ targetId: id });
            if (res?.data?.list?.length > 0) {
                const feedback = res.data.list[0];
                const existingIssues = feedback.issues || [];
                setIssues(existingIssues);
                setOptions(prev => Array.from(new Set([...bugOptions, ...existingIssues])));
                setCustomText(feedback.content?.customText || '');
                setRating(Number(feedback.content?.rating) || 0);
                setSubmitted(true);
            } else {
                setSubmitted(false);
                setIssues([]);
                setOptions(bugOptions);
                setCustomText('');
                setRating(0);
                setNewBug('');
                setIsAddingBug(false);
            }
        },
        {
            ready: !!id && open,
            refreshDeps: [id, open],
        }
    );

    const { run: submit, loading } = useRequest(async () => {
        await addFeedback({
            category: 'asset',
            url: window.location.href,
            issues,
            content: {
                customText,
                rating: rating?.toString() || undefined
            },
            targetId: id,
        });
        message.success('感谢您的反馈！');
        setSubmitted(true);
        onClose();
    }, {
        manual: true,
    });

    return (
        <Drawer
            title="反馈"
            open={open}
            onClose={onClose}
            width={480}
            footer={
                <div className="flex justify-end gap-2">
                    <Button onClick={onClose}>取消</Button>
                    {!submitted && !fetching && (
                        <Button type="primary" onClick={submit} loading={loading} disabled={!rating && issues.length === 0 && !customText}>
                            提交
                        </Button>
                    )}
                </div>
            }
        >
            {fetching ? (
                <div className="space-y-8 px-2 py-2">
                    <div className="space-y-3">
                        <Skeleton.Button active size="small" style={{ width: 60, height: 20 }} />
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton.Avatar key={i} active size="small" shape="circle" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton.Button active size="small" style={{ width: 80, height: 20 }} />
                        <div className="grid grid-cols-1 gap-3">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton.Input key={i} active size="small" block style={{ height: 24, borderRadius: 4 }} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton.Button active size="small" style={{ width: 80, height: 20 }} />
                        <Skeleton.Input active block style={{ height: 100, borderRadius: 6 }} />
                    </div>
                </div>
            ) : (
                <Space direction="vertical" size="large" className="w-full pt-2">
                    {submitted && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-xl text-center font-medium border border-green-100">
                            您已提交过反馈，感谢您的帮助！
                        </div>
                    )}

                    <div className={submitted ? 'opacity-60 pointer-events-none grayscale' : ''}>
                        <div className="bg-gray-50 p-5 rounded-2xl flex flex-col items-center gap-4 border border-gray-100">
                            <Typography.Title level={5} style={{ margin: 0 }} className="text-gray-700">整体评分</Typography.Title>
                            <Rate
                                count={10}
                                value={rating}
                                onChange={setRating}
                                disabled={submitted}
                                style={{ fontSize: 32 }}
                                className="text-purple-500"
                            />
                            <div className="flex gap-4 text-xs font-medium bg-white px-4 py-2 rounded-full shadow-sm text-gray-500 border border-gray-100">
                                <span className={rating > 0 && rating <= 4 ? 'text-red-500 font-bold' : ''}>1-4 不可用</span>
                                <span className="text-gray-300">|</span>
                                <span className={rating > 4 && rating <= 6 ? 'text-orange-500 font-bold' : ''}>5-6 需调整</span>
                                <span className="text-gray-300">|</span>
                                <span className={rating > 6 && rating <= 8 ? 'text-green-500 font-bold' : ''}>7-8 可用</span>
                                <span className="text-gray-300">|</span>
                                <span className={rating > 8 ? 'text-green-600 font-bold' : ''}>9-10 优质</span>
                            </div>
                        </div>
                    </div>

                    <div className={submitted ? 'opacity-60 pointer-events-none grayscale' : ''}>
                        <Typography.Text strong className="text-gray-700 mb-3 block">存在的问题 (多选)</Typography.Text>
                        <div className="flex flex-wrap gap-2">
                            {options.map(option => {
                                const active = issues.includes(option);
                                return (
                                    <div
                                        key={option}
                                        onClick={() => !submitted && toggleIssue(option)}
                                        className={`
                                            px-4 py-2 rounded-lg text-sm cursor-pointer transition-all border
                                            ${active
                                                ? 'bg-purple-100 text-purple-700 border-purple-200 font-medium shadow-sm'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:text-purple-600'
                                            }
                                        `}
                                    >
                                        {option}
                                    </div>
                                );
                            })}

                            {!submitted && (
                                isAddingBug ? (
                                    <Input
                                        autoFocus
                                        size="small"
                                        style={{ width: 120, height: 38 }}
                                        value={newBug}
                                        onChange={e => setNewBug(e.target.value)}
                                        onBlur={() => { handleAddBug(); setIsAddingBug(false); }}
                                        onPressEnter={handleAddBug}
                                        placeholder="输入后回车"
                                        className="rounded-lg"
                                    />
                                ) : (
                                    <div
                                        onClick={() => setIsAddingBug(true)}
                                        className="px-4 py-2 rounded-lg text-sm cursor-pointer border border-dashed border-gray-300 text-gray-400 hover:text-purple-500 hover:border-purple-300 transition-colors flex items-center gap-1 bg-gray-50"
                                    >
                                        + 其他
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className={submitted ? 'opacity-60 pointer-events-none grayscale' : ''}>
                        <Typography.Text strong className="text-gray-700 mb-3 block">其他建议</Typography.Text>
                        <Input.TextArea
                            rows={4}
                            placeholder="请输入您的具体建议或描述..."
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            disabled={submitted}
                            className="bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-all"
                        />
                    </div>
                </Space>
            )}
        </Drawer>
    );
};

export default FeedbackDrawer;
