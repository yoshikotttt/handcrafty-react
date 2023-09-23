// import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlinePushpin } from "react-icons/ai";
import { BiSolidFace } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";



const Footer = () => {
  // ナビゲーション関数を取得
  const navigate = useNavigate();
  // 現在のロケーションを取得
  const location = useLocation();

  // ログインまたは登録ページの場合、フッターを表示しない
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  // アイコンクリック時のハンドラ関数。指定されたパスに遷移する。
  const handleIconClick = (path) => {
    navigate(path);
  };

  //以下style
  const iconsStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "#e8aaa3",
  };

  const individualIconStyle = {
    fontSize: "2rem", // `size="2rem"` の代わり
    cursor: "pointer",
  };

  const footerStyles = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "90%",
    backgroundColor: "#f2f2f2", // フッターの背景色を設定
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px", // フッター内の余白を設定
  };

  //レンダリング部分
  return (
    <div style={{ ...iconsStyles, ...footerStyles }}>
      <AiOutlineHome
        style={individualIconStyle}
        size="1.5rem"
        onClick={() => handleIconClick("/posts")}
      />
      <BiSolidFace
        style={individualIconStyle}
        size="1.5rem"
        onClick={() => handleIconClick(`/users/me`)}
      />
      <AiOutlinePushpin
        style={individualIconStyle}
        size="1.5rem"
        onClick={() => handleIconClick("/favorites")}
      />
      <LuSettings
        style={individualIconStyle}
        size="1.5rem"
        onClick={() => handleIconClick("/settings")}
      />
    </div>
  );
};

export default Footer;
