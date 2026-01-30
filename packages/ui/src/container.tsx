import { ReactNode } from "react";

import { useTheme } from "./provider";

// 设置一些公共的逻辑
const Container = ({ children }: { children: ReactNode }) => {
    const { themeVars } = useTheme();

    return <div>{children}</div>;
};

export default Container;
