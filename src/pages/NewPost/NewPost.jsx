import { useState } from "react";
import styles from "./NewPost.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import Camera from "../../components/common/Camera/Camera";
import { useNavigate } from "react-router-dom";
import useConfirmModal from "../../hooks/useConfirmModal";

// 新規投稿フォーム、入力されたデータは指定されたAPIエンドポイントに送信
// ユーザーは画像をアップロードするか、カメラを使用して画像をキャプチャすることができます

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const navigate = useNavigate();
  const confirmModal = useConfirmModal();

  const token = Cookies.get("token");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // アップロードされる画像のファイル情報
  const [image, setImage] = useState(null);
  // カメラで撮影された画像の情報
  const [capturedImage, setCapturedImage] = useState(null);
  // カメラUIを表示するかどうかを制御するフラグ
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  // 画像のエラー追跡
  const [imageError, setImageError] = useState("");

  // アップロードの画像
  const onImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  // カメラのキャプチャ画像
  const onCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  //カメラコンポーネントに合わせて、他のデータの情報をどうするか
  const toggleCameraVisibility = () => {
    setIsCameraVisible(!isCameraVisible);

    if (!isCameraVisible) {
      setImage(null);
    } else {
      setCapturedImage(null);
    }
  };


  const onSubmit = async (data) => {

    if (!image && !capturedImage) {
      confirmModal(
        "画像が必要です", // タイトル
        "画像をアップロードまたはキャプチャしてください。", // コンテンツ
        () => {} // OKボタンを押した時の動作（ここでは何もしない）
      );
      return; // この行で送信処理を中止
    }

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

    // console.log("FormData being sent:", [...formData.entries()]); 

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isCameraVisible ? (
          <div className={styles.form__field}>
            <label htmlFor="camera" className={styles.form__label}></label>
            <Camera onCapture={onCapture} />
            <button
              type="button"
              className={`${styles.form__button} ${styles["form__button--light"]}`}
              onClick={toggleCameraVisibility}
            >
              または画像を選択
            </button>
          </div>
        ) : (
          <div className={styles.form__field}>
            <label htmlFor="image" className={styles.form__label}>
              画像をアップロード
            </label>
            <input type="file" accept="image/*" onChange={onImageChange} />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="作品画像"
                className={styles.form__image}
              />
            )}
            <button
              type="button"
              className={`${styles.form__button} ${styles["form__button--light"]}`}
              onClick={toggleCameraVisibility}
            >
              カメラを開く
            </button>
            {imageError && <p className={styles.form__error}>{imageError}</p>}
          </div>
        )}

        <div className={styles.form__field}>
          <label htmlFor="title" className={styles.form__label}>
            タイトル（必須）
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", { required: "タイトルは必須です" })}
            className={styles.form__input}
          />
          <p className={styles.form__error}>
            {errors.title ? errors.title.message : null}
          </p>
        </div>

        <div className={styles.form__field}>
          <label htmlFor="category_id" className={styles.form__label}>
            カテゴリー（必須）
          </label>
          <select
            id="category_id"
            name="category_id"
            {...register("category_id", {
              required: "カテゴリーは必須です",
              message: "カテゴリーを選択して下さい",
            })}
            className={styles.form__select}
          >
            <option value="">以下から選択してください（必須）</option>
            <option value="1">ソーイング</option>
            <option value="2">編み物</option>
            <option value="3">刺繍</option>
            <option value="4">アクセサリー</option>
            <option value="5">レジン</option>
          </select>
          <p className={styles.form__error}>
            {errors.category_id ? errors.category_id.message : null}
          </p>
        </div>

        <div className={styles.form__field}>
          <label
            htmlFor="production_time_per_minutes"
            className={styles.form__label}
          >
            制作時間（分単位）（必須）
          </label>
          <input
            type="number"
            id="production_time_per_minutes"
            name="production_time_per_minutes"
            {...register("production_time_per_minutes", {
              required: "制作時間は必須です",
            })}
            className={styles.form__input}
          />
          <p className={styles.form__error}>
            {errors.production_time_per_minutes
              ? errors.production_time_per_minutes.message
              : null}
          </p>
        </div>

        <div className={styles.form__field}>
          <label htmlFor="description" className={styles.form__label}>
            説明（必須）
          </label>
          <textarea
            name="description"
            id="description"
            {...register("description", { required: "説明文は必須です" })}
            cols="30"
            rows="10"
            className={styles.form__textarea}
          ></textarea>
          <p className={styles.form__error}>
            {errors.description ? errors.description.message : null}
          </p>
        </div>

        <div className={styles.form__field}>
          <label htmlFor="reference_url" className={styles.form__label}>
            参考 URL
          </label>
          <input
            type="text"
            id="reference_url"
            name="reference_url"
            {...register("reference_url")}
            className={styles.form__input}
          />
        </div>

        <div className={styles.form__field}>
          <label htmlFor="memo" className={styles.form__label}>
            メモ
          </label>
          <textarea
            name="memo"
            id="memo"
            {...register("memo")}
            cols="30"
            rows="10"
            className={styles.form__textarea}
          ></textarea>
        </div>

        <div className={styles.form__field}>
          <button type="submit" className={styles["form__submit-button"]}>
            投稿する
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPost;
