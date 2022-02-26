import React from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Form, Input, Button } from 'antd'
import styles from './index.less'


interface PageProps {
    visible: boolean;
    data: any;
}


const Page: React.FC<PageProps> = ({ visible, data }) => {

    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']

    return <>
        <div className={styles.content}>
            <Form labelCol={{ span: 3 }} onFinish={(valuse) => {
                console.log(valuse);
            }}>
                <Form.Item label="标题">
                    <Input size="large" placeholder="请输入标题" />
                </Form.Item>
                <Form.Item label="诊断背景">
                    <BraftEditor
                        style={{ height: 400, border: '1px solid #9e9a9a' }}
                        className="my-editor"
                        controls={controls}
                        placeholder="请输入正文内容"
                    />
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </div>
    </>
}
export default Page;