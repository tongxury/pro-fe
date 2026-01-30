import Wallet from "@/components/Wallet";
import {XFlex} from "@pro/ui";
import PositionList from "@/components/Position/List";
import {useTranslation} from "react-i18next";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

function Profile() {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const {wallet} = useDefaultWallet(true)

    // if (loading) {
    //     return <XFlex padding={15} block vertical gap={10}>
    //         <Skeleton.Button style={{height: 100}} block active />
    //         <XFlex align={'center'} gap={10}>
    //             <Skeleton.Button size={'large'} active block/>
    //             <Skeleton.Button size={'large'} active block/>
    //         </XFlex>
    //     </XFlex>
    // }


    return <XFlex vertical>
        <XFlex vertical gap={20} padding={15}>
            <Wallet/>
            <XFlex align={'center'} gap={15}>
                <Button onClick={() => navigate('/transfer-in')}
                        size={'large'} block
                        type={'primary'}
                        shape={'round'}>
                    {t('receive')}
                </Button>
                <Button onClick={() => navigate('/transfer-out')}
                        size={'large'} block
                        shape={'round'}>
                    {t('send')}
                </Button>
            </XFlex>
        </XFlex>
        <PositionList wallet={wallet?._id}/>
    </XFlex>

}

export default Profile;
