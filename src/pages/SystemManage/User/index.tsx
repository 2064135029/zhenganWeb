import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getUserList } from '../service';

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};
const Page: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            copyable: true,
            ellipsis: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '停用',
                    status: 'Error',
                },
                1: {
                    text: '启用',
                    status: 'Success',
                    disabled: true,
                },
            },
        },
        {
            title: '创建时间',
            key: 'create_time',
            dataIndex: 'create_time',
            valueType: 'dateTime',
        },
        {
            title: '操作',
            width: 160,
            valueType: 'option',
            render: (_, record) => {
                return <>
                    <Button type="primary" onClick={() => {
                    }}>启用</Button>
                    <Button onClick={() => {
                    }} style={{ marginLeft: 10 }} type="primary" danger>停用</Button>
                </>
            }
        },
    ];


    return <>
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            request={async () => {
                return getUserList().then((res) => {
                    console.log(res);
                    return Promise.resolve({
                        data: res.data.resultData,
                        total: res.data.totalRow,
                    });
                });
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
            }}
            rowKey="id"
            search={false}
            pagination={{
                pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="系统用户"
            toolBarRender={() => [
                <Button
                    type="primary"
                    onClick={() => {
                        // setAddVisible(true);
                        history.push('/questionnaire/add')
                    }}
                >
                    新增
                </Button>
            ]}
        />
    </>
}
export default Page;