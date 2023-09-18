// import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";




const Logout = () => {

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  
  const handleLogout = () => {
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(`${baseURL}/api/logout`, null, { headers })
        .then((response) => {
          Cookies.remove("token");
          console.log("ログアウトしました");
          navigate("/login");
        })
        .catch((error) => {
          console.log("ログアウトエラー：", error);
        });
    } else {
      console.log("トークンがありません");
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  );
};

export default Logout;
