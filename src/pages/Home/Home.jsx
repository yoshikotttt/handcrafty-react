// import React from "react";
import "../../App.css";
import Logout from "../../components/other/Logout";
import ProtectedRouteTest from "../../components/other/ProtectedRouteTest";


const Home = () => {
  return (
    <>
      <div>Home</div>
      <ProtectedRouteTest />
      <br />
      <br />
      <Logout/>

      
    </>
  );
};

export default Home;
