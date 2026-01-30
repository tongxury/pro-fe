"use client";
import React, { ReactNode } from "react";
import HeaderAndFooter from "@/layouts/HeaderAndFooter";

export default function HomeLayout({ children }: { children: ReactNode }) {
    return <HeaderAndFooter>{children}</HeaderAndFooter>;
}
