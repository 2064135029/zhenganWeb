/** eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Modal, Button, Tabs, Spin } from 'antd';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

const Header = (props) => {
  const { title, footer, children, renderLeftHeader, renderRightHeader, ...restProps } = props;
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        {renderLeftHeader && renderLeftHeader}
        {title && <div className={styles.title}>{title}</div>}
        {!footer && (
          <div className={styles.defaultBtns}>
            {renderRightHeader}
            <DefaultBtns {...restProps} />
          </div>
        )}
      </div>
      {children && <div className={styles.tabs}>{children}</div>}
    </div>
  );
};

const DefaultBtns = (props) => {
  const { okText, okType, cancelText, onOk, onCancel, okButtonProps, cancelButtonProps } = props;
  return (
    <>
      {!!onCancel && (
        <Button style={{ marginRight: 8 }} onClick={(e) => onCancel(e)} {...cancelButtonProps}>
          {cancelText || '取消'}
        </Button>
      )}
      {!!onOk && (
        <Button type={okType || 'primary'} onClick={(e) => onOk(e)} {...okButtonProps}>
          {okText || '保存'}
        </Button>
      )}
    </>
  );
};

class FullscreenModal extends React.Component {
  static defaultProps = {
    tabList: undefined,
    onTabChange: undefined,
    tabActiveKey: undefined,
  };

  static propTypes = {
    tabList: PropTypes.array,
    onTabChange: PropTypes.func,
    tabActiveKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  renderTabs = ({ tabList, onTabChange, tabActiveKey }) => {
    if (tabList && tabList.length) {
      return (
        <Tabs
          activeKey={tabActiveKey}
          animated={false}
          onChange={(key) => {
            if (onTabChange) {
              onTabChange(key);
            }
          }}
        >
          {tabList.map((item) => (
            <Tabs.TabPane {...item} tab={item.tab} key={item.key} />
          ))}
        </Tabs>
      );
    }
    return null;
  };

  render() {
    const {
      title,
      footer,
      okText,
      cancelText,
      okType,
      onOk,
      onCancel,
      tabList,
      onTabChange,
      tabActiveKey,
      children,
      renderRightHeader,
      renderLeftHeader,
      renderFooter,
      okButtonProps,
      cancelButtonProps,
      wrapClassName,
      wrapBodyClass,
      loading = false,
      ...modalProps
    } = this.props;

    const headerProps = {
      title,
      footer,
      okType,
      okText,
      cancelText,
      onOk,
      onCancel,
      okButtonProps,
      cancelButtonProps,
      renderRightHeader,
      renderLeftHeader,
    };

    const tabsProps = {
      tabList,
      tabActiveKey,
      onTabChange,
    };

    const bodyClass = classNames(styles.body, {
      [styles.bodyTop]: !(tabList && tabList.length),
      [styles.bodyBottom]: !!footer,
      [wrapBodyClass]: !!wrapBodyClass,
    });

    const modalClass = classNames(styles.busComFullscreenModal, {
      [wrapClassName]: !!wrapClassName,
    });

    return (
      <Modal footer={null} {...modalProps} width="100%" closable={false} wrapClassName={modalClass}>
        <Header {...headerProps}>{this.renderTabs(tabsProps)}</Header>
        <div className={bodyClass}>
          <Spin spinning={loading}>{children}</Spin>
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </Modal>
    );
  }
}

export default FullscreenModal;
