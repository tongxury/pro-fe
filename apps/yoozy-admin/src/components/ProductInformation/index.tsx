const ProductInformation = (
    list: string[],
    label: string,
    color: string,
    onClick?: (item: string) => void,
    value?: string
) => {
    // 颜色类名映射
    const colorClasses = {
        main: {
            bg: "bg-main",
            text: "text-main",
            bgActive: "!bg-main/20"
        },
        "blue-500": {
            bg: "bg-blue-500",
            text: "text-blue-500",
            bgActive: "!bg-blue-500/20"
        }
    };

    const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.main;

    return (
        <div className="bg-[#262626] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-3">
                <span className={`w-1 h-3 ${selectedColor.bg} rounded-full`}></span>
                <label className="text-white/60 text-xs">{label}</label>
                <span className="text-white/40 text-xs">{list.length} 个</span>
            </div>
            <div className="space-y-2">
                {list.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => onClick && onClick(item)}
                        className={`cursor-pointer flex items-start gap-2 text-white/80 text-xs leading-relaxed rounded-lg p-2 hover:bg-white/10 transition-colors ${value === item ? selectedColor.bgActive : "bg-white/5"}`}
                    >
                        <span className={`${selectedColor.text} text-xs mt-0.5 flex-shrink-0`}>•</span>
                        <span className="flex-1">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductInformation;
