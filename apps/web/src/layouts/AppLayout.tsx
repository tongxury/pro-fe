"use client";

import ThemeProvider from "@/providers/app_theme";
import { GlobalStateProvider } from "@/providers/global";
import React from "react";

const AppLayout = ({ children }: { children: any }) => {
    return (
        <GlobalStateProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </GlobalStateProvider>
    );
};

export default AppLayout;
