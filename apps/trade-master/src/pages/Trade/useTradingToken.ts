import {useLocalStorageState} from "ahooks";
import {useEffect} from "react";
import {DEFAULT_TRADING_POOL_ID} from "@/contants.ts";
import {useLocation} from "react-router-dom";
import {parseURLParams} from "@pro/hooks";


const useTradingToken = () => {

    const [tradingPoolId, setTradingPoolId] = useLocalStorageState<string>("tradingTokenId",
        {defaultValue: DEFAULT_TRADING_POOL_ID})

    const {search} = useLocation()

    const idFromUrl = parseURLParams(search?.substring(1)).id

    useEffect(() => {
        if (idFromUrl) setTradingPoolId(idFromUrl)
    }, [search]);


    return {
        id: parseURLParams(search?.substring(1)).id || tradingPoolId || DEFAULT_TRADING_POOL_ID,
        loading: !(parseURLParams(search?.substring(1)).id || tradingPoolId || DEFAULT_TRADING_POOL_ID)
    }
}

export default useTradingToken;
