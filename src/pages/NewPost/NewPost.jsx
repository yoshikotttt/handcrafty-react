import { useState } from "react";
import "./NewPost.css";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import Camera from "../../components/common/Camera/Camera";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [image, setImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  const handleUploadButtonClick = () => {
    setShowFileInput(true);
  };

  const toggleCameraVisibility = () => {
    setIsCameraVisible(!isCameraVisible);

    if (!isCameraVisible) {
      setImage(null);
    } else {
      setCapturedImage(null);
    }
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

    console.log("FormData being sent:", [...formData.entries()]); // ここで formData の中身をログ出力

    try {
      const response = await axios.post(
        `${baseURL}/api/users/posts/new`,
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
        navigate("/posts");
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
        {isCameraVisible ? (
          <div>
            <label htmlFor="camera">カメラ</label>
            <Camera onCapture={onCapture} />
            <button
              type="button"
              className="lightButton"
              onClick={toggleCameraVisibility}
            >
              または画像を選択
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="image">画像をアップロード</label>
            <input type="file" accept="image/*" onChange={onImageChange} />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="作品画像"
                style={{ width: "200px", height: "200px" }}
              />
            )}
            <button
              type="button"
              className="lightButton"
              onClick={toggleCameraVisibility}
            >
              カメラを開く
            </button>
          </div>
        )}

        {/* {showFileInput ? (
          <div>
            <label htmlFor="image">画像をアップロード</label>
            <input type="file" accept="image/*" onChange={onImageChange} />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="作品画像"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="camera">画像を撮影する</label>
            <Camera onCapture={(imageSrc) => setCapturedImage(imageSrc)} />
            <button
              type="button"
              className="lightButton"
              onClick={handleUploadButtonClick}
            >
              または画像を選択
            </button>
          </div>
        )} */}
        <div>
          <label htmlFor="title">タイトル（必須）</label>
          {/* <input id="title" type="text" name="title"/> */}
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", { required: "タイトルは必須です" })}
          />
          <p>{errors.title ? errors.title.message : null}</p>
        </div>
        <div>
          <label htmlFor="category">カテゴリー（必須）</label>
          <select
            id="category_id"
            name="category_id"
            {...register("category_id", {
              required: "カテゴリーは必須です",
              message: "カテゴリーを選択して下さい",
            })}
          >
            <option value="">以下から選択してください（必須）</option>
            <option value="1">ソーイング</option>
            <option value="2">編み物</option>
            <option value="3">刺繍</option>
            <option value="4">アクセサリー</option>
            <option value="5">レジン</option>
          </select>
          <p>{errors.category_id ? errors.category_id.message : null}</p>
        </div>
        <div>
          <label htmlFor="production_time_per_minutes">
            制作時間（分単位）（必須）
          </label>
          <input
            type="number" // 数値を入力するためのフィールド
            id="production_time_per_minutes"
            name="production_time_per_minutes"
            {...register("production_time_per_minutes", {
              required: "制作時間は必須です",
            })}
          />
          <p>
            {errors.production_time_per_minutes
              ? errors.production_time_per_minutes.message
              : null}
          </p>
        </div>
        <div>
          <label htmlFor="description">説明（必須）</label>
          <textarea
            name="description"
            id="description"
            {...register("description", { required: "説明文は必須です" })}
            cols="30"
            rows="10"
          ></textarea>
          <p>{errors.description ? errors.description.message : null}</p>
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
