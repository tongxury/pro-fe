import logo from "@/assets/logo.png";
import { Flex, theme } from "antd";
import Image from "next/image";

const Logo = () => {
    return (
        <Flex>
            <Image alt={""} src={logo} width={146} />
        </Flex>
    );
};

export default Logo;
