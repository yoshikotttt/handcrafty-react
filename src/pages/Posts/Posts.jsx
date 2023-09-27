import { useEffect, useState } from "react";
import NewPostButton from "../../components/common/NewPostButton/NewPostButton";
import axios from "axios";
import styles from "./Posts.module.scss";
import { Link } from "react-router-dom";
import CategoryLink from "../../components/common/CategoryLink/CategoryLink";

const Posts = () => {
  // 投稿データを管理するためのステート
  const [items, setItems] = useState([]);
  // ローディングの表示（初期値は 読み込み中...が出る）
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // マウント時にAPIから投稿データを取得する
    axios
      .get(`${baseURL}/api/posts`)
      .then((response) => {
        //データ取得できたら、stateを更新
        setItems(response.data);
        //ロード中を解除
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      });
  }, []); // このeffectはマウント時にのみ実行されるので、空配列を持たせる

 if (isLoading) {
   return <p>loading...</p>;
 }
  return (
    <>
      {/* IDの降順にソートしてからリストとして表示 */}
      <div className={styles["post-list"]}>
        <CategoryLink />
        <h2 className={styles["post-list__title"]}>posts</h2>
        {items.length === 0 ? (
          <p className={styles["post-list__no-items"]}>投稿はありません</p>
        ) : (
          <ul className={styles["post-list__items"]}>
            {items
              .sort((a, b) => b.id - a.id)
              .map((item) => (
                <li key={item.id} className={styles["post-list__item"]}>
                  {/* {item.title} */}
                  <Link
                    to={`/posts/${item.id}`}
                    className={styles["post-list__link"]}
                  >
                    {item.image_url && (
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
      <NewPostButton />
    </>
  );
};

export default Posts;
