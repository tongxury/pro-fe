import {proxy, useSnapshot} from 'valtio'
import {AppSettings, Chain, OrderSettings, Pool, Token, UsageSettings, User, Wallet} from "@/types";
import {CHAIN_SOLANA} from "@/contants.ts";

export declare interface GlobalState {
    wallet?: Wallet
    // token?: Token,
    // tradingPool?: Pool,
    user?: User,
    appSettings?: AppSettings
    usageSettings?: UsageSettings
    orderSettings?: OrderSettings
    chain: Chain
    count: number,
    text: string
}

export const state = proxy<GlobalState>({count: 0, text: '', chain: CHAIN_SOLANA})

setInterval(() => {
    ++state.count
}, 1000)

export const useGlobalState = () => useSnapshot(state)
