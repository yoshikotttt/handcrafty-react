// import React from "react";
import "../../App.css";
import Logout from "../../components/other/Logout";

const Home = () => {
  const comment = import.meta.env.VITE_API_BASE_COMMENT;
  return (
    <>
      <div>Home</div>
      <div>{comment}</div>

      <br />
      <br />
      <Logout />
    </>
  );
};

export default Home;
