import { getUsersSummary } from '@/services';
import { StatisticCard } from '@ant-design/pro-components';
import { useRequest } from '@@/exports';

export default () => {

  const { data, loading } = useRequest(getUsersSummary, { formatResult: d => d.data });

  return <StatisticCard.Group direction={'row'} loading={loading}>
    <StatisticCard
      statistic={{
        title: '总人次',
        value: data?.totalCount,
      }}
    />
    <StatisticCard.Divider type={'vertical'} />
    <StatisticCard
      statistic={{
        title: '今日新增',
        value: data?.todayCount,
      }}
    />
  </StatisticCard.Group>;
}