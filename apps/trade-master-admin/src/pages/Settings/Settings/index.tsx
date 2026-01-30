import {PageContainer} from '@ant-design/pro-components';
import {queryAppSettings, updateAppSettings} from '@/services';
import {useRequest} from "ahooks";
import {JsonEditor} from 'json-edit-react'


export default () => {

    const {data, loading, mutate} = useRequest(() => queryAppSettings({}),)

    const onUpdate = ({newData}: { newData: any }) => {
        updateAppSettings(newData).then(r => {
            if (Object.keys(r.data || {})?.length > 0) {
                mutate(r)
            }
        })
    }

    return (<PageContainer loading={loading}>
            {/*<Summary />*/}
            <JsonEditor
                minWidth={800}
                collapse={false}
                onUpdate={onUpdate}
                data={data?.data || {}}
            />
        </PageContainer>
    );
};

