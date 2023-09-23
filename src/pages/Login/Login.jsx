// eslint-disable-next-line no-unused-vars
import {} from "react";
import styles from "../../App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/other/Logout";
import { Button } from "antd";



const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

const navigate = useNavigate();

const baseURL = import.meta.env.VITE_API_BASE_URL;


  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${baseURL}/api/login`, data)
      .then((response) => {
        console.log(response.data);
        // サーバーからのレスポンスデータからトークンを抽出
        const receivedToken = response.data.token;
        const receivedId = response.data.user.id;

        // トークンを変数に格納
        const token = receivedToken;
        const user_id = receivedId;

        // コンソールに表示（確認用）
        // console.log(user_id);

        // トークンをクッキーに保存
        Cookies.set("token", token, { expires: 7 }); // 有効期限を設定
        Cookies.set("user_id", user_id, { expires: 7 }); // 有効期限を設定

        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          {...register("email", { required: "Emailは必須です" })}
        />
        <p>{errors.email ? errors.email.message : null}</p>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "パスワードは必須です",
            minLength: { value: 8, message: "8文字以上で入力してください" },
          })}
        />
        <p>{errors.password ? errors.password.message : null}</p>

        <button type="submit">Log in</button>
        {/* <Button type="submit">Log in</Button> */}
      </form>

      <Logout />
    </div>
  );
};

export default Login;
