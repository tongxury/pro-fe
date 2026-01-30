import {useRequest} from "ahooks";
import {OrderSettings, Priority} from "@/types";
import {XOption} from "@pro/ui";
import {queryOrderSettings, updateOrderSettings} from "@/api/order.ts";
import {cached} from "@/providers/request.ts";


const useOrderSettings = (fetch?: boolean)=> {

    // const snap = useSnapshot(state)

    // const {chain} = useCurrentChain()

    // antiMEV: false, priority: chain.priorityOptions[0], slippage: slippageOptions[0].value
    // const slippageOptions: SlippageOption[] = [
    //     {value: 0, label: 'auto'},
    //     {value: 0.03, label: '3%'},
    //     {value: 0.05, label: '5%'},
    //     {value: 0.1, label: '10%'},
    //     {value: 0.15, label: '15%'},
    // ]

    // const defaultSettings = {
    //     antiMEV: false,
    //     priority: chain.priorityOptions[0],
    //     slippage: slippageOptions[0].value,
    // } as OrderSettings;

    // const [antiMEV, setAntiMEV] = useLocalStorageState<boolean>("orderSettings_antiMEV", {defaultValue: false})
    // const [priority, setPriority] = useLocalStorageState("orderSettings_priority", {defaultValue: chain.priorityOptions[0]})
    // const [slippage, setSlippage] = useLocalStorageState("orderSettings_slippage", {defaultValue: slippageOptions[0].value})
    //

    const {data, mutate, loading} = useRequest<any, any>(queryOrderSettings, {
        manual: !fetch,
        // onSuccess: (data: any, params) => {
        //     if (data) {
        //         state.orderSettings = data
        //     }
        // },
        ...cached("orderSettings"),
    } as any)
    //
    // useEffect(() => {
    //     // run()
    //     console.log('xxxxxxxxx')
    // }, []);

    const update = (key: string, value: any) => {

        const oldSettings = data

        const newSettings = {...oldSettings} as OrderSettings
        newSettings[key] = value

        mutate(newSettings as OrderSettings)
        // state.orderSettings = newSettings

        console.log('oldSettings', oldSettings)

        updateOrderSettings(newSettings).then((result: any) => {
            if (result.code) {
                mutate(oldSettings)
            }
        })
    }

    // const settings = useMemo(() => {
    //     const val = snap.orderSettings || data;
    //
    //     return {
    //         ...val,
    //         slippage: val.slippage || 0
    //     };
    //
    // }, [snap.orderSettings])

    return {
        settings: data as OrderSettings,
        // slippageOptions,
        setAntiMEV: (antiMEV: boolean) => update('antiMEV', antiMEV),
        setPriority: (priority: XOption[Priority]) => update('priority', priority),
        setSlippage: (slippage: number) => update('slippage', slippage),
        loading: !data && loading
    }
}

export default useOrderSettings;
