// eslint-disable-next-line no-unused-vars
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { set } from 'react-hook-form';

const ProtectedRouteTest = () => {
  const [message, setMessage] = useState("");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get(`${baseURL}/api/test`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          setMessage("失敗しました");
        });
    } else {
      setMessage("tokenがありません");
    }
  }, []);
  return (
    <div>
      <h1>保護されたルートのテスト</h1>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedRouteTest;
