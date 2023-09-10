import {} from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NewPost from "./pages/NewPost/NewPost";
import Posts from "./pages/Posts/Posts";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/users/user_id/posts/new" element={<NewPost />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
