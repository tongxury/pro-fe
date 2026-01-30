import { RequestConfig } from '@@/plugin-request/request';
import { notification } from 'antd';
import { RunTimeLayoutConfig } from '@umijs/max';
import { history } from 'umi';
import logo from '@/assets/logo.png'
import {APP_NAME} from "@/constants";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: logo,
    title: APP_NAME,
    menu: {
      locale: false,
    },
    siderWidth: 200
  };
};

// export const render = (oldRender)  => {
//    oldRender()
// }

export const request: RequestConfig = {
  // timeout: 1000,
  // headers: { 'Authorization': localStorage.getItem('_mgmt_auth_token') || '' },
  errorConfig: {
    errorHandler: (error, opts) => {
      notification.error({
        message: '请求失败',
        description: error?.message,
      });

      console.error(error);
    },
    errorThrower: (res) => {
      console.log(res);
    },
  },
  requestInterceptors: [
    (url: string, options: any) => {
      const ops = { ...options, headers: { Authorization: localStorage.getItem('_mgmt_auth_token') || '' } };

      return { url: `${process.env.API_URL || ''}${url}`, options: ops };
    },
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    [(response: any) => {
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      const { d } = response;

      console.log('response ', response);
      // history.push('/login')
      if (response.data.code === "UNAUTHORIZED") {
        history.push('/login');
      }


      return response;
    }],

    // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    // [(response) => {return response}, (error) => {return Promise.reject(error)}],
    // // 数组，省略错误处理
    // [(response) => {return response}]
  ],
};
