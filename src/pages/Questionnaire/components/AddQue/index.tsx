import React, { useEffect, useState } from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Spin, Modal } from 'antd'
import styles from './index.less'
import { addQue, getQueById, updateQue } from '../../service';
import { useRequest, history } from 'umi';


interface PageProps {
    visible: boolean;
    data: any;
}


const Page: React.FC<PageProps> = ({ }) => {

    const [isEdt, setEdit] = useState<boolean>(false);

    const [form] = Form.useForm();

    const { loading: addLoading, run: reqQue } = useRequest(addQue, {
        manual: true, onSuccess: () => {
            Modal.success({
                content: '添加成功，返回列表',
                onOk: () => {
                    history.goBack();
                }
            });
        }
    });
    const { run: update, loading: updateLoading } = useRequest(updateQue, {
        manual: true,
        onSuccess: () => {
            Modal.success({
                content: '修改成功，返回列表',
                onOk: () => {
                    history.goBack();
                }
            });
        }
    })
    const { loading, run: reqById } = useRequest(getQueById, {
        manual: true,
        onSuccess: (res) => {
            console.log(res);
            form.setFieldsValue({
                ...res,
                content: BraftEditor.createEditorState(res.content)
            })
        }
    })

    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']

    console.log(history.location);
    const { id } = history.location.query;
    useEffect(() => {
        if (id) {
            reqById(id);
        } else {
            setEdit(true);
        }
    }, [])

    return <>
        <Spin spinning={loading || false}>

            <div className={styles.content}>
                <Form form={form} labelCol={{ span: 3 }} onFinish={(valuse) => {
                    console.log(valuse);
                    if (!!id) {
                        update({
                            id: id,
                            title: valuse.title,
                            content: valuse.content.toHTML()
                        });
                    } else {
                        reqQue({
                            title: valuse.title,
                            content: valuse.content.toHTML()
                        });
                    }

                }}>
                    <Form.Item name="title" rules={[
                        {
                            required: true,
                            message: `请输入`,
                        },
                    ]} label="标题">
                        <Input disabled={!isEdt} size="large" placeholder="请输入标题" />
                    </Form.Item>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: `请输入`,
                        },
                    ]} name="content" label="诊断背景">
                        <BraftEditor
                            readOnly={!isEdt}
                            style={{ height: 400, border: '1px solid #9e9a9a' }}
                            className="my-editor"
                            controls={controls}
                            value={'0000'}
                            placeholder="请输入正文内容"
                        />
                    </Form.Item>
                    <Form.Item>
                        {!!id && !isEdt && <Button style={{ marginRight: 20 }} onClick={() => {
                            setEdit(true);
                        }} size="large" type="primary">编辑</Button>}
                        {!!id && isEdt && <Button style={{ marginRight: 20 }} onClick={() => {
                            setEdit(false);
                        }} size="large" >取消编辑</Button>}
                        <Button loading={updateLoading || addLoading} size="large" type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    </>
}
export default Page;