
import { Card, Col, Row, Skeleton, Space } from "antd";

const DetailSkeleton = () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            {/* Commodity Info Skeleton */}
            <Card
                title={<Skeleton active paragraph={false} title={{ width: 100 }} />}
                className="mb-4"
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Skeleton active paragraph={{ rows: 1 }} title={{ width: 200 }} />
                    </Col>
                </Row>
                <div className="mt-4">
                    <Skeleton active paragraph={{ rows: 1 }} title={{ width: 80 }} />
                    <div className="mt-2 flex gap-2">
                        <Skeleton.Button active size="small" />
                        <Skeleton.Button active size="small" />
                        <Skeleton.Button active size="small" />
                    </div>
                </div>
            </Card>

            {/* Segments Skeleton */}
            <Card
                title={<Skeleton active paragraph={false} title={{ width: 100 }} />}
                className="mb-4"
            >
                {[1, 2, 3].map((i) => (
                    <Card key={i} size="small" className="mb-3 border border-gray-200">
                        <div className="mb-3">
                            <Skeleton active paragraph={false} title={{ width: 150 }} />
                        </div>
                        <div className="mb-3">
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton.Image active style={{ width: 100, height: 60 }} />
                            <Skeleton.Image active style={{ width: 100, height: 60 }} />
                        </div>
                    </Card>
                ))}
            </Card>
        </Space>
    );
};

export default DetailSkeleton;
