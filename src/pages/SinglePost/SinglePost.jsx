import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../../components/common/DeleteButton";
import Cookies from "js-cookie";

const SinglePost = () => {
  const { item_id } = useParams();
  //   console.log("itemidの結果", item_id);
  const [data, setData] = useState(null);
   const loggedInUserId = Cookies.get("user_id");

  useEffect(() => {
    axios
      .get(`http://localhost/api/posts/${item_id}`)
      .then((response) => {
        const responseData = response.data;
        setData(responseData);
        console.log("res", responseData);
      })
      .catch((error) => {
        console.error("データの取得に失敗しました", error);
      });
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
      {data ? (
        <>
          <h2>{data.title}</h2>
          {data.image_url && (
            <img
              src={`http://localhost/${data.image_url}`}
              alt="アイテム画像"
              style={{ width: "200px", height: "200px" }}
            />
          )}
          <p>カテゴリー：</p>
          {data.category_id && <p>{data.category_id}</p>}
          {data.description && <p>{data.description}</p>}
          {data.reference_url && (
            <p>
              <a
                href={data.reference_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.reference_url}
              </a>
            </p>
          )}
          {data.created_at && (
            <p>投稿日時: {formatCreatedAt(data.created_at)}</p>
          )}
          {data.user_id == loggedInUserId && <DeleteButton />}
        </>
      ) : (
        <p>データをロード中...</p>
      )}
    </>
  );
};

export default SinglePost;
