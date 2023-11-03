import React from 'react'
import NotificationsList from '../NotificationsList/NotificationsList'
import ChatList from '../ChatList/ChatList'
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Tabs, ConfigProvider } from "antd";

const { TabPane } = Tabs;

const MessagesDashboard = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: "#cd427c",
            itemActiveColor: "#cd427c",
            itemColor: "rgba(0, 0, 0, 0.88)",
            itemHoverColor: "#d36c97",
            itemSelectedColor: "#cd427c",
            horizontalMargin: "16px",
            horizontalItemGutter: 100,
          },
        },
      }}
    >
      <div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <BellOutlined />
                通知
              </span>
            }
            key="1"
          >
            <NotificationsList />
          </TabPane>
          <TabPane
            tab={
              <span>
                <MessageOutlined />
                チャット
              </span>
            }
            key="2"
          >
            <ChatList />
          </TabPane>
        </Tabs>
      </div>
    </ConfigProvider>
  );
}

export default MessagesDashboard