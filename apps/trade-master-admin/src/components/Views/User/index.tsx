import {Typography} from "antd";

const UserView = ({data: {nickname, _id}}: any) => {
    return <Typography.Text>
        {nickname} ({_id})
    </Typography.Text>
}

export default UserView;
