import React, {CSSProperties, ReactElement} from "react";
import {CreateOrderParams, Order, OrderCategory, Side, Token} from "@/types";
import LimitOrderSubmitter from "@/components/Order/Submitter/LimitOrderSubmitter.tsx";
import MarketOrderSubmitter from "@/components/Order/Submitter/MarketOrderSubmitter.tsx";

function OrderSubmitter(params: {
    params: CreateOrderParams
    onSubmitted?: (order?: Order) => void,
    children: ReactElement
}) {

    return params.params?.category === 'limit' ?
        // @ts-ignore
        <LimitOrderSubmitter {...params} >
            {params.children}
        </LimitOrderSubmitter> :
        <MarketOrderSubmitter {...params} >
            {params.children}
        </MarketOrderSubmitter>

}

export default OrderSubmitter
