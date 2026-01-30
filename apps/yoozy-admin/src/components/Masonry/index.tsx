import { useState, useEffect, useRef, ReactNode } from "react";

interface MasonryItem {
    aspectRatio: number;
    [key: string]: any;
}

interface MasonryProps<T extends MasonryItem> {
    items: T[];
    renderItem: (item: T, index: number, position: { width: number; height: number }) => ReactNode;
    columns?: { desktop: number; mobile: number };
    gap?: number;
    className?: string;
}

export default function Masonry<T extends MasonryItem>({
    items,
    renderItem,
    columns = { desktop: 5, mobile: 3 },
    gap = 16,
    className = ""
}: MasonryProps<T>) {
    const [positions, setPositions] = useState<Array<{ top: number; left: number; width: number; height: number }>>([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // 瀑布流布局计算
    useEffect(() => {
        const calculateLayout = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const columnCount = window.innerWidth >= 768 ? columns.desktop : columns.mobile;
            const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;

            // 记录每列的高度
            const columnHeights = new Array(columnCount).fill(0);
            const newPositions: Array<{ top: number; left: number; width: number; height: number }> = [];

            items.forEach((item) => {
                // 找到最短的列
                const minHeight = Math.min(...columnHeights);
                const minColumnIndex = columnHeights.indexOf(minHeight);

                // 计算项目高度
                const itemHeight = columnWidth / item.aspectRatio;

                // 计算位置
                const position = {
                    top: columnHeights[minColumnIndex],
                    left: minColumnIndex * (columnWidth + gap),
                    width: columnWidth,
                    height: itemHeight
                };

                newPositions.push(position);

                // 更新列高度
                columnHeights[minColumnIndex] += itemHeight + gap;
            });

            setPositions(newPositions);
            setContainerHeight(Math.max(...columnHeights));
        };

        calculateLayout();
        window.addEventListener("resize", calculateLayout);
        return () => window.removeEventListener("resize", calculateLayout);
    }, [items, columns, gap]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{ height: containerHeight || "auto" }}
        >
            {items.map((item, index) => {
                const position = positions[index];
                if (!position) return null;

                return (
                    <div
                        key={index}
                        role="gridcell"
                        className="absolute transition-all duration-300 ease-in-out"
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            width: `${position.width}px`,
                            height: `${position.height}px`
                        }}
                    >
                        {renderItem(item, index, { width: position.width, height: position.height })}
                    </div>
                );
            })}
        </div>
    );
}
