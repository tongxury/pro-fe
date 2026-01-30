"use client";
import React, { ReactNode } from "react";
import HeaderAndFooter from "@/layouts/HeaderAndFooter";

export default function FeedbackLayout({ children }: { children: ReactNode }) {
    return <HeaderAndFooter>{children}</HeaderAndFooter>;
}
