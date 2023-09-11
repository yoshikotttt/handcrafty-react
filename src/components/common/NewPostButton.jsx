import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NewPostButton = () => {
   const [user_id, setUserId] = useState("");
   const navigate = useNavigate(); // useNavigate フックを呼び出す
   useEffect(() => {
     // Cookie を取得する副作用
     // const user_id = Cookies.get("user_id");
     setUserId(Cookies.get("user_id"));

     // ここで token を使用した処理を実行できます
   }, []); // 第2引数が空の配列なので、初回のレンダリング時に1度だけ実行されます

   const handleNewPostClick = () => {
     // 新規投稿ページに移動
     navigate(`/users/${user_id}/posts/new`);
   };

   return (
     <>
       <div>Posts</div>
       <button onClick={handleNewPostClick}>新規投稿</button>
       {/* <button onClick={() => navigate(`/users/${user_id}/posts/new`)}>
        新規登録
      </button> */}
     </>
   );
};



// export default Posts


// const Posts = () => {
 
//   const navigate = useNavigate(); // useNavigate フックを呼び出す
//   const user_id = Cookies.get("user_id");

//   const handleNewPostClick = () => {
//     // 新規投稿ページに移動
//     navigate(`/users/${user_id}/posts/new`);
//   };

//   return (
//     <>
//       <div>Posts</div>
//       <button onClick={handleNewPostClick}>新規投稿</button>
//       {/* <button onClick={() => navigate(`/users/${user_id}/posts/new`)}>
//         新規登録
//       </button> */}
//       <Logout />
//     </>
//   );
// };


export default NewPostButton;
