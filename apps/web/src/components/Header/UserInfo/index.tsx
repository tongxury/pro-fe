import { Popover, Flex } from "antd";
import logo from "../../../assets/logo.png";
import Image from "next/image";

export default function UserInfo({ data }: { data: any }) {
    const content = <div></div>;
    return (
        <Popover content={content} placement="bottomLeft">
            <Flex gap={10} align="center" style={{ cursor: "pointer" }}>
                <Image width={20} height={20} src={logo} alt="" />
                <span>list</span>
            </Flex>
        </Popover>
    );
}
