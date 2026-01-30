import moment from "moment";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);


export const formatTime = (time?: number): string => {
    if (!time) return '-'
    return moment(time * 1000).format('yyyy-MM-DD HH:mm:ss')
}

export const formatTimeFromNow = (time: number, locale?: string) => {

    if (!time) return '-'

    return moment((time || 0) * 1000).locale(locale || 'en').fromNow()

    // const t = dayjs(time*1000, { locale: 'zh-cn' });
    //
    // console.log('formatTimeFromNow', t.locale());
    // // 返回相对时间格式
    // return t.fromNow(true);

    // if (!time) return ''
    //
    //
    // console.log('formatTimeFromNow', time, locale,)
    // console.log('formatTimeFromNow 1',  DateTime.fromSeconds(parseInt(time)).toSeconds())
    //
    //
    // const diffSeconds = Math.abs(DateTime.now().toSeconds() - DateTime.fromSeconds(time).toSeconds())
    //
    // if (diffSeconds < 0) {
    //     return DateTime.fromSeconds(DateTime.now().toSeconds()).setLocale(locale).toRelativeCalendar({unit: 'seconds'})
    // } else if (diffSeconds < 60) {
    //     return DateTime.fromSeconds(time).setLocale(locale).toRelativeCalendar({unit: 'seconds'})
    // } else if (diffSeconds < 60 * 60) {
    //     return DateTime.fromSeconds(time).setLocale(locale).toRelativeCalendar({unit: 'minutes'})
    // } else if (diffSeconds < 60 * 60 * 24) {
    //     return DateTime.fromSeconds(time).setLocale(locale).toRelativeCalendar({unit: 'hours'})
    // } else if (diffSeconds < 60 * 60 * 24 * 30) {
    //     return DateTime.fromSeconds(time).setLocale(locale).toRelativeCalendar({unit: 'hours'})
    // } else if (diffSeconds < 60 * 60 * 24 * 30 * 12) {
    //     return DateTime.fromSeconds(time).setLocale(locale).toRelativeCalendar({unit: 'months'})
    // }
}
