// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditButton = ({itemId}) => {
      
      const navigate = useNavigate(); // useNavigate フックを呼び出す
    

      const handleEditClick = () => {
        // 新規投稿ページに移動
        navigate(`/users/posts/${itemId}/edit`);
      };
  return (
    <>
      <button onClick={handleEditClick}>EditButton</button>
    </>
  );
};

export default EditButton;


