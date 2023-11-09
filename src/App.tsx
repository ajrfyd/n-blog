import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import BlogMain from "./pages/BlogMain";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/blogList" element={<BlogMain />}/>
        {/* <Route path="/" element={< />}/> */}
      </Routes>
    </React.Fragment>
  )
};

export default App;

