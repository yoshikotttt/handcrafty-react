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

  return (
    <>
      {/* <button style={buttonStyle} onClick={handleNewPostClick}>
         <AiOutlinePlus size="1.5rem" />
       </button> */}
      <FloatButton
        icon={<PlusOutlined />}
        style={buttonStyle}
        onClick={handleNewPostClick}
      >
        <AiOutlinePlus size="1.5rem" />
      </FloatButton>
    </>
  );
};

export default NewPostButton;
