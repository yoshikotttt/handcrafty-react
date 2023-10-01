import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { Link, useParams } from "react-router-dom";
import FollowButton from "../../components/common/FollowButton/FollowButton";
import ProfileButton from "../../components/common/ProfileButton/ProfileButton";
import Counts from "../../components/common/Counts/Counts";

const MyPage = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isOwnProfile, setIsOwnProfile] = useState();
  // ローディングの表示（初期値は 読み込み中...が出る）
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { userId } = useParams();
  const endpoint = userId ? `/api/users/${userId}` : `/api/users/me`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(`${baseURL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(profileResponse.data.items);
        setUser(profileResponse.data.user);
        setIsOwnProfile(profileResponse.data.isOwnProfile);
        setPostsCount(profileResponse.data.postsCount);
        setFollowersCount(profileResponse.data.followersCount);
        setFollowingCount(profileResponse.data.followingCount);

        setIsLoading(false);
        // console.log(profileResponse.data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint]); // 第2引数が空の配列なので、初回のレンダリング時に1度だけ実行されます

  const userIdForCounts = isOwnProfile ? "me" : user.id;

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
        {isOwnProfile && <ProfileButton />}
        {!isOwnProfile && <FollowButton userId={user.id} />}
        {user && (
          <Counts
            userId={userIdForCounts}
            postsCount={postsCount}
            followersCount={followersCount}
            followingCount={followingCount}
          />
        )}

        {user.avatar_url && (
          <img src={`${baseURL}/${user.avatar_url}`} alt="プロフィール画像" />
        )}

        <div>自己紹介</div>
        <div>{user.bio}</div>

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
