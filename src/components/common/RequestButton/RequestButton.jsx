// import React from "react";
import styles from "./RequestButton.module.scss";
import { PiHandsPrayingDuotone } from "react-icons/pi";

const RequestButton = ({ onClick, label, className }) => {
  return (
    <PiHandsPrayingDuotone size="1.5rem" color="#de6a91" onClick={onClick}>
      {label}
    </PiHandsPrayingDuotone>
  );
};

export default RequestButton;
