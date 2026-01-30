import {CSSProperties, ReactNode} from "react";


const List = ({
                  dataSource,
                  loading,
                  title,
                  renderItem,
                  gap,
                  empty,
                  skeleton,
                  split,
                  style
              }: {
    dataSource: any[];
    loading?: boolean;
    title?: ReactNode;
    renderItem: (val: any, index: number) => ReactNode;
    // renderEmpty?: () => ReactNode;
    // renderSkeleton: (index: number) => React.ReactNode;
    // skeletonCount: number;
    gap?: number,
    split?: ReactNode;
    empty?: ReactNode;
    skeleton?: {
        count: number;
        view: ReactNode
    }
    style?: CSSProperties;
}) => {
    const renderLoading = () => {

        if (!skeleton) return null;

        const skeletonCount = skeleton?.count || 10;
        // @ts-ignore
        return [...Array(skeletonCount).keys()].map((x) => {
            return (
                <div key={x}>
                    {skeleton?.view}
                    {skeletonCount - 1 !== x ? split : <></>}
                </div>
            );
        });
    };

    const renderData = (data: any[]) => {
        if (!data || data.length === 0) return empty;

        const len = data.length;

        return data?.map((item, index) => {
            return (
                <div key={index}>
                    {renderItem(item, index)}
                    {len - 1 !== index ? split : <></>}
                </div>
            );
        });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap,
                // height: 200,
                // overflowY: "scroll",
                ...style
            }}
        >
            {title}
            {loading ? renderLoading() : renderData(dataSource)}
        </div>
    );
};

export default List;
