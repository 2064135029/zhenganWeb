import React, { useRef, useState } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { getQueList } from './service';
import AddQue from './components/AddQue';
import { history } from 'umi';

export interface TableListItem {
    key: number;
    name: string;
    status: string;
    updatedAt: number;
    createdAt: number;
    progress: number;
    money: number;
}

const Page: React.FC = () => {
    const ref = useRef<FormInstance>();
    const [collapsed, setCollapsed] = useState(false);
    const [addVisible, setAddVisible] = useState<boolean>(false);

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                0: { text: '已撤销', status: 'Default' },
                1: { text: '已发布', status: 'Success' },
            },
        },
        {
            title: '创建人',
            dataIndex: 'createBy',
            hideInSearch: true
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            hideInSearch: true
        },
        {
            title: '修改人',
            dataIndex: 'updateBy',
            hideInSearch: true
        },
        {
            title: '操作',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: () => {
                return <>
                    <Button>发布</Button>
                    <Button>撤销</Button>
                </>
            }
        },
    ];
    return <>
        <ProTable<TableListItem>
            columns={columns}
            request={(params) => {
                const p = {
                    ...params,
                    page: params.current,
                };
                delete p.current;
                return getQueList(p).then((res) => {
                    return Promise.resolve({
                        data: res.resultData,
                        total: res.totalRow,
                    });
                });
            }
            }
            rowKey="id"
            pagination={{
                showSizeChanger: true,
            }}
            search={{
                collapsed,
                onCollapse: setCollapsed,
            }}
            formRef={ref}
            toolBarRender={() => [
                // eslint-disable-next-line react/jsx-key
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
            options={false}
            dateFormatter="string"
        />
        {/* <AddQue visible={addVisible} /> */}
    </>
}
export default Page;