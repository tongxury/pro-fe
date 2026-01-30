import {useXTheme, XFlex, XTextTabs} from "@pro/ui";
import {addQuickSession, listItems, listItemsV2} from "@/api/api";
import {useInfiniteScroll, useLocalStorageState} from "ahooks";
import {useRef, useState} from "react";
import {Col, Input, Row, Select, Skeleton, Button} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import ItemView from "@/components/Item/ItemView";
import IconFont from "@/components/Iconfont";
import { useRouter } from "@/hooks/useRouter";
import {useTranslation} from "@/hooks/useTranslation.ts";

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
    ];

    const [category, setCategory] = useState<string>(categories[0].value);
    const [platform, setPlatform] = useLocalStorageState('platform', {defaultValue: 'douyin'});
    const [searchValue, setSearchValue] = useState('');

    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const t = useTranslation();

    const platformOptions = [
        {value: 'douyin', label: t('douyin'), icon: <IconFont size={18} name={'douyin'}/>},
        {value: 'tiktok', label: t('tiktok'), icon: <IconFont size={18} name={'tiktok'}/>},
        {value: 'xiaohongshu', label: t('xiaohongshu'), icon: <IconFont size={18} name={'xiaohongshu'}/>},
    ];

    const {data, reload, loading, loadMore, loadingMore, noMore} = useInfiniteScroll<any>(
        (d) => listItemsV2({
            page: (d?.page || 0) + 1,
            platform: platform || 'douyin',
            keyword: searchValue
        }).then(r => r.data),
        {
            target: ref,
            threshold: 300,
            isNoMore: (d) => !d?.hasMore,
            reloadDeps: [category]
        }
    );

    const [reportLoadingItemId, setReportLoadingItemId] = useState(undefined);

    const onViewReport = (item: any) => {
        if (reportLoadingItemId) return;

        setReportLoadingItemId(item._id);

        addQuickSession({itemId: item._id}).then(result => {
            if (!result.code && result?.data?._id) {
                router.push(`/scenes/analysis/sessions/${result?.data?._id}`);
            } else {
                setReportLoadingItemId(undefined);
            }
        });
    };

    // 搜索处理函数
    const handleSearch = () => {
        // setSearchValue(searchInputRef.current?.input?.value || '');

        reload()
    };

    const searchInputRef = useRef(null);

    // 自定义平台选择渲染
    const customPlatformRender = (x: any) => (
        <XFlex align="center" gap={8}>
            {/*<span style={{ fontSize: '18px' }}>{option.icon}</span>*/}
            <IconFont name={x.value} size={18}/>
            <span>{x.label}</span>
        </XFlex>
    );

    // if (loading) {
    //     return <div ref={ref} style={{overflowY: 'scroll', padding: 10}}>
    //         <Row gutter={[10, 10]}>
    //             {[1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((x: any, index: number) => {
    //                 return <Col key={index} xs={12} sm={12} md={12} lg={6} xl={4}>
    //                     <Skeleton.Button active block style={{height: 200, borderRadius: 8}}/>
    //                 </Col>
    //             })}
    //         </Row>
    //     </div>;
    // }

    return (
        <XFlex vertical>
            {/* 美观高级的搜索框 */}
            <XFlex
                justify="center"
                style={{
                    padding: '24px 16px 16px',
                }}
            >
                <XFlex
                    align="center"
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '48px',
                        background: themeVars.colorBgPrimary,
                        borderRadius: '24px',
                        // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        padding: '0 6px 0 20px',
                        transition: 'all 0.3s ease',
                        border: `1px solid ${themeVars.colorBorder}`,
                    }}
                    gap={8}
                >
                    <Select
                        value={platform}
                        onChange={setPlatform}
                        options={platformOptions}
                        variant={'borderless'}
                        style={{
                            width: 110,
                        }}
                        // dropdownMatchSelectWidth={false}
                        // popupMatchSelectWidth
                        optionLabelProp="label"
                        labelRender={customPlatformRender}
                        optionRender={customPlatformRender}
                        suffixIcon={
                            <IconFont size={18}
                                name="arrow-down-s-line"
                                style={{
                                    fontSize: '12px',
                                    color: themeVars.colorTextL3 || '#999'
                                }}
                            />
                        }
                    />
                    <div
                        style={{
                            width: '1px',
                            height: '24px',
                            background: themeVars.colorBorder,
                            margin: '0 4px'
                        }}
                    />
                    <Input
                        ref={searchInputRef}
                        placeholder={`搜索${platformOptions.find(opt => opt.value === platform)?.label || ''}内容...`}
                        variant="borderless"
                        style={{
                            flex: 1,
                            fontSize: '14px',
                        }}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined/>}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: themeVars.colorPrimary || '#1890ff',
                            border: 'none',
                        }}
                        onClick={handleSearch}
                    />
                </XFlex>
            </XFlex>

            {/*/!* 分类选项卡 *!/*/}
            {/*<XTextTabs*/}
            {/*    options={categories}*/}
            {/*    value={category}*/}
            {/*    onChange={(value) => setCategory(value)}*/}
            {/*    style={{*/}
            {/*        padding: '0 16px 8px',*/}
            {/*    }}*/}
            {/*/>*/}

            {/* 内容列表 */}
            <div ref={ref} style={{overflowY: 'scroll', padding: 10, flex: 1}}>
                <Row gutter={[10, 10]}>
                    {data?.list?.map((x: any, index: number) => {
                        return <Col key={index} xs={12} sm={12} md={12} lg={6} xl={4}>
                            <ItemView
                                data={x}
                                onViewReport={() => onViewReport(x)}
                                reportLoadingItemId={reportLoadingItemId}
                            />
                        </Col>
                    })}
                </Row>
            </div>
        </XFlex>
    );
};

export default ItemList;
