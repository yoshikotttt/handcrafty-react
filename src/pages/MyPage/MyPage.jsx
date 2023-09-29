import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { Link, useParams } from "react-router-dom";

const MyPage = () => {
  const [items, setItems] = useState([]);
   const [user, setUser] = useState([]);
  // ローディングの表示（初期値は 読み込み中...が出る）
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { userId } = useParams();
  const endpoint = userId ? `/api/users/${userId}` : `/api/users/me`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data.items);
        setUser(response.data.user);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint]); // 第2引数が空の配列なので、初回のレンダリング時に1度だけ実行されます

  if (isLoading) {
    return <p className={styles["loading-text"]}>loading...</p>;
  }

  return (
    <>
      <div className={styles["post-list"]}>
        <h2 className={styles["post-list__title"]}>
          {" "}
          {user ? `${user.name}のページ` : "マイページ"}
        </h2>
        {items.length === 0 ? (
          <p className={styles["post-list__no-items"]}>投稿はありません</p>
        ) : (
          <ul className={styles["post-list__items"]}>
            {items.map((item, index) => (
              <li key={index} className={styles["post-list__item"]}>
                {/* {item.title} */}
                <Link
                  to={`/posts/${item.id}`}
                  className={styles["post-list__link"]}
                >
                  {item.id && item.image_url && (
                    <img
                      src={`${baseURL}/${item.image_url}`}
                      alt="アイテム画像"
                      className={styles["post-list__image"]}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyPage;
