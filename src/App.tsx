import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Main from "./pages/Main";
import BlogMain from "./pages/BlogMain";
import BackDrop from './components/BackDrop';
import PostLayout from "./layouts/PostLayout";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/blogList" element={<BlogMain />}/>
        <Route path="/write" element={<PostLayout />}>

        </Route>
        {/* <Route path="/" element={< />}/> */}
      </Routes>
      {/* <BackDrop>children</BackDrop>  */}
    </React.Fragment>
  )
};

export default App;

