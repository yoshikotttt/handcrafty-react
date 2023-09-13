import { useState } from "react";
import "../../App.css";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import Camera from "../../components/common/Camera";
// import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");
  // console.log(user_id);

  const [image, setImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);


  const onImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category_id", data.category_id);
    formData.append(
      "production_time_per_minutes",
      data.production_time_per_minutes
    );
    formData.append("reference_url", data.reference_url);
    formData.append("memo", data.memo);

    if (image) {
      formData.append("image_url", image);
    }
    // キャプチャ画像をフォームデータに追加
    if (capturedImage) {
       console.log(
         "Captured image received in parent component:",
         capturedImage
       );
      formData.append("image_url", capturedImage);
    }

    console.log(image);

    try {
      const response = await axios.post(
        `http://localhost/api/users/${user_id}/posts/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // フォーム送信成功時の処理
        console.log("Post created successfully");
      } else {
        // エラーハンドリング
        console.error("Failed to create post");
      }
      console.log(formData);
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="image">画像</label>
          <input type="file" accept="image/*" onChange={onImageChange} />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="作品画像"
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>
        <div>
          <label htmlFor="camera">カメラ</label>
          <Camera onCapture={(imageSrc) => setCapturedImage(imageSrc)} />
          {/* {displayCapturedImage()} */}
        </div>
        <div>
          <label htmlFor="title">タイトル</label>
          {/* <input id="title" type="text" name="title"/> */}
          <input type="text" id="title" name="title" {...register("title")} />
        </div>
        <div>
          <label htmlFor="category">カテゴリー</label>
          <select
            id="category_id"
            name="category_id"
            {...register("category_id")}
          >
            <option value="1">カテゴリー1</option>
            <option value="2">カテゴリー2</option>
            <option value="3">カテゴリー3</option>
          </select>
        </div>
        <div>
          <label htmlFor="production_time_per_minutes">
            制作時間（分単位）
          </label>
          <input
            type="number" // 数値を入力するためのフィールド
            id="production_time_per_minutes"
            name="production_time_per_minutes"
            {...register("production_time_per_minutes")}
          />
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
          <label htmlFor="reference_url">参考 URL</label>
          <input
            type="text"
            id="reference_url"
            name="reference_url"
            {...register("reference_url")}
          />
        </div>

        <div>
          <label htmlFor="memo">メモ</label>
          <textarea
            name="memo"
            id="memo"
            {...register("memo")}
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
