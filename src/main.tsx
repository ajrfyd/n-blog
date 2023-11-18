import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GlobalStyles from './GlobalStyles.ts';
import { ThemeProvider } from 'styled-components';
import { themes } from './lib/styles/themes.ts';
import rootReducer from './stroe/index.ts';
import { legacy_createStore as createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension"
import './index.css';

const l: Middleware = (store) => (next) => (action) => {
  // console.log(action, store.getState(), "<< prev store");
  const result = next(action);
  // console.log(action, store.getState(), "<< next store");
  return result;
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, l)));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles />
        <ThemeProvider theme={{ themes }}>
          <App /> 
        </ThemeProvider>
    </BrowserRouter>
  </Provider>
)

