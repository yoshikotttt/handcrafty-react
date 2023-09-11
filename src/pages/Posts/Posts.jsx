import {useEffect, useState} from 'react'
// import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";
import NewPostButton from '../../components/common/NewPostButton';
import axios from 'axios'



const Posts = () => {
    const[items, setItems] = useState([]);

    useEffect(() => {

      axios
        .get("http://localhost/api/posts")
        .then((response) => {
          setItems(response.data);
          console.log(items)
        })
        .catch((error) => {
          console.error("データの取得に失敗しました", error);
        });
    },[]);

  return (
    <>
      <div>
        <h2>投稿一覧</h2>
        <ul>
          {items.map((item) =>
            <li key={item.id}>{item.title}</li>
          )}
        </ul>
      </div>
   <NewPostButton/>
    </>
  );
};

export default Posts