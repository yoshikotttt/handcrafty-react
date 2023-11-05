import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RequestPage.module.scss";

const RequestPage = () => {
  const { item_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/posts/${item_id}`);
        setUserData(response.data.user);
        setIsLoading(false);
      } catch (err) {
        setError("データの取得に失敗しました");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [item_id]);

  const handleRequestSubmit = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `${baseURL}/api/request/`,
        {
          to_user_id: userData.id,
          item_id: item_id,
          message: message,
        },
        {
          headers: headers,
          withCredentials: true,
        }
      );
      alert("リクエストを送信しました");
      navigate(-1);
    } catch (err) {
      alert("リクエストの送信に失敗しました");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {userData && (
        <div className={styles.userSection}>
          <img
            className={styles.avatar}
            src={`${baseURL}/${userData.avatar_url}`}
            alt="ユーザーのアバター"
          />
          <p className={styles.userName}>{userData.name} さんへのメッセージ</p>
        </div>
      )}

      <textarea
        className={styles.textarea}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力してください（必須）"
        name="message"
        id="messageTextArea"
        cols="30"
        rows="15"
      />
      <button className={styles.submitButton} onClick={handleRequestSubmit}>
        リクエストを送信
      </button>
    </div>
  );
};

export default RequestPage;
