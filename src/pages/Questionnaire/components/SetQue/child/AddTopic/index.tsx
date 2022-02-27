import React, { useEffect, useRef, useState } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import { addTopic, updateTopic } from '../../../../service';
import { useRequest } from 'umi';

const { TextArea } = Input;


interface AddProps {
    visiable: boolean;
    onClose: () => void;
    onRefresh: () => void;
    data: any;
    queData: any;
}
const Add: React.FC<AddProps> = ({ visiable, onClose, onRefresh, data, queData }) => {
    const [form] = Form.useForm();
    const { loading, run: reqAdd } = useRequest(addTopic, {
        manual: true,
        onSuccess: () => {
            onRefresh();
            message.success('操作成功')
        }
    })
    const { loading: updateLoading, run: reqUpdate } = useRequest(updateTopic, {
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
        <Modal title={data ? '修改' : '新增'} visible={visiable} onCancel={() => onClose()} okButtonProps={{ loading: loading || updateLoading }} onOk={() => {
            form.validateFields().then(valuse => {
                if (data) {
                    reqUpdate({
                        ...valuse,
                        id: data.id
                    })
                    return
                }
                reqAdd({ ...valuse, id_que: queData.id });
            })
        }}>
            <Form labelCol={{
                span: 5
            }} form={form}>
                <Form.Item label="题目" rules={[{
                    required: true,
                    message: `请输入`,
                },]} name="title">
                    <Input />
                </Form.Item>
                <Form.Item initialValue={1} label="类型" name="type">
                    <Radio.Group>
                        <Radio value={1}>单选</Radio>
                        <Radio value={2}>多选</Radio>
                        <Radio value={3}>其他</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="备注" name="remark">
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>

    </>
}
export default Add;