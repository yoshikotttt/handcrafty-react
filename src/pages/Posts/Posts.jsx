import {useEffect, useState} from 'react'
// import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";
import NewPostButton from '../../components/common/NewPostButton/NewPostButton';
import axios from 'axios';
import styles from "./Posts.module.scss";
import { Link } from 'react-router-dom';
import CategoryLink from '../../components/common/CategoryLink/CategoryLink';




const Posts = () => {
    const[items, setItems] = useState([]);

    const baseURL = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {

      axios
        .get(`${baseURL}/api/posts`)
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
      <div className={styles["post-list"]}>
        <CategoryLink/>
        <h2 className={styles["post-list__title"]}>posts</h2>
        <ul className={styles["post-list__items"]}>
          {items
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <li key={item.id} className={styles["post-list__item"]}>
                {/* {item.title} */}
                <Link
                  to={`/posts/${item.id}`}
                  className={styles["post-list__link"]}
                >
                  {item.image_url && (
                    <img
                      src={`${baseURL}/${item.image_url}`}
                      alt="アイテム画像"
                      className={styles["post-list__image"]}
                      style={{ width: "100px", height: "100px" }} // If needed, you can move these styles to the CSS module file
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