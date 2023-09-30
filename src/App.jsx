import {} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,

  // useParams,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NewPost from "./pages/NewPost/NewPost";
import Posts from "./pages/Posts/Posts";
import SinglePost from "./pages/SinglePost/SinglePost";
import Edit from "./pages/Edit/Edit";
import Footer from "./components/footer/Footer";
import MyPage from "./pages/MyPage/MyPage";
import Settings from "./pages/Settings/Settings";
import Favorites from "./pages/Favorites/Favorites";
import Likes from "./pages/Likes/Likes";
import Profile from "./pages/Profile/Profile";

function App() {
   

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path={`/users/posts/new`} element={<NewPost />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/posts/:item_id" element={<SinglePost />}></Route>
          {/* 関数内でitemIdと統一してあるので、item_idではなくitemIdとする */}
          <Route path="/posts/:itemId/likes" element={<Likes />}></Route>
          <Route path="/users/me" element={<MyPage />}></Route>
          <Route path="/users/profile" element={<Profile/>}></Route>
          {/* 関数内でuserIdと統一してあるので、user_idではなくuserIdとする */}
          <Route path="/users/:userId" element={<MyPage />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="users/posts/:item_id/edit" element={<Edit />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
