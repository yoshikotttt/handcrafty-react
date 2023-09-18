import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const MyPage = () => {
  const [items, setItems] = useState([]);

  const token = Cookies.get("token");

  const baseURL = import.meta.env.VITE_API_BASE_URL;
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };
    fetchData();
  }, []); // 第2引数が空の配列なので、初回のレンダリング時に1度だけ実行されます

  return <div>MyPage</div>;
};

export default MyPage;
