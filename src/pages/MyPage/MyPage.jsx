import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { Link } from "react-router-dom";

const MyPage = () => {
  const [items, setItems] = useState([]);
  // ローディングの表示（初期値は 読み込み中...が出る）
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // 第2引数が空の配列なので、初回のレンダリング時に1度だけ実行されます

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className={styles["post-list"]}>
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
                      style={{ width: "100px", height: "100px" }}
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
