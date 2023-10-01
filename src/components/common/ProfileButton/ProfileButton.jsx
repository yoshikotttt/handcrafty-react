// import React from "react";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  return (
    <Link to="/users/profile">
      <button>プロフィールを編集</button>
    </Link>
  );
};

export default ProfileButton;
