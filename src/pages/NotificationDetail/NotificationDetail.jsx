import axios from "axios";
import Cookies from "js-cookie";
import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
      navigate(-2);
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
    return `${year}年${month}月${day}日`;
  };

  console.log(notification);
  return (
    <div>
      {notification ? (
        <div>
          <div> {formatCreatedAt(notification.created_at)}</div>
          {notification.status === 1 &&
            notification.to_user.id === loggedInUserId && (
              <div>
                <p>依頼者：{notification.from_user.name}</p>
                <p>{notification.message}</p>
              </div>
            )}

          {/* 自分が依頼して、相手が承認した場合 */}
          {notification.status === 2 &&
            notification.from_user.id === loggedInUserId && (
              <p>{notification.response_message}</p>
            )}

          {/* 自分が依頼して、相手が拒否した場合 */}
          {notification.status === 3 &&
            notification.from_user.id === loggedInUserId && (
              <p>{notification.response_message}</p>
            )}

          {/* 依頼を承認または拒否するオプション */}
          {notification.status === 1 &&
            notification.to_user.id === loggedInUserId && (
              <>
                <Link to={`/notifications/${id}/reply`}>承認</Link>
                <button onClick={handleDeclineClick}>お断り</button>
              </>
            )}
        </div>
      ) : (
        <div>データがありません</div>
      )}
    </div>
  );
};

export default NotificationDetail;
