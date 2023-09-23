// import React from 'react'

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
// import PropTypes from "prop-types";

const DeleteButton = ({ itemId }) => {
    console.log(itemId);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("この投稿を削除してもよろしいですか？")) {
        const token = Cookies.get("token");
        
        if(!token){
            navigate("/login");
            return;
        }
      axios
        .delete(`${baseURL}/api/posts/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <RiDeleteBinLine onClick={handleDelete} size="1.5rem" color="#e8aaa3" />
    </>
  );
};

export default DeleteButton