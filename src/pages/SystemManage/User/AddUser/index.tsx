import React, { useRef, useState, useEffect } from 'react';
import { Form, Modal, Input, message, Select } from 'antd';
import { addUser, updateUser, getRoles } from '../../service';
import { useRequest } from 'umi';
const md5 = require('md5');
const { TextArea } = Input;


interface AddProps {
    visiable: boolean;
    onClose: () => void;
    onRefresh: () => void;
    data: any;
}
const Add: React.FC<AddProps> = ({ visiable, onClose, onRefresh, data }) => {
    const [form] = Form.useForm();

    const { data: roles = [] } = useRequest(getRoles);
    const { loading, run: reqAdd } = useRequest(addUser, {
        manual: true,
        onSuccess: () => {
            onRefresh();
            message.success('操作成功')
        }
    })
    const { loading: updateLoading, run: reqUpdate } = useRequest(updateUser, {
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
                    password: md5(valuse.password)
                });
            })
        }}>
            <Form labelCol={{
                span: 5
            }} form={form}>
                <Form.Item label="用户名" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="userName">
                    <Input disabled={!!data} />
                </Form.Item>
                <Form.Item label="邮箱" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="角色" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="roleId">
                    <Select options={roles.map(i => {
                        return {
                            label: i.roleName,
                            value: i.id
                        }
                    })} />
                </Form.Item>
                {!data && <Form.Item rules={[{
                    required: true,
                    message: `请输入`,
                },]} label="密码" name="password">
                    <Input.Password />
                </Form.Item>}

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