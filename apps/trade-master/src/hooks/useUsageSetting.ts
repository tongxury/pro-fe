import {useLocalStorageState} from "ahooks";
import {UsageSettings} from "@/types";
import {useSnapshot} from "valtio/index";
import {state} from "@/providers/state.ts";


const useUsageSettings = () => {

    const snap = useSnapshot(state)

    const [settings, setSettings] = useLocalStorageState<UsageSettings>("usageSettings", {
        defaultValue: {
            hideFailedOrder: true,
            hideSmallPosition: true,
        }
    })

    const setValue = (key: string, value: boolean) => {

        const newSettings: UsageSettings = {
            ...state.usageSettings,
        }

        newSettings[key] = value

        state.usageSettings = newSettings
        setSettings(newSettings)
    }


    return {
        settings,
        setHideFailedOrder: (value: boolean) => setValue('hideFailedOrder', value),
        setHideSmallPosition: (value: boolean) => setValue('hideSmallPosition', value),
    }
}

export default useUsageSettings;
