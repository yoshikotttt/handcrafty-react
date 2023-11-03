import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NotificationsList.module.scss";
import {
  FaHeartCirclePlus,
  FaHeartCircleCheck,
  FaHeartCircleXmark,
} from "react-icons/fa6";

const NotificationsList = () => {
  // ナビゲーション関数を取得
  const navigate = useNavigate();
  // 現在のロケーションを取得
  const location = useLocation();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const [notificationsData, setNotificationsData] = useState([]);
  const [error, setError] = useState(null);
  const loggedInUserId = Number(Cookies.get("user_id"));
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/all-notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificationsData(response.data.notifications);
        setCurrentUserId(response.data.currentUserId);
      } catch (err) {
        setError("データの取得に失敗しました");
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // 30秒ごとにデータ取得

    return () => clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーをクリア
  }, []);

  const updateNotificationsStatus = async (notificationId, currentStatus) => {
    if (currentStatus !== 0) {
      return; // statusが0でない場合は関数を終了
    }
    try {
      await axios.post(
        `${baseURL}/api/notifications/${notificationId}`,
        {
          status: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
    } catch (err) {
      console.error("statusの更新に失敗しました", err);
    }
  };

  // 与えられた日付を整形して表示
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため+1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 分が1桁の場合、先頭に0を追加
    // const seconds = date.getSeconds();

    return `${year}年${month}月${day}日　${hours}:${minutes}`;
  };

  // notificationsData をフィルタリングして、関連する通知のみを取得します。
  const relevantNotifications = notificationsData.filter((notification) => {
    return (
      notification.from_user.id === currentUserId ||
      notification.to_user.id === currentUserId
    );
  });

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.errorContainer}>
        {error && <div className={styles.error}>{error}</div>}
        {!error && !relevantNotifications.length && (
          <div className={styles.loading}>ローディング中...</div>
        )}
      </div>
      {relevantNotifications && relevantNotifications.length > 0 ? (
        [...relevantNotifications].reverse().map((notification) => (
          <div key={notification.id}>
            <Link
              to={`/notifications/${notification.id}`}
              onClick={() =>
                updateNotificationsStatus(notification.id, notification.status)
              }
              className={styles.notificationLink}
            >
              {notification.status === 0 &&
                notification.to_user.id === loggedInUserId && (
                  <div className={styles.notificationContent}>
                    <div className={styles.textContent}>
                      <p className={styles.dateText}>
                        {formatCreatedAt(notification.created_at)}
                      </p>
                      <p className={styles.messageText}>
                        {notification.from_user.name}
                        さんから依頼が届いています
                      </p>
                    </div>
                    <FaHeartCirclePlus
                      className={styles.messageIcon}
                      size="1.5rem"
                      color="#ec8787"
                    />
                  </div>
                )}
              {notification.status === 1 &&
                notification.to_user.id === loggedInUserId && (
                  <div className={styles.notificationContent}>
                    <div className={styles.textContent}>
                      <p className={styles.dateText}>
                        {formatCreatedAt(notification.created_at)}
                      </p>
                      <p className={styles.messageText}>
                        {notification.from_user.name}
                        さんから依頼が届いています
                      </p>
                    </div>
                    <FaHeartCirclePlus
                      className={styles.messageIcon}
                      size="1.5rem"
                      color="#ec8787"
                    />
                  </div>
                )}
              {notification.status === 2 &&
                notification.from_user.id === loggedInUserId && (
                  <div className={styles.notificationContent}>
                    <div className={styles.textContent}>
                      <p className={styles.dateText}>
                        {formatCreatedAt(notification.updated_at)}
                      </p>
                      <p className={styles.messageText}>
                        {notification.to_user.name}さんに引受されました
                      </p>
                    </div>
                    <FaHeartCircleCheck
                      className={styles.messageIcon}
                      size="1.5rem"
                      color="#94df6c"
                    />
                  </div>
                )}
              {notification.status === 3 &&
                notification.from_user.id === loggedInUserId && (
                  <div className={styles.notificationContent}>
                    <div className={styles.textContent}>
                      <p className={styles.dateText}>
                        {formatCreatedAt(notification.updated_at)}
                      </p>
                      <p className={styles.messageText}>
                        {notification.to_user.name}さんはお断りしました
                      </p>
                    </div>
                    <FaHeartCircleXmark
                      className={styles.messageIcon}
                      size="1.5rem"
                      color="#7488be"
                    />
                  </div>
                )}
            </Link>
          </div>
        ))
      ) : (
        <p className={styles.noMessage}>メッセージはありません</p>
      )}
    </div>
  );
};

export default NotificationsList;
