import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import styles from "./Profile.module.scss"

const Profile = () => {
  const [userData, setUserData] = useState();
  const token = Cookies.get("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 

  const { register, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });

  // マウント時に、userに関連する情報を取得し、itemDataステートにセット
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = response.data;

        // 取得したデータをフォームの各フィールドに初期値としてセット
        setUserData(responseData);
        setValue("name", response.data.name);
        setValue("bio", response.data.bio || "");
        setValue("avatar_url", response.data.avatar_url || "");

        setIsLoading(false);
        console.log("res", responseData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setValue, baseURL, token]);

   if (isLoading) {
     return <p className={styles["loading-text"]}>loading...</p>;
   }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);
      if (data.avatar_url) {
        formData.append("avatar_url", selectedFile);
      }
      console.log("FormData being sent:", [...formData.entries()]);

      await axios.post(`${baseURL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT", // PUTに置き換える記述を書く
        },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Failed to update profile",
        error.response?.data || error.message
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <h2>プロフィール編集</h2>
      {previewImage ? (
        <img src={previewImage} alt="avatar画像" width={100} />
      ) : userData?.avatar_url ? (
        <img
          src={`${baseURL}/${userData.avatar_url}`}
          alt="avatar画像"
          width={100}
        />
      ) : (
        <PiFinnTheHumanDuotone size="4rem" />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">ユーザー名</label>
          <input type="text" {...register("name")} />
        </div>
        <div>
          <label htmlFor="bio">自己紹介文</label>
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            {...register("bio")}
          />
        </div>
        <div>
          <label htmlFor="avatar_url">画像</label>
          <input
            type="file"
            {...register("avatar_url")}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">保存する</button>
      </form>
    </div>
  );
};

export default Profile;
