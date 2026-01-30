"use client";
import React, { ReactNode } from "react";
import HeaderAndFooter from "@/layouts/HeaderAndFooter";
import Price_Background from "../../../assets/Price_Background.png";

export default function PricingLayout({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                backgroundImage: `url("${Price_Background.src}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <HeaderAndFooter>{children}</HeaderAndFooter>
        </div>
    );
}
