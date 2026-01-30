import {List, Tooltip} from "antd";
import React from "react";


const MyList = ({dataSource, loading, ...rest}: { dataSource?: any[], loading?: boolean }) => {


    // if (loading && !dataSource) {
    //
    //     return <List
    //         {...rest}
    //         dataSource={Array.from({length: 10})}
    //         renderItem={(x: any) => (
    //             <List.Item>
    //                 <div className={'h-[200px] w-full rounded-lg'}></div>
    //             </List.Item>
    //         )}
    //     />
    //
    // }

    return (
        <List
            {...rest}
        />
    )
}

export default MyList
