import { useState } from "react";

const useDemo = () => {
    const [state] = useState();

    return { state };
};

export default useDemo;
