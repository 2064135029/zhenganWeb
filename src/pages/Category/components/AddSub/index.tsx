import React, { useRef, useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { addCategory } from '../../service';
import { useRequest } from 'umi';

const { TextArea } = Input;


interface AddProps {
    visiable: boolean;
    onClose: () => void;
    onRefresh: () => void;
}
const Add: React.FC<AddProps> = ({ visiable, onClose, onRefresh }) => {
    const [form] = Form.useForm();
    const { loading, run: reqAdd } = useRequest(addCategory, {
        manual: true,
        onSuccess: () => {
            onRefresh();
        }
    })

    return <>
        <Modal title="添加诊疗项目" visible={visiable} onCancel={() => onClose()} okButtonProps={{ loading: loading }} onOk={() => {
            form.validateFields().then(valuse => {
                reqAdd(valuse);
            })
        }}>
            <Form form={form}>
                <Form.Item rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="name">
                    <Input />
                </Form.Item>
                <Form.Item name="remark">
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>

    </>
}
export default Add;