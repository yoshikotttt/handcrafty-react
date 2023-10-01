// import React from 'react'

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Counts = ({ userId, postsCount, followersCount, followingCount }) => {
  return (
    <>
      <div className="counts-container">
        <div className="count-item">
          <span className="count-number">{postsCount}</span>
          <span className="count-label">投稿</span>
        </div>
        <Link to={`/users/${userId}/followers`}>
          <div className="count-item">
            <span className="count-number">{followersCount}</span>
            <span className="count-label">フォロワー</span>
          </div>
        </Link>
        <Link to={`/users/${userId}/following`}>
          <div className="count-item">
            <span className="count-number">{followingCount}</span>
            <span className="count-label">フォロー中</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Counts;
