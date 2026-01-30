import React from "react";

const useClickOutside = (ref: any, callback: any) => {
    const handleClick = (e: any) => {
        // console.log("document", ref.current)
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useClickOutside;
