// import React from 'react'

import { Link } from "react-router-dom";
import styles from "./Counts.module.scss"

// eslint-disable-next-line react/prop-types
const Counts = ({ userId, postsCount, followersCount, followingCount }) => {
  return (
    <>
      <div className={styles["counts-container"]}>
        <div className={styles["count-item"]}>
          <span className={styles["count-number"]}>{postsCount}</span>
          <span className={styles["count-label"]}>投稿</span>
        </div>
        <Link to={`/users/${userId}/followers`}>
          <div className={styles["count-item"]}>
            <span className={styles["count-number"]}>{followersCount}</span>
            <span className={styles["count-label"]}>フォロワー</span>
          </div>
        </Link>
        <Link to={`/users/${userId}/following`}>
          <div className={styles["count-item"]}>
            <span className={styles["count-number"]}>{followingCount}</span>
            <span className={styles["count-label"]}>フォロー中</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Counts;
