import { XIconFont } from "@pro/icons";
import { XFlex, XText } from "@pro/ui";
import { ReactNode } from "react";

import { promptChat, promptOptionsMap } from "../constants";

const PromptView = ({ key, title }: { key: string; title: string }) => {
    const icon = promptOptionsMap?.[key]?.iconName || "ChatgptLine";

    return (
        <XFlex align={"center"} gap={5}>
            <XIconFont name={icon!} />
            <XText bold size={15}>
                {title}
            </XText>
        </XFlex>
    );
};

export default PromptView;
