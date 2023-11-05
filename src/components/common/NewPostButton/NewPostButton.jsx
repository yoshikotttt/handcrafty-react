// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const NewPostButton = () => {
  const navigate = useNavigate(); // useNavigate フックを呼び出す

  const handleNewPostClick = () => {
    // 新規投稿ページに移動
    navigate(`/users/posts/new`);
  };

  const buttonStyle = {
    position: "fixed",
    right: "40px",
    bottom: "80px",
  };

  // PCブラウザの場合のスタイル
  const buttonStylePC = {
    position: "fixed",
    right: "calc(50% - 250px + 40px)", // 500pxの中央から右に40pxオフセット
    bottom: "80px",
  };

  return (
    <>
      {/* 画面幅が768pxより大きい場合はbuttonStylePCを適用 */}
      <FloatButton
        icon={<PlusOutlined />}
        style={window.innerWidth > 768 ? buttonStylePC : buttonStyle}
        onClick={handleNewPostClick}
      >
        <AiOutlinePlus size="1.5rem" />
      </FloatButton>
    </>
  );

};

export default NewPostButton;
