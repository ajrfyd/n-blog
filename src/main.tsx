import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import GlobalStyles from './GlobalStyles.ts'
import { ThemeProvider } from 'styled-components'
import { themes } from './lib/styles/themes.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
        <ThemeProvider theme={{ themes }}>
          <App />
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
