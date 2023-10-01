import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/posts/${userId}/follow/check`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error(
          "EError fetching follow status:",
          error.response?.data || error
        );
      }
    };
    fetchFollowStatus();
  }, [userId, baseURL, token]);

  const handleFollow = async () => {
    try {
      if (!isFollowing) {
        await axios.post(
          `${baseURL}/api/posts/${userId}/follow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFollowing(true);
      } else {
        await axios.delete(`${baseURL}/api/posts/${userId}/follow`, {
          headers: {
            Authorization: `Bearer ${token}`, //tokenをヘッダーに含める
          },
        });
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(
        "Error updating follow status:",
        error.response?.data || error
      );
    }
  };
    return (
      <button onClick={handleFollow}>
        {isFollowing ? "フォロー中" : "フォローする"}
      </button>
    );
  };


export default FollowButton;
