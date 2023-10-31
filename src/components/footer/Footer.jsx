// import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlinePushpin } from "react-icons/ai";
import { BiSolidFace } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { Badge } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Footer = () => {
  // ナビゲーション関数を取得
  const navigate = useNavigate();
  // 現在のロケーションを取得
  const location = useLocation();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnreadNotifications(response.data.notifications.length);

      } catch (err) {
        setError("データの取得に失敗しました");
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 30000); // 30秒ごとにデータ取得

    return () => clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーをクリア
  }, []);

  // アイコンクリック時のハンドラ関数。指定されたパスに遷移する
  // 追加のロジックがある場合はLinkではなくイベントを使う
  const handleIconClick = (path) => {
    navigate(path);
  };

  // ログインまたは登録ページの場合、フッターを表示しない
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  //レンダリング部分
  return (
    <div className={`${styles["iconsStyles"]} ${styles["footerStyles"]}`}>
      <div className={styles["icon-container"]}>
        <AiOutlineHome
          size="1.5rem"
          onClick={() => handleIconClick("/posts")}
        />
        <p className={styles["icon-container__label"]}>ホーム</p>
      </div>
      <div className={styles["icon-container"]}>
        <BiSolidFace
          size="1.5rem"
          className={styles["individualIconStyle"]}
          onClick={() => handleIconClick(`/users/me`)}
        />
        <p className={styles["icon-container__label"]}>マイページ</p>
      </div>
      <div className={styles["icon-container"]}>
        <AiOutlinePushpin
          size="1.5rem"
          className={styles["individualIconStyle"]}
          onClick={() => handleIconClick("/favorites")}
        />
        <p className={styles["icon-container__label"]}>お気に入り</p>
      </div>
      <div className={styles["icon-container"]}>
        <Badge count={unreadNotifications}>
          <HiOutlineMail
            size="1.5rem"
            className={styles["individualIconStyle"]}
            onClick={() => handleIconClick("/notifications")}
          />
        </Badge>
        <p className={styles["icon-container__label"]}>通知</p>
      </div>
      <div className={styles["icon-container"]}>
        <LuSettings
          size="1.5rem"
          className={styles["individualIconStyle"]}
          onClick={() => handleIconClick("/settings")}
        />
        <p className={styles["icon-container__label"]}>設定</p>
      </div>
    </div>
  );
};

export default Footer;

// 単純なリンクの場合は以下で良い
// return (
//     <div style={{ ...iconsStyles, ...footerStyles }}>
//       <Link to="/posts">
//         <AiOutlineHome style={individualIconStyle} size="1.5rem" />
//       </Link>
//       <Link to="/users/me">
//         <BiSolidFace style={individualIconStyle} size="1.5rem" />
//       </Link>
//       <Link to="/favorites">
//         <AiOutlinePushpin style={individualIconStyle} size="1.5rem" />
//       </Link>
//       <Link to="/settings">
//         <LuSettings style={individualIconStyle} size="1.5rem" />
//       </Link>
//     </div>
//   );
// };
