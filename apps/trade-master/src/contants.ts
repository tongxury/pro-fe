import {Chain, PriorityOption} from "@/types";
import sol_logo from "@/assets/sol_logo.png"

export const APP_NAME = "MemeX"

export const CHAIN_SOLANA: Chain = {
    id: 'solana',
    icon: sol_logo,
    name: 'SOL',
    nativeToken: {
        metadata: {
            symbol: 'SOL'
        }
    },
    priorityOptions: [
        {max: 0.006, value: 'medium', label: '0.006 Sol',},
        {max: 0.01, value: 'high', label: '0.01 Sol',},
        {max: 0.015, value: 'veryHigh', label: '0.015 Sol',},
    ] as PriorityOption[]
}

export const SOLANA_TOKEN_ID ="So11111111111111111111111111111111111111112"

export const DEFAULT_WALLET_CACHE_KEY = "defaultWallet"

export const DEFAULT_TRADING_POOL_ID = "GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump" // SOL-USDC

export const TG_BOT_INVITE_URL = "https://t.me/memex_solana_bot?start="
export const CUSTOMER_SERVICE_TG = "@cs_memex"
