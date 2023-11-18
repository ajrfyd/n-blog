import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Main from "./pages/Main";
import PostsMain from "./pages/PostsMain";
// import BackDrop from './components/BackDrop';
import PostLayout from "./layouts/PostLayout";
import Notification from './layouts/Notification';
import Post from "./components/Post";
import NotFound from "./pages/NotFound";
import Test from "./Test";

const App = () => {
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
      {/* <BackDrop>children</BackDrop>  */}
    </React.Fragment>
  )
};

export default App;

