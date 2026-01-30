import { XFlex } from "..";
import { borderRadius, position } from "../styles/utils";

interface ISwitch {
    checked?: boolean;
    onChange?: (val: boolean) => void;
    switchColor: {
        checkColor: string;
        uncheckColor: string;
    };
    [key: string]: any;
}
const XSwitch = (props: ISwitch) => {
    const { checked, onChange, switchColor, ...rest } = props;
    const toggleCheck = () => {
        onChange && onChange(!checked);
    };

    return (
        <XFlex
            align="center"
            style={{
                width: "34px",
                position: "relative",
                background: checked ? switchColor.checkColor : switchColor.uncheckColor,
                ...borderRadius("14px", "14px", "14px", "14px"),
                height: "20px",
                cursor: "pointer"
            }}
            onClick={toggleCheck}
            {...rest}
        >
            <span
                style={{
                    display: "inline-block",
                    ...borderRadius("50%", "50%", "50%", "50%"),
                    width: "16px",
                    height: "16px",
                    background: "white",
                    marginLeft: checked ? "" : "2px",
                    marginRight: checked ? "2px" : "",
                    ...position({
                        position: "absolute",
                        right: checked ? "0px" : "",
                        left: checked ? "" : "0px"
                    })
                }}
            ></span>
        </XFlex>
    );
};

export default XSwitch;
