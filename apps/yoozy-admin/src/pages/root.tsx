import { Outlet } from "react-router";
import Sider from "@/components/Sider";

const RootLayout = () => {
    return (
        <div className="flex flex-row h-screen ">
            <Sider />
            <div className="flex-1 overflow-auto bg-white flex flex-col">
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
