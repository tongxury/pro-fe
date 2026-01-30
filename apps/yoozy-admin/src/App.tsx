import { router } from "./providers/router.ts";
import { RouterProvider } from "react-router";
import { GlobalStateProvider } from "@/hooks/global.tsx";
import I18nProvider from '@/i18n/provider.tsx';
import { ThemeProvider } from "@/providers/theme.tsx";
import { GoogleProvider } from "@/providers/google.tsx";

import { useAutoUpdate } from "@/hooks/useAutoUpdate";

function App() {
    useAutoUpdate();

    return (
        <GlobalStateProvider>
            <I18nProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </I18nProvider>
        </GlobalStateProvider>
    )
}

export default App
