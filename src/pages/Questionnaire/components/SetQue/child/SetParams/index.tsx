import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Modal, Input, message, Select, InputNumber } from 'antd';
import { getAllCate, getSubByCate } from '../../../../service';
import { useRequest } from 'umi';

const { TextArea } = Input;
const { Option } = Select;


interface AddProps {
    visiable: boolean;
    onClose: () => void;
    onRefresh: () => void;
    data: any;
    // queData: any;
}
const Add: React.FC<AddProps> = ({ visiable, onClose, onRefresh, data }) => {
    const [form] = Form.useForm();
    const { data: cateList = [] } = useRequest(getAllCate);
    const { data: subCateList = [], run: reqSubCate } = useRequest(getSubByCate, { manual: true });
    console.log(cateList);
    const { loading, run: reqAdd } = useRequest('', {
        manual: true,
        onSuccess: () => {
            onRefresh();
            message.success('操作成功')
        }
    })
    const { loading: updateLoading, run: reqUpdate } = useRequest('', {
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
    const onChange = useCallback((value) => {
        console.log(`selected ${value}`);
        reqSubCate({
            id_category: value
        })
    }, [])
    return <>
        <Modal title="配置参数" visible={visiable} onCancel={() => onClose()} okButtonProps={{ loading: loading || updateLoading }} onOk={() => {
            form.validateFields().then(valuse => {
                // if (data) {
                //     reqUpdate({
                //         ...valuse,
                //         id: data.id
                //     })
                //     return
                // }
                // reqAdd({ ...valuse, id_que: queData.id });
            })
        }}>
            <Form labelCol={{
                span: 5
            }} form={form}>
                <Form.Item label="关联大类" rules={[{
                    required: true,
                    message: `请选择`,
                }]} name="id_cate">
                    <Select
                        showSearch
                        placeholder="请选择"
                        onChange={onChange}
                        options={cateList.map(i => {
                            return {
                                label: i.name,
                                value: i.id
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item label="关联子类" rules={[{
                    required: true,
                    message: `请选择`,
                }]} name="id_subclass">
                    <Select
                        showSearch
                        placeholder="请选择"
                        onChange={onChange}
                        options={subCateList.map(i => {
                            return {
                                label: i.name,
                                value: i.id
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item initialValue={1} rules={[{
                    required: true,
                    message: `请输入`,
                }]} label="权重" name="grade" extra="1-100 （表示该答案服务子类的程度，分值越高说明越吻合）">
                    <InputNumber style={{ width: '100%' }} max={100} min={1} />
                </Form.Item>
            </Form>
        </Modal>

    </>
}
export default Add;