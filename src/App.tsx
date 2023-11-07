import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Main />}/>
          {/* <Route path="/" element={< />}/> */}
        </Routes>
      </div>
    </React.Fragment>
  )
};

export default App;

