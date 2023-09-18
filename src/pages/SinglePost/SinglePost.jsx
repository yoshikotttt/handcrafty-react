import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../../components/common/DeleteButton/DeleteButton";
import Cookies from "js-cookie";
import EditButton from "../../components/common/EditButton/EditButton";

const SinglePost = () => {
  const { item_id } = useParams();
  //   console.log("itemidの結果", item_id);
  const [itemData, setItemData] = useState(null);
   const loggedInUserId = Cookies.get("user_id");

   const baseURL = import.meta.env.VITE_API_BASE_URL;

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get(`${baseURL}/api/posts/${item_id}`);
       const responseData = response.data;
       setItemData(responseData);
       console.log("res", responseData);
     } catch (error) {
       console.error("データの取得に失敗しました", error);
     }
   };

   fetchData();
 }, [item_id]);


  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため+1
    const day = date.getDate();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    return `${year}年${month}月${day}日`;
  };

  return (
    <>
      {itemData ? (
        <>
          <div>投稿者 {itemData.user.name}</div>
          <h2>{itemData.title}</h2>
          {itemData.image_url && (
            <img
              src={`${baseURL}/${itemData.image_url}`}
              alt="アイテム画像"
              style={{ width: "200px", height: "200px" }}
            />
          )}
          <p>カテゴリー：</p>
          {itemData.category_id && <p>{itemData.category.name}</p>}
          {itemData.description && <p>{itemData.description}</p>}
          {itemData.reference_url && (
            <p>
              <a
                href={itemData.reference_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {itemData.reference_url}
              </a>
            </p>
          )}
          {itemData.created_at && (
            <p>投稿日時: {formatCreatedAt(itemData.created_at)}</p>
          )}
          {itemData.user_id == loggedInUserId && (
            <EditButton itemId={item_id} />
          )}
          {itemData.user_id == loggedInUserId && (
            <DeleteButton itemId={item_id} />
          )}
        </>
      ) : (
        <p>データをロード中...</p>
      )}
    </>
  );
};

export default SinglePost;
