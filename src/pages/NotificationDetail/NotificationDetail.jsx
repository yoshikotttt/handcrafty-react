import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./NotificationDetail.module.scss";

const NotificationDetail = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const loggedInUserId = Number(Cookies.get("user_id"));
  const navigate = useNavigate();

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

  const handleDeclineClick = async () => {
    const isConfirmed = window.confirm("お断りしますか？");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.post(
        `${baseURL}/api/notifications/${id}`,
        {
          status: 3,
          response_message:
            "申し訳ございませんが、今回のリクエストは受け入れることができません。ご理解の程、よろしくお願い申し上げます。",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      navigate(-3);
    } catch (err) {
      console.error("データの更新に失敗しました:", err);
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

  const createRoomId = (userID1, userID2) => {
    if (userID1 > userID2) {
      [userID1, userID2] = [userID2, userID1];
    }
    return `${userID1}_${userID2}`;
  };

    const goBack = () => {
    navigate(-1);
  };

  //   console.log(notification);
  return (
    <div className={styles.notificationContainer}>
      {notification ? (
        <div className={styles.notification}>
          <div className={styles.date}>
            {" "}
            {formatCreatedAt(notification.created_at)}
          </div>

          {notification.status === 1 &&
            notification.to_user.id === loggedInUserId && (
              <div className={styles.requestInfo}>
                <p className={styles.requesterName}>
                  依頼者：{notification.from_user.name}
                </p>
                <p className={styles.requesterName}>リクエストメッセージ</p>
                <p>{notification.message}</p>
              </div>
            )}

          {notification.status === 2 &&
            notification.from_user.id === loggedInUserId && (
              <div className={styles.approvedNotification}>
                <p>{notification.response_message}</p>
                <Link
                  className={styles.chatLink}
                  to={`/chat/${createRoomId(
                    notification.from_user.id,
                    notification.to_user.id
                  )}`}
                >
                  チャットへ
                </Link>
              </div>
            )}

          {notification.status === 3 &&
            notification.from_user.id === loggedInUserId && (
              <div>
                <div className={styles.declinedNotification}>
                  <p>{notification.response_message}</p>
                </div>
                <button className={styles.backButton} onClick={goBack}>
                  戻る
                </button>
              </div>
            )}

          {notification.status === 1 &&
            notification.to_user.id === loggedInUserId && (
              <div className={styles.responseOptions}>
                <button
                  className={styles.declineButton}
                  onClick={handleDeclineClick}
                >
                  お断り
                </button>
                <Link
                  className={styles.approveLink}
                  to={`/notifications/${id}/reply`}
                >
                  引き受ける
                </Link>
              </div>
            )}
        </div>
      ) : (
        <div className={styles.noData}>データがありません</div>
      )}
    </div>
  );
};

export default NotificationDetail;
