import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Likes.module.scss"

const Likes = () => {
  const [likesData, setLikesData] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const { itemId } = useParams();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/posts/${itemId}/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikesData(response.data);
        // console.log(response.data);
      } catch (error) {
        setError(error.response?.data.message || "エラーが発生しました");
      }
    };
    fetchLikes();
  }, [itemId, baseURL, token]);

  return (
    <>
      <div className={styles["centered-content"]}>
        {error ? (
          <div>{error}</div>
        ) : (
          <ul className={styles["ulStyle"]}>
            {likesData.map((like) => (
              <li key={like.user_id} className={styles["liStyle"]}>
                {like.user_name}さんが「いいね」しました
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Likes;
