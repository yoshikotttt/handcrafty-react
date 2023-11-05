import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./ChatRoom.module.scss";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const loggedInUserId = Number(Cookies.get("user_id"));
  const { roomId } = useParams();
  const [refreshMessages, setRefreshMessages] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/chat/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("メッセージの取得に失敗しました", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshMessages]);

//   console.log(messages);

  const handleSendMessage = async () => {
    try {
      await axios.post(
        `${baseURL}/api/chat/${roomId}`,
        {
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage("");
      setRefreshMessages(!refreshMessages);
    } catch (error) {
      console.error("メッセージの送信ができませんでした:", error);
    }
  };


  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {sortedMessages.length === 0 ? (
          <p>メッセージはありません</p>
        ) : (
          [...sortedMessages].reverse().map((message) => (
            <div
              key={message.id}
              className={
                message.from_user_id === loggedInUserId
                  ? styles.messageRight
                  : styles.messageLeft
              }
            >
              {message.body}
            </div>
          ))
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="メッセージを入力"
        />
        <button className={styles.inputButton} onClick={handleSendMessage}>
          送信
        </button>
      </div>
    </div>
  );

};

export default ChatRoom;
