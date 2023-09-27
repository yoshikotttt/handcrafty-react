import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Likes.module.scss";
import { IoIosArrowBack } from "react-icons/io";

const Likes = () => {
  const [likesData, setLikesData] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const { itemId } = useParams();
  const navigate = useNavigate();

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
        <IoIosArrowBack
          size="1.5rem"
          color="#e8aaa3"
          onClick={() => navigate(-1)}
        />
        <h2 className={styles["title"]}>いいねしているユーザー</h2>
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
