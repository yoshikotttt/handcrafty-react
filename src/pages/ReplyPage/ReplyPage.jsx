import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ReplyPage.module.scss"

const ReplyPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/notifications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotification(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
      }
    };
    fetchNotification();
  }, [id]);

  // console.log(notification);
  const handleRequestSubmit = async () => {
    try {
      await axios.post(
        `${baseURL}/api/notifications/${id}`,
        {
          response_message: message,
          status: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      alert("メッセージを送信しました");
      navigate(-2);
    } catch (err) {
      alert("メッセージの送信に失敗しました");
    }
  };

   


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

 return (
   <div className={styles.container}>
     {notification && (
       <div className={styles.notification}>
         <p className={styles.notificationTitle}>リクエストメッセージ</p>
         <p className={styles.userName}>
           <span className={styles.nameText}>
             {notification.from_user.name}
           </span>
           さんより
         </p>
         <p className={styles.notificationMessage}>{notification.message}</p>
       </div>
     )}

     <textarea
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       placeholder="返信メッセージを入力してください（必須）"
       name="replyMessage"
       id="replyTextArea"
       cols="30"
       rows="10"
       className={styles.textarea}
     />
     <button className={styles.submitButton} onClick={handleRequestSubmit}>
       メッセージを送信
     </button>
   </div>
 );
};

export default ReplyPage;
