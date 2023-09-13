import {useEffect, useState} from 'react'
// import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";
import NewPostButton from '../../components/common/NewPostButton';
import axios from 'axios';
import "./Posts.css"
import { Link } from 'react-router-dom';



const Posts = () => {
    const[items, setItems] = useState([]);


    useEffect(() => {

      axios
        .get("http://localhost/api/posts")
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error("データの取得に失敗しました", error);
        });
    },[]);

    // console.log(items);

  return (
    <>
      <div>
        <h2>投稿一覧</h2>
        <ul>
          {items
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <li key={item.id}>
                {/* {item.title} */}
                <Link to={`/posts/${item.id}`}>
                {item.image_url && (
                  <img
                    src={`http://localhost/${item.image_url}`}
                    alt="アイテム画像"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                </Link>
                </li> 
            ))}
        </ul>
      </div>
      <NewPostButton />
    </>
  );
};

export default Posts