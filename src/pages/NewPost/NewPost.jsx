import {} from "react";
import "../../App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");
  console.log(user_id);

  const onSubmit = (data) => {
   
    console.log(data);
    axios
      .post(`http://localhost/api/users/${user_id}/posts/new`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">タイトル</label>
          {/* <input id="title" type="text" name="title"/> */}
          <input type="text" id="title" name="title" {...register("title")} />
        </div>
        <div>
          <label htmlFor="category">カテゴリー</label>
          <select id="category_id" name="category_id" {...register("category_id")}>
            <option value="1">カテゴリー1</option>
            <option value="2">カテゴリー2</option>
            <option value="3">カテゴリー3</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">説明</label>

          <textarea
            name="description"
            id="description"
            {...register("description")}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    </>
  );
};

export default NewPost;
