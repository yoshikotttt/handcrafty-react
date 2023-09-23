// import React from 'react'

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";

// itemIdに基づいてAPIを呼び出し、そのアイテムを削除
// アイコンをクリックすると、確認ダイアログが表示され、OKを選択すると実際の削除処理を実行する

// eslint-disable-next-line react/prop-types
const DeleteButton = ({ itemId }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // 削除処理を行う関数
  const handleDelete = () => {
    if (window.confirm("この投稿を削除してもよろしいですか？")) {
      
      const token = Cookies.get("token");
      // tokenがなければログインページにリダイレクト
      if (!token) {
        navigate("/login");
        return;
      }

      //APIを呼び出してアイテムを削除
      axios
        .delete(`${baseURL}/api/posts/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`, //tokenをヘッダーに含める
          },
        })
        .then(() => {
          // 削除に成功したらアラートを表示して投稿一覧ページにリダイレクト
          alert("削除しました");
          navigate("/posts");
        })
        .catch((error) => {
          // 削除に失敗したらエラーメッセージをコンソールとアラートに出力
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

export default DeleteButton;
