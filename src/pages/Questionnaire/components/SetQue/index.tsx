import React, { useCallback, useRef, useState } from 'react';
import FullModal from '@/components/FullscreenModal';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import AddTopic from './child/AddTopic';
import AddAnswer from './child/AddAnswer';
import SetParams from './child/SetParams';
import { getTopicList, updateAnswer, updateTopic } from '../../service';

interface PageProps {
    visible: boolean;
    onClose: () => void;
    data: any;
}

interface TableListItem {
    id: number;
    title: string;
    status: string;
    createBy: string;
    updateBy: string;
    update_time: string;
    create_time: string;
}

const Page: React.FC<PageProps> = ({ onClose, visible, data }) => {
    const [addVisiable, setVisiable] = useState<boolean>(false);
    const [addSubVisi, setAddSubVisi] = useState<boolean>(false);
    const [paramVisi, setParamVisi] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<any>(null);
    const [selectSub, setSelectSub] = useState<any>(null);

    const okHanlder = useCallback(() => { }, []);

    const ref = useRef<FormInstance>();
    const tableRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        { title: '序号', dataIndex: 'index', valueType: 'index', width: 80, },
        {
            title: '题目',
            dataIndex: 'title',
            key: 'title',
            hideInSearch: true,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            hideInSearch: true,
        },
        {
            title: '类型',
            width: 100,
            dataIndex: 'type',
            valueEnum: {
                1: { text: '单选' },
                2: { text: '多选' },
                3: { text: '其他' },
            },
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
                    }}>添加答案</Button>
                    <Button onClick={() => {
                        setSelectItem(record);
                        setVisiable(true);
                    }} style={{ marginLeft: 10 }} type="primary">修改</Button>
                    <Button onClick={() => {
                        Modal.confirm({
                            title: '温馨提示',
                            content: '是否要删除:' + record.title,
                            onOk: () => {
                                return updateTopic({
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
                    { title: '序号', dataIndex: 'index', valueType: 'index', width: 80 },
                    { title: '答案', dataIndex: 'title', key: 'title' },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        key: 'operation',
                        width: 200,
                        valueType: 'option',
                        render: (_, record) => [<a onClick={() => {
                            setSelectSub(record)
                            setAddSubVisi(true);
                        }}>修改</a>, <a onClick={() => {
                            Modal.confirm({
                                title: '温馨提示',
                                content: '是否要删除:' + record.title,
                                onOk: () => {
                                    return updateAnswer({
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
        <FullModal title="整单调整"
            destroyOnClose
            visible={visible}
            onCancel={() => onClose()}
            // onOk={okHanlder}
            cancelText="关闭"
        >
            <ProTable<TableListItem>
                search={false}
                // rowSelection={rowSelection}
                columns={columns}
                actionRef={tableRef}
                expandable={{
                    expandedRowRender: (record) => {
                        return expandedRowRender(record)
                    }
                }}
                request={() => {
                    return getTopicList({ id_que: data.id }).then((res) => {
                        return Promise.resolve({
                            data: res.data,
                        });
                    });
                }
                }
                rowKey="id"
                pagination={false}
                formRef={ref}
                toolBarRender={() => [
                    // eslint-disable-next-line react/jsx-key
                    <Button
                        type="primary"
                        onClick={() => {
                            // setAddVisible(true);
                            // history.push('/questionnaire/add')
                            setSelectItem(null);
                            // setSelectItem(null);
                            setVisiable(true);
                        }}
                    >
                        添加问题
                    </Button>
                ]}
                options={false}
                dateFormatter="string"
            />
            {addVisiable && <AddTopic queData={data} data={selectItem} visiable={addVisiable} onClose={() => {
                setVisiable(false);
            }} onRefresh={() => {
                tableRef.current?.reload();
                setVisiable(false);
            }} />}
            {addSubVisi && <AddAnswer topicItem={selectItem} data={selectSub} visiable={addSubVisi} onClose={() => {
                setAddSubVisi(false);
            }} onRefresh={() => {
                tableRef.current?.reload();
                setAddSubVisi(false);
            }} />}
            {paramVisi && <SetParams onRefresh={() => {

            }} onClose={() => {
                setParamVisi(false);
            }} data={selectSub} visiable={paramVisi} />}
        </FullModal>
    </>
}
export default Page;