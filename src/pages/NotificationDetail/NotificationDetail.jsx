import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NotificationDetail = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/notifications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotification(response.data);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
      }
    };
    fetchNotification();
  }, [id]);

  // 与えられた日付を整形して表示
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため+1
    const day = date.getDate();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    return `${year}年${month}月${day}日`;
  };

  return (
    <div>
      {notification ? (
        <div>
          <div> {formatCreatedAt(notification.created_at)}</div>
          <div>依頼者：{notification.from_user.name}</div>
          <div>メッセージ：{notification.message}</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NotificationDetail;
