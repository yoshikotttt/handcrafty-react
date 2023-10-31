// import React from "react";
import styles from "./RequestButton.module.scss";

const RequestButton = ({ onClick, label, className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default RequestButton;
