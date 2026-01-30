import {XOption} from "@pro/ui";

export declare interface AppSettings {
    defaultTradingPool: Pool
    banners: AppBanner[]

}

export declare interface AppBanner {
    title: string
    desc: string
    image?: string
    landing?: 'app://invite' | string
    landingTitle: string
}

export declare type UserTokenRelationName = 'following'
export declare type UserWalletRelationName = 'follow'
export declare type ChainId = 'solana'

export declare interface Chain {
    id: ChainId,
    icon?: any,
    name?: string,
    nativeToken?: Token

    priorityOptions?: PriorityOption[]

    [key: string]: any
}

export declare interface Dex {
    name?: string
}

export declare interface PriorityOption {
    value: Priority;
    label: string;
    max: number
}

export declare interface SlippageOption {
    value: number,
    label: string,
}

export declare type Priority = 'medium' | 'high' | 'veryHigh'

//
// export declare interface Priority {
//     value: 'medium' | 'high' | 'veryHigh',
//     max: number
//     label: string
// }

export declare interface OrderSettings {
    antiMEV?: boolean
    slippage?: number
    priority?: PriorityOption
    autoSell?: boolean

    metadata?: {
        priorityOptions: PriorityOption[]
        slippageOptions: SlippageOption[]
    }
}

export declare interface UsageSettings {
    hideFailedOrder?: boolean
    hideSmallPosition?: boolean
}

export declare type Side = 'buy' | 'sell'


export declare interface Pool {
    _id?: string
    chain: Chain
    dex: Dex
    token: Token
    quoteToken: Token
    liquidity: Amount
    createdAt: number
}


export declare interface MarketState {
    states: {
        default: any,
        [key: string]: any
    }
}

export declare interface Token {
    _id?: string
    id?: string
    // symbol: string
    metadata?: {
        createdOn?: string
        description?: string
        image?: string
        name?: string
        symbol?: string
    }
    createdAt?: number
    chain?: Chain
    balance?: Amount
    price?: Amount
    supply?: Amount
    quoteToken?: Token

    ohlcStates?: {
        [key: string]: any
    }

    tradeStates?: {
        [key: string]: any
    }

    walletStates?: {
        following?: boolean
        [key: string]: any
    }
}


export declare interface Amount {
    value?: number
    nativeValue?: number
    usdtValue?: number
    // changeDaily?: number
    diffBetween?: Amount

    valueUnit?: string
}

export declare interface Wallet {
    _id?: string
    id?: string
    name: string
    default?: boolean
    balance?: Amount
    valuation?: Amount
    nickname?: string
    remark?: string
    pk?: string
}

export declare type UserWalletRelation = {
    // user: User
    wallet: Wallet
    target: Wallet
    relation: Relation
    createdAt: number
    remark?: string
}

export declare type Relation = {
    name: string
    tags?: UserWalletRelationTag[]
}

export declare interface WalletPosition {
    _id: string
    wallet?: Wallet
    token?: Token
    balance?: Amount
    price?: Amount
    // currentPrice?: Amount
}

export declare type OrderCategory = 'market_quick' | 'market' | 'limit'
export declare type TokenCategory = 'following' | 'new' | 'hot'
export declare type UserWalletRelationTag = 'autoFollow'

// export declare type ActivityCategory = 'order'

export declare interface CreateOrderParams {
    token: Token
    side: Side
    amount?: number,
    amountRate?: number,
    price?: number
    category?: OrderCategory
    autoSell?: boolean
    following?: Order
}

export declare interface Order {
    _id: string
    token?: Token
    quoteToken?: Token

    category: OrderCategory
    side: Side

    quoteAmount?: Amount
    amount?: Amount
    price?: Amount

    oriQuoteAmount?: Amount
    oriAmount?: Amount
    oriPrice?: Amount

    createdAt?: number
    status: 'created' | 'uncompleted' | 'completed' | 'cancelled' | 'failed'
    expiredAt?: number
    tx?: string
    following?: Order
}


export declare interface User {
    _id: string
    nickname: string
    serial: string
    inviterSerial: string
    // locale?: string
}


export declare interface InvitedUserSummary {
    totalCommissionAmount: Amount
    totalTransactionAmount: Amount
    inviteUserCount: number
    validInviteUserCount: number
    commissionRate: number
}

export declare interface Trade {
    _id: string
    token?: Token
    quoteToken?: Token
    side?: Side
    wallet?: Wallet
    amount?: Amount
    quoteAmount?: Amount
    createdAt?: any,
    price?: Amount
    // category?: ActivityCategory
    order: Order,
    transaction: Transaction
}

export declare interface Transaction {
    id?: string
    hash?: string
    time: number
}
