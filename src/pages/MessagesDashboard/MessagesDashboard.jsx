import React from 'react'
import NotificationsList from '../NotificationsList/NotificationsList'
import ChatList from '../ChatList/ChatList'
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Tabs, ConfigProvider } from "antd";



const MessagesDashboard = () => {
     const items = [
       {
         label: (
           <span>
             <BellOutlined />
             通知
           </span>
         ),
         key: "1",
         children: <NotificationsList />,
       },
       {
         label: (
           <span>
             <MessageOutlined />
             チャット
           </span>
         ),
         key: "2",
         children: <ChatList />,
       },
     ];

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
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </ConfigProvider>
  );
}

export default MessagesDashboard