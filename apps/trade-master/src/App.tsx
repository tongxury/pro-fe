import useAppSettings from "@/hooks/useAppSettings.ts";
import AppRouter from "@/providers/router.tsx";
import useAuthUser from "@/hooks/useAuthUser.ts";
import {useTelegramMock} from "@/hooks/useTelegramMock.ts";
import './main.css'
import {useEffect} from "react";

function App() {
    if (import.meta.env.MODE === "development" && import.meta.env.VITE_MOCK_AUTH) {
        useTelegramMock();
    }

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        // import('eruda').then((lib) => lib.default.init());
        // if (import.meta.env.MODE === "development" || import.meta.env.MODE === "staging") {
        //     import('eruda').then((lib) => lib.default.init());
        // }
    }, []);



    useAppSettings(true)
    // useDefaultWallet(true)
    // useTradingToken(true)
    useAuthUser(true)

    return (
        <AppRouter/>
    );
}

export default App;
