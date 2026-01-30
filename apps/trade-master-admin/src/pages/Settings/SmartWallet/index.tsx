import {PageContainer} from '@ant-design/pro-components';
import {queryFollowingWallets, queryHotTokens} from '@/services';
import Update from "@/pages/Settings/SmartWallet/Update";
import {Card, List} from "antd";
import {useRequest} from "ahooks";
import TokenView from "@/components/Views/Token";
import AmountView from "@/components/Amount";


export default () => {

    const {data, loading, refresh} = useRequest(() => queryFollowingWallets({}),)

    return (<PageContainer>
            {/*<Summary />*/}
            <List
                header={ <Update onComplete={refresh}/>}
                loading={loading}
                grid={{gutter: 10,  xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4}}
                dataSource={data?.data?.list}
                renderItem={(x) => (
                    <List.Item>
                        <Card title={<TokenView data={x} />}>
                            <AmountView size={'sm'} data={x.price} type={'u'} />
                        </Card>
                    </List.Item>
                )}
            />

        </PageContainer>
    );
};
