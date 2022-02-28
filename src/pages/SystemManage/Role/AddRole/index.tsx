import React, { useRef, useState, useEffect } from 'react';
import { Form, Modal, Input, message, Select } from 'antd';
import { addRole, updateRole } from '../../service';
import { useRequest } from 'umi';

const { TextArea } = Input;


interface AddProps {
    visiable: boolean;
    onClose: () => void;
    onRefresh: () => void;
    data: any;
}
const Add: React.FC<AddProps> = ({ visiable, onClose, onRefresh, data }) => {
    const [form] = Form.useForm();

    const { loading, run: reqAdd } = useRequest(addRole, {
        manual: true,
        onSuccess: () => {
            onRefresh();
            message.success('操作成功')
        }
    })
    const { loading: updateLoading, run: reqUpdate } = useRequest(updateRole, {
        manual: true,
        onSuccess: () => {
            onRefresh();
            message.success('操作成功')
        }
    })
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [])
    return <>
        <Modal title={`${data ? '修改' : '新增'}`} visible={visiable} onCancel={() => onClose()} okButtonProps={{ loading: loading || updateLoading }} onOk={() => {
            form.validateFields().then(valuse => {
                if (data) {
                    reqUpdate({
                        ...valuse,
                        id: data.id
                    });
                    return;
                }
                reqAdd({
                    ...valuse,
                });
            })
        }}>
            <Form labelCol={{
                span: 5
            }} form={form}>
                <Form.Item label="角色名称" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="roleName">
                    <Input />
                </Form.Item>
                <Form.Item label="角色类型" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="type">
                    <Select options={[{ value: 1, label: '系统管理员' }, { value: 2, label: '操作员' }]} />
                </Form.Item>
                <Form.Item label="备注" rules={[{
                    required: false,
                    message: `请输入`,
                },]} name="remark">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>

    </>
}
export default Add;