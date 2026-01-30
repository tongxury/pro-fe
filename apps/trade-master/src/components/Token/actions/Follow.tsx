import IconFont from "@/components/Iconfont";
import {useXTheme} from "@pro/ui";
import {updateUserToken, updateWalletToken} from "@/api/token.ts";
import {useEffect, useState} from "react";


function Follow({tokenId, following}: { tokenId: string, following?: boolean }) {


    const [state, setState] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        setState(following)
    }, [following])

    const {themeVars} = useXTheme()


    const onFollow = (e: any) => {
        e.stopPropagation();

        setState(!state)
        // updateUserToken({tokenId, relation: "following"}).then(result => {
        // })

        updateWalletToken({tokenId}).then(result => {})
    }


    return <>
        <IconFont onClick={onFollow} name={state ? 'star-fill' : 'star-line'}
                  color={state ? themeVars.colorPrimary : themeVars.colorTextPrimary}/>
    </>
}

export default Follow;
