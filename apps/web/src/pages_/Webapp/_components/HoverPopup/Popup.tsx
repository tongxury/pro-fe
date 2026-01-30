import { CloseOutlined } from "@mui/icons-material";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { forwardRef, useImperativeHandle, useState } from "react";

interface PopupTextProps {
    text: string;
}

export interface PopupTextHandles {
    close: () => void;
    open: () => void;
}

const PopupText = forwardRef<PopupTextHandles, PopupTextProps>(function PopupText({ text }, ref) {
    const { token } = useXTheme();
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => {
        return {
            close() {
                setVisible(false);
            },
            open() {
                setVisible(true);
            }
        };
    }, []);

    return (
        <XFlex
            style={{
                visibility: visible ? "visible" : "hidden",
                maxWidth: "360px",
                backgroundColor: token.colorL5,
                textAlign: "center",
                position: "absolute",
                borderRadius: "4px",
                padding: "4px 8px",
                top: 0,
                left: "50%",
                transform: "translate(-50%, -100%)",
                zIndex: 10
            }}
        >
            <XText size={14} style={{ lineHeight: "24px", textAlign: "left" }}>
                {text}
            </XText>
            <CloseOutlined
                onClick={handleClose}
                style={{
                    width: "14x",
                    height: "14px",
                    cursor: "pointer",
                    marginTop: "4px"
                }}
            />
        </XFlex>
    );
});

export default PopupText;
