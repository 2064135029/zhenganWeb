import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { message, Modal, notification } from 'antd';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}


const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  // const authHeader = { Authorization: '' };
  // // console.log('====auth_token====',localStorage.getItem('auth_token'));
  const authHeader = { token: localStorage.getItem('token') || '' };
  if (options.noToken) {
    authHeader.token = null;
  }

  // eslint-disable-next-line no-param-reassign
  options.cache = 'no-cache';
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

const ResponseInterceptors = async (response: Response, options: RequestOptionsInit) => {
  // console.log('-------1----------');
  const { responseType } = options;

  console.log(response.status);
  // message.error(codeMaps[response.status] || '服务异常');
  if (responseType === 'blob') {
    // console.log('--------4---------');
    return Promise.resolve(response);
  }

  if (response.status === 200) {
    const res = await response.clone().json();
    // console.log('-------2----------');
    // console.log('返回结果', res);
    const { msg, status } = res;
    if (status === 0) {
      return Promise.resolve({
        ...res,
        success: true
      });
    }
    // if (code === 12001 || code === 12016) {
    //   message.error(msg);
    //   localStorage.auth_token = '';
    //   if (history.location.pathname.indexOf('home') >= 0) {
    //     // PubSub.publish('login', res);
    //   } else {
    //     history.push('/user/login');
    //   }
    //   return Promise.reject(res);
    // }

    Modal.warning({
      title: '温馨提示',
      content: msg,
    });
    return Promise.reject(res);
  }
  // message.error(codeMaps[response.status]);
  // console.log('--------3---------');
  // // console.log(response.status);
  // return codeMaps[response.status];// response;
  // message.error();
  console.log(response);
  notification.error({
    message: codeMaps[response.status] || '服务异常',
    description: response.url
  })
  return Promise.reject({});
};
export const request: RequestConfig = {
  timeout: 1000 * 60,
  errorConfig: {},
  prefix: '',
  middlewares: [],
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [ResponseInterceptors],
};


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    // links: isDev
    //   ? [
    //     <Link to="/umi/plugin/openapi" target="_blank">
    //       <LinkOutlined />
    //       <span>OpenAPI 文档</span>
    //     </Link>,
    //     <Link to="/~docs">
    //       <BookOutlined />
    //       <span>业务组件文档</span>
    //     </Link>,
    //   ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </>
      );
    },
    ...initialState?.settings,
  };
};
