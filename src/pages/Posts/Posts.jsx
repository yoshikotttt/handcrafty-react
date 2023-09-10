import React from 'react'
import Logout from '../../components/other/Logout';
import { useNavigate } from "react-router-dom";


const Posts = () => {
  const navigate = useNavigate(); // useNavigate フックを呼び出す

  const handleNewPostClick = () => {
    // 新規投稿ページに移動
    navigate("/users/user_id/posts/new");
  };

  return (
    <>
      <div>Posts</div>
      <button onClick={handleNewPostClick}>新規投稿</button>
      <Logout />
    </>
  );
};


export default Posts