import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GlobalStyles from './GlobalStyles.ts';
import { ThemeProvider } from 'styled-components';
import { themes } from './lib/styles/themes.ts';
import rootReducer from './stroe/index.ts';
import { legacy_createStore as createStore, applyMiddleware, StoreEnhancer } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GlobalStyles />
      <ThemeProvider theme={{ themes }}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
  </BrowserRouter>
)

