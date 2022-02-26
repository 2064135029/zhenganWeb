import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { getQueList, updateQue } from './service';
import { history, useRequest } from 'umi';

export interface TableListItem {
    id: number;
    title: string;
    status: string;
    createBy: string;
    updateBy: string;
    update_time: string;
    create_time: string;
}

const Page: React.FC = () => {
    const ref = useRef<FormInstance>();
    const tableRef = useRef<ActionType>();
    const [collapsed, setCollapsed] = useState(false);
    const { fetches, run: reqUpdate } = useRequest(updateQue, {
        manual: true,
        fetchKey: p => p.id,
        onSuccess: () => {
            message.success('修改成功');
            tableRef.current?.reload();
        }
    });
    // const [addVisible, setAddVisible] = useState<boolean>(false);

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '标题',
            dataIndex: 'title',
            render: (text, record) => {
                return <a onClick={() => {

                }}>{text}</a>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                0: { text: '待发布', status: 'Default' },
                1: { text: '已发布', status: 'Success' },
            },
        },
        {
            title: '创建人',
            dataIndex: 'createByName',
            hideInSearch: true,

        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            hideInSearch: true,
            valueType: 'dateTime',
        },
        {
            title: '修改时间',
            dataIndex: 'update_time',
            hideInSearch: true,
            valueType: 'dateTime',
        },
        {
            title: '修改人',
            dataIndex: 'updateByName',
            hideInSearch: true
        },
        {
            title: '操作',
            key: 'option',
            width: 160,
            valueType: 'option',
            render: (_, record) => {
                return <>
                    <Button loading={fetches[record.id]?.loading} type="primary" onClick={() => {
                        // reqUpdate({
                        //     id: record.id,
                        //     status: 1,
                        // })
                    }}>配置</Button>
                    <Button onClick={() => {
                        // reqUpdate({
                        //     id: record.id,
                        //     status: 0,
                        // })
                        history.push({
                            pathname: '/questionnaire/add',
                            query: {
                                id: record.id
                            }
                        });
                    }} style={{ marginLeft: 10 }} type="primary">修改</Button>
                </>
            }
        },
    ];
    return <>
        <ProTable<TableListItem>
            columns={columns}
            actionRef={tableRef}
            request={(params) => {
                const p = {
                    ...params,
                    page: params.current,
                };
                delete p.current;
                return getQueList(p).then((res) => {
                    console.log(res);
                    return Promise.resolve({
                        data: res.data.resultData,
                        total: res.data.totalRow,
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
                <Button type="primary">
                    发布
                </Button>,
                <Button type="primary" danger>
                    撤销
                </Button>,
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