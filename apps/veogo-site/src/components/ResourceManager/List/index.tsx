import {fetchResources, useFetchResources} from "@/api/api";
import {useXTheme, XFlex, XList} from "@pro/ui";
import {Card, Skeleton} from "antd";
import {CSSProperties, useState} from "react";


const ResourceList = ({style}: { style?: CSSProperties }) => {


    const {themeVars} = useXTheme()

    const [data, {loading}] = useFetchResources()

    const [selected, setSelected] = useState()

    return (
        <XList
            style={{...style, width: '100%', maxHeight: 500, overflowY: 'scroll'}}
            dataSource={data?.list || []}
            loading={loading}
            skeleton={{count: 4, view: <Skeleton.Button style={{height: 60}} block/>}}
            renderItem={(val, index) => {
                return <Card
                    style={{
                        border: selected === val.id ? '1px solid ' + themeVars.colorPrimary : ''
                    }}
                    key={index} onClick={() => {
                    setSelected(val.id)
                }}>
                    {val.name}
                </Card>
            }}
            gap={10}>
        </XList>
    )
}


export default ResourceList;
