import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsPinAngle, BsFillPinAngleFill } from "react-icons/bs";

const FavoriteButton = ({ itemId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const checkIfFavoriteByUser = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/posts/${itemId}/favorites/check`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavorite(response.data.isLiked);
      } catch (error) {
        console.error(
          "Error checking if liked:",
          error.response?.data || error
        );
      }
    };
    checkIfFavoriteByUser();
  }, [itemId, baseURL, token]); //3つの変数のいずれかが変更された場合、useEffectのコードが再実行される

  const handleLike = async () => {
    try {
        
      if (!isFavorite) {
        //false、まだお気に入りされてない状態＝登録したい
        await axios.post(
          `${baseURL}/api/posts/${itemId}/favorites`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavorite(true);
      } else {
        //true、お気に入りされている状態＝削除したい
        await axios.delete(`${baseURL}/api/posts/${itemId}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`, //tokenをヘッダーに含める
          },
        });
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error response:", error.response.data);
    }
  };

  return (
    <>
      <div onClick={handleLike}>
        {isFavorite ? (
          <BsFillPinAngleFill size="1.5rem" color="#e8aaa3" />
        ) : (
          <BsPinAngle size="1.5rem" color="#e8aaa3" />
          //      <BsPinAngle size="1.5rem" color="#e8aaa3" />
          // ) : (
          //   <BsFillPinAngleFill size="1.5rem" color="#e8aaa3" />
        )}
      </div>
    </>
  );
};

export default FavoriteButton;
