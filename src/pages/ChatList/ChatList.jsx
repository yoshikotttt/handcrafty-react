import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PiFinnTheHumanLight } from "react-icons/pi";
import styles from "./ChatList.module.scss"

const ChatList = () => {

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const token = Cookies.get("token");
    const [allChatData, setAllChatData] = useState([]);
    const [error, setError] = useState(null);
    const loggedInUserId = Number(Cookies.get("user_id"));

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/chat/users/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAllChatData(response.data);
          console.log(response)
        } catch (err) {
          setError("データの取得に失敗しました");
        }
      };
      fetchData();
      const intervalId = setInterval(fetchData, 60000); // 30秒ごとにデータ取得

      return () => clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーをクリア
    }, []);



  const createRoomId = (userID1, userID2) => {
    if (userID1 > userID2) {
      [userID1, userID2] = [userID2, userID1];
    }
    return `${userID1}_${userID2}`;
  };


  
  return (
    <div>
      {error && <p className={styles.chatListError}>Error: {error}</p>}
      {allChatData.map((chatItem, index) => (
        <div className={styles.chatListItem} key={index}>
          <Link
            to={`/chat/${createRoomId(chatItem.id, loggedInUserId)}`}
            className={styles.chatListLink}
          >
            {chatItem.avatar_url ? (
              <img
                className={styles.chatListAvatar}
                src={`${baseURL}/${chatItem.avatar_url}`}
                alt="プロフィール画像"
              />
            ) : (
              <PiFinnTheHumanLight
                size="2rem"
                className={styles.chatListAvatarPlaceholder}
              />
            )}
            <p className={styles.chatListUserName}>{chatItem.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
  
}

export default ChatList