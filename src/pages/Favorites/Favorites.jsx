import { useEffect, useState } from "react";
import styles from "./Favorites.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Favorites = () => {
  // 投稿データを管理するためのステート
  const [favorites, setFavorites] = useState([]);
  // ローディングの表示（初期値は 読み込み中...が出る）
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // マウント時にAPIから投稿データを取得する
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
        //ロード中を解除
        setIsLoading(false);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // このeffectはマウント時にのみ実行されるので、空配列を持たせる

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className={styles["post-list"]}>
        <p className={styles["post-list__title"]}>お気に入り一覧</p>
        {favorites.length === 0 ? (
          <p className={styles["post-list__no-items"]}>
            お気に入りはありません
          </p>
        ) : (
          <ul className={styles["post-list__items"]}>
            {favorites.map((favorite, index) => (
              <li key={index} className={styles["post-list__item"]}>
                {/* {item.title} */}
                <Link
                  to={`/posts/${favorite.item.id}`}
                  className={styles["post-list__link"]}
                >
                  {favorite.item && favorite.item.image_url && (
                    <img
                      src={`${baseURL}/${favorite.item.image_url}`}
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

export default Favorites;
