import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel, useRequest } from 'umi';
// import Footer from '@/components/Footer';
// // import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { login } from '../service';
const md5 = require('md5');

import styles from './index.less';
const logo = require('@/assets/logo.png')

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');



  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const { loading, run: reqLogin } = useRequest(login, {
    manual: true,
    onSuccess: () => {
      console.log('++++++++++');
      history.push('/');
      fetchUserInfo();
    }
  });

  const handleSubmit = async (values: API.LoginParams) => {
    return reqLogin({ ...values, password: md5(values.password) });
    // try {
    //   // 登录
    //   const msg = await login({ ...values, type });
    //   if (msg.status === 'ok') {
    //     const defaultLoginSuccessMessage = intl.formatMessage({
    //       id: 'pages.login.success',
    //       defaultMessage: '登录成功！',
    //     });
    //     message.success(defaultLoginSuccessMessage);
    //     await fetchUserInfo();
    //     /** 此方法会跳转到 redirect 参数所在的位置 */
    //     if (!history) return;
    //     const { query } = history.location;
    //     const { redirect } = query as { redirect: string };
    //     history.push(redirect || '/');
    //     return;
    //   }
    //   console.log(msg);
    //   // 如果失败去设置用户错误信息
    //   setUserLoginState(msg);
    // } catch (error) {
    //   const defaultLoginFailureMessage = intl.formatMessage({
    //     id: 'pages.login.failure',
    //     defaultMessage: '登录失败，请重试！',
    //   });
    //   message.error(defaultLoginFailureMessage);
    // }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={logo} />}
          title="正安公益"
          initialValues={{
            autoLogin: true,
          }}
          // submitter={{
          //   submitButtonProps: { loading: loading }
          // }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}

          <div className={styles.logo}>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: admin or user',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </div>

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </LoginForm>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
