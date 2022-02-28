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
            title: '标题',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,
            tip: '标题过长会自动收缩',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            title: '状态',
            dataIndex: 'state',
            filters: true,
            onFilter: true,
            valueType: 'select',
            valueEnum: {
                all: { text: '全部', status: 'Default' },
                open: {
                    text: '未解决',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                    disabled: true,
                },
                processing: {
                    text: '解决中',
                    status: 'Processing',
                },
            },
        },
        {
            title: '标签',
            dataIndex: 'labels',
            search: false,
            renderFormItem: (_, { defaultRender }) => {
                return defaultRender(_);
            },
            render: (_, record) => (
                <Space>
                    {record.labels.map(({ name, color }) => (
                        <Tag color={color} key={name}>
                            {name}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'created_at',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        startTime: value[0],
                        endTime: value[1],
                    };
                },
            },
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