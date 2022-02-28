import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getUserList, updateUser } from '../service';
import AddUser from './AddUser';
import { useRequest } from 'umi';

type GithubIssueItem = {

};
const Page: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const [visiable, setVisiable] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState(null);

    const { run: reqUpdate } = useRequest(updateUser, {
        fetchKey: arg => arg.id,
        manual: true,
        onSuccess: () => {
            message.success('操作成功')
            actionRef.current?.reload();
        }
    })


    const columns: ProColumns<GithubIssueItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '用户名称',
            dataIndex: 'userName'
        },
        {
            title: '角色',
            dataIndex: 'roleName',
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
            width: 180,
            valueType: 'option',
            render: (_, record: any) => {
                return <>
                    <Button disabled={record.canEdit == 0} type="primary" onClick={() => {
                        setSelectItem(record)
                        setVisiable(true)
                    }}>修改</Button>

                    {record.status == 0 && <Button disabled={record.canEdit == 0} style={{ marginLeft: 10 }} type="primary" onClick={() => {

                        Modal.confirm({
                            title: '温馨提示',
                            content: `确定要启用：${record.userName}吗?`,
                            onOk: () => {
                                return reqUpdate({
                                    status: 1,
                                    id: record.id
                                })
                            }
                        })

                    }}>启用</Button>}

                    {record.status == 1 && <Button disabled={record.canEdit == 0} onClick={() => {
                        Modal.confirm({
                            title: '温馨提示',
                            content: `确定要停用：${record.userName}吗?`,
                            onOk: () => {
                                return reqUpdate({
                                    status: 0,
                                    id: record.id
                                })
                            }
                        })
                    }} style={{ marginLeft: 10 }} type="primary" danger>停用</Button>}

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
            rowKey="id"
            search={false}
            pagination={false}
            dateFormatter="string"
            headerTitle="系统用户"
            toolBarRender={() => [
                <Button
                    type="primary"
                    onClick={() => {
                        setVisiable(true)
                    }}
                >
                    新增
                </Button>
            ]}
        />
        {visiable && <AddUser data={selectItem} visiable={visiable} onRefresh={() => {
            actionRef.current?.reload();
            setVisiable(false)
        }} onClose={() => {
            setVisiable(false)
        }} />}
    </>
}
export default Page;