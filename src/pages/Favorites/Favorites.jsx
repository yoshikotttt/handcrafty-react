import { useEffect, useState } from "react";
import styles from "./Favorites.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Favorites = () => {
  // 投稿データを管理するためのステート
  const [favorites, setFavorites] = useState([]);
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
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };
    fetchData();
  }, []);

  // このeffectはマウント時にのみ実行されるので、空配列を持たせる

  // useEffect(() => {
  //   // マウント時にAPIから投稿データを取得する
  //   axios
  //     .get(`${baseURL}/api/favorites`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })

  //     .then((response) => {
  //       //データ取得できたら、stateを更新
  //       setFavorites(response.data);
  //       // console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("データの取得に失敗しました", error);
  //     });
  // }, []); // このeffectはマウント時にのみ実行されるので、空配列を持たせる

  console.log(favorites);


  return (
    <>
      <div className={styles["post-list"]}>
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
      </div>
    </>
  );
};

export default Favorites;
