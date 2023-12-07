import { createGlobalStyle } from "styled-components";
import { themes } from "./themes";
// import KCCMurukmuruk from "./fonts/KCCMurukmuruk.woff2";


const GlobalStyles = createGlobalStyle`
  /* @font-face {
    font-family: "KCCMurukmuruk";
    src: url(${'KCCMurukmuruk'});
  } */

  :root {
    --brown: #DFBB9D;
    --beige: #F7E2D6;
    --teal: #9DD6DF;
    --purple: #A084CF;
  }

  @font-face {
    font-family: 'GeekbleMalang2WOFF2';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/GeekbleMalang2WOFF2.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  };

  *,
  *::after,
  *::after {
    box-sizing: border-box;
    font-family: "GeekbleMalang2WOFF2", sans-serif;
  }

  html {
    background-color: var(--beige);
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* color: ${themes.text.default}; */
    /* background-color: ${themes.color.beige}; */
    background-color: var(--beige);
  }

  a {
    /* color: ${themes.text.default}; */
    text-decoration: none;
  }

  code {
    font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  input, button, textarea {
    font-family: inherit;
  }

  html, border-style, #root {
    height: 100%;
  }


`;

export default GlobalStyles
