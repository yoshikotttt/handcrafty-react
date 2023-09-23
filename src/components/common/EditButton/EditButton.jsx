// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const EditButton = ({itemId}) => {
      
      const navigate = useNavigate(); // useNavigate フックを呼び出す
    

      const handleEditClick = () => {
        // 新規投稿ページに移動
        navigate(`/users/posts/${itemId}/edit`);
      };
  return (
    <>
      <BiSolidEditAlt onClick={handleEditClick} size="1.5rem" color="#e8aaa3" />
    </>
  );
};

export default EditButton;


