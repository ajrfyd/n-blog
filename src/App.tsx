import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./layouts/Header";
import Main from "./pages/Main";
import PostsMain from "./pages/PostsMain";
// import BackDrop from './components/BackDrop';
import PostLayout from "./layouts/PostLayout";
import Notification from './layouts/Notification';
import Post from "./components/Post";
import NotFound from "./pages/NotFound";
import useUserState from "./lib/hooks/useLogin";
import { PenToolIcon } from "lucide-react";
import CustomButton from './components/CustomButton';
import Test from "./Test";

const App = () => {
  const [user] = useUserState();
  const navigate = useNavigate();
  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/posts" element={<PostsMain />}/>
        <Route path="/post/:id" element={<Post/>}/>
        <Route path="/write" element={<PostLayout />}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="*" element={< NotFound/>}/>
      </Routes>
      <Notification />
      {
        (user && user.name === "ajrfyd") && (
          <div style={{ position: "fixed", right: "2rem", bottom: "2rem" }}>
            <CustomButton 
              $isIcon
              onClick={() => navigate("/write")}
            >
              <PenToolIcon />
            </CustomButton>
          </div>
        )
      }
      {/* <BackDrop>children</BackDrop>  */}
    </React.Fragment>
  )
};

export default App;

