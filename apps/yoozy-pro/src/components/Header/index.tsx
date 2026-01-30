import { useRouter } from "@/hooks/useRouter";
import { useLocation } from "react-router";

export default () => {
    const { pathname } = useLocation();
    const { push } = useRouter();

    return (
        <div className="flex justify-between items-center px-4 h-16">
            <div className="flex gap-6 items-center">
                <div>
                    <img src="/vite.svg" alt="logo" />
                </div>
                <div
                    className={`font-header-1 font-hover-white ${pathname === "/" ? "text-main" : ""}`}
                    onClick={() => push("/")}
                >
                    Explore
                </div>
                <div
                    className={`font-header-1 font-hover-white ${pathname === "/video-studio/brandAdvert" ? "text-main" : ""}`}
                    onClick={() => push("/video-studio/brandAdvert")}
                >
                    Brand Adverts
                </div>
                <div
                    className={`font-header-1 font-hover-white ${pathname === "/video-studio/segment" ? "text-main" : ""}`}
                    onClick={() => push("/video-studio/segment")}
                >
                    Segments
                </div>
                <div
                    className={`font-header-1 font-hover-white ${pathname === "/video-studio/suggest" ? "text-main" : ""}`}
                    onClick={() => push("/video-studio/suggest")}
                >
                    Suggest
                </div>
            </div>
            <div
                className={`font-header-1 font-hover-white ${pathname === "/pricing" ? "text-main" : ""}`}
                onClick={() => push("/pricing")}
            >
                Pricing
            </div>
        </div>
    );
};
