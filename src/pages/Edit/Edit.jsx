import { useEffect, useState } from "react";
import "../../App.css";
import styles from "./Edit.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import Camera from "../../components/common/Camera/Camera";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../components/common/DeleteButton/DeleteButton";

const Edit = () => {
  const [itemData, setItemData] = useState(null);
  const { item_id } = useParams();
  const token = Cookies.get("token");

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  //マウント時に表示されていた画像のURL
  const [originalImageURL, setOriginalImageURL] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  // マウント時に、指定されたitem_idに関連する情報を取得し、itemDataステートにセット
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/posts/${item_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = response.data;

        // 取得したデータをフォームの各フィールドに初期値としてセット
        setItemData(responseData);
        setValue("title", response.data.title);
        setValue("category_id", response.data.category_id);
        setValue(
          "production_time_per_minutes",
          response.data.production_time_per_minutes
        );
        setValue("description", response.data.description);
        setValue("reference_url", response.data.reference_url || "");
        setValue("memo", response.data.memo || "");
        setImageURL("image_url", response.data.image_url);
        setOriginalImageURL(response.data.image_url);

        console.log("res", responseData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchData();
  }, []); //マウント時に一回実行すれば良いので、空配列を持たせる

  //アップロード画像をimageステートにセット
  const onImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  //カメラの表示非表示と、それに合わせた各画像データの状態変更
  const toggleCameraVisibility = () => {
    setIsCameraVisible((prev) => !prev);
    if (isCameraVisible) {
      setCapturedImage(null);
      setImage(null);
      setImageURL(originalImageURL);
    }
  };

  // フォームの入力データや選択/撮影された画像を含むFormDataオブジェクトを作成
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

    // console.log("FormData being sent:", [...formData.entries()]); // ここで formData の中身をログ出力

    
    // PUTメソッドを使用してデータを更新するため、ヘッダーにX-HTTP-Method-Overrideを追加
    try {
      const response = await axios.post(
        `${baseURL}/api/users/posts/${item_id}/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "X-HTTP-Method-Override": "PUT", // PUTに置き換える記述を書く
          },
        }
      );
      console.log(response.status);
       navigate(-2); 
    } catch (error) {
      console.log("Error response:", error.response.data);
    }
  };

  // //カメラで撮影された画像をcapture
  // const onCapture = (imageSrc) => {
  //   setCapturedImage(imageSrc);
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form__field}>
          {!isCameraVisible ? (
            capturedImage ? (
              <img
                src={`${baseURL}/${itemData.image_url}`}
                alt="キャプチャした画像"
                className={styles.form__image}
                style={{ width: "200px", height: "200px" }}
              />
            ) : image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="アイテム画像"
                className={styles.form__image}
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              imageURL && (
                <img
                  src={`${baseURL}/${itemData.image_url}`}
                  alt="元のアイテム画像"
                  className={styles.form__image}
                  style={{ width: "200px", height: "200px" }}
                />
              )
            )
          ) : null}
          {!isCameraVisible ? (
            <>
              <button
                type="button"
                className={`${styles.form__button} ${styles["form__button--light"]}`}
                onClick={toggleCameraVisibility}
              >
                写真を撮る
              </button>

              <label htmlFor="image" className={styles.form__label}></label>
              <input type="file" accept="image/*" onChange={onImageChange} />
            </>
          ) : (
            <>
              <Camera
                onCapture={(imageSrc) => {
                  setCapturedImage(imageSrc);
                  setImage(imageSrc);
                }}
              />
              <button
                type="button"
                className={`${styles.form__button} ${styles["form__button--light"]}`}
                onClick={toggleCameraVisibility}
              >
                元に戻す
              </button>
            </>
          )}
        </div>
        <div className={styles.form__field}>
          <label htmlFor="title" className={styles.form__label}>
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title")}
            className={styles.form__input}
          />
        </div>
        <div className={styles.form__field}>
          <label htmlFor="category" className={styles.form__label}>
            カテゴリー
          </label>
          <select
            id="category_id"
            name="category_id"
            {...register("category_id")}
            className={styles.form__select}
          >
            <option value="">以下から選択してください（必須）</option>
            <option value="1">ソーイング</option>
            <option value="2">編み物</option>
            <option value="3">刺繍</option>
            <option value="4">アクセサリー</option>
            <option value="5">レジン</option>
          </select>
        </div>
        <div className={styles.form__field}>
          <label
            htmlFor="production_time_per_minutes"
            className={styles.form__label}
          >
            制作時間（分単位）
          </label>
          <input
            type="number"
            id="production_time_per_minutes"
            name="production_time_per_minutes"
            {...register("production_time_per_minutes")}
            className={styles.form__input}
          />
        </div>
        <div className={styles.form__field}>
          <label htmlFor="description" className={styles.form__label}>
            説明
          </label>
          <textarea
            name="description"
            id="description"
            {...register("description")}
            cols="30"
            rows="10"
            className={styles.form__textarea}
          ></textarea>
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
            更新
          </button>
          <DeleteButton itemId={item_id} />
        </div>
      </form>
    </>
  );
};

export default Edit;
