// import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlinePushpin } from "react-icons/ai";
import { BiSolidFace } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";



const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
 


  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  
  const handleIconClick = (path) => {
    navigate(path);
  };

  const iconsStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

    const individualIconStyle = {
      fontSize: "2rem", // `size="2rem"` の代わり
      cursor: "pointer",
    };

  return (
    <div style={iconsStyles}>
      <AiOutlineHome
        style={individualIconStyle}
        size="2rem"
        onClick={() => handleIconClick("/posts")}
      />
      <BiSolidFace
        style={individualIconStyle}
        size="2rem"
        onClick={() => handleIconClick(`/users/me`)}
      />
      <AiOutlinePushpin style={individualIconStyle} size="2rem" />
      <LuSettings style={individualIconStyle} size="2rem" />
    </div>
  );
};

export default Footer;
