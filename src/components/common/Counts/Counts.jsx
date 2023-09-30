// import React from 'react'

// eslint-disable-next-line react/prop-types
const Counts = ({ postsCount, followersCount, followingCount }) => {
  return (
    <>
      <div className="counts-container">
        <div className="count-item">
          <span className="count-number">{postsCount}</span>
          <span className="count-label">投稿</span>
        </div>
        <div className="count-item">
          <span className="count-number">{followersCount}</span>
          <span className="count-label">フォロワー</span>
        </div>
        <div className="count-item">
          <span className="count-number">{followingCount}</span>
          <span className="count-label">フォロー中</span>
        </div>
      </div>
    </>
  );
};

export default Counts;
