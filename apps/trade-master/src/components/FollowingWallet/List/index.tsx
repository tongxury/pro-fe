import {useRequest} from "ahooks";
import {addFollowingWallet, queryFollowingWallets} from "@/api/api.ts";
import {cached} from "@/providers/request.ts";
import {XFlex, XList} from "@pro/ui";
import {UserWalletRelation} from "@/types";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import FollowingWalletItem from "@/components/FollowingWallet/List/Item.tsx";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Create from "@/components/FollowingWallet/Create.tsx";

function FollowingWalletList() {


    const {t} = useTranslation()

    const [adding, setAdding] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const {data, run, refresh, mutate} = useRequest<any, any>(queryFollowingWallets, {
        ...cached('followingWallets'),
    })

    const onSubmit = () => {
        setAdding(false);
        setInputValue('')
        if (inputValue) {
            addFollowingWallet({wallet: inputValue}).then(result => {
                refresh()
            })
        }
    }

    const onRemove = (data: UserWalletRelation) => {
        mutate((oldData: any) => ({
            list: oldData.list?.filter((x: UserWalletRelation) => x.target?.id !== data.target?.id),
        }))
    }
    const onUpdate = (data: UserWalletRelation) => {


        console.log('data', data)

        mutate((oldData: any) => {


            const newData = oldData.list?.map((x: UserWalletRelation) => (x.target?.id !== data.target?.id ? x : data))
            console.log('update', data, oldData, newData);

            return {
                list: newData,
            }
        })
    }

    return <XFlex vertical gap={10} padding={15} block>
        <XList
            title={
                <Create onCreated={refresh}>
                    <Button icon={<PlusOutlined/>} type={'dashed'}>{t('addFollowingWallet')}</Button>
                </Create>
            }
            gap={10}
            dataSource={data?.list}
            renderItem={(x: UserWalletRelation, index: number) => {
                return <FollowingWalletItem data={x} onRemove={onRemove} onUpdate={onUpdate}/>
            }}/>

    </XFlex>
}

export default FollowingWalletList;
