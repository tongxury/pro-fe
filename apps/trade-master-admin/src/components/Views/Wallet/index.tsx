import {Typography} from "antd";
import {shorten} from "@pro/chain";


const WalletView = ({data}: { data: any }) => {
    return <Typography.Text strong copyable={{text: data?._id}}>{shorten(data?._id)}</Typography.Text>
}

export default WalletView;