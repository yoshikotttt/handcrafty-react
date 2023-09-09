// eslint-disable-next-line no-unused-vars
import {} from "react";
import "../../App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost/api/login", data)
      .then((response) => {
        // console.log(response.data);
        // サーバーからのレスポンスデータからトークンを抽出
        const receivedToken = response.data.token;

        // トークンを変数に格納
        const token = receivedToken;

        // トークンをコンソールに表示（確認用）
        // console.log(token);

        // トークンをクッキーに保存
        Cookies.set("token", token, { expires: 7 }); // 有効期限を設定
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

        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Login;
