// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const NewPostButton = () => {

   const navigate = useNavigate(); // useNavigate フックを呼び出す
  
   const handleNewPostClick = () => {
     // 新規投稿ページに移動
     navigate(`/users/posts/new`);
   };

   const buttonStyle = {
     width: "50px",
     height: "50px",
     borderRadius: "50%",
     backgroundColor: "#e8accb",
     color: "white",
     border: "none",
     position: "absolute",
     right: "30px",
     bottom: "10px",
     cursor: "pointer",
     textAlign: "center",
     display: "flex",
     justifyContent: "center", 
     alignItems: "center", 
   };

   return (
     <>
       <button style={buttonStyle} onClick={handleNewPostClick}>
         <AiOutlinePlus size="1.5rem" />
       </button>
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
