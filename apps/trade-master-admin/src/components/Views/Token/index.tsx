import {Flex, Typography} from "antd";


const TokenView = ({data}: {data: any}) => {
    return <Flex align={'center'} gap={8}>
        <img src={data?.image} alt="logo" style={{borderRadius: '50%', width: 30, height: 30}}/>
        <Typography.Text style={{fontSize: 18}}>{data?.symbol}</Typography.Text>
    </Flex>
}

export default TokenView;
