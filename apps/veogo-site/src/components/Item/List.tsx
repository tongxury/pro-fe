import {useXTheme, XFlex, XText, XTextTabs} from "@pro/ui";
import {addQuickSession, listItems} from "@/api/api";
import {useInfiniteScroll} from "ahooks";
import {useRef, useState} from "react";
import {Col, Input, List, Row, Select, Skeleton, Tabs} from "antd";
import ItemView from "@/components/Item/ItemView";
import {useRouter} from "@/hooks/useRouter";

const ItemList = () => {


    const {themeVars} = useXTheme();

    const categories = [
        {label: '全部', value: 'all',},
        {label: '财经', value: '财经',},
        {label: 'AI', value: 'AI',},
        {label: '大健康', value: '大健康',},
        {label: '职场', value: '职场',},
        {label: '情感', value: '情感',},
        {label: '科技数码', value: '科技数码',},
        {label: '家居', value: '家居',},
        {label: '美食', value: '美食',},
        {label: '母婴育儿', value: '母婴育儿',},
        {label: '医美护肤', value: '医美护肤',},
        {label: '珠宝', value: '珠宝',},
        {label: '移民留学', value: '移民留学',},
        {label: '财富保险', value: '财富保险',},
        {label: '房地产', value: '房地产',},

    ]

    const [category, setCategory] = useState<string>(categories[0].value)

    const ref = useRef<HTMLDivElement>(null);

    const router = useRouter()

    const {data, loading, loadMore, loadingMore, noMore} = useInfiniteScroll<any>(
        (d) => listItems({category: category === 'all' ? '' : category, page: (d?.page || 0) + 1}).then(r => r.data),
        {
            target: ref,
            threshold: 300,
            isNoMore: (d) => !d?.hasMore,
            // manual: true
            reloadDeps: [category]
        }
    );


    const [reportLoadingItemId, setReportLoadingItemId] = useState(undefined);

    const [playingId, setPlayingId] = useState(false);

    const onViewReport = (item: any) => {

        if (reportLoadingItemId) return;

        setReportLoadingItemId(item._id);

        addQuickSession({itemId: item._id}).then(result => {
            if (!result.code && result?.data?._id) {
                router.push(`/scenes/analysis/sessions/${result?.data?._id}`);
            } else {
                setReportLoadingItemId(undefined);
            }
        })
    }

    if (loading) {
        return <div ref={ref} style={{overflowY: 'scroll', padding: 10}}>
            <Row gutter={[10, 10]}>
                {[1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((x: any, index: number) => {
                    return <Col key={index} xs={12} sm={12} md={12} lg={6} xl={4}>
                        <Skeleton.Button active block style={{height: 200, borderRadius: 8}}/>
                    </Col>
                })}
            </Row>
        </div>
    }
    return <XFlex vertical>

        <Tabs style={{padding: 15}} items={categories?.map(x => ({key: x.value, label: x.label}))}
              onChange={(key) => setCategory(key)}/>

        <div ref={ref} style={{overflowY: 'scroll', padding: 10, }}>
            <Row gutter={[10, 10]}>
                {data?.list?.map((x: any, index: number) => {
                    return <Col key={index} xs={12} sm={12} md={12} lg={6} xl={4}>
                        <ItemView data={x} onViewReport={() => onViewReport(x)}
                                  reportLoadingItemId={reportLoadingItemId}/>
                    </Col>
                })}
            </Row>
        </div>
    </XFlex>
}

export default ItemList;
