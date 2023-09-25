import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./LikeNotification.module.scss";

const LikeNotification = ({ itemId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [firstLiker, setFirstLiker] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

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
    if (likeCount === 0) return "まだ「いいね」をしているユーザーはいません";
    if (likeCount === 1) return `${firstLiker.name}さんが「いいね」しています`;
    return `${firstLiker.name}さん、他${
      likeCount - 1
    }人が「いいね」しています。`;
  };

  return (
    <>
      <div className={styles["message"]}>{renderMessage()}</div>
    </>
  );
};

export default LikeNotification;
