import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';


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
            title: '姓名',
            dataIndex: 'name',
            copyable: true,
            ellipsis: true,
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            copyable: true,
            ellipsis: true,
        },
        {
            title: '结果',
            dataIndex: 'resut',
            copyable: true,
            ellipsis: true,
        },
        {
            title: '创建时间',
            key: 'create_time',
            dataIndex: 'create_time',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [

            ],
        },
    ];


    return <>
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => {

            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
        />
    </>
}
export default Page;