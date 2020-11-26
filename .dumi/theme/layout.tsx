import React, { useEffect } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import { ConfigProvider } from 'antd';
import { IRouteComponentProps } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './layout.less';
moment.locale('zh-cn');

export default ({ children, ...props }: IRouteComponentProps) => {
  useEffect(() => {}, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout {...props}>{children}</Layout>
    </ConfigProvider>
  );
};
