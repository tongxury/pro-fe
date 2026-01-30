import {createRoot} from 'react-dom/client'
import App from './App'
import './providers/i18n';
import {ThemeProvider} from "@/providers/theme.tsx";
import '@twa-dev/sdk';
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import {AppRoot} from "@telegram-apps/telegram-ui";


createRoot(document.getElementById('root')!).render(
    // <StrictMode >
    <ThemeProvider>
        <TonConnectUIProvider
            manifestUrl={new URL('tonconnect-manifest.json', window.location.href).toString()}>
            <AppRoot
                appearance={WebApp.colorScheme}
                platform={['macos', 'ios'].includes(WebApp.platform) ? 'ios' : 'base'}
            >
                <App/>
            </AppRoot>
        </TonConnectUIProvider>
    </ThemeProvider>
    // </StrictMode>,
)
