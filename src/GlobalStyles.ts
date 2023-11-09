import { createGlobalStyle } from "styled-components";
import KCCMurukmuruk from "./fonts/KCCMurukmuruk.woff2";
import { themes } from "./lib/styles/themes";


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "KCCMurukmuruk";
    src: url(${KCCMurukmuruk});
  } 

  *,
  *::after,
  *::after {
    box-sizing: border-box;
    font-family: "KCCMurukmuruk";
  }
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${themes.text.default};
    background-color: ${themes.color.beige};
  }

  a {
    color: ${themes.text.default};
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

  @media (prefers-color-scheme: dark) {
    body {

    }
  }

`;

export default GlobalStyles
