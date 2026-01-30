import {PageContainer, ProFormSelect, QueryFilter} from "@ant-design/pro-components";
import {Button, Card, Flex, List, Tag, Typography} from "antd";
import moment from "moment";
import {useUrlParams} from "@/hooks/url_state";
import {useRequest} from "@@/plugin-request";
import {queryChatRecords} from "@/services";
import {ProFormDateTimeRangePicker} from "@ant-design/pro-form";

const ChatRecords = () => {

    const {params: urlParams, setParams, reset} = useUrlParams()

    const {data, loading, loadingMore, loadMore,} = useRequest((d) => queryChatRecords({
        page: (d?.page || 0) + 1,
        size: 3, ...urlParams,
        functions: Array.isArray(urlParams?.function) ? (urlParams?.function || []).join(',') : urlParams?.function,
        dateRange: (urlParams?.dateRange || []).join(',')
    }), {
        loadMore: true,
        formatResult: d => d.data,
        refreshDeps: [urlParams]
    })

    console.log('urlParams', urlParams)

    const functionOptions = [
        "image chat",
        "normal chat",
        "search_general",
        "scholar_qa",
        "general_chat",
        "quotation chat",
        "test_generation",
        "writing_guide",
        "document_qa",
        "youtube_summary",
        "youtube_sub_transcript",
        "youtube_highlight",
        "qc-Explain",
        "qc-Answer question",
        "qc-Summarize-Summarize",
        "qc-Translate",
        "qc-Paraphrase",
        "qc-Improve writing",
        "qc-Fix spelling",
        "qc-Change length-Make shorter",
        "qc-Change tone-Professional",
        "qc-Change length-Make longer",
    ]

    const loadMoreComponent = !loading && !loadingMore ? (
        <Flex style={{marginTop: 30, width: '100%', justifyContent: 'center'}}><Button
            onClick={loadMore}>loading more</Button></Flex>
    ) : null;

    return <PageContainer ghost>
        <Card>

            <List
                loading={loading}
                // itemLayout="horizontal"
                loadMore={loadMoreComponent}
                header={
                    <QueryFilter
                        // @ts-ignore
                        optionRender={() => <div></div>}
                        initialValues={{...urlParams}}
                        onReset={reset}
                        // @ts-ignore
                        onFinish={(values) => setParams({...values})}
                        split
                        defaultCollapsed={false}
                        span={12}
                        onValuesChange={(values) => {
                            if (Object.keys(values).length === 0) {
                                reset()
                            } else {
                                setParams({...values})
                            }
                        }}>
                        <ProFormSelect
                            fieldProps={{mode: 'multiple'}}
                            options={functionOptions.map(t => ({value: t, label: t}))}
                            name="function" label="function"/>
                        <ProFormDateTimeRangePicker name="dateRange" label="时间"/>
                    </QueryFilter>}

                dataSource={data?.list || []}
                renderItem={(x: any) => (
                    <List.Item>
                        <Flex vertical gap={10}>
                            <Flex gap={10}>
                                <div>{x.chatRecord?.functionName?.toUpperCase()}</div>
                                <Tag>{moment(x.chatRecord?.eventTime * 1000).fromNow()}</Tag>
                                <Tag>{x.chatRecord?.userId}</Tag>
                            </Flex>
                            <Typography>
                                <Typography.Text style={{fontWeight: "bold"}}>问题: </Typography.Text>
                                {x.chatRecord?.queryFull}</Typography>
                            <Typography>
                                <Typography.Text style={{fontWeight: "bold"}}>回答: </Typography.Text>
                                {x.chatRecord?.answerFull}</Typography>
                            <Typography>
                                <Typography.Text style={{fontWeight: "bold"}}>URL: </Typography.Text>
                                {x.chatRecord?.url}</Typography>
                        </Flex>
                    </List.Item>
                )}
            />
        </Card>

    </PageContainer>
}

export default ChatRecords