## FullscreenModal

全屏模态对话框。

## 何时使用

处理新建、编辑等大量表单输入并且需要整屏覆盖页面的情况下使用。

## API

基本继承 antd 的 Modal 组件 API。新增 API 如下:

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| tabList | 当对话框内需要 Tabs 结构时使用。(与 tabActiveKey、onTabChange 同时使用) | Array<{ key: string tab: string }> | 无 |  |
| tabActiveKey | 当前选中页签 | string number | 无 |  |
| onTabChange | 选中标签页的回调,回传 key 值 | function | 无 |  |

修改 footer 用法 | 参数 | 说明 | 类型 | 默认值 | 版本 | | --- | --- | --- | --- | --- | | footer | 当不需要默认右上角的确定取消按钮，则传自定义的底部显示组件 | ReactNode | 无 | |

#### 注意

> 因全屏模态对话框涉及复杂的页面结构，故不支持命令式调用。

```jsx
// tabs
const tabList = [
  {
    key: 'articles',
    tab: '文章',
  },
  {
    key: 'projects',
    tab: '项目',
  },
  {
    key: 'applications',
    tab: '应用',
  },
];

<FullscreenModal
  title="新建用户"
  visible={this.state.visible}
  tabList={tabList}
  tabActiveKey={this.state.tabActiveKey}
  footer={<div>footer</div>}
  onTabChange={key => this.handleTabChange(key)}
  onOk={this.handleOk}
  onCancel={this.handleCancel}
>
  FullscreenModal content
</FullscreenModal>;
```
