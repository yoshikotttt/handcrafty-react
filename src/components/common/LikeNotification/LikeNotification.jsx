import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./LikeNotification.module.scss";
import { Link, useNavigate } from "react-router-dom";

const LikeNotification = ({ itemId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [firstLiker, setFirstLiker] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  // アイコンクリック時のハンドラ関数。指定されたパスに遷移する
  // 追加のロジックがある場合はLinkではなくイベントを使う
  const handleIconClick = (path) => {
    navigate(path);
  };


  useEffect(() => {
    const fetchLikeInfo = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/posts/${itemId}/likes/info`
        );
        setLikeCount(response.data.likeCount);
        setFirstLiker(response.data.firstLiker);
      } catch (error) {
        console.log("Error fetching like info:", error);
      }
    };
    fetchLikeInfo();
  }, [itemId, baseURL]);

  const renderMessage = () => {
    if (likeCount === 0) return null;
    if (likeCount === 1) return `${firstLiker.name}さんが「いいね」しています`;
    return `${firstLiker.name}さん、他${
      likeCount - 1
    }人が「いいね」しています。`;
  };
  const message = renderMessage();

  return (
    <>
      {message && (
        <div className={styles["message"]}>
          <Link to={`/posts/${itemId}/likes`}>{message}</Link>
        </div>
      )}
    </>
  );
};

export default LikeNotification;
