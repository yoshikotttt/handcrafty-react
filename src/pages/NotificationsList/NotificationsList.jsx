import { notification } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NotificationsList = () => {
  // ナビゲーション関数を取得
  const navigate = useNavigate();
  // 現在のロケーションを取得
  const location = useLocation();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const [notificationsData, setNotificationsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificationsData(response.data.notifications);
        console.log("data", response.data.notifications);
      } catch (err) {
        setError("データの取得に失敗しました");
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // 30秒ごとにデータ取得

    return () => clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーをクリア
  }, []);

  const updateNotificationsStatus = async (notificationId) => {
    try {
        await axios.post(`${baseURL}/api/notifications/${notificationId}`,
        {
            status: 1
        },{
            headers:{
                Authorization: `Bearer ${token}`,
                "X-HTTP-Method-Override": "PUT"
            },
        })
        
    }catch(err){
        console.error("statusの更新に失敗しました",err);
    }
  }

  return (
    <div>
      <div>
        {error && <div className="error">{error}</div>}

        {!error && !notificationsData.length && <div>ローディング中...</div>}

        {notificationsData &&
          notificationsData.map((notification) => (
            <div key={notification.id}>
              <Link 
              to={`/notifications/${notification.id}`}
              onClick={()=>updateNotificationsStatus(notification.id)}
              >
                <p>{notification.from_user.name}さんから通知が来ています</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default NotificationsList