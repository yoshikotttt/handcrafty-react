// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FloatButton} from "antd";
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
  // backgroundColor: "#e8aaa3",
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
       {/* <FloatButton
         icon={<PlusOutlined />}
         type="primary"
         style={{
           right: 24,
         }}
       /> */}
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
