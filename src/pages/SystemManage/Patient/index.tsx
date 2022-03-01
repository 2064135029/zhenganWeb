import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getWxPatientList } from '../service';
import { SectionAge } from '@/utils/enum';

const Page: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<any>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            hideInSearch: true,
            render: (t) => {
                if (t === 1) {
                    return '男'
                }
                return '女'
            }
        },
        {
            title: '手机',
            dataIndex: 'phone',
        },
        {
            title: '年龄段',
            dataIndex: 'section_age',
            hideInSearch: true,
            render: (t) => {
                const item = SectionAge.find(i => i.value == t);
                if (item) {
                    return item.label
                }
                return ''
            }
        },
        {
            title: '创建时间',
            key: 'create_time',
            hideInSearch: true,
            dataIndex: 'create_time',
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
                return getWxPatientList(p).then((res) => {
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