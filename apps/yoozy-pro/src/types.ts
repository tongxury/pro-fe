export type Category = "brandAdvert" | "segment_beginning" | "segment_empty" | "suggestBeginningSegments"

// export type Category = "brandAdvert" | "segment_beginning" | "segment_empty" | "suggestBeginningSegments"

export type Asset = {
    _id?: string
    commodity?: Commodity
    segment?: Segment
    prompt?: string
    url?: string
    [key: string]: any
}


export type Segment = {
    _id?: string
    [key: string]: any
}
export type Commodity = {
    _id?: string
    [key: string]: any
}


export type Prompts = {
    subtitle?: string
    video?: string
} 