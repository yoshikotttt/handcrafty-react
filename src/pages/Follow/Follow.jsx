import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./Follow.module.scss";
import axios from "axios";

const Follow = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");
  const loggedInUserId = Cookies.get("user_id");
  const { userId, type } = useParams();
  const navigate = useNavigate();

  const endpoint = userId
    ? `/api/users/${userId}/${type}`
    : `/api/users/me/${type}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError(error.response?.data.message || "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId, type, baseURL, token]);

  return (
    <div>
      <div className={styles["centered-content"]}>
        <IoIosArrowBack
          size="1.5rem"
          color="#e8aaa3"
          onClick={() => navigate(-1)}
        />

        <h2 className={styles["title"]}>
          {type === "followers" ? "フォロワー" : "フォロー中"}
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className={styles["ulStyle"]}>
            {userData.map((user) => {
              const linkDestination =
              //型が違うので == 修正必要
                loggedInUserId == user.id ? "/users/me" : `/users/${user.id}`;

              return (
                <Link to={linkDestination} key={user.id}>
                  <li className={styles["liStyle"]}>{user.name}</li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Follow;
