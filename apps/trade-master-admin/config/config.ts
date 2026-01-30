import {defineConfig} from '@umijs/max';

export default defineConfig({
    hash: true,
    request: {
        dataField: '',
    },
    antd: {
        dark: true,
    },
    access: {},
    model: {},
    initialState: {},
    layout: {
        title: '',
    },
    routes: [
        {
            path: '/',
            redirect: '/users/list',
        },

        {
            name: '用户',
            icon: 'user',
            path: 'users',
            routes: [
                {
                    name: '列表',
                    path: '/users/list',
                    component: './User/List',
                },
            ],
        },
        {
            name: '交易',
            icon: 'UnorderedListOutlined',
            path: 'orders',
            routes: [
                {
                    name: '列表',
                    path: '/orders/list',
                    component: './Order/List',
                },
            ],
        },
        {
            name: '佣金',
            icon: 'PayCircleOutlined',
            path: 'withdrawals',
            routes: [
                {
                    name: '申请中',
                    path: '/withdrawals/applying',
                    component: './Withdrawal/Applying',
                },
                {
                    name: '已发放',
                    path: '/withdrawals/distributed',
                    component: './Withdrawal/Distributed',
                },
            ],
        },
        {
            name: '配置',
            icon: 'SettingOutlined',
            path: '/settings',
            routes: [
                {
                    name: 'Bot配置',
                    path: '/settings/app-settings',
                    component: './Settings/Settings',
                },
            ],
        },
        {
            path: '/login',
            component: './Auth',
            layout: false,
        },
    ],
    npmClient: 'yarn',
});
