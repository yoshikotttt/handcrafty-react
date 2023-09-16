// import React from "react";
import { AiOutlineHome, AiOutlinePushpin } from "react-icons/ai";
import { BiSolidFace } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleIconClick = (path) => {
        navigate(path);
    };

    const iconsStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    };

  return (
    <div style={iconsStyles}>
      <AiOutlineHome className="icon" size="2rem" onClick={() => handleIconClick("/posts")}/>
      <BiSolidFace className="icon" size="2rem" />
      <AiOutlinePushpin className="icon" size="2rem" />
      <LuSettings className="icon" size="2rem" />
    </div>
  );
};

export default Footer;
