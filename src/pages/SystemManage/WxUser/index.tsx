import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getWxUserList } from '../service';

const Page: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<any>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            hideInSearch: true,
            render: (t) => {
                if (t === 0) {
                    return '男'
                }
                return '女'
            }
        },
        {
            title: '手机',
            dataIndex: 'mobile',
        },
        {
            title: '创建时间',
            key: 'ctime',
            hideInSearch: true,
            dataIndex: 'ctime',
            valueType: 'dateTime'
        },
    ];


    return <>
        <ProTable<any>
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}) => {
                const p = {
                    ...params,
                    page: params.current,
                };
                delete p.current;
                return getWxUserList(p).then((res) => {
                    return Promise.resolve({
                        data: res.data.resultData,
                        total: res.data.totalRow,
                    });
                });
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="微信用户"
        />
    </>
}
export default Page;