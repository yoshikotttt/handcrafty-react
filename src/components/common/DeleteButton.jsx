// import React from 'react'

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

const DeleteButton = ({ itemId }) => {
    console.log(itemId);
    const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("この投稿を削除してもよろしいですか？")) {
        const token = Cookies.get("token");
        
        if(!token){
            navigate("/login");
            return;
        }
      axios
        .delete(`http://localhost/api/posts/${itemId}`,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        .then(() => {
          alert("削除しました");
         navigate("/posts");
        })
        .catch((error) => {
          console.error("削除に失敗しました", error);
          alert("削除できませんでした");
        });
    }
  };
  return (
    <>
      <button onClick={handleDelete}>削除</button>
    </>
  );
};

export default DeleteButton