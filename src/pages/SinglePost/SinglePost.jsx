import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import EditButton from "../../components/common/EditButton/EditButton";
import styles from "./SinglePost.module.scss";
import { Tag } from "antd";
// import { AiOutlineComment } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import LikeButton from "../../components/common/LikeButton/LikeButton";
import FavoriteButton from "../../components/common/FavoriteButton/FavoriteButton";
import LikeNotification from "../../components/common/LikeNotification/LikeNotification";
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import RequestButton from "../../components/common/RequestButton/RequestButton";

const SinglePost = () => {
  // URLからitem_idを取得
  const { item_id } = useParams();
  // 取得したデータの保持
  const [itemData, setItemData] = useState(null);
  // CookieからログインユーザーのIDを取得
  const loggedInUserId = Number(Cookies.get("user_id"));

  const [isLoading, setIsLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  //マウント時、指定したitem_idをもとにAPIから投稿データを取得してitemDataにセット
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/posts/${item_id}`);
        const responseData = response.data;
        setItemData(responseData);
        setIsLoading(false);
        // console.log("res", responseData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [item_id]);

  // console.log("itemData:", itemData);
  // console.log("loggedInUserId:", loggedInUserId);

  if (isLoading || !itemData || typeof loggedInUserId !== "number") {
    return <p>loading...</p>;
  }

  // 与えられた日付を整形して表示
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため+1
    const day = date.getDate();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    return `${year}年${month}月${day}日`;
  };

  // カテゴリー名と対応する色のマッピング
  const categoryColorMap = {
    ソーイング: "magenta",
    編み物: "geekblue",
    刺繍: "green",
    アクセサリー: "blue",
    レジン: "volcano",
  };

  // カテゴリー名に対応する色を取得するヘルパー関数
  const getCategoryColor = (categoryName) => {
    return categoryColorMap[categoryName] || "defaultColor"; // マッピングがない場合はデフォルトの色を指定
  };

  // 与えられたテキストが指定の長さ以上なら、省略して"..."を追加
  const truncatedText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const linkDestination =
    loggedInUserId === itemData.user_id
      ? "/users/me"
      : `/users/${itemData.user_id}`;

  //RequestButtonのページ遷移
  const handleRequestClick = () => {
    navigate(`/posts/${item_id}/request`);
  };

  // console.log(
  //   "itemData.user_id:",
  //   itemData.user_id,
  //   "Type:",
  //   typeof itemData.user_id
  // );
  // console.log(
  //   "loggedInUserId:",
  //   loggedInUserId,
  //   "Type:",
  //   typeof loggedInUserId
  // );

  // itemDataが存在する場合、取得した投稿データをもとに内容を表示
  return (
    <>
      <div className={styles["single-post"]}>
        <div className={styles["single-post__back"]}>
          <IoIosArrowBack
            size="1.5rem"
            color="#e8aaa3"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className={styles["single-post__header"]}>
          <Link
            to={linkDestination}
            className={styles["single-post__author-link"]}
          >
            <div className={styles["single-post__author"]}>
              {itemData.user.avatar_url ? (
                <img
                  src={`${baseURL}/${itemData.user.avatar_url}`}
                  alt="プロフィール画像"
                  className={styles["post-list__avatar"]}
                />
              ) : (
                <PiFinnTheHumanDuotone
                  size="2rem"
                  className={styles["post-list__avatar"]}
                />
              )}
              <span>{itemData.user.name}</span>
            </div>
          </Link>
          <div></div>
          {/* 投稿ユーザーとログインユーザーが同じ場合、編集ボタンと削除ボタンを表示 */}
          {itemData.user_id === loggedInUserId && (
            <div className={styles["button-container"]}>
              <EditButton itemId={item_id} />
            </div>
          )}
        </div>
        {itemData.image_url && (
          <img
            src={`${baseURL}/${itemData.image_url}`}
            alt="アイテム画像"
            className={styles["single-post__image"]}
          />
        )}
        <div className={styles["single-post__category-container"]}>
          <p className={styles["single-post__category"]}></p>
          {itemData.created_at && (
            <p className={styles["single-post__timestamp"]}>
              投稿日: {formatCreatedAt(itemData.created_at)}
            </p>
          )}

          {itemData.category_id && (
            <Tag color={getCategoryColor(itemData.category.name)}>
              {itemData.category.name}
            </Tag>
          )}
        </div>
        <div></div>
        <div className={styles["single-post__icons"]}>
          <LikeButton itemId={item_id} />
          <FavoriteButton itemId={item_id} />
          {itemData.user_id !== loggedInUserId && (
            <RequestButton label="リクエスト" onClick={handleRequestClick} />
          )}
        </div>
        <LikeNotification itemId={item_id} />
        <p className={styles["single-post__title"]}>{itemData.title}</p>
        {itemData.description && (
          <p className={styles["single-post__description"]}>
            {itemData.description}
          </p>
        )}
        {itemData.reference_url && (
          <p className={styles["single-post__reference"]}>
            参考URL
            <a
              href={itemData.reference_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["single-post__reference-link"]}
            >
              {truncatedText(itemData.reference_url, 30)}
            </a>
          </p>
        )}
        {itemData.memo && (
          <p className={styles["single-post__memo"]}>
            メモ
            <br />
            {itemData.memo}
          </p>
        )}
      </div>
      {/* <div>
        {itemData.user_id !== loggedInUserId && (
          <RequestButton label="リクエスト" onClick={handleRequestClick} />
        )}
      </div> */}
    </>
  );
};

export default SinglePost;
