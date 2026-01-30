import {useXTheme, XFlex, XText} from "@pro/ui";
import {shorten} from "@pro/chain";
import {deleteFollowingWallets} from "@/api/api.ts";
import {UserWalletRelation} from "@/types";
import IconFont from "@/components/Iconfont";
import Edit from "@/components/FollowingWallet/Edit.tsx";

function FollowingWalletItem({data, onRemove, onUpdate}: {
    data: UserWalletRelation,
    onRemove?: (data: UserWalletRelation) => void
    onUpdate?: (data: UserWalletRelation) => void
}) {


    const {themeVars} = useXTheme()

    const onDelete = (id: string) => {
        deleteFollowingWallets({id}).then(result => {
            onRemove?.(data)
        })
    }

    return <XFlex vertical padding={10} gap={8} borderRadius={10} bordered>
        <XFlex align={'center'} justify={'space-between'}>
            <XText>{shorten(data.target?.id)}</XText>
            {/*<XFlex align={'center'} gap={10}>*/}

            {/*    <Switch onClick={onUpdateAutoFollow} checkedChildren={t('autoFollow')} unCheckedChildren={t('noFollow')}*/}
            {/*            checked={data.relation?.tags?.includes("autoFollow")}/>*/}
            {/*</XFlex>*/}
        </XFlex>

        {/*<Typography.Text*/}
        {/*    style={{color: themeVars.colorTextL2, lineHeight: 1}}*/}
        {/*    editable={{*/}
        {/*        tooltip: <></>,*/}
        {/*        text: data.wallet?.remark,*/}
        {/*        onChange: onUpdateRemark,*/}
        {/*    }}>*/}
        {/*    {data.wallet?.remark || data.wallet?._id}*/}
        {/*</Typography.Text>*/}
        <XText color={themeVars.colorTextL2}>{data.remark || ''}</XText>
        <XFlex align={'center'} gap={10}>
            <Edit initialValues={{ wallet: data.target?.id, remark: data.remark}}
                  onEdited={onUpdate}
            >
                <IconFont size={15} name={'edit-line'} color={themeVars.colorTextL2} style={{cursor: 'pointer'}}/>
            </Edit>

            {/*<IconFont size={15} name={'delete-bin-6-line'} onClick={() => onDelete(data._id)}*/}
            {/*          color={themeVars.colorTextL2}*/}
            {/*          style={{cursor: 'pointer'}}/>*/}
        </XFlex>
    </XFlex>
}

export default FollowingWalletItem;
