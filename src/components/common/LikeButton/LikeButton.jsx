import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const LikeButton = ({ itemId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const checkIfLikedByUser = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/posts/${itemId}/likes/check`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error(
          "Error checking if liked:",
          error.response?.data || error
        );
      }
    };
    checkIfLikedByUser();
  }, [itemId, baseURL, token]);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await axios.post(
          `${baseURL}/api/posts/${itemId}/likes`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(true);
      } else {
        await axios.delete(`${baseURL}/api/posts/${itemId}/likes`, {
          headers: {
            Authorization: `Bearer ${token}`, //tokenをヘッダーに含める
          },
        });
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error response:", error.response.data);
    }
  };

  return (
    <>
      <div onClick={handleLike}>
        {isLiked ? (
          <AiFillHeart size="1.5rem" color="#e8aaa3" />
        ) : (
          <AiOutlineHeart size="1.5rem" color="#e8aaa3" />
        )}
      </div>
    </>
  );
};

export default LikeButton;
