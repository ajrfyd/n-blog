// import ReactDOM from "react-dom/client";
import { hydrateRoot, createRoot } from "react-dom/client";
// import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import GlobalStyles from "./lib/styles/GlobalStyles.ts";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { themes } from "./lib/styles/themes.ts";
import rootReducer from "./stroe/index.ts";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { composeWithDevTools } from "redux-devtools-extension";
import "bootstrap/dist/css/bootstrap.min.css";
// import { hydrate } from "react-dom";
// import './index.css';

const l: Middleware = (store) => (next) => (action) => {
  // console.log(action, store.getState(), "<< prev store");
  store.getState();
  const result = next(action);
  // console.log(action, store.getState(), "<< next store");
  return result;
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, l))
);
const client = new QueryClient();
const root = document.getElementById("root") as HTMLElement;
const rootDom = createRoot(root);
const app = (
  <QueryClientProvider client={client}>
    <ReactQueryDevtools />
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <GlobalStyles />
          <ThemeProvider theme={{ themes }}>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);

root?.hasChildNodes() ? hydrateRoot(root, app) : rootDom.render(app);

// ReactDOM.createRoot(root).render(
//   <HelmetProvider>
//     <QueryClientProvider client={client}>
//       <ReactQueryDevtools />
//       <Provider store={store}>
//         <BrowserRouter>
//           <GlobalStyles />
//           <ThemeProvider theme={{ themes }}>
//             <App />
//           </ThemeProvider>
//         </BrowserRouter>
//       </Provider>
//     </QueryClientProvider>
//   </HelmetProvider>
// );

// root.hasChildNodes() ? (
//   ReactDOM.hydrateRoot(root,
//     <HelmetProvider>
//       <QueryClientProvider client={client}>
//         <ReactQueryDevtools/>
//         <Provider store={store}>
//           <BrowserRouter>
//             <GlobalStyles />
//             <ThemeProvider theme={{ themes }}>
//               <App />
//             </ThemeProvider>
//           </BrowserRouter>
//         </Provider>
//       </QueryClientProvider>
//     </HelmetProvider>
//     )
//   )
//     : (
//     ReactDOM.createRoot(root).render(
//       <HelmetProvider>
//       <QueryClientProvider client={client}>
//         <ReactQueryDevtools/>
//         <Provider store={store}>
//           <BrowserRouter>
//             <GlobalStyles />
//             <ThemeProvider theme={{ themes }}>
//               <App />
//             </ThemeProvider>
//           </BrowserRouter>
//         </Provider>
//       </QueryClientProvider>
//     </HelmetProvider>
//   )
// )
