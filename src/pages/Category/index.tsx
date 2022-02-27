
import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { getCategoryList, updateCate, updateSub } from './service';
import { history, useRequest } from 'umi';
import AddCate from './components/AddCate';
import AddSub from './components/AddSub';


interface TableListItem {
    id: number;
    title: string;
    status: string;
    createBy: string;
    updateBy: string;
    update_time: string;
    create_time: string;
}


const Page: React.FC = () => {
    const [addVisiable, setVisiable] = useState<boolean>(false);
    const [addSubVisi, setAddSubVisi] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<any>(null);
    const [selectSub, setSelectSub] = useState<any>(null);

    const ref = useRef<FormInstance>();
    const tableRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: '父类名称',
            dataIndex: 'name',
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
            width: 260,
            valueType: 'option',
            render: (_, record) => {
                return <>
                    <Button type="primary" onClick={() => {
                        setSelectItem(record);
                        setAddSubVisi(true);
                    }}>添加子类</Button>
                    <Button onClick={() => {
                        setSelectItem(record);
                        setVisiable(true);
                    }} style={{ marginLeft: 10 }} type="primary">修改</Button>
                    <Button onClick={() => {
                        Modal.confirm({
                            title: '温馨提示',
                            content: '是否要删除:' + record.name,
                            onOk: () => {
                                return updateCate({
                                    id: record.id,
                                    status: 2,
                                }).then(() => {
                                    message.success('删除成功');
                                    tableRef.current?.reload();
                                })
                            }
                        })

                    }
                    } style={{ marginLeft: 10 }} type="primary" danger>删除</Button>
                </>
            }
        },
    ];
    const expandedRowRender = (record) => {
        const data = record.sub;
        // for (let i = 0; i < 3; i += 1) {
        //     data.push({
        //         key: i,
        //         date: '2014-12-24 23:12:00',
        //         name: 'This is production name',
        //         upgradeNum: 'Upgraded: 56',
        //     });
        // }
        return (
            <ProTable
                columns={[
                    { title: '子类名称', dataIndex: 'name', key: 'name' },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        valueEnum: {
                            0: { text: '待发布', status: 'Default' },
                            1: { text: '已发布', status: 'Success' },
                        },
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        hideInSearch: true,
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        key: 'operation',
                        valueType: 'option',
                        render: (_, record) => [<a onClick={() => {
                            setSelectSub(record)
                        }}>修改</a>, <a onClick={() => {
                            Modal.confirm({
                                title: '温馨提示',
                                content: '是否要删除:' + record.name,
                                onOk: () => {
                                    return updateSub({
                                        id: record.id,
                                        status: 2,
                                    }).then(() => {
                                        message.success('删除成功');
                                        tableRef.current?.reload();
                                    })
                                }
                            })

                        }}>删除</a>],
                    },
                ]}
                headerTitle={false}
                search={false}
                options={false}
                dataSource={data}
                pagination={false}
            />
        );
    };

    return <>
        <ProTable<TableListItem>
            key="id"
            // rowSelection={rowSelection}
            columns={columns}
            actionRef={tableRef}
            expandable={{
                expandedRowRender: (record) => {
                    return expandedRowRender(record)
                }
            }}
            request={(params) => {
                const p = {
                    ...params,
                    page: params.current,
                };
                delete p.current;
                return getCategoryList(p).then((res) => {
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
            formRef={ref}
            toolBarRender={() => [
                // eslint-disable-next-line react/jsx-key
                <Button
                    type="primary"
                    onClick={() => {
                        // setAddVisible(true);
                        // history.push('/questionnaire/add')
                        setSelectItem(null);
                        setSelectItem(null);
                        setVisiable(true);
                    }}
                >
                    新增
                </Button>
            ]}
            options={false}
            dateFormatter="string"
        />
        {addVisiable && <AddCate data={selectItem} visiable={addVisiable} onClose={() => {
            setVisiable(false);
        }} onRefresh={() => {
            tableRef.current?.reload();
            setVisiable(false);
        }} />}
        {addSubVisi && selectItem && <AddSub data={selectSub} cateItem={selectItem} visiable={addSubVisi} onClose={() => {
            setAddSubVisi(false);
        }} onRefresh={() => {
            tableRef.current?.reload();
            setAddSubVisi(false);
        }} />}
    </>
}
export default Page;