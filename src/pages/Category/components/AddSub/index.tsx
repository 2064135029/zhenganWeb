import React, { useRef, useState, useEffect } from 'react';
import { Form, Modal, Input, message } from 'antd';
import { addSubClass, updateSub } from '../../service';
import { useRequest } from 'umi';

const { TextArea } = Input;


interface AddProps {
    visiable: boolean;
    onClose: () => void;
    onRefresh: () => void;
    cateItem: any;
    data: any;
}
const Add: React.FC<AddProps> = ({ visiable, onClose, onRefresh, cateItem, data }) => {
    const [form] = Form.useForm();
    const { loading, run: reqAdd } = useRequest(addSubClass, {
        manual: true,
        onSuccess: () => {
            onRefresh();
            message.success('操作成功')
        }
    })
    const { loading: updateLoading, run: reqUpdate } = useRequest(updateSub, {
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
        <Modal title={`${data ? '修改' : '新增'}${cateItem.name}子类`} visible={visiable} onCancel={() => onClose()} okButtonProps={{ loading: loading || updateLoading }} onOk={() => {
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
                    id_category: cateItem.id
                });
            })
        }}>
            <Form labelCol={{
                span: 5
            }} form={form}>
                <Form.Item label="子类目名称" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="备注" name="remark">
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>

    </>
}
export default Add;